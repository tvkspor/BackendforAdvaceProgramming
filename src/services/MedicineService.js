const { getAllType } = require("../controllers/MedController");
const Medicine = require("../models/MedicineModel");

const createMedicine = (newMedicine) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, countInStock, price, description, selled } = newMedicine;
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
        selled,
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

const getAllLiquor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allName = await Medicine.find({ type: "dung dịch" });
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

const getAllPowder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allName = await Medicine.find({ type: "bột" });
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


const updateMedicine = (id, data) => {
  return new Promise(async (resolve, reject) => {
      try {
          const checkMedicine = await Medicine.findOne({
              _id: id
          })
          if (checkMedicine === null) {
              resolve({
                  status: 'ERR',
                  message: 'The medicine is not defined'
              })
          }

          const updatedMedicine = await Medicine.findByIdAndUpdate(id, data, { new: true })
          resolve({
              status: 'OK',
              message: 'SUCCESS',
              data: updatedMedicine
          })
      } catch (e) {
          reject(e)
      }
  })
}

const deleteMedicine = (id) => {
  return new Promise(async (resolve, reject) => {
      try {
          const checkMedicine = await Medicine.findOne({
              _id: id
          })
          if (checkMedicine === null) {
              resolve({
                  status: 'ERR',
                  message: 'The medicine is not defined'
              })
          }

          await Medicine.findByIdAndDelete(id)
          resolve({
              status: 'OK',
              message: 'Delete medicine success',
          })
      } catch (e) {
          reject(e)
      }
  })
}

const deleteManyMedicine = (ids) => {
  return new Promise(async (resolve, reject) => {
      try {
          await Medicine.deleteMany({ _id: ids })
          resolve({
              status: 'OK',
              message: 'Delete medicine success',
          })
      } catch (e) {
          reject(e)
      }
  })
}

const getDetailsMedicine = (id) => {
  return new Promise(async (resolve, reject) => {
      try {
          const medicine = await Medicine.findOne({
              _id: id
          })
          if (medicine === null) {
resolve({
status: 'ERR',
                  message: 'The medicine is not defined'
              })
          }

          resolve({
              status: 'OK',
              message: 'SUCESS',
              data: medicine
          })
      } catch (e) {
          reject(e)
      }
  })
}

const getAllMedicine = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
      try {
          const totalMedicine = await Medicine.count()
          let allMedicine = []
          if (filter) {
              const label = filter[0];
              const allObjectFilter = await Medicine.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit).sort({createdAt: -1, updatedAt: -1})
              resolve({
                  status: 'OK',
                  message: 'Success',
                  data: allObjectFilter,
                  total: totalMedicine,
                  pageCurrent: Number(page + 1),
                  totalPage: Math.ceil(totalMedicine / limit)
              })
          }
          if (sort) {
              const objectSort = {}
              objectSort[sort[1]] = sort[0]
              const allMedicineSort = await Medicine.find().limit(limit).skip(page * limit).sort(objectSort).sort({createdAt: -1, updatedAt: -1})
              resolve({
                  status: 'OK',
                  message: 'Success',
                  data: allMedicineSort,
                  total: totalMedicine,
                  pageCurrent: Number(page + 1),
                  totalPage: Math.ceil(totalMedicine / limit)
              })
          }
          if(!limit) {
              allMedicine = await Medicine.find().sort({createdAt: -1, updatedAt: -1})
          }else {
              allMedicine = await Medicine.find().limit(limit).skip(page * limit).sort({createdAt: -1, updatedAt: -1})
          }
          resolve({
              status: 'OK',
              message: 'Success',
              data: allMedicine,
              total: totalMedicine,
              pageCurrent: Number(page + 1),
              totalPage: Math.ceil(totalMedicine / limit)
          })
      } catch (e) {
          reject(e)
      }
  })
}
module.exports = {
  createMedicine,
  getAllTypeMedicine,
  getAllTablets,
  getAllLiquor,
  getAllPowder,

  updateMedicine,
    getDetailsMedicine,
    deleteMedicine,
    getAllMedicine,
    deleteManyMedicine,
    getAllType,
};
