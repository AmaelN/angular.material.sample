var  browserSync = require("browser-sync");
var log = require('./log.js');

module.exports = function (config, done){
    
    if (browserSync.active){
        return;
    }

    log('Starting browser-sync on port ' + config.port );

    var options={
        port:config.port,
        files:[config.app + '**/*'],
        ghostMode: {
            clicks:true,
            location:false,
            forms:true,
            scroll:true
        },
        injectChanges:true,
        reloadDelay: 1000,
        logFileChanges:true,
        logLevel:'debug',
        logPrefix: 'gulp-patterns',
        notify:true,
        server: {
            baseDir: [config.paths.dist],
            middleware: function (req, res, next) {
                res.setHeader("Access-Control-Allow-Origin", "*");
                next();
            }
        }
    };

    browserSync(options,done);
}
