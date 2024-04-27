const Doctor = require("../models/DoctorModel");

// const createDoctor = (newDoctor) => {
//   return new Promise(async (resolve, reject) => {
//     const { name, phone, address, avatar, city, dateofbirth, sex, department } =
//       newDoctor;
//     try {
//       const checkDoctor = await Doctor.findOne({
//         name: name,
//       });
//       if (checkDoctor !== null) {
//         resolve({
//           status: "ERR",
//           message: "The name of Doctor is already",
//         });
//       }
//       const newDoctor = await Doctor.create({
//         name,
//         phone,
//         address,
//         avatar,
//         dateofbirth,
//         sex,
//         department,
//       });
//       if (newDoctor) {
//         resolve({
//           status: "OK",
//           message: "SUCCESS",
//           data: newDoctor,
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// const getAllDoctor = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const allName = await Doctor.distinct("name");
//       resolve({
//         status: "OK",
//         message: "Success",
//         data: allName,
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

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

const getAllDoctorIntensivecare = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allName = await Doctor.find({ department: "intensive care" });
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

const getAllDoctorMusculoskeletal = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allName = await Doctor.find({ department: "musculoskeletal" });
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

const getAllDoctorOtorhinology = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allName = await Doctor.find({ department: "otorhinology" });
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

const getAllDoctorPediatrics = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allName = await Doctor.find({ department: "pediatrics" });
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

// const Doctor = require("../models/DoctorModel");

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

const getAllDoctor = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalDoctor = await Doctor.count();
      let allDoctor = [];
      if (filter) {
        const label = filter[0];
        const allObjectFilter = await Doctor.find({
          [label]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allObjectFilter,
          total: totalDoctor,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalDoctor / limit),
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allDoctorSort = await Doctor.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort)
          .sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allDoctorSort,
          total: totalDoctor,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalDoctor / limit),
        });
      }
      if (!limit) {
        allDoctor = await Doctor.find().sort({ createdAt: -1, updatedAt: -1 });
      } else {
        allDoctor = await Doctor.find()
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
      }
      resolve({
        status: "OK",
        message: "Success",
        data: allDoctor,
        total: totalDoctor,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalDoctor / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllTypeDoctor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Doctor.distinct("department");
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

const updateDoctor = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkDoctor = await Doctor.findOne({
        _id: id,
      });
      if (checkDoctor === null) {
        resolve({
          status: "ERR",
          message: "The doctor is not defined",
        });
      }

      const updatedDoctor = await Doctor.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedDoctor,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteDoctor = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkDoctor = await Doctor.findOne({
        _id: id,
      });
      if (checkDoctor === null) {
        resolve({
          status: "ERR",
          message: "The doctor is not defined",
        });
      }

      await Doctor.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete doctor success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyDoctor = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Doctor.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "Delete doctor success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsDoctor = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doctor = await Doctor.findOne({
        _id: id,
      });
      if (doctor === null) {
        resolve({
          status: "ERR",
          message: "The doctor is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESS",
        data: doctor,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createDoctor,
  getAllDoctor,
  getAllTypeDoctor,
  updateDoctor,
  getDetailsDoctor,
  deleteManyDoctor,
  deleteDoctor,
  getAllDepartmentDoctor,
  getAllDoctorCardiology,
  getAllDoctorNervesurgery,
  getAllDoctorIntensivecare,
  getAllDoctorMusculoskeletal,
  getAllDoctorOtorhinology,
  getAllDoctorPediatrics,
};
