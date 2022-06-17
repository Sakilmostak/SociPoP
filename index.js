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
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Chat server is listening on port: 5000');



// sass middleware for css
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

// middleware for decoding the recieved data
app.use(express.urlencoded());
// middleware for decoding the cookie
app.use(cookieParser());

// adding the static files for styling and scripting the pages
app.use(express.static('./assets'));

//makes the file upload path available to the browser
app.use('/upload',express.static(__dirname+'/upload'));


// adding layouts in ejs
app.use(expressLayouts);
// extract style and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//middleware for initiating session(stored in cookies) when authenticated
//Mongostore is used to store the session in the db
app.use(session(
    {
        name: 'SociPoP',
        // TODO change the secret before deployment in production mode
        secret: 'something something',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: (1000*60*100) //session duration in milliseconds
        },
        store: MongoStore.create({
            mongoUrl: 'mongodb://localhost/socipop_development'
        })
    }
));

//middleware for authenticating user using passport js
app.use(passport.initialize());
app.use(passport.session());

//middleware to check each response whether in session
app.use(passport.setAuthenticatedUser);

//custom middleware to attach flash messages
app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/',require('./routes'));

//firing up the server
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}]`);
    }

    console.log(`Server is running on port: ${port}`);
});