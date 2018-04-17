// 配置deploy服务器信息，www为正式环境，pre和test分别作为预发布和本地测试用
var config = {
    production : {
        www : {
            sshConfig : {
                host:'',
                port:22,
                username:'',
                password:'',
                readyTimeout:200000
            }
        },
        test : {
            sshConfig : {
                host:'',
                port:22,
                username:'',
                password:'',
                readyTimeout:200000
            }
        },
        pre:{
            sshConfig:{
                host:'',
                port:22,
                username:'',
                password:'',
                readyTimeout:200000
            }
        }
    }
};

module.exports = config;
