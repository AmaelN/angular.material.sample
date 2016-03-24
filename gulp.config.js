
module.exports = function(){

    var appFolder = './app/';
    var bowerFolder = './app/bower_components/';

    var config ={
        app : appFolder,
        css: appFolder+"assets/app.css",
        index: appFolder +'index.html',
        js: [
            appFolder + '**/*.js',
            '!'+appFolder+ 'boot.js',
            '!'+bowerFolder + '**/*.js',
        ],
       
        /**
         * Bower and NPM Locations
         */
        bower:{
            json : require('./bower.json'),
            directory: bowerFolder,
            ignorePath: '../..'
        }

    };

    config.getWiredepDefaultOptions= function () {
      var options = {
          bowerJson: config.bower.json,
          directory: config.bower.directory,
          ignorePath: config.bower.ignorePath
      };
        return options;
    };

    return config;
};