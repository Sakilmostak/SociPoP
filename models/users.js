const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/upload/users/avatars')

// defining structure of the schema
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        }
    },
    {
        // add timestamps for each update in data
        timestamps: true
    }
);

//storing the file send from the page
let storage = multer.diskStorage({
    //setting the directory to save file
    destination: function(req,file,cb){
        //callback function to the destination
        cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    //setting the filename for the file to be saved
    filename: function(req,file,cb){
        //callback functionn to the file
        cb(null, file.fieldname+'-'+Date.now());
    }
});

// static methods
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

// creating collections called User using the given schema
const User= mongoose.model('User', userSchema);

// making it public
module.exports= User;