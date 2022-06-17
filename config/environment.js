const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');

//if the directory doesn't exit then create it
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    size: "10M",
    interval: '1d',
    path: logDirectory
});


const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'something something',
    db: 'socipop_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'skmahim71',
            pass: 'mczosehsunrpmpmw'
        }
    },
    google_client_id: "867921063545-10ll53ms9gatv5jmdjd9rvuvekv02nno.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:2500/users/auth/google/callback",
    jwt_secret: 'hakunamatata',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production = {
    name: 'production',
    asset_path: process.env.SOCIPOP_ASSET_PATH,
    session_cookie_key: process.env.SOCIPOP_SESSION_COOKIE_KEY,
    db: process.env.SOCIPOP_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SOCIPOP_SMTP_USER,
            pass: process.env.SOCIPOP_SMTP_PASS
        }
    },
    google_client_id: process.env.SOCIPOP_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.SOCIPOP_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.SOCIPOP_GOOGLE_CALL_BACK_URL,
    jwt_secret: process.env.SOCIPOP_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

module.exports = eval(process.env.NODE_ENV)==undefined? development: eval(process.env.NODE_ENV);