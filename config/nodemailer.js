const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

//configuring the email service 
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'skmahim71',
        pass: 'mczosehsunrpmpmw'
    }
});

//rendering the meesage and sending it to the user
let renderTemplate = (data, relativePath)=> {
    let mailHTML;
    //rendering the ejs file with given directory
    ejs.renderFile(
        //the absolute path for the file
        path.join(__dirname,'../mailers', relativePath),
        data,
        function(err, template){
            if(err){
                console.log('error in rendering template',err);
                return;
            }

            mailHTML=template;
        }
    )

    return mailHTML;
}

//making the methods public
module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}