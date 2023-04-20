
const $String = require('@definejs/string');
const Styles = require('./Placemark/Styles');
const Sample = require('./Placemark/Sample');


module.exports = {

    render({ node, dir, file$info, each, }) { 
        let file = node.keys.join('/');
        let dirname = node.keys.slice(-2, -1)[0];
        let name = node.keys.slice(-1)[0];
        let info = file$info[file];
        let src = `${dir}${file}`;
        let title = `${dirname || info.date}@${info.time}`; //鼠标悬停在图片上出现的提示信息。

        let sample = Sample.get();

        let data = each(node, {
            sample,
            file,
            dirname,
            name,
            info,
            src,
            title,
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
            title,
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