const Medicine = require("../models/MedicineModel");

const createMedicine = (newMedicine) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, countInStock, price, description } = newMedicine;
    try {
      const checkMedicine = await Medicine.findOne({
        name: name,
      });
      if (checkMedicine !== null) {
        resolve({
          status: "ERR",
          message: "The name of Medicine is already",
        });
      }
      const newMedicine = await Medicine.create({
        name,
        image,
        type,
        countInStock,
        price,
        description,
      });
      if (newMedicine) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: newMedicine,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllTypeMedicine = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Medicine.distinct("type");
      resolve({
        status: "OK",
        message: "Success",
        data: allType,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllTablets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allName = await Medicine.find({ type: "viên nén" });
      resolve({
        status: "OK",
        message: "Success",
        data: allName,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createMedicine,
  getAllTypeMedicine,
  getAllTablets,
};
