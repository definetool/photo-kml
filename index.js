



const Task = require('./modules/Task');


module.exports = {
    Task,

    parse(config, fn) { 
        if (typeof config == 'string') {
            config = { 'source': config, };
        }

        let task = new Task(config);
        task.parse(fn);
    },

    render(config, fn) { 
        if (typeof config == 'string') {
            config = { 'source': config, };
        }

        let task = new Task(config);

        task.parse(function () { 
            let xml = task.render();
            fn && fn(xml);
        });

    },

};