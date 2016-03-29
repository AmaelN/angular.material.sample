
module.exports = function(){

    var appFolder = './app/';
    var bowerFolder = './app/bower_components/';
    var temp = './.tmp/';
    var root = "./";

    var config ={
        app : appFolder,
        build: './build/',
        css: appFolder+"assets/app.css",
        htmltemplate: appFolder+ '/view/*.html',
        index: appFolder +'index.html',
        js: [
            appFolder + '**/*.js',
            '!'+appFolder+ 'boot.js',
            '!'+bowerFolder + '**/*.js',
        ],
        packages:[
            './package.json',
            './bower.json'
        ],
        root:root,
        svg: appFolder + "assets/svg/*.*",
        temp: temp,
        /**
         * TemplateCache Options
         */
        templateCache:{
            file:'template.js',
            options:{
                module:'contactManagerApp',
                standAlone:false,
                root:'view/'
            }
        },


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