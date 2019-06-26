import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// // modules
// const modules = {};
// const requireModules = require.context('./modules', false, /\.js/);
// requireModules.keys().forEach((filename) => {
//   const moduleName = filename.replace(/(\.\/|\.js)/g, '');
//   modules[moduleName] = requireModules(filename).default;
// });

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    // clear({ dispatch }) {
    //   requireModules.keys().forEach((filename) => {
    //     const moduleName = filename.replace(/(\.\/|\.js)/g, '');
    //     dispatch(`${moduleName}/clear`, {}, { root: true });
    //   });
    // },
  },
  getters: {},
  modules: {
    // ...modules,
  },
  plugins: []
});
