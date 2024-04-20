const { get } = require("mongoose");
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

const getAllLiquor = async (req, res) => {
  try {
    const response = await MedicineService.getAllLiquor();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllPowder = async (req, res) => {
  try {
    const response = await MedicineService.getAllPowder();
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

const updateMedicine = async (req, res) => {
  try {
      const MedicineId = req.params.id
      const data = req.body
      if (!MedicineId) {
          return res.status(200).json({
              status: 'ERR',
              message: 'The MedicineId is required'
          })
      }
      const response = await MedicineService.updateMedicine(MedicineId, data)
      return res.status(200).json(response)
  } catch (e) {
      return res.status(404).json({
          message: e
      })
  }
}

const getDetailsMedicine = async (req, res) => {
  try {
      const MedicineId = req.params.id
      if (!MedicineId) {
          return res.status(200).json({
              status: 'ERR',
              message: 'The MedicineId is required'
          })
      }
      const response = await MedicineService.getDetailsMedicine(MedicineId)
      return res.status(200).json(response)
  } catch (e) {
      return res.status(404).json({
          message: e
      })
  }
}

const deleteMedicine = async (req, res) => {
  try {
      const MedicineId = req.params.id
      if (!MedicineId) {
          return res.status(200).json({
              status: 'ERR',
              message: 'The MedicineId is required'
          })
      }
      const response = await MedicineService.deleteMedicine(MedicineId)
      return res.status(200).json(response)
  } catch (e) {
      return res.status(404).json({
          message: e
      })
  }
}

const deleteMany = async (req, res) => {
  try {
      const ids = req.body.ids
      if (!ids) {
          return res.status(200).json({
              status: 'ERR',
              message: 'The ids is required'
          })
      }
      const response = await MedicineService.deleteManyMedicine(ids)
      return res.status(200).json(response)
  } catch (e) {
      return res.status(404).json({
          message: e
      })
  }
}

const getAllMedicine = async (req, res) => {
  try {
      const { limit, page, sort, filter } = req.query
      const response = await MedicineService.getAllMedicine(Number(limit) || null, Number(page) || 0, sort, filter)
      return res.status(200).json(response)
  } catch (e) {
      return res.status(404).json({
message: e
      })
  }
}

const getAllType = async (req, res) => {
  try {
      const response = await MedicineService.getAllTypeMedicine()
return res.status(200).json(response)
  } catch (e) {
      return res.status(404).json({
          message: e
      })
  }
}

module.exports = {
  createMedicine,
  getAllType,
  getAllTypeMedicine,
  getAllTablets,
  getAllLiquor,
  getAllPowder,
  updateMedicine,
    getDetailsMedicine,
    deleteMedicine,
    getAllMedicine,
    deleteMany,
    getAllTypeMedicine
};
