var log = require('./lib/log.js');

module.exports = function (gulp, plugins,config) {
    return function () {

		log("Wire up the app css into the html");

	    return gulp
	        .src(config.index)
	        .pipe(plugins.inject(gulp.src(config.buildCss), {relative: true}))
	        .pipe(gulp.dest(config.root,{overwrite: true}));      
    };
};