
const $String = require('@definejs/string');
const Sample = require('./StyleMap/Sample');


module.exports = {
    render({ id, iconType, iconScale, labelColor, labelScale, }) { 
        let sample = Sample.get();

        let iconScale2 = iconScale + 0.2;
        let labelScale2 = labelScale + 0.2;

        let xml = $String.format(sample, {
            id, iconType, iconScale, labelScale, labelColor,
            iconScale2, labelScale2,
        });

      

        return xml;
    },
};


