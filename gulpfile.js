/**
 * Created by hg on 2018/4/2.
 * gulpfile 配置
 */

var gulp = require("gulp");
var del = require('del');
var rev = require('gulp-rev');                             //打版本号
var revCollector = require('gulp-rev-collector');          //替换有版本号的js
var deploySSH = require('./config/deploy-ssh');                   //上传服务器相关配置
var deployConfig = require("./config/deploy-config");             //上传服务器相关配置
var zip = require('gulp-zip');                           //压缩命令
var gzip = require('gulp-gzip');
var gulpSequence = require('gulp-sequence');
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var pro_env = "test";
/*----------------------清除build下的所有文件-------------------------------------------*/
gulp.task('clean', function () {
    return del([
        './build/**/*',
        './dist/**/*'
    ]).then(function () {
        console.log('all cleaned...');
    });
});
/*------------------------webpack任务---------------------------------*/
gulp.task("webpack", function (callback) {
    /* 根据需要，配置不同环境路径
    if (pro_env == "www") {
        webpackConfig.output.publicPath = "xxx";
    }else {
        webpackConfig.output.publicPath = "";
    }*/
    webpackConfig.devtool = false;  //可调试模式
    webpackConfig.plugins = [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ];
    webpack(
        webpackConfig
        , function (err, stats) {
            callback();              //解决异步的问题
            console.log('gulp webpack finished...');
        });
});

/*----------------------发布前将build下的js文件加版本号并移动到dist目录下-------------------------------------*/
gulp.task('scripts', function () {
    return gulp.src('./build/build.js')
        .pipe(rev())
        .pipe(gulp.dest('dist/build'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev'));
});
/*----------------------发布前将html下的js文件替换成相应有版本号的js文件-------------------------------------*/
gulp.task('rev', function () {
    return gulp.src(['rev/*.json', 'index.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('dist/'));
});


/*----------------------发布前将部分文件移动到dist目录下-------------------------------------*/
gulp.task('copyFile'
    , function () {
        return gulp.src(
            [
                './statics/**/*.*',
                './build/*.*',
                '!./build/build.js'
            ], {base: './'})
            .pipe(gulp.dest('./dist'));
    });

/*----------------------将dist目录下的文件打成dist包-------------------------------------------------*/
gulp.task('zipFile', function () {
    // 优化为直接压缩指定文件更好一些
    return gulp.src(['dist/**'], {base: './'})
        .pipe(zip('publish.zip'))
        .pipe(gulp.dest('./dist'));
});
/*---------------------发布测试环境----------------------------------------------------------*/
gulp.task('ssh_test', function () {
    pro_env = "test";
    console.log("======**** 发布测试环境 ****=====")
    gulpSequence('clean', 'webpack', 'scripts', 'rev', 'copyFile', 'zipFile','deploy',function () {
        console.log("======**** 测试 发布完成 ****=====")
    });
});
/*---------------------发布预发布环境----------------------------------------------------------*/
gulp.task('ssh_pre', function () {
    pro_env = "pre";
    console.log("======**** 发布预测试环境 ****=====")
    gulpSequence('clean', 'webpack', 'scripts', 'rev', 'copyFile', 'zipFile', 'deploy', function () {
        console.log("======**** 预发布 发布完成 ****=====")
    });
});
/*---------------------发布正式环境----------------------------------------------------------*/
gulp.task('ssh_www', function () {
    pro_env = "www";
    console.log("======**** 发布正式环境 ****=====")
    gulpSequence('clean', 'webpack', 'scripts', 'rev', 'copyFile', 'zipFile', 'deploy', function () {
        console.log("======**** 正式 发布完成 ****=====")
    });
});

/*==========================================================================================*/
/*--------------------------发布到服务器---------------------------------------------------*/
gulp.task('deploy', function () {
    var config = deployConfig.production[pro_env];      //pro_env为环境变量 test(测试)|pre(预发布)|www(正式环境)
    var path = {
        test: '',
        pre: '',
        www: ''
    };
    var deployPath = path[pro_env];
    console.log(deployPath);
    return gulp.src("dist/publish.zip", {base: './'})
        .pipe(deploySSH({
            sshConfig: config.sshConfig,
            dest: deployPath + 'publish.zip',
            logPath: 'deploy',
            shell: [ //'mkdir ' + config.deployPath,
                'cd ' + deployPath,
                'shopt -s extglob',
                'rm -rf !(logs|publish.zip)',
                //'tar --no-same-owner -zxf publish.tar.gz',
                'unzip publish.zip',
                'chmod -R 755 ' + deployPath,
                'mv dist/** .',
                'rm -rf dist && rm -rf publish.zip',
                // 压缩gzip压缩
                //'gzip -9rv ./images',
                'touch ' + deployPath
            ]
        }));
});
