var config = require('./gulp.config')();
var log = require('./gulp-tasks/lib/log.js');
var clean = require('./gulp-tasks/lib/clean.js');

var gulp = require('gulp'),
    args = require('yargs'),    
    $ = require('gulp-load-plugins')({lazy:true}),   
    runseq = require("run-sequence");
    
gulp.task('help',$.taskListing);

function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, $, config);
}

// ** Defaut Task ** //

gulp.task('default', ['serve']);

// ** Watching ** //

gulp.task("watch", ["serve"], getTask("watch"));

// ** Compilation ** //
gulp.task("compile:sass", getTask('compile-sass'));

gulp.task("compile:ts", getTask('compile-ts'));

gulp.task('compile:es6',["compile:ts"], getTask('es6-convert'));


gulp.task("build:prod", function (done) {
    runseq(["html", "copy","compile:es6"],        
        "inject:css",        
        "optimize:prod",done);
});

gulp.task("build", function (done) {
    runseq(["html", "copy","compile:es6"],
        "inject:css",        
        "optimize",done);
});

//  *************   INJECT CSS / JS in the index.html ****************** //
gulp.task('inject:js',['compile:ts'], getTask("inject-js"));

gulp.task('inject:css',['inject:js','compile:sass'], getTask("inject-css"));

// *****   COPY    ******************** //
gulp.task("copy",["copy:fonts", "copy:imgs","lang:json"]);


gulp.task("html", function () {
    "use strict";
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.build));
});

gulp.task("copy:fonts", function () {
    "use strict";
    gulp.src(config.paths.fonts.src)
        .pipe(gulp.dest(config.paths.fonts.dest));
});

gulp.task("lang:json", function () {
    "use strict";
    gulp.src(config.paths.langJson.src)
        .pipe(gulp.dest(config.paths.langJson.dest));
});

gulp.task("copy:imgs", function () {
    "use strict";
    gulp.src(config.paths.imgs.src)
        .pipe(gulp.dest(config.paths.imgs.dest));
});


// ****  Clean   **** //

gulp.task('clean',  function(done){
    "use strict";

    log("Clean code");
    var files = [].concat(
        config.temp
        //,config.build
    );
    clean(files, done);
});


// ************* minify and uglify ************** //

gulp.task('optimize:prod', getTask("optimize-prod"));


gulp.task('optimize',  getTask("optimize"));


// ** serve ** //

gulp.task("serve",["build"], getTask("serve"));

