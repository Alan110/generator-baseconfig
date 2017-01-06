var chalk = require('chalk'); //不同颜色的info
var yosay = require('yosay'); //yeoman弹出框<Paste>
var yeoman = require('yeoman-generator');

var cfg;

var baseconfig = yeoman.Base.extend({
    //     prompting: function () {
    //        return this.prompt([{
    //          type    : 'input',
    //          name    : 'type',
    //          message : 'Your project name',
    //          default : this.appname // Default to current folder name
    //        }, {
    //          type    : 'confirm',
    //          name    : 'cool',
    //          message : 'Would you like to enable the Cool feature?'
    //        }]).then(function (answers) {
    //            cfg = answers;
    //        }.bind(this));
    //    },
    initializing : function(){
        this.argument('type', {
            type: String,
            required: false,  // 可选，不强制
            default: 'gulp'
        });
    },
    info: function() {
        //this.log(chalk.green(
        //    'I am going to build your app!'
        //));
    },

    myStart: function() { //按照自己的templates目录自定义
        var type = this.options.type;
        this.log(type || '');

        if (['gulp', 'node'].indexOf(type) == -1) {
            this.log('没有指定或者非法参数，使用默认值 gulp')
            type = this.options.type = 'gulp';
        }

        this['_gen_' + type]();

    },

    _gen_node: function() {
        // 目录
        ['src', 'dist'].forEach(function(el, index) {
            this.directory(el, el);
        }, this);

        // 文件
        ['package.json', 'build.js', '.eslintrc.js'].forEach(function(el, index) {
            this.copy(el, el);
        }, this);
    },

    _gen_gulp: function() {
        // 目录
        ['src', 'dist'].forEach(function(el, index) {
            this.directory(el, el);
        }, this);

        // 文件
        ['package.json', 'gulpfile.js', '.eslintrc.js'].forEach(function(el, index) {
            this.copy(el, el);
        }, this);

    },
    install: function() {
        var type = this.options.type;

        switch (type) {

            case 'node':
                this.npmInstall([
                    'babel-preset-es2015-rollup',
                    'rollup-plugin-replace',
                    'rollup-plugin-uglify',
                    'rollup-plugin-babel'
                ], {
                    'save-dev': true
                });
                break;

            case 'gulp':
                this.npmInstall([
                    'babel-preset-es2015-rollup',
                    'gulp-better-rollup',
                    'gulp-rename',
                    'rollup-plugin-babel',
                    'gulp-replace',
                    'gulp-rollup',
                    'gulp-sourcemaps',
                    'gulp-uglify'
                ], {
                    'save-dev': true
                });
                break;
        }
    },

    end: function() {
        this.log(yosay(
            'Your app has been created successfully!'
        ));
    }
});
module.exports = baseconfig;
