var $ = require('gulp-load-plugins')({lazy:true});


module.exports = function (msg){
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