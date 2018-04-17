/**
 * Created by hg on 2018/3/29.
 */
import Vue from 'vue'
import './util/axios.js'
import "./util/element-ui.js"
import store from './store/index.js'
import router from './routes/index.js'
import App from './app.vue'
import '../static/css/common.less';

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
})


