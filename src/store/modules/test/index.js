/**
 * Created by hg on 2018/4/17.
 */
import {getters} from './getters.js'
import {actions} from './actions.js'
import {mutations} from './mutations.js'

//变量名（test）与store主目录（store/index.js）中定义的名称一致
export let test = {
    state:{
        testData: '123'
    },
    getters,
    mutations,
    actions
}


