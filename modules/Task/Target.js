
const $String = require('@definejs/string');

const Sample = require('./Target/Sample');
const Tree = require('./Target/Tree');

module.exports = {

    render({ dir, file$info, each, }) { 
        let { styles, roots, } = Tree.render({ dir, file$info, each, });

        
        let sample = Sample.get();
        let name = dir.split('/').slice(-2, -1)[0];

        let xml = $String.format(sample, {
            name,
            styles,
            roots,
        });

        return xml;


    },
};