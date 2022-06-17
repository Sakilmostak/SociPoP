const mongoose = require('mongoose');
const env = require('./environment');

//setting up the database
mongoose.connect(`mongodb://localhost/${env.db}`,{
    serverSelectionTimeoutMS: 100000
});

const db= mongoose.connection;

// if error occurs
db.on('error', console.error.bind(console, "Error connecting to MongDB"));

// if db works fine
db.once('open', function(){
    console.log('Connected to Database :: MongDB');
});

// making it public
module.exports= db;