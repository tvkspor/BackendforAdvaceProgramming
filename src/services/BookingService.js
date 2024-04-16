const Booking = require("../models/BookingModel");

const createBooking = async (data) => {
    try {
        const {
            date,
            name,
            cccd,
            birth,
            email,
            sex,
            number,
            session,
            address,
            symptom,
        } = data;
        const detailedData = {
            name,
            cccd,
            birth,
            email,
            sex,
            number,
            session,
            address,
            symptom,
        };

        const checkClient = await Booking.findOne({
            date: date,
            "detailed.cccd": cccd,
        });

        if (checkClient) {
            return {
                status: "ERR",
                message: "you've already booked",
            };
        }

        const checkday = await Booking.findOne({ date: date });
        var newBooking = null;

        if (checkday !== null) {
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
                    const newDetailed = newBooking.detailed.find(
                        (obj) => obj.cccd == cccd
                    );

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
                        status: "ERR",
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
                    const newDetailed = newBooking.detailed.find(
                        (obj) => obj.cccd == cccd
                    );

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
                        status: "ERR",
                        message: "we are full of capacity in the evening",
                    };
                }
            }

            if (!newBooking) {
                return {
                    status: "ERR",
                    message: "Failed to update booking",
                };
            }
        } else {
            // Tạo booking mới nếu không tìm thấy booking cho ngày đã chọn
            newBooking = await Booking.create({
                date: date,
                detailed: [detailedData],
            });
            if (session) {
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
            } else {
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
            status: "SUCCESS",
            message: "Booking created successfully",
            data: newBooking,
        };
    } catch (error) {
        throw error;
    }
};

const getAllbooking = async () => {
    try {
        //const date = data;
        const inforOfDay = await Booking.find();
        if (inforOfDay !== null) {
            return {
                status: "SUCCESS",
                data: inforOfDay,
                // data: inforOfDay.map(info => info.detailed),
            };
        } else {
            return {
                status: "ERR",
                message: "can't find that day",
            };
        }
    } catch (error) {
        throw error;
    }
};

// const getAllTypeBooking = () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const allType = await Doctor.distinct('department')
//             resolve({
//                 status: 'OK',
//                 message: 'Success',
//                 data: allType,
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

const updateBooking = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkBooking = await Booking.findOne({
                _id: id
            })
            if (checkBooking === null) {
                resolve({
                    status: 'ERR',
                    message: 'The booking is not defined'
                })
            }

            const updatedBooking = await Booking.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedBooking
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteBooking = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkBooking = await Booking.findOne({
                _id: id
            })
            if (checkBooking === null) {
                resolve({
                    status: 'ERR',
                    message: 'The booking is not defined'
                })
            }

            await Booking.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete booking success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyBooking = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Booking.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete booking success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsBooking = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const booking = await Booking.findOne({
                _id: id
            })
            if (booking === null) {
                resolve({
                    status: 'ERR',
                    message: 'The booking is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: booking
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createBooking,
    getAllbooking,
    getDetailsBooking,
    deleteManyBooking,
    deleteBooking,
    updateBooking
};