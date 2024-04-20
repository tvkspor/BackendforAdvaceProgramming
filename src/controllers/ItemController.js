const ItemService = require("../services/ItemService");

const createItem = async (req, res) => {
  try {
    const { name, price, component, availability, image, importDate } =
      req.body;
    if (!name || !price || !component || !availability || !importDate) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required ",
      });
    }
    const response = await ItemService.createItem(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllItem = async (req, res) => {
  try {
      const { limit, page, sort, filter } = req.query
      const response = await ItemService.getAllItem(Number(limit) || null, Number(page) || 0, sort, filter)
      return res.status(200).json(response)
  } catch (e) {
      return res.status(404).json({
          message: e
      })
  }
}

const getAllTypeItem = async (req, res) => {
  try {
      const response = await ItemService.getAllTypeItem()
      return res.status(200).json(response)
  } catch (e) {
      return res.status(404).json({
          message: e
      })
  }
}

const updateItem = async (req, res) => {
  try {
      const itemId = req.params.id
      const data = req.body
      if (!itemId) {
          return res.status(200).json({
              status: 'ERR',
              message: 'The itemId is required'
          })
      }
      const response = await ItemService.updateItem(itemId, data)
      return res.status(200).json(response)
  } catch (e) {
      return res.status(404).json({
          message: e
      })
  }
}

const getDetailsItem = async (req, res) => {
  try {
      const itemId = req.params.id
      if (!itemId) {
          return res.status(200).json({
              status: 'ERR',
              message: 'The itemId is required'
          })
      }
      const response = await ItemService.getDetailsItem(itemId)
      return res.status(200).json(response)
  } catch (e) {
      return res.status(404).json({
          message: e
      })
  }
}

const deleteItem = async (req, res) => {
  try {
      const itemId = req.params.id
      if (!itemId) {
          return res.status(200).json({
              status: 'ERR',
              message: 'The itemId is required'
          })
      }
      const response = await ItemService.deleteItem(itemId)
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
      const response = await ItemService.deleteManyItem(ids)
      return res.status(200).json(response)
  } catch (e) {
      return res.status(404).json({
          message: e
      })
  }
}

module.exports = {
  createItem,
  getAllItem,
  getAllTypeItem,
  updateItem,
  getDetailsItem,
  deleteItem,
  deleteMany
};
