const nodeMailer = require('../config/nodemailer');

//this is another way of exporting a method;
exports.newComment = (comment)=> {
    console.log('Inside newComment mailer');

    nodeMailer.transporter.sendMail({
        from: 'skmahim71@gmail.com',
        to: comment.user.email,
        subject: "New comment published!",
        html: '<h1>Hurray, you have published a new comment!</h1>'
    },(err, info)=>{
        if(err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Mail sent',info);
        return;
    });
}