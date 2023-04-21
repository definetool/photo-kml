# @definetool/photo-kml

批量抽取照片中的 GPS 信息并生成可以导入到 Google 地球中的 KML 文件。

### 示例

#### 使用默认设置
``` js
const { render, } = require('@definetool/photo-kml');

render('/Users/micty/Pictures/2022云南四川自驾游');

```

#### 自定义方式
``` js
const { Task, } = require('@definetool/photo-kml');


let icons = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'.split(''), '10'];


let task = new Task({
    output: './output/',
    source: {
        dir: '/Users/micty/Pictures/2022云南四川自驾游0',
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
            name = name.slice('IMG_'.length);
            no = Number(name);
        }



        return {
            name,
            height: no > 0 ? no + 1000 : 9000,
            iconType: no > 0 ? `paddle/${icons[no % icons.length]}` : `pushpin/wht-pushpin`,
            iconScale: 1,
            labelScale: 0.5,
        };
    },

});

```







