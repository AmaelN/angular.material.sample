
var handleErrors = require('./lib/handleErrors.js');

module.exports = function (gulp, plugins,config) {
    return function () {
		return gulp.src(config.paths.sass.src)
	        .pipe(plugins.sourcemaps.init())
	        .pipe(plugins.sass(config.paths.sass.options))
	        .on('error', handleErrors)
	        .pipe(plugins.autoprefixer(config.paths.sass.autoprefixerOptions))
	        .pipe(plugins.sourcemaps.write("."))
	        .pipe(gulp.dest(config.paths.sass.dest));
    };
};