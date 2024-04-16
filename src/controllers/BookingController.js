const BookingService = require("../services/BookingService");

const createBooking = async (req, res) => {
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
        } = req.body;
        // Kiểm tra các trường bắt buộc
        if (
            !date ||
            !name ||
            !cccd ||
            !birth ||
            !email ||
            !sex ||
            !number ||
            session === undefined ||
            !address ||
            !symptom
        ) {
            return res.status(400).json({
                status: "ERR",
                message: "Missing required input fields",
            });
        }
        // Gọi service để tạo booking
        const response = await BookingService.createBooking(req.body);

        // Trả về kết quả thành công
        return res.status(200).json(response);
    } catch (error) {
        // Xử lý lỗi nếu có
        return res.status(500).json({
            status: "ERR",
            message:
                error.message || "An error occurred while processing the request",
        });
    }
};

const getAllbooking = async (req, res) => {
    try {
        const day = req.params.day;
        const response = await BookingService.getAllbooking();
        return res.status(200).json(response);
    } catch (error) {
        // Xử lý lỗi nếu có
        return res.status(500).json({
            status: "ERR",
            message:
                error.message || "An error occurred while processing the request",
        });
    }
};

const updateBooking = async (req, res) => {
    try {
        const Bookingid = req.params.id
        const data = req.body
        if (!Bookingid) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The booking is required'
            })
        }
        const response = await BookingService.updateBooking(Bookingid, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsBooking = async (req, res) => {
    try {
        const Bookingid = req.params.id
        if (!Bookingid) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The booking is required'
            })
        }
        const response = await BookingService.getDetailsBooking(Bookingid)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteBooking = async (req, res) => {
    try {
        const Bookingid = req.params.id
        if (!Bookingid) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The Booking is required'
            })
        }
        const response = await BookingService.deleteBooking(Bookingid)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteManyBooking = async (req, res) => {
    try {
        const id = req.body.id
        if (!id) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The id is required'
            })
        }
        const response = await BookingService.deleteManyBooking(id)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createBooking,
    getAllbooking,
    updateBooking,
    getDetailsBooking,
    deleteBooking,
    deleteManyBooking
};