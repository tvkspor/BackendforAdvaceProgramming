const Item = require("../models/ItemModel");

const createItem = (newItem) => {
  return new Promise(async (resolve, reject) => {
    const { name, price, component, availability, image, importDate, description} =
      newItem;
    try {
      const checkItem = await Item.findOne({
        name: name,
      });
      if (checkItem !== null) {
        resolve({
          status: "ERR",
          message: "The name of Item is already ",
        });
      }
      const newItem = await Item.create({
        name, price, component, availability, image, importDate, description
      });
      if (newItem) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: newItem,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllItem = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalItem = await Item.count()
            let allItem = []
            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Item.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit).sort({createdAt: -1, updatedAt: -1})
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalItem,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalItem / limit)
                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allItemSort = await Item.find().limit(limit).skip(page * limit).sort(objectSort).sort({createdAt: -1, updatedAt: -1})
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allItemSort,
                    total: totalItem,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalItem / limit)
                })
            }
            if(!limit) {
                allItem = await Item.find().sort({createdAt: -1, updatedAt: -1})
            }else {
                allItem = await Item.find().limit(limit).skip(page * limit).sort({createdAt: -1, updatedAt: -1})
            }
            resolve({
                status: 'OK',
                message: 'Success',
                data: allItem,
                total: totalItem,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalItem / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
  }
  
  const getAllTypeItem = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Item.distinct('type')
            resolve({
                status: 'OK',
                message: 'Success',
                data: allType,
            })
        } catch (e) {
            reject(e)
        }
    })
  }

  const updateItem = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkItem = await Item.findOne({
                _id: id
            })
            if (checkItem === null) {
                resolve({
                    status: 'ERR',
                    message: 'The item is not defined'
                })
            }

            const updatedItem = await Item.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedItem
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteItem = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkItem = await Item.findOne({
                _id: id
            })
            if (checkItem === null) {
                resolve({
                    status: 'ERR',
                    message: 'The item is not defined'
                })
            }

            await Item.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete item success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyItem = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Item.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete item success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsItem = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const item = await Item.findOne({
                _id: id
            })
            if (item === null) {
                resolve({
                    status: 'ERR',
                    message: 'The item is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: item
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
  createItem,
  getAllItem,
  getAllTypeItem,
  updateItem,
  deleteItem,
  deleteManyItem,
  getDetailsItem
};
