
const Path = require('@definejs/path');

module.exports = {

    normalize(config, defaults) { 
        if (typeof config == 'string') {
            config = { 'dir': config, };
        }

   
        config = Object.assign({}, defaults, config);

        if (!config.dir) {
            return null;
        }

        config.dir = Path.resolve(config.dir);
        config.dir = Path.normalizeDir(config.dir);
     

        return config;



    },
};