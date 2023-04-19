const { ExifImage, } = require('exif');


module.exports = {
    
    extract(file, fn) {
        new ExifImage({ 'image': file, }, function (error, raw) {
            if (error) {
                // console.log('Error:'.red, error.message.yellow);
                // console.log('File:'.red, file.green);
                return fn();
            }


            //为了节省内存，这里只返回需要用到的几个字段。
            let { exif, gps, } = raw;

            fn({ exif, gps, });
        });
    },
};
