/**
 * Created by hg on 2018/4/3.
 */
import Vue from 'vue';
const vm = new Vue();
export const actions = {
    //请求接口使用（配置参数说明详见test/actions.js）
    test({commit, state}, data){
        vm.$ajax({
            url: '',
            type: 'get',       //默认为'post'方式，见配置文件./util/axios.js
            data: {}
        }).then((res)=>{
            console.log(res);
        })
    }
}
