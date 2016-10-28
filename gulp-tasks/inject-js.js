var log = require('./lib/log.js');
var wiredep = require("wiredep").stream;

module.exports = function (gulp, plugins,config) {
    return function () {

		log("Calling wiredep");

    	var options = config.getWiredepDefaultOptions();

	    return gulp
	        .src(config.index)
	        .pipe(wiredep(options))
	        .pipe(plugins.inject(gulp.src(config.js), {relative: true}))
	        .pipe(gulp.dest(config.root,{overwrite: true}));       
    };
};