const path = require('path');

class Config {
    createPath(file){
        return path.join(__dirname,'..', '..','views',`${file}.ejs`);
    }
}

module.exports.Config = Config;