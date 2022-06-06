const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/socipop_development');

const db= mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongDB"));

db.once('open', function(){
    console.log('Connected to Database :: MongDB');
});

module.exports= db;