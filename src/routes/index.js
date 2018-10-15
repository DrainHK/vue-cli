/**
 * Created by hg on 2018/4/2.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const router = new VueRouter({
   routes: [
       {
           name: 'login',
           path: '/login',
           component: () => import(/* webpackChunkName: "login" */ "../views/login.vue")
       },
       {
           name: 'home',
           path: '/home',
           component: () => import(/* webpackChunkName: "home" */ "../views/home.vue"),
           children: [
               {
                   name: 'main',
                   path: '/main',
                   component: () => import(/* webpackChunkName: "index" */ "../views/main.vue")
               }
               //follow parts have been remove, you can add your routes here
           ]
       },
       {path: '*', redirect: '/login'}
   ]
});
export default router;

