// 主要用于上传发布包至服务器，登录服务器执行发布脚本（本配置文件来源于互联网）
var gulp = require('gulp');
var gutil = require('gulp-util');
var through = require('through2');
var ScpClient = require('scp3').Client;
var ssh = require('gulp-ssh');
// var async = require('async');
var ProgressBar = require('progress');
// var sftp = require('gulp-sftp');

const PLUGIN_NAME = 'deploy-ssh';

module.exports = function (options,done) {
    var sshConfig = options.sshConfig;
    var dest = options.dest;
    var shell = options.shell;
    var logPath = options.logPath;

    return through.obj(function (file, enc, callback) {
        if (file.isNull()) {
            gutil.log(PLUGIN_NAME, "***** File isNull！！！！");
            callback(null, file);
            return;
        }

        if (file.isStream()) {
            return callback(new gutil.PluginError(PLUGIN_NAME, 'No stream support'));
        }

        var i = 0;
        // gutil.log(">>>>>>>>>>>>>>>>>>", servers);

        gutil.log(">>2>>>", sshConfig);
        gutil.log(">>3>>>", sshConfig.host);
        gutil.log(">>4>>>", sshConfig.port);
        var hostName = sshConfig.host;
        var portName = sshConfig.port;
        gutil.log(PLUGIN_NAME, "start deploy:[" + hostName+":" + portName + "]");
        var client = new ScpClient(sshConfig);

        var bar = null;
        gutil.log(PLUGIN_NAME, "start deploy1");

        client.on("transfer",  function(buffer, uploaded, total){
            if(bar == null){
                bar = new ProgressBar(hostName + ' uploading [:bar] :percent :elapsed s', {
                    complete: '=',
                    incomplete: ' ',
                    width: 50,
                    total: total
                });
            }
            bar.tick(1);
        });


        gutil.log(PLUGIN_NAME, "start deploy2");
        client.write({
            destination: dest,
            content: file.contents
        }, function () {
            gutil.log(">>2>>>SSH 登陆：执行shell", options);
            ssh(options).shell(shell, {filePath: logPath + "-" + hostName + ".log", autoExit: true}).on('error', function (err) {
                done(err);
                gutil.PluginError(PLUGIN_NAME,  err);
            }).on('finish', function () {
                gutil.log(PLUGIN_NAME, "finish deploy:" + hostName);
                return;
                callback(null, file);
            }).pipe(gulp.dest('logs'));
            gutil.log(PLUGIN_NAME, "sftp ok");
        });

        gutil.log(PLUGIN_NAME, "start deploy3");

    });

};
