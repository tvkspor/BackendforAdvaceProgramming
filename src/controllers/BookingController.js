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
    const response = await BookingService.getAllbooking(day);
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

module.exports = {
  createBooking,
  getAllbooking,
};
