const User = require("../models/UserModel");
const Order = require("../models/OrderProduct");
const Medicine = require("../models/MedicineModel");
const Product = require("../models/ProductModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        resolve({
          status: "ERR",
          message: "The email is already",
        });
      }
      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        name,
        email,
        password: hash,
        phone,
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);

      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "The password or user is incorrect",
        });
      }
      const access_token = await genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const changepassword = (email, password, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        reject(new Error('User not found'));
        return;
      }
      if(user.resetTokenExpiry < Date.now() || user.resetToken !== token ){
        reject(new Error ('Reset token is invalid or expire'));
        return; 
      }
      const hash = bcrypt.hashSync(password, 10);
      user.password = hash;
      const resetToken = crypto.randomBytes(32).toString('hex');
      user.resetToken = resetToken;
      try {
        await user.save();
        resolve({
          status: "OK",
          message: "SUCCESS",
        });
      } catch (e) {
        reject(new Error('FAILED TO SAVE USER'));
      }
    } catch (error) {
      reject(error);
    }
  });
}

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }

      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updatetreatmentCourseUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrder = await Order.findOne({
        _id: id,
      });
      if (checkOrder === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const a = checkOrder.doctor;
      const checkDoctor = await User.findOne({
        name: a,
      });
      const b = checkDoctor._id;

      const newid = checkOrder.user;
      for (const orderItem of checkOrder.orderItems) {
        orderItem.totalprice = checkOrder.totalPrice;
        orderItem.doctor = a;
        const updatedUser = await User.findByIdAndUpdate(
          newid,
          {
            $push: { treatmentcourse: orderItem },
          },
          { new: true }
        );
        const data = {
          patientName: updatedUser.name,
          nameOrder: orderItem.name,
          OrderId: id,
        };
        const updatedDoctor = await User.findByIdAndUpdate(
          b,
          {
            $push: { doctorcourse: data },
          },
          { new: true }
        );
      }
      resolve({
        status: "OK",
        message: "SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateProgress = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      const checkOrder = await Order.findOne({
        _id: id,
      });
      const checkUser = await User.findOne({
        _id: checkOrder.user,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const updatedusercourse = checkUser.treatmentcourse.find(
        (course) => course.totalprice === checkOrder.totalPrice
      );
      const updateUser = await User.findOneAndUpdate(
        { _id: checkUser._id, "treatmentcourse._id": updatedusercourse._id },
        { $set: { "treatmentcourse.$.progress": data.progress } },
        { new: true }
      );

      const checkDoctor = await User.findOne({
        name: checkOrder.doctor,
      });

      const updateDoctor = await User.findOneAndUpdate(
        {
          name: checkOrder.doctor,
          "doctorcourse.OrderId": id,
        },
        { $set: { "doctorcourse.$.progress": data.progress } },
        { new: true }
      );
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updateDoctor,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateComment = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const updatedProduct = await Product.findByIdAndUpdate(
        checkProduct._id,
        {
          $push: { Comment: data },
        },
        { new: true }
      );

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updatetreatmentHistory = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrder = await Order.findOne({
        _id: id,
      });
      const checkUser = await User.findOne({
        _id: checkOrder.user,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const updatedUser = await User.findByIdAndUpdate(
        checkUser._id,
        {
          $push: { treatmenthistory: data },
        },
        { new: true }
      );
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateMedicine = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrder = await Order.findOne({
        _id: id,
      });

      const checkMedicine = await Medicine.findOne({
        name: data.medicinename,
      });
      const checkUser = await User.findOne({
        _id: checkOrder.user,
      });

      const updatedusercourse = checkUser.treatmentcourse.find(
        (course) => course.totalprice === checkOrder.totalPrice
      );

      var newPrice = checkMedicine.price + checkOrder.totalPrice;

      // console.log(updatedusercourse);
      // const updateUser = await checkUser.treatmentcourse.findByIdAndUpdate(
      //   updatedusercourse._id,
      //   {
      //     totalprice: newPrice,
      //   },
      //   {
      //     new: true,
      //   }
      // );

      const updateUser = await User.findOneAndUpdate(
        { _id: checkUser._id, "treatmentcourse._id": updatedusercourse._id },
        { $set: { "treatmentcourse.$.totalprice": newPrice } },
        { new: true }
      );

      //await checkUser.save();
      const updateOrder = await Order.findByIdAndUpdate(
        id,
        {
          totalPrice: newPrice,
        },
        {
          new: true,
        }
      );

      const checkDoctor = await User.findOne({
        name: checkOrder.doctor,
      });

      const updateddoctorcourse = checkDoctor.doctorcourse.find(
        (course) => course.OrderId.toString() === id
      );

      updateddoctorcourse.Medicine.push(data);

      await checkDoctor.save();

      resolve({
        status: "OK",
        message: "SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateEventData = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrder = await Order.findOne({
        _id: id,
      });
      const checkUser = await User.findOne({
        _id: checkOrder.user,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      data.month = data.month - 1;
      const updatedUser = await User.findByIdAndUpdate(
        checkUser._id,
        {
          $push: { eventData: data },
        },
        { new: true }
      );
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const gettreatmentHistory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });
      if (user === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "SUCESS",
        data: user.treatmenthistory,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getdoctorCourse = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });
      if (user === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "SUCESS",
        data: user.doctorcourse,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const gettreatment = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });
      if (user === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "SUCESS",
        data: user.treatmentcourse,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getEventData = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });
      if (user === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "SUCESS",
        data: user.eventData,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }

      await User.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete user success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyUser = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "Delete user success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find().sort({ createdAt: -1, updatedAt: -1 });
      resolve({
        status: "OK",
        message: "Success",
        data: allUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });
      if (user === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "SUCESS",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  updatetreatmentCourseUser,
  updateProgress,
  updateEventData,
  updatetreatmentHistory,
  updateMedicine,
  updateComment,
  gettreatmentHistory,
  getdoctorCourse,
  gettreatment,
  getEventData,
  deleteUser,
  getAllUser,
  getDetailsUser,
  deleteManyUser,
  changepassword,
};
