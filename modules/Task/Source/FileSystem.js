const colors = require('colors');
const Patterns = require('@definejs/patterns');
const Directory = require('@definejs/directory');

const Timer = require('../../../lib/Timer');


module.exports = exports = {

    scan(console, { dir, patterns, }) {
        let timer = console ? new Timer(console) : null;
        let dirs = [];      //所有的子目录。
        let files = [];     //所有的文件。
        let beginIndex = dir.length;


        if (timer) {
            timer.start(`${'开始扫描目录'.bold} ${dir.blue} >>`.bold);
        }


        Directory.each(dir, function (folder, myFiles) {
            let name = folder.slice(beginIndex);

            if (console) {
                let link = folder == dir ? `└──` : `├──`;
                let count = myFiles.length.toString();
                let sname = name || '/';
                console.log(`${link}找到 ${count.cyan} 个文件: ${sname.gray}`);
            }

            
            myFiles = Patterns.match(patterns, myFiles);

            myFiles = myFiles.map((file) => {
                file = file.slice(beginIndex);
                files.push(file);
                return file;
            });

            if (myFiles.length > 0) {
                //当前目录不要加进去，只加子目录。
                if (folder != dir) {
                    dirs.push(name); //取相对名称。
                }
            }
        });


        dirs = dirs.sort();
        files = files.sort();

        if (timer) {
            timer.stop(`<< 共找到 ${colors.cyan(dirs.length)} 个子目录、${colors.cyan(files.length)} 个文件，耗时{text}。`.bold);
        }

        return { dirs, files, };
    },





};