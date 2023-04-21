
const Task = require('./modules/Task');

let icons = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'.split(''), '10'];


let task = new Task({
    output: './output/',
    source: {
        // dir: '/Users/micty/Pictures/2022云南四川自驾游',
        dir: '/Volumes/3/照片与视频/iPhone/2014/2014骑行',
        patterns: [
            '**/*.jpg',
            '**/*.JPG',
            '**/*.jpeg',
            '**/*.JPEG',
        ],
    },

    target: {
        //相对于 source 目录
        file: '{dirname}--自定义.kml',

        folder: {
            open: false,
        },

        placemark: {
            height: 9000,
            maxWidth: 700,
            iconType: 'paddle/A',
            iconScale: 0.5,
            labelScale: 0.5,
        },
    },
});


task.on('render', {
    'folder': function (node, data) {
        let { sample, name, dir, folders, placemarks, } = data;
        

        if (name == 'A') {
            return ''; //不生成该目录。
        }

        return {
            'name': name + '--11',
        };
    },


    'placemark': function (node, data) {
        let { sample, file, name, info, src, } = data;
        let { date, time, longitude, latitude, longitudeNumber, latitudeNumber, } = info;
        
        let no = 0;

        name = name.split('.').slice(0, -1).join('.'); //去掉后缀。

        //去掉开头的 'IMG_' 前缀。
        if (name.startsWith('IMG_')) {
            no = name.slice('IMG_'.length);
            no = Number(no);
        }



        return {
            name,
            height: no > 0 ? no + 1000 : 9000,
            iconType: no > 0 ? `paddle/${icons[no % icons.length]}` : `pushpin/wht-pushpin`,
            iconScale: 1,
            labelScale: 0.5,
            labelColor: '00ffffff',
        };
    },

});




task.parse(function () {
    task.render();
});



