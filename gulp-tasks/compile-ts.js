
module.exports = function (gulp, plugins,config) {
    return function () {

		var ts = plugins.typescript;	
		var tsProject = ts.createProject(config.tsconfig);
	 	
	 	var tsResult = gulp
	        .src(config.paths.tscripts.src)
	        .pipe(plugins.sourcemaps.init())
	         .pipe(tsProject());

	    return tsResult.js
	        .pipe(plugins.sourcemaps.write("."))
	        .pipe(gulp.dest(config.temp +"js"));        
    };
};