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

const getAllDoctor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allName = await Doctor.distinct("name");
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

const getAllDoctorCardiology = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allName = await Doctor.find({ department: "cardiology" });
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

const getAllDoctorNervesurgery = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allName = await Doctor.find({ department: "nerve surgery" });
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

const getAllDepartmentDoctor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allDepartment = await Doctor.distinct("department");
      resolve({
        status: "OK",
        message: "Success",
        data: allDepartment,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createDoctor,
  getAllDoctor,
  getAllDepartmentDoctor,
  getAllDoctorCardiology,
  getAllDoctorNervesurgery,
};
