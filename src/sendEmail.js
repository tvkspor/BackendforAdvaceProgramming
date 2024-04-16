// sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = (recipientEmail, subject, text) => {
    // Khởi tạo transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'tuyen060204@gmail.com',
        pass: 'dxxk yvgk rvwd irwb',
      },
    });
  

 // Định nghĩa nội dung email
 const mailOptions = {
    from: 'tuyen060204@gmail.com',
    to: recipientEmail,
    subject: subject,
    text: text,
    html: `<p>${text}</p>`, // HTML content sẽ giống với text content
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