const DoctorService = require("../services/DoctorService");

// const createDoctor = async (req, res) => {
//   try {
//     const { name, phone, address, avatar, dateofbirth, sex, department } =
//       req.body;
//     if (!name || !phone || !address) {
//       return res.status(200).json({
//         status: "ERR",
//         message: "The input is required ",
//       });
//     }
//     const response = await DoctorService.createDoctor(req.body);
//     return res.status(200).json(response);
//   } catch (e) {
//     return res.status(404).json({
//       message: e,
//     });
//   }
// };

// const getAllDoctor = async (req, res) => {
//   try {
//     const response = await DoctorService.getAllDoctor();
//     return res.status(200).json(response);
//   } catch (e) {
//     return res.status(404).json({
//       message: e,
//     });
//   }
// };

// const DoctorService = require("../services/DoctorService");

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

const getAllDoctor = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await DoctorService.getAllDoctor(
      Number(limit) || null,
      Number(page) || 0,
      sort,
      filter
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllTypedoctor = async (req, res) => {
  try {
    const response = await DoctorService.getAllTypeDoctor();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const DoctorId = req.params.id;
    const data = req.body;
    if (!DoctorId) {
      return res.status(200).json({
        status: "ERR",
        message: "The DoctorId is required",
      });
    }
    const response = await DoctorService.updateDoctor(DoctorId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsDoctor = async (req, res) => {
  try {
    const DoctorId = req.params.id;
    if (!DoctorId) {
      return res.status(200).json({
        status: "ERR",
        message: "The DoctorId is required",
      });
    }
    const response = await DoctorService.getDetailsDoctor(DoctorId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const DoctorId = req.params.id;
    if (!DoctorId) {
      return res.status(200).json({
        status: "ERR",
        message: "The DoctorId is required",
      });
    }
    const response = await DoctorService.deleteDoctor(DoctorId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteManyDoctor = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!ids) {
      return res.status(200).json({
        status: "ERR",
        message: "The ids is required",
      });
    }
    const response = await DoctorService.deleteManyDoctor(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllDoctorCardiology = async (req, res) => {
  try {
    const response = await DoctorService.getAllDoctorCardiology();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllDoctorMusculoskeletal = async (req, res) => {
  try {
    const response = await DoctorService.getAllDoctorMusculoskeletal();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllDoctorIntensivecare = async (req, res) => {
  try {
    const response = await DoctorService.getAllDoctorIntensivecare();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllDoctorOtorhinology = async (req, res) => {
  try {
    const response = await DoctorService.getAllDoctorOtorhinology();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllDoctorPediatrics = async (req, res) => {
  try {
    const response = await DoctorService.getAllDoctorPediatrics();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllDoctorNervesurgery = async (req, res) => {
  try {
    const response = await DoctorService.getAllDoctorNervesurgery();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllDepartmentDoctor = async (req, res) => {
  try {
    const response = await DoctorService.getAllDepartmentDoctor();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createDoctor,
  getAllDoctor,
  getAllTypedoctor,
  deleteManyDoctor,
  deleteDoctor,
  getDetailsDoctor,
  updateDoctor,
  getAllDepartmentDoctor,
  getAllDoctorCardiology,
  getAllDoctorNervesurgery,
  getAllDoctorIntensivecare,
  getAllDoctorMusculoskeletal,
  getAllDoctorOtorhinology,
  getAllDoctorPediatrics,
};
