var log = require('./lib/log.js');

module.exports = function (gulp, plugins, config) {
    return function () {

		log("Optimizing (prod) the js, css, html");

	    var assets = plugins.useref({ searchPath: "./"});
	    //var templateCache =config.temp +config.templateCache.file;

	    return gulp
	        .src(config.index)
	        .pipe(plugins.plumber())
	        // .pipe($.inject(gulp.src(templateCache,{read:false}),{relative:true,
	        //  starttag: '<!-- inject:templates:js -->'
	        // }))
	        .pipe(assets)
	        .pipe(plugins.if('*.css', plugins.csso()))
	        .pipe(plugins.if('*.css', plugins.rev()))
	        .pipe(plugins.if('**/lib.js', plugins.uglify()))
	        .pipe(plugins.if('**/lib.js', plugins.rev()))
	        .pipe(plugins.if('**/app.js', plugins.ngAnnotate()))
	        .pipe(plugins.if('**/app.js',plugins.uglify()))
	        .pipe(plugins.if('**/app.js', plugins.rev()))
	        .pipe(plugins.revReplace())
	        .pipe(gulp.dest(config.build))
	        .pipe(plugins.rev.manifest())
	        .pipe(gulp.dest(config.build));   
    };
};