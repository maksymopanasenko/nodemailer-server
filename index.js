require('dotenv').config();

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD
    }
});

var mailOptions = {
    from:process.env.EMAIL,
    to: 'm.opanasenko1997@gmail.com',
    subject: 'New request from Node.js',
    text: 'Sending a message'
};
        
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});