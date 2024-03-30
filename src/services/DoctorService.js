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

module.exports = {
  createDoctor,
};
