
const Lines = require('@definejs/lines');

module.exports = {

    pad(content) { 
        let lines = Lines.split(content);
        let first = lines[0];
    
        //首行不要填充。
        lines = lines.slice(1);
        lines = Lines.pad(lines, ' ', 4);

        

        content = Lines.join([first, ...lines,]);

        return content;
    },
};