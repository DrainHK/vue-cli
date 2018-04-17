/**
 * Created by hg on 2018/3/29.
 */
import Vue from 'vue'
import axios from 'axios'
const vm = new Vue();
const origin = window.location.origin;
const configPath = '';       //接口路径

let _ajax = function(options){
    let method = options.type || 'post';        //默认为post请求
    return new Promise((resolve, reject) => {
        axios[method](origin + configPath + options.url, options.data).then(({data:res}) =>{
            switch (res.header.resultCode){
                case 2005:
                    vm.$message({ message: '登录超时', type: 'info' });
                    break;
                case 1:
                    resolve(res.body);
                    break;
                default:
                    reject(res);
                    vm.$message({ message: res.header.msg, type: 'info' });
            }
        }).catch((err)=>{
            console.log(err);
            vm.$message({ message: '系统繁忙，请稍后再试', type: 'info' });
        });
    });
};
Vue.prototype.$ajax = _ajax;
