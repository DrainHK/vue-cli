/**
 * Created by hg on 2018/4/17.
 */
import Vue from 'vue'
const vm = new Vue();
export const actions = {
    /**
     * 接口调用示例
     * @param   commit    -  使用commit调用mutations中的方法，改变state中定义的变量
     * @param   state     -  使用state获取对应模块存储的store参数
     * @param   dispatch  -  使用dispatch调用actions中的其他方式
     * @param   param     -  param为调用接口时传递过来的参数
     * */
    test({commit, state, dispatch}, param){
        vm.$ajax({
            url: '',
            data: param
        }).then((res)=>{
            commit('testMut','321');
            console.log(res);
        })
    },
    otherFn({commit, state, dispatch}, param){
        var data = {
            testData: state.test.testData,
        };
        dispatch('test',data);
    }
};

