const nodemailer = require("nodemailer");
const { config } = require("dotenv");


config(); //invoking the dotenv config here
const username = process.env.EMAIL_USERNAME;
const password = process.env.EMAIL_PASSWORD;
exports.randString = () => {
  const len = 8;
  let randStr = "";
  for (let i = 0; i < len; i++) {
    // Random number between 1 and 10
    const ch = Math.floor(Math.random() * 10 + 1);
    randStr += ch;
  }
  return randStr;
};


exports.sendEmail = (email, uniqueString) => {
  let Transport = nodemailer.createTransport({
    // service:"Gmail",
    // auth:{
    //     user: username,
    //     pass: password
    // }
    host: "smtp.titan.email",
    port: 465,
    secure: true,
    auth: {
      user: username,
      pass: password,
    },
  });
//   var mailOptions;
//   let sender = "LearnerYou_Email_Verification";
  let mailOptions = {
    from: '"The Beast" <hello@thebeast.com>',
    to: email,
    subject: "Verify your email address",
    html: `Press <a href=http://localhost:4200/verify/${uniqueString}> here </a> to verify your email. Thanks`,
  };


  Transport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      return;
    } else {
      console.log("Message sent");
    }
  });
// let info = Transport.sendMail({
//     from: '"User" <recruiting@learneryou.com>',
//     to: "ly1339@nyu.edu",
//     subject: "Hello",
//     text: "Hello world?",
//     html: "<b>Hello world?</b>",
//   });


//   console.log("Message sent: %s", info.messageId);
};



