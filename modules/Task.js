
require('colors');

const File = require('@definejs/file');
const $String = require('@definejs/string');
const Emitter = require('@definejs/emitter');

const Meta = require('./Task/Meta');
const Source = require('./Task/Source');
const Target = require('./Task/Target');



let mapper = new Map();

class Task {
    /**
    * 构造器。
    * @param {*} config 配置对象。
    *   config = {
    *   };
    */
    constructor(config) {
        let emitter = new Emitter(this);
        let meta = Meta.create(config, exports.defaults);

        meta.emitter = emitter;

        mapper.set(this, meta);


        this.console = meta.console;
        this.meta = meta;

        File.writeJSON('./output/meta.json', meta);

    }

    on(...args) { 
        let meta = mapper.get(this);
        meta.emitter.on(...args);
    }


    /**
    * 输出文件到临时目录。
    * 已重载 output(sample, data, json);
    * 已重载 output(file, json);
    * @param {*} file 
    * @param {*} json 
    */
    output(file, json) {
        let meta = mapper.get(this);
        let { output, } = meta;

        if (!output.dir) {
            return;
        }

        File.writeJSON(`${output.dir}${file}`, json);
    }

    /**
    * 解析。
    */
    parse(fn) {
        let meta = mapper.get(this);
        let { console, source, } = meta;

        Source.parse(console, source, (data) => {
            //data = { dirs, files, file$info, errors, nones, };
            Object.assign(source, data);
            this.output('source.json', source);
            meta.emitter.fire('parse', [source]);
            fn && fn(source);
        });
    }


    render({ dir, file$info, } = {}) { 
        let meta = mapper.get(this);
        let { source, target, emitter, } = meta;
        let { file, } = target;

        dir = dir || source.dir;
        file$info = file$info || source.file$info;

        let xml = Target.render({
            dir,
            file$info,

            'each': function(node, info) { 
                let isFolder = node.nodes.length > 0;
                let defaults = isFolder ? target.folder : target.placemark;
                let type = isFolder ? 'folder' : 'placemark';
                let values = emitter.fire('render', type, [node, info]);
                let data = values.slice(-1)[0];

                //如果返回空串，则可以不生成该内容。
                if (typeof data == 'string') {
                    return data;
                }

                data = Object.assign({}, defaults, data);
                return data;
            },
        });


        if (file) {
            file = $String.format(file, { 
                dirname: dir.split('/').slice(-2, -1)[0],
            });

            File.write(`${source.dir}/${file}`, xml);
            meta.console.log(`写入文件:`.bgYellow, `${source.dir}${file}`.yellow.underline);
        }

        return xml;

    }


}

module.exports = exports = Task;
exports.defaults = require('./Task.defaults');