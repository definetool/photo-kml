
module.exports = {

    output: {
        dir: ``,
        console: `console.log`,
    },

    source: {
        dir: '',

        patterns: [
            '**/*.jpg',
            '**/*.JPG',
            '**/*.jpeg',
            '**/*.JPEG',
        ],
       
    },

    target: {
        //要输出的文件，相对于 source 目录.
        file: '{dirname}.kml',

        folder: {
            // name: '',   //可以指定为空串
            open: false,    //是否自动打开。
        },

        placemark: {
            height: 0,              //图标相对于地面的高度。
            maxWidth: 500,          //图片的最大宽度。
            iconType: 'paddle/A',   //图标的类型。
            iconScale: 0.5,         //图标的缩放倍数。
            labelColor: 'ffffffff', //标签的颜色，格式为 ABGR。
            labelScale: 0.5,        //标签的缩放倍数。
        },

    },

    
};