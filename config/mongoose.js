const mongoose = require('mongoose');

//setting up the database
mongoose.connect('mongodb://localhost/socipop_development');

const db= mongoose.connection;

// if error occurs
db.on('error', console.error.bind(console, "Error connecting to MongDB"));

// if db works fine
db.once('open', function(){
    console.log('Connected to Database :: MongDB');
});

// making it public
module.exports= db;