

const Console = require('./Meta/Console');
const Output = require('./Meta/Output');
const Source = require('./Meta/Source');
const Target = require('./Meta/Target');

module.exports = {
    create(config, defaults) { 
        let { output, source, target, } = config;


        output = Output.normalize(output, defaults.output);
        source = Source.normalize(source, defaults.source);
        target = Target.normalize(target, defaults.target);

        let console = Console.create(output);

        let meta = {
            output,
            source,
            target,
            console,
            
            emitter: null,
        };

        return meta;
    },
};