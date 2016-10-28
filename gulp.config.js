


module.exports = function(){

    var appFolder = './app/';
    var bowerFolder = './bower_components/';
    var temp = './.tmp/';
    var root = "./";
    var build = './build/';
    var mainPage = 'index.html';

    var entryJsName = 'boot.js';

    var paths = {
        tscripts: {
            src: ["./typings/index.d.ts", "app/app.consts.ts", "app/app.ts", "app/**/*.ts"],
            dest: temp + 'js'
        },
        js: {
            
            entryPath: temp + 'js/' + entryJsName,
            entryName : entryJsName
        },
        html: ["./app/**/*.html"],
        mainHtml: root + mainPage,
        sass: {
            src: ["./app/assets/styles/**/*.{['sass', 'scss', 'css']}"],
            dest: temp+"/styles",
            options:{
                "indentedSyntax": true,
                "outputStyle": 'expanded',
                "includePaths": []        
            },
            autoprefixerOptions: {
                browsers: ['last 3 versions', '> 5%', 'Firefox ESR']
            }       
        },
        fonts: {
            src: ["./bower_components/font-awesome-less/fonts/*.{eot,svg,ttf,woff,woff2}"],
            dest: build+"/fonts"
        },
        imgs: {
            src: ["./app/assets/images/*.{png,jpeg,jpg,svg,ico}"],
            dest: build+"/images"
        },
        langJson: {
            src: ["./app/lang/*.json"],
            dest: build + "/lang"
        },
        dist: build
    };

    var config ={
        port :9000,
        tsconfig: './tsconfig.json',
        app : appFolder,
        paths:paths,
        build: build,
        buildCss : temp + "**/*.css",
        buildScript : build + "/scripts/",
        index: root + mainPage,
        indexBuild: build + mainPage,
        js: [
            temp + '*.js',
            '!'+bowerFolder + '**/*.js'
        ],
        root:root,
        temp: temp,
        /**
         * TemplateCache Options
         */
        templateCache:{
            file:'template.js',
            options:{
                module:'auth-app',
                standAlone:false,
                root:'componenets/'
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

