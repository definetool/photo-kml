
const Tasker = require('@definejs/tasker');
const ProgressBar = require('../../../lib/ProgressBar');
const Exif = require('./Images/Exif');
const GPS = require('./Images/GPS');
const Datetime = require('./Images/Datetime');


module.exports = {

    extractExif(console, { dir, files, }, fn) {
        let tasker = new Tasker(files);
        let bar = new ProgressBar(files.length, console);
        let maxIndex = files.length - 1;

        let file$info = {};
        let errors = [];    //解析出现错误的文件。
        let nones = [];     //无 gps 信息的文件。

        tasker.on('each', function (file, index, done) {
            let fullfile = `${dir}${file}`;
            let link = index == maxIndex ? `└──` : `├──`;

            Exif.extract(fullfile, function (info) {
                if (!info || !info.gps) {
                    if (!info) {
                        errors.push(file);
                    }
                    else {
                        nones.push(file);
                    }

                    bar.render({
                        text: `提取 GPS: `,
                        msg: `${link}${file.red}: null`,
                    });
                    done();
                    return;
                }

                let gps = GPS.parse(info.gps);

                if (!gps) {
                    nones.push(file);

                    bar.render({
                        text: `提取 GPS: `,
                        msg: `${link}${file.red}: null`,
                    });
                    done();
                    return;
                }

                let { date, time, } = Datetime.parse(info.exif);
                let { longitude, latitude, longitudeNumber, latitudeNumber, } = gps;

                bar.render({
                    text: `提取 GPS: `,
                    msg: `${link}${file.cyan}: [${date} ${time}] (${latitude.green}, ${longitude.green})`,
                });

                file$info[file] = {
                    date, time,
                    longitude, latitude,
                    longitudeNumber, latitudeNumber,
                };

                done();
            });
        });

        tasker.on('all', function () {
            fn && fn({ file$info, errors, nones, });
        });

        tasker.serial();
    },
};
