
var startBrowserSync = require('./lib/startbrowserSync.js');

module.exports = function (gulp, plugins,config) {
    return function (done) {
    	return startBrowserSync(config, done);		  
    };
};