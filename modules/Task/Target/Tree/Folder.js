
const $String = require('@definejs/string');
const Tabs = require('../../../../lib/Tabs');
const Sample = require('./Folder/Sample');


module.exports = exports = {

    render({ node, each, }) {
        let folders = [];
        let placemarks = [];

        //把目录节点与文件节点分类出来。
        node.nodes.forEach((node) => {
            let isFolder = node.nodes.length > 0;
            let list = isFolder ? folders : placemarks;

            list.push(node);
        });


        folders = folders.map((node) => {
            //注意这里递归。
            let xml = exports.render({ node, each, });
            return xml;
        }).join('\n');

        placemarks = placemarks.map((node) => {
            return node.xml;
        }).join('\n');


        folders = Tabs.pad(folders);
        placemarks = Tabs.pad(placemarks);


        let sample = Sample.get();
        let name = node.key;
        let dir = node.keys.join('/') + '/';

        //先执行回调函数。
        let data = each(node, {
            sample,
            name,
            dir,
            folders,
            placemarks,
        });

        
        if (typeof data == 'string') {
            return data;
        }

        //返回的是一个要填充的数据对象。
        let xml = $String.format(sample, { 
            name,
            folders,
            placemarks,
            ...data,
        });

        return xml;

    },




};