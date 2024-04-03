const DoctorService = require("../services/DoctorService");

const createDoctor = async (req, res) => {
  try {
    const { name, phone, address, avatar, dateofbirth, sex, department } =
      req.body;
    if (!name || !phone || !address) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required ",
      });
    }
    const response = await DoctorService.createDoctor(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const data = req.body;
    if (!doctorId) {
      return res.status(200).json({
        status: "ERR",
        message: "The doctorId is required",
      });
    }
    const response = await DoctorService.updateTask(doctorId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createDoctor,
  updateTask,
};
