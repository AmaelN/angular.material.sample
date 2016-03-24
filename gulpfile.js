
var gulp = require('gulp');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy:true});


gulp.task('wiredep',function(){
    log("Calling wiredep");
    var wiredep = require('wiredep').stream;

    var options = config.getWiredepDefaultOptions(); 

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js), {relative: true}))
        .pipe(gulp.dest(config.app));
});

gulp.task('inject',['wiredep'],function(){
    log("Injecting manual css");

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css), {relative: true}))
        .pipe(gulp.dest(config.app));
});


///////////////////////////
function log(msg){
    
   if (typeof(msg) === 'object'){
       for (var item in msg)
       {
           if (msg.hasOwnProperty(item)){
               $.util.log($.util.colors.blue(msg[item]));
           }
       }
   } else {
       $.util.log($.util.colors.blue(msg));
   }
}