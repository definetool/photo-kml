

const StyleMap = require('./Styles/StyleMap');

let id$xml = {};


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
        let name = iconType.split('/').join('_');
        let id = `style-${name}-${iconScale}-${labelColor}-${labelScale}`;
        let xml = id$xml[id];

        if (!xml) {
            xml = id$xml[id] = StyleMap.render({
                id,
                iconType,
                iconScale,
                labelColor,
                labelScale,
            });
        }

        return { id, xml, };
    },
};
