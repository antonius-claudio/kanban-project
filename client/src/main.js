import Vue from 'vue';
import App from './App.vue';
import GAuth from '../node_modules/vue-google-oauth2'

const gauthOption = {
  clientId: '934346728491-d6fjbee0o2ljch7l1psmm4uimle5j271.apps.googleusercontent.com',
  prompt: 'select_account'
}

Vue.use(GAuth, gauthOption);

new Vue({
  render: h => h(App),
}).$mount('#app');