const Booking = require("../models/BookingModel");
const SendEmail = require("../sendEmail");

const createBooking = async (data) => {
    try {
        const { date, name, cccd, birth, email, sex, number, session, address, symptom } = data;
        const detailedData = { name, cccd, birth, email, sex, number, session, address, symptom };

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
        const subject = 'Confirmation letter for appointment';
        const recipientEmail = detailedData.email;
        let text = null;
        let newBooking = null;

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
                    const newDetailed = newBooking.detailed.find(obj => obj.cccd == cccd);

                    // Cập nhật trường stt
                    if (newDetailed) {
                        ++newBooking.morningCounter;
                        newDetailed.stt = newBooking.morningCounter;
                        text = `Bạn đã đặt lịch khám thành công vào ngày ${date}, số thứ tự của bạn là ${newDetailed.stt}.`;
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
                        text = ` Bạn đã đặt lịch khám thành công vào ngày ${date}, số thứ tự của bạn là ${newDetailed.stt}.`;
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
            newBooking = await Booking.create({ date: date, detailed: [detailedData] });
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
                text = `Bạn đã đặt lịch khám thành công vào ngày ${date}, số thứ tự của bạn là 1`;
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
                text = `Bạn đã đặt lịch khám thành công vào ngày ${date}, số thứ tự của bạn là 1`;
            }
        }

        SendEmail(recipientEmail, subject, text);

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
    try {
        const date = data;
        const inforOfDay = await Booking.find({ date: date });
        if (inforOfDay !== null) {
            return {
                status: 'SUCCESS',
                data: inforOfDay.map(info => info.detailed),
            };
        }
        else {
            return {
                status: 'ERR',
                message: "can't find that day",
            };
        }
    } catch (error) {
        throw error;
    }
}

const getAllBooking = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = Booking.find();

            // Thực hiện lọc nếu filter được cung cấp
            if (filter && filter.length === 2) {
                const label = filter[0];
                const filterValue = filter[1];
                query = query.where(label).regex(new RegExp(filterValue, 'i'));
            }

            // Thực hiện sắp xếp nếu sort được cung cấp
            if (sort && sort.length === 2) {
                const [order, sortBy] = sort;
                query = query.sort({ [sortBy]: order === 'asc' ? 1 : -1 });
            } else {
                // Sắp xếp mặc định nếu không có sort được cung cấp
                query = query.sort({ createdAt: -1, updatedAt: -1 });
            }

            // Thực hiện phân trang
            if (limit) {
                query = query.limit(limit).skip(page * limit);
            }

            // Thực hiện truy vấn và resolve promise với kết quả
            const allBooking = await query.exec();
            const totalBooking = await Booking.countDocuments();

            resolve({
                status: 'OK',
                message: 'Success',
                data: allBooking,
                total: totalBooking,
                pageCurrent: Number(page) + 1,
                totalPage: Math.ceil(totalBooking / limit)
            });
        } catch (error) {
            reject(error);
        }
    });
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

const findBooking = (CCCD) => {
    return new Promise(async (resolve, reject) => {
        try {
            const bookings = await Booking.find({
                "detailed.cccd": CCCD,
            });
            if (!bookings || bookings.length === 0) {
                resolve({
                    status: 'ERR',
                    message: 'No booking found for the provided CCCD'
                });
            } else {
                const collectedElements = [];
                bookings.forEach(booking => {
                    booking.detailed.forEach(item => {
                        if (item.cccd == CCCD) {
                            var date = booking.date;
                            var item = item;
                            let newItem = {
                                date: date,
                                item: item,
                            };
                            collectedElements.push(newItem);
                        }
                    });
                });
                resolve({
                    status: 'OK',
                    message: 'Bookings found',
                    collectedElements: collectedElements,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

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


module.exports = {
    getAllBooking,
    createBooking,
    getAllbooking,
    deleteManyBooking,
    findBooking,
    deleteBooking,
};
