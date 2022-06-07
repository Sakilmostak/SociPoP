const mongoose = require('mongoose');

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
        }
    },
    {
        // add timestamps for each update in data
        timestamps: true
    }
);

// creating collections called User using the given schema
const User= mongoose.model('User', userSchema);

// making it public
module.exports= User;