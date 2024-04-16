const User = require("../models/UserModel");
const Doctor = require("../models/DoctorModel");
const Order = require("../models/OrderProduct");
const Booking = require("../models/BookingModel");
const SendEmail = require("../SendEmail");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");
const port = process.env.PORT || 3001;

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email, password, confirmPassword } = newUser;
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
      const checkDoctor = await Doctor.findOne({
        email: email,
      });
      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        email,
        password: hash,
      });
      if (checkDoctor !== null) {
        createdUser.isDoctor = true;
        try {
          createdUser = await createdUser.save();
        } catch (error) {
          // Xử lý lỗi khi không thể lưu dữ liệu
          console.error('Lỗi khi lưu dữ liệu:', error);
          // Trả về một đối tượng lỗi hoặc giá trị phù hợp khác nếu cần
          // Ví dụ: throw error; hoặc return null;
        }
      }
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

const updatetreatmentHistory = (id, data) => {
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
      const updatedUser = await User.findByIdAndUpdate(
        id,
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

const checkEmail = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm người dùng trong cơ sở dữ liệu bằng emai
      const{email} = req.body;
      const user = await User.findOne({
        email: email
      });
      // Kiểm tra xem người dùng có tồn tại không
      if (!user) {
        reject(new Error('User not found'));
        return;
      }
      
      // Tạo reset token duy nhất
      
      const resetToken = crypto.randomBytes(32).toString('hex');
      
      user.resetToken = resetToken;
      
      user.resetTokenExpiry = Date.now() + 900000; // Thời hạn của reset token là 15 phút
      
      await user.save();
      
      // Gửi email chứa đường liên kết reset
      const resetURL = `http://localhost:3000/reset-password?token=${resetToken}=${email}`;

      // Gửi email cho người dùng với URL để đặt lại mật khẩu
      await SendEmail(email, 'Reset Your Password', resetURL);

      resolve('Email sent successfully');
    } catch (error) {
      reject(error);
    }
  });
};


const changepassword = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        reject(new Error('User not found'));
        return;
      }
      const hash = bcrypt.hashSync(password, 10);
      user.password = hash; 
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


module.exports = {
  createUser,
  loginUser,
  updateUser,
  updatetreatmentCourseUser,
  updatetreatmentHistory,
  gettreatmentHistory,
  gettreatment,
  deleteUser,
  getAllUser,
  getDetailsUser,
  deleteManyUser,
  checkEmail,
  changepassword,
};
