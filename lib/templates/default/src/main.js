import Vue from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import autoRegisterVueComponents from './utils/autoRegisterVueComponents';
import './styles/main.scss';

Vue.config.productionTip = false;
autoRegisterVueComponents(Vue);

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app');
