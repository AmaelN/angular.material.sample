var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

module.exports = function (gulp, plugins, config) {
   
	var concatjs= function(){
	   var sources = browserify({
	        entries:  config.paths.js.entryPath,
	        debug: true
	      })
	      .transform(babelify);

	   return sources.bundle()
	     .on('error', function(err) { console.error(err); this.emit('end'); })     
	     .pipe(source(config.paths.js.entryName))
	     .pipe(plugins.rename('app.js'))
	     .pipe(gulp.dest( config.temp));
	}


	var ngAnnotate =  function(){
	    return gulp
	     .src(config.temp  + 'app.js')
	     .pipe(plugins.ngAnnotate()) 
	     .pipe(gulp.dest( config.temp));
	}

	 return function () {   		
   		concatjs();
   		return ngAnnotate();
    };
};