import Vue from 'vue';
import Router, { Route } from 'vue-router';
import Home from './views/Home1';
import Test from './components/Test.vue'
Vue.use(Router);



export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    { path: '/hello/:propName', component: Test }, // 
  ],
});
