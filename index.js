// adding all the libraries
const express = require('express');
const app = express();
const port= 2500;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');

// middleware for decoding the recieved data
app.use(express.urlencoded());
// middleware for decoding the cookie
app.use(cookieParser());

// adding the static files for styling and scripting the pages
app.use(express.static('./assets'));

// adding layouts in ejs
app.use(expressLayouts);
// extract style and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router
app.use('/',require('./routes'));

//setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');


//firing up the server
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}]`);
    }

    console.log(`Server is running on port: ${port}`);
});