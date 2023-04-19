
module.exports = {

    //`2023:01:30 12:54:36`  ---> `2023-01-30 12:54:36`。
    //`2023:01:306`  ---> `2023-01-30`。
    parse(exif) { 
        let dt = exif.DateTimeOriginal;

        if (!dt || typeof dt != 'string') {
            return dt;
        }

        let a = dt.split(' ');
        let date = a[0];
        let time = a[1];

        date = date.split(':').join('-');

        return { date, time, };


    },
};