
var gulp = require('gulp');
var args = require('yargs');
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy:true});



gulp.task('help',$.taskListing);
gulp.task('default',['help']);

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

gulp.task('inject',['wiredep','templatecache'],function(){
    "use strict";
    log("Wire up the app css into the html");

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css), {relative: true}))
        .pipe(gulp.dest(config.app));
});


gulp.task('clean-code',function(done){
  "use strict";
    
   log("Clean code");
   var files = [].concat(
        config.temp + '**/*.js',
        config.build + '**/*.html',
        config.build + 'js/*.js',
        config.build + 'css/*.css'
   );
   clean(files, done);
});

gulp.task('images', function(){
    "use strict";
    log("Copying and compressing the images");

    return gulp
        .src(config.svg)
       // .pipe($.imagemin({optimizationLevel:4}))
        .pipe(gulp.dest(config.build + 'assets/svg'));

});

gulp.task('templatecache',function(){
    "use strict";

    log("Creating Angular $templateCache");
    
    return gulp
        .src(config.htmltemplate)
        .pipe($.minifyHtml({empty:true}))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options)
        )
        .pipe(gulp.dest(config.temp));
});

gulp.task('optimize',['inject','images'],function(){
    "use strict";
    log("Optimizing the js, css, html");

    var assets = $.useref({ searchPath: "./app/"});
    var templateCache =config.temp +config.templateCache.file;

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe($.inject(gulp.src(templateCache,{read:false}),{relative:true,
            starttag: '<!-- inject:templates:js -->'
        }))
        .pipe(assets)
        .pipe($.if('*.css', $.csso()))
        .pipe($.if('*.css', $.rev()))
        .pipe($.if('**/lib.js', $.uglify()))
        .pipe($.if('**/lib.js', $.rev()))
        .pipe($.if('**/app.js', $.ngAnnotate()))
        .pipe($.if('**/app.js',$.uglify()))
        .pipe($.if('**/app.js', $.rev()))        
        .pipe($.revReplace())
        .pipe(gulp.dest(config.build))
        .pipe($.rev.manifest())
        .pipe(gulp.dest(config.build));
});




///////////////////////////


function startBrowserSync(){

    if (browserSync.active){
        return;
    }

    log('Starting browser-sync on port' + port );

    var options={
        proxy: 'localhost:' + port,
        port:3000,
        files:[config.app + '**/*'],
        ghostMode: {
            clicks:true,
            location:false,
            forms:true,
            scroll:true
        },
        injectChanges:true,
        reloadDelay: 1000,
        logFileChanges:true,
        logLevel:'debug',
        logPrefix: 'gulp-patterns',
        notify:true
    };

    browserSync(options);
}

function clean(path){
    "use strict";
    log ("Cleaning" + $.util.colors.blue(path));
    del(path);
}

function log(msg){
    "use strict";
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