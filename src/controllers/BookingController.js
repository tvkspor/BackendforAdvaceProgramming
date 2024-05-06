const BookingService = require("../services/BookingService");

const createBooking = async (req, res) => {
    try {
        const { date, name, cccd, birth, email, sex, number, session, address, symptom } = req.body;
        // Kiểm tra các trường bắt buộc
        if (!date || !name || !cccd || !birth || !email || !sex || !number || session === undefined || !address || !symptom) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Missing required input fields'
            });
        }
        // Gọi service để tạo booking
        const response = await BookingService.createBooking(req.body);
        // Trả về kết quả thành công
        return res.status(200).json(response);
    } catch (error) {
        // Xử lý lỗi nếu có
        return res.status(500).json({
            status: 'ERR',
            message: error.message || 'An error occurred while processing the request'
        });
    }
}

const getAllBooking = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await BookingService.getAllBooking(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllbooking = async (req, res) => {
    try {
        const day = req.params.day;
        const response = await BookingService.getAllbooking(day);
        return res.status(200).json(response);
    } catch (error) {
        // Xử lý lỗi nếu có
        return res.status(50).json({
            status: 'ERR',
            message: error.message || 'An error occurred while processing the request'
        });
    }
}

const findBooking = async (req, res) => {
    try {
        const CCCD = req.params.CCCD;
        const response = await BookingService.findBooking(CCCD);
        return res.status(200).json(response);
    } catch (error) {
        // Xử lý lỗi nếu có
        return res.status(500).json({
            status: 'ERR',
            message: error.message || 'An error occurred while processing the request'
        });
    }
}

const deleteBooking = async (req, res) => {
    try {
        const BookingId = req.params.id
        if (!BookingId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The BookingId is required'
            })
        }
        const response = await BookingService.deleteBooking(BookingId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
  }

  const deleteManyBooking = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await BookingService.deleteManyBooking(ids)
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
    findBooking,
    deleteBooking,
    getAllBooking,
    deleteManyBooking,
}