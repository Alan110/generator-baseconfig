var chalk = require('chalk');    //不同颜色的info
var yosay = require('yosay');    //yeoman弹出框<Paste>
var yeoman = require('yeoman-generator');

var baseconfig = yeoman.Base.extend({
     prompting: function () {
        return this.prompt([{
          type    : 'input',
          name    : 'name',
          message : 'Your project name',
          default : this.appname // Default to current folder name
        }, {
          type    : 'confirm',
          name    : 'cool',
          message : 'Would you like to enable the Cool feature?'
        }]).then(function (answers) {
          this.log('app name', answers.name);
          this.log('cool feature', answers.cool);
        }.bind(this));
    },
    info: function() {
        this.log(chalk.green(
            'I am going to build your app!'
        ));
    },
    generateBasic: function() {  //按照自己的templates目录自定义
        //this.copy('package.json', 'package.json');   //拷贝文件
        this.copy('.gitignore', '.gitignore');
        this.copy('.ackrc', '.ackrc');
        this.copy('.eslintrc.json', '.eslintrc.json');
    },
    end: function() {
        this.log(yosay(
            'Your app has been created successfully!'
        ));
    }
});
module.exports = baseconfig;
