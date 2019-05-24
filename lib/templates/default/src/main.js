import Vue from 'vue';
import App from './App.vue';
import router from './router';
import registerVueComponents from './utils/registerVueComponents';
import './styles/main.scss';

Vue.config.productionTip = false;
registerVueComponents(Vue);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
