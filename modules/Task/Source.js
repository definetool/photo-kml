

const FileSystem = require('./Source/FileSystem');
const Images = require('./Source/Images');

module.exports = {

    parse(console, { dir, patterns, }, fn) { 
        let { dirs, files, } = FileSystem.scan(console, { dir, patterns, });

        Images.extractExif(console, { dir, files, }, function ({ file$info, errors, nones, }) { 
            console.log(`成功=${Object.keys(file$info).length} | 错误=${errors.length} | 无GPS=${nones.length}`.magenta);
            
            fn && fn({ dirs, files, file$info, errors, nones, });
        });
      
    },
};