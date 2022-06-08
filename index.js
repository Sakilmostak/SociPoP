// adding all the libraries
const express = require('express');
const app = express();
const port= 2500;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


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

//setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//middleware for initiating session(stored in cookies) when authenticated
app.use(session(
    {
        name: 'SociPoP',
        // TODO change the secret before deployment in production mode
        secret: 'something something',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: (1000*60*100) //session duration in milliseconds
        }
    }
));

//middleware for authenticating user using passport js
app.use(passport.initialize());
app.use(passport.session());

//use express router
app.use('/',require('./routes'));

//firing up the server
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}]`);
    }

    console.log(`Server is running on port: ${port}`);
});