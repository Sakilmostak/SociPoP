const nodeMailer = require('../config/nodemailer');

//this is another way of exporting a method;
exports.newComment = (comment)=> {
    //rendering the mail to send
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    //configurint the template for sending email
    nodeMailer.transporter.sendMail({
        from: 'skmahim71@gmail.com',
        to: comment.user.email,
        subject: "New comment published!",
        html: htmlString
    },(err, info)=>{
        if(err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Mail sent',info);
        return;
    });
}