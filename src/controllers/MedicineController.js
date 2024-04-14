const MedicineService = require("../services/MedicineService");

const createMedicine = async (req, res) => {
  try {
    const { name, image, type, countInStock, price, description } = req.body;
    if (!name || !type) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required ",
      });
    }
    const response = await MedicineService.createMedicine(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllTablets = async (req, res) => {
  try {
    const response = await MedicineService.getAllTablets();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllTypeMedicine = async (req, res) => {
  try {
    const response = await MedicineService.getAllTypeMedicine();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createMedicine,
  getAllTypeMedicine,
  getAllTablets,
};
