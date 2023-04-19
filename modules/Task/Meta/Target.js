
const Path = require('@definejs/path');

module.exports = {

    normalize(config, defaults) { 
   
        config = Object.assign({}, defaults, config);

        return config;



    },
};