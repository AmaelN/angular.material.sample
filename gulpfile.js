var gulp = require('gulp'),
args = require('yargs'),
    config = require('./gulp.config')(),
    del = require('del'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    $ = require('gulp-load-plugins')({lazy:true}),
    browserSync = require("browser-sync"),
    runseq = require("run-sequence"),
    wiredep = require("wiredep").stream,
    tsc = require("gulp-typescript"),
    babelify = require('babelify'),
    browserify = require('browserify');


var tsProject = tsc.createProject('./tsconfig.json');

gulp.task('help',$.taskListing);

// ** Running ** //


// ** Watching ** //

gulp.task("watch", ["serve"], function () {
    "use strict";
    gulp.watch(config.paths.tscripts.src, ["build", browserSync.reload]).on("change", reportChange);
    gulp.watch([config.paths.html, config.index], ["html", browserSync.reload]).on("change", reportChange);
    gulp.watch(config.paths.mainHtml, ["build", browserSync.reload]).on("change", reportChange);
    gulp.watch(config.paths.sass.src, ["build", browserSync.reload]).on("change", reportChange);
});

// ** Compilation ** //

gulp.task("es6:concat",function(){
   var sources = browserify({
        entries:  config.temp +  'js/boot.js',
        debug: true
      })
      .transform(babelify);

   return sources.bundle()
     .on('error', function(err) { console.error(err); this.emit('end'); })     
     .pipe(source('boot.js'))
     //.pipe(buffer())
     //.pipe($.sourcemaps.init({ loadMaps: true }))     
     //.pipe($.sourcemaps.write('./'))         
     
     //.pipe($.rename('bootstrap.js'))
     //.pipe(gulp.dest( config.temp + 'amd/'));     
     .pipe($.rename('app.js'))
     .pipe(gulp.dest( config.temp));
});


gulp.task('require:optimize', function(){
    return gulp
     .src(config.temp  + 'app.js')
     .pipe($.ngAnnotate()) 
     .pipe(gulp.dest( config.temp));
})

gulp.task('es6-amd', function(done){
    
 runseq(
    "compile:typescript",
        "es6:concat",
        'require:optimize',
        done);   
       
});

gulp.task('amd',['es6-amd'], function(){
  return $.requirejs({
    name: 'bootstrap',
    baseUrl: config.temp + 'amd/',
    out: 'app.js'
  })   
  .pipe(gulp.dest(config.temp));
});

gulp.task("build:prod", function (done) {
    runseq(["html", "copy"],
        "inject",
        "amd",
        "optimize",done);
});

gulp.task("build", function (done) {
    runseq(["html", "copy"],
        "inject",
        "es6-amd",
        "simpleOptimize",done);
});

gulp.task("copy",["copy:fonts", "copy:imgs","lang:json"]);

gulp.task("compile:typescript",function () {
    "use strict";
    var tsResult = gulp
        .src(config.paths.tscripts.src)
        .pipe($.sourcemaps.init())
         .pipe(tsProject());
        //.pipe(tsc(tsProject));
        // {
        //     module: "amd",
        //     target: "ES6",
        //     declarationFiles: false,
        //     experimentalDecorators:true,
        //     emitDecoratorMetadata: true
        // }));

    return tsResult.js    
        //.pipe($.babel())        
        //.pipe($.requirejsOptimize())
        //.pipe($.concat("boot.js"))
        //.pipe($.ngAnnotate()) 
        //.pipe($.requirejsOptimize())       
        .pipe($.sourcemaps.write("."))
        .pipe(gulp.dest(config.temp +"js"));

});

gulp.task("compile:sass", function () {
    "use strict";
    var sassOptions = {
        errLogToConsole: true,
        outputStyle: 'expanded'
    };

    var autoprefixerOptions = {
        browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
    };

    gulp.src(config.paths.sass.src)
        .pipe($.sourcemaps.init())
        .pipe($.sass(sassOptions).on('error', $.sass.logError))
        .pipe($.autoprefixer(autoprefixerOptions))
        .pipe($.sourcemaps.write("."))
        .pipe(gulp.dest(config.paths.sass.dest));
});

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

// ** Clean ** //

gulp.task('clean',function(done){
    "use strict";

    log("Clean code");
    var files = [].concat(
        config.temp,
        config.build
    );
    clean(files, done);
});

gulp.task('wiredep',['compile:typescript'],function(){
    "use strict";
    log("Calling wiredep");

    var options = config.getWiredepDefaultOptions();

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js), {relative: true}))
        .pipe(gulp.dest(config.root,{overwrite: true}));
});

gulp.task('inject',['wiredep','compile:sass'],function(){
    "use strict";
    log("Wire up the app css into the html");

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.buildCss), {relative: true}))
        .pipe(gulp.dest(config.root,{overwrite: true}));
});

gulp.task('optimize', function(){
    "use strict";
    log("Optimizing the js, css, html");

    var assets = $.useref({ searchPath: "./"});
    //var templateCache =config.temp +config.templateCache.file;

    return gulp
        .src(config.index)
        .pipe($.plumber())
        // .pipe($.inject(gulp.src(templateCache,{read:false}),{relative:true,
        //  starttag: '<!-- inject:templates:js -->'
        // }))
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


gulp.task('simpleOptimize', function(){
    "use strict";
    log("Simple Optimization");

    var assets = $.useref({ searchPath: "./"});
    //var templateCache =config.temp +config.templateCache.file;

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe(assets)
        .pipe($.if('**/app.js', $.ngAnnotate()))
        .pipe($.revReplace())
        .pipe(gulp.dest(config.build))
        .pipe($.rev.manifest())
        .pipe(gulp.dest(config.build));
});



// ** Utils ** //

gulp.task("serve", function (done) {
    "use strict";
    runseq("build","browser", done);
});

gulp.task("browser", function (done) {
    "use strict";
    startBrowserSync(done);
});

///////////////////////////

function startBrowserSync(done){
    "use strict";

    if (browserSync.active){
        return;
    }

    log('Starting browser-sync on port ' + config.port );

    var options={
        port:config.port,
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
        notify:true,
        server: {
            baseDir: [config.paths.dist],
            middleware: function (req, res, next) {
                res.setHeader("Access-Control-Allow-Origin", "*");
                next();
            }
        }
    };

    browserSync(options,done);
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

function reportChange(event) {
    "use strict";
    $.util.log("File " + event.path + " was " + $.util.colors.blue(event.type) + ", running tasks...");
}