var log = require('./lib/log.js');

module.exports = function (gulp, plugins, config) {
    return function () {

		log("Simple Optimization");

	    var assets = plugins.useref({ searchPath: "./"});

	    return gulp
	        .src(config.index)
	        .pipe(plugins.plumber())
	        .pipe(assets)
	        .pipe(plugins.if('**/app.js', plugins.ngAnnotate()))
	        .pipe(plugins.revReplace())
	        .pipe(gulp.dest(config.build))
	        .pipe(plugins.rev.manifest())
	        .pipe(gulp.dest(config.build));     
    };
};