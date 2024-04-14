const Booking = require ("../models/BookingModel");

const createBooking = async (data) => {
    try {
        const { date, name, cccd, birth, email, sex, number, session, address, symptom } = data;
        const detailedData = { name, cccd,  birth, email, sex, number, session, address, symptom };

        const checkClient = await Booking.findOne({
            date: date,
            "detailed.cccd": cccd
        });

        if (checkClient) {
            return {
                status: 'ERR',
                message: "you've already booked",
            };
        }

        const checkday = await Booking.findOne({ date: date });
        var newBooking = null;

        if (checkday !== null ) {
            var totalMorning = checkday.totalMorning;
            var totalEvening = checkday.totalEvening;

            if (session) {
                if (totalMorning > 0) {
                    newBooking = await Booking.findOneAndUpdate(
                        { 
                            date: date,
                         },
                        {
                            $push: { detailed: detailedData },
                            $inc: { totalMorning: -1 },
                        },
                        { new: true }
                    );
                    const newDetailed = newBooking.detailed.find(obj => obj.cccd == cccd);

                    // Cập nhật trường stt
                    if (newDetailed) {
                        ++newBooking.morningCounter;
                        newDetailed.stt = newBooking.morningCounter;
                    }
                    // Lưu newBooking đã được cập nhật
                    try {
                        await newBooking.save();
                    } catch (error) {
                        // Xử lý lỗi nếu cần
                    }   
                } else {
                    return {
                        status: 'ERR',
                        message: "we are full of capacity in the morning",
                    };
                }
            } else {
                if (totalEvening > 0) {
                    newBooking = await Booking.findOneAndUpdate(
                        { 
                            date: date,
                         },
                        {
                            $push: { detailed: detailedData },
                            $inc: { totalEvening: -1 },
                        },
                        { new: true }
                    );
                    const newDetailed = newBooking.detailed.find(obj => obj.cccd == cccd);

                    // Cập nhật trường stt
                    if (newDetailed) {
                        ++newBooking.eveningCounter;
                        newDetailed.stt = newBooking.eveningCounter;
                    }
                    // Lưu newBooking đã được cập nhật
                    try {
                        await newBooking.save();
                    } catch (error) {
                        // Xử lý lỗi nếu cần
                    }   
                } else {
                    return {
                        status: 'ERR',
                        message: "we are full of capacity in the evening",
                    };
                }
            }

            if (!newBooking) {
                return {
                    status: 'ERR',
                    message: "Failed to update booking",
                };
            }
        } else {
            // Tạo booking mới nếu không tìm thấy booking cho ngày đã chọn
            newBooking = await Booking.create({date: date, detailed: [detailedData]});
            if(session){
               await Booking.findOneAndUpdate(
                    { 
                        date: date,
                        "detailed.cccd": cccd,
                    },
                    {
                        $inc: { totalMorning: -1 },
                    },
                    { new: true }
                );
            } else{
                await Booking.findOneAndUpdate(
                    { 
                        date: date,
                        "detailed.cccd": cccd,
                     },
                    {
                        $inc: { totalEvening: -1 },
                    },
                    { new: true }
                );
            }
        }
        return {
            status: 'SUCCESS',
            message: 'Booking created successfully',
            data: newBooking,
        };
    } catch (error) {
        throw error;
    }
};

const getAllbooking = async (data) => {
    try{
        const date = data;
        const inforOfDay = await Booking.find({ date: date });
            if(inforOfDay !== null){
                return {
                    status: 'SUCCESS',
                    data: inforOfDay.map(info => info.detailed),
                };
            }
            else{
                return {
                    status: 'ERR',
                    message: "can't find that day",
                };
            }
    } catch(error){
        throw error;
    }
}


module.exports={
    createBooking,
    getAllbooking,
}