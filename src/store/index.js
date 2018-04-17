/**
 * Created by hg on 2018/4/2.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import {getters} from './getters'
import {actions} from  './actions'
import {mutations} from './mutations'

//若需要对store进行拆分，可在此引入子模块
//import {test} from './modules/test/index.js'
Vue.use(Vuex);

let state = {
    testBtn: false

};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: {
        //若store包含子模块，可在此配置：
        //test: test
    }
})
