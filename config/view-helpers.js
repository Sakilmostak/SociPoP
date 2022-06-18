//setting up asset path in accord to the gulp minified assets to provide them to the views
const env = require('./environment');
const fs = require('fs');
const path = require('path');

module.exports = (app)=>{
    app.locals.assetPath = function(filePath){
        console.log('meow')
        if(env.name == 'development'){
            console.log('bhow');
            return filePath;
        }


        return '/'+JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];
    }
}