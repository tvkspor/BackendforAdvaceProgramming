const Doctor = require("../models/DoctorModel");

const createDoctor = (newDoctor) => {
  return new Promise(async (resolve, reject) => {
    const { name, phone, address, avatar, city, dateofbirth, sex, department } =
      newDoctor;
    try {
      const checkDoctor = await Doctor.findOne({
        name: name,
      });
      if (checkDoctor !== null) {
        resolve({
          status: "ERR",
          message: "The name of Doctor is already",
        });
      }
      const newDoctor = await Doctor.create({
        name,
        phone,
        address,
        avatar,
        dateofbirth,
        sex,
        department,
      });
      if (newDoctor) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: newDoctor,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateTask = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await Doctor.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The Doctor is not defined",
        });
      }

      const updatedTask = await Doctor.findByIdAndUpdate(
        id,
        {
          $push: { task: data },
        },
        { new: true }
      );
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedTask,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createDoctor,
  updateTask,
};
