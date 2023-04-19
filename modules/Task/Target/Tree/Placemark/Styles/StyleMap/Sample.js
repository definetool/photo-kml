
const File = require('@definejs/file');

let sample = '';

module.exports = {


    get() { 
        if (!sample) {
            sample = File.read(`${__dirname}/sample.xml`);
        }

        return sample;
    },
};