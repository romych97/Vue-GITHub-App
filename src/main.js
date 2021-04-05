// import Vue from 'vue';

import App from './App.vue';
import User from './User.vue';
import UsersList from './UsersList.vue';

import './styles/main.css'; 

import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  { path: '/user/:id', name: 'Edit', component: User, props: true },
  { path: '/list', component: UsersList },
  { path: '/', component: UsersList }
]

const router = new VueRouter({
  routes ,
  mode: 'hash'
})

new Vue({
  el: '#app',
  router,
  components: { App, User, UsersList },
  render(createElement) {
    return createElement(App);
}
}).$mount('#app');