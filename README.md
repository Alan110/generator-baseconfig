# generator-baseconfig

生成前端项目的基本es6配置，使用rollup作为es6的打包工具，适合写类库，等大型js软件。

## 全局cli工具需要自行引入

bable
* npm install -g babel
* npm install-g babel-cli

rollup
* npm install -g rollup


## gulp构建

`yo baseconfig `

## nodejs 原生构建
使用rollup js API作为构建入口，支持同时输出多份不同的构建，只需修改build.js 的configs对象

`yo baseconfig  node`

## 编译
`node build.js`
