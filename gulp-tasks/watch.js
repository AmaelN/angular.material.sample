var  browserSync = require("browser-sync");

module.exports = function (gulp, plugins,config) {
    
    return function () {
	    gulp.watch(config.paths.tscripts.src, ["build", browserSync.reload]).on("change", reportChange);
	    gulp.watch([config.paths.html, config.index], ["html", browserSync.reload]).on("change", reportChange);
	    gulp.watch(config.paths.mainHtml, ["build", browserSync.reload]).on("change", reportChange);
	    gulp.watch(config.paths.sass.src, ["build", browserSync.reload]).on("change", reportChange);
	 };

	 function reportChange(event) {	    
	    plugins.util.log("File " + event.path + " was " 
	    	+ plugins.util.colors.blue(event.type) + ", running tasks...");
	}
};


