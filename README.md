# vue-cli
A customized vue-cli include vue-router, vuex and axios which is packed by webpack and gulp.

The directory structure, as follows.

```catalog

├── config                      构建项目不同环境的配置
├── logs                        发布环境后的日志记录文件
├── rev                         打包加版本号后的文件
├── src                         项目目录
    |—— components              页面组件目录
    |—— routes                  vue路由配置
    |—— store                   vuex配置
    |—— util                    Ajax，公共方法，element组件
    |—— views                   主页面
    |—— app.vue                 Vue实例入口
    |—— main.js                 页面入口JS文件
├── static                      样式，图标，图片等静态资源
|—— .babelrc                    babel的配置文件
|—— gulpfile.js                 gulp配置文件
|—— index.html                  入口页面
|—— package.json                项目描述文件（定义项目所需要的各种模块，以及项目的配置信息）
|—— webpack.config.js           webpack配置文件

```

## How to use
- First, clone the project.
```bash
$ git clone https://github.com/DrainHK/vue-cli.git
```

- Then, install the dependencies locally files.
```bash
$ cd vue-cli
$ npm install
```
- Finally, run this project. 
```bash
$ npm run dev
```
