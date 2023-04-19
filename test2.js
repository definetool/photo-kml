
const Task = require('./modules/Task');

let dates = new Set();

let task = new Task({
    output: './output/',
    source: '/Volumes/3/照片与视频/THE/证件资料/交通工具/小汽车/加油记录',
});


task.on('render', {
    'placemark': function (node, data) {
        let { sample, file, name, info, src, } = data;
        let { date, time, longitude, latitude, longitudeNumber, latitudeNumber, } = info;

        if (dates.has(date)) {
            return '';
        }

        dates.add(date);
        name = date.split('-').join('').slice(2);

        return {
            name,
        };
    },

});




task.parse(function () {
    task.render();
});



