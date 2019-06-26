import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import i18n from './i18n';
import autoRegisterVueComponents from './utils/autoRegisterVueComponents';
import './styles/main.scss';

Vue.config.productionTip = false;
autoRegisterVueComponents(Vue);

new Vue({
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app');
