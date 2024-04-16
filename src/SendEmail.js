// sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = (recipientEmail, subject, text) => {
    // Khởi tạo transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'hospital07.19@gmail.com',
        pass: 'yjrr zuct ufoo aupw',
      },
    });
  

 // Định nghĩa nội dung email
 const mailOptions = {
    from: 'hospital07.19@gmail.com',
    to: recipientEmail,
    subject: subject,
    text: text,
  };

  // Gửi email
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.error('Error while sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendEmail;
