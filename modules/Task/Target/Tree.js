
const File = require('@definejs/file');
const Tree = require('@definejs/tree');
const Tabs = require('../../../lib/Tabs');
const Folder = require('./Tree/Folder');
const Placemark = require('./Tree/Placemark');

module.exports = {

    render({ dir, file$info, each, }) {
        let files = Object.keys(file$info);
        let tree = new Tree(files, '/');
        let roots = [];
        let id$style = {};

        tree.each((node) => {
            //一级节点。
            if (node.keys.length == 1) {
                roots.push(node);
            }

            //文件节点，先直接填充。
            if (node.nodes.length == 0) {
                let { xml, style, } = Placemark.render({ node, dir, file$info, each, });

                node.xml = xml;

                //可能为空。
                if (style) {
                    id$style[style.id] = style.xml;
                }
            }

        });

        let styles = Object.values(id$style);

        roots = roots.map((node) => {
            //文件节点。
            if (node.nodes.length == 0) {
                return node.xml;
            }

            let xml = Folder.render({ node, each, });
            return xml;
        }).join('\n');


        styles = Tabs.pad(styles);
        roots = Tabs.pad(roots);

        return { styles, roots, };
    },
};
