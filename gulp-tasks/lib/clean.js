var $   = require('gulp-load-plugins')({lazy:true});
var del = require('del');
var log = require('./log.js');

module.exports = function (path){
    "use strict";
    log ("Cleaning" + $.util.colors.blue(path));
    del(path);
}