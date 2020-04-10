import Vue from 'vue';
import App from './App.vue';
import GAuth from 'vue-google-oauth2';

const gauthOption = {
  clientId: '934346728491-d6fjbee0o2ljch7l1psmm4uimle5j271.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption);

new Vue({
  render: h => h(App),
}).$mount('#app');