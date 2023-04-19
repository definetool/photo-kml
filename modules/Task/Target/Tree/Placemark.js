
const $String = require('@definejs/string');
const Styles = require('./Placemark/Styles');
const Sample = require('./Placemark/Sample');


module.exports = {

    render({ node, dir, file$info, each, }) { 
        let file = node.keys.join('/');
        let name = node.keys.slice(-1)[0];
        let info = file$info[file];
        let src = `${dir}${file}`;
        let sample = Sample.get();

        let data = each(node, {
            sample,
            file,
            name,
            info,
            src,
        });

        if (typeof data == 'string') {
            return { 'xml': data, };
        }




        //返回的是一个要填充的数据对象。
        let style = Styles.render(data);
        let styleId = style.id;
        let { longitudeNumber, latitudeNumber, } = info;


        let xml = $String.format(sample, {
            name,
            src,
            styleId,
            longitudeNumber,
            latitudeNumber,
            // height,
            // maxWidth,

            ...data,
        });

        return { xml, style, };
    },
};