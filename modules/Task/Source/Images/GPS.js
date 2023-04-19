
//把度分秒的格式转成小数。
function convert(s) {
    let degree = 0;
    let minute = 0;
    let second = 0;
  
    if (s.includes(`°`)) {
        //【114°3'31.49"】
        degree = s.split(`°`)[0];
        minute = s.split(`'`)[0].split(`°`)[1];
        second = s.split(`"`)[0].split(`'`)[1];
    }
    else {
        //【114 10.95】
        let a = s.split(' ');
        degree = a[0];
        minute = a[1];
    }


    degree = Number(degree);
    minute = Number(minute);
    second = Number(second);

    let n = degree + minute / 60 + second / 3600;

    return n;
}


module.exports = {

    parse(gps) { 
        let latitude = gps.GPSLatitude;
        let longitude = gps.GPSLongitude;

        if (!latitude || !longitude) {
            return;
        }


        if (latitude[2] == 0 && longitude[2] == 0) {
            //【iPhone 4S】
            //latitude = [ 22, 52.13, 0 ]
            //longitude = [ 114, 10.95, 0 ]
            //`22 52.13, 114 10.95`
            latitude = `${latitude[0]} ${latitude[1]}`;
            longitude = `${longitude[0]} ${longitude[1]}`;
        }
        else {
            //【iPhone 8P】
            //latitude = [ 22, 51, 26 ]
            //longitude = [ 114, 3, 31.49 ]
            latitude = `${latitude[0]}°${latitude[1]}'${latitude[2]}"`;
            longitude = `${longitude[0]}°${longitude[1]}'${longitude[2]}"`;
        }

        let longitudeNumber = convert(longitude);
        let latitudeNumber = convert(latitude);

        return { longitude, latitude, longitudeNumber, latitudeNumber, };


    },


};