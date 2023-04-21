

const $Object = require('@definejs/object');
const StyleMap = require('./Styles/StyleMap');

let id$xml = {};

let key$item = {};


module.exports = exports = {
    defaults: {
        iconType: 'paddle/A',
        iconScale: 0.5,
        labelColor: 'ffffffff', //格式为 ABGR
        labelScale: 0.5,
    },

    render(config) { 
        if (typeof config == 'string') {
            config = { 'iconType': config, };
        }
        
        config = Object.assign({}, exports.defaults, config);

        let { iconType, iconScale, labelColor, labelScale, } = config;
        let key = JSON.stringify({ iconType, iconScale, labelColor, labelScale, });
        let item = key$item[key];


        if (!item) {
            let id = Object.keys(key$item).length;

            let xml = StyleMap.render({
                id,
                iconType,
                iconScale,
                labelColor,
                labelScale,
            });

            item = key$item[key] = { id, xml, };
        }

        return item;
    },
};
