# project for vue
A customized frame apply to vue single page application.

The directory structure, as follows.

```catalog

├── config                      构建项目不同环境的配置
├── logs                        发布环境后的日志记录文件
├── rev                         打包加版本号后的文件
├── src                         项目目录
    |—— components              页面组件目录
    |—— routes                  vue路由配置
    |—— store                   vuex配置
    |—— util                    公共方法目录（包含ajax和element组件）
    |—— views                   vue主页面
    |—— app.vue                 vue实例入口
    |—— main.js                 页面入口JS文件
├── static                      样式，图标，图片等静态资源
    |—— css                     css静态文件
    |—— iconfont                阿里iconfont文件
    |—— images                  图片文件
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
$ cd vue_project
$ npm install
```
- Finally, run this project. 
```bash
$ npm run dev
```
