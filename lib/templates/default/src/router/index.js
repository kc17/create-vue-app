/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: routes.map(route => ({
    ...route,
    beforeEnter: (to, from, next) => {
      // document.title = route.title;

      return next();
    },
  })),
});

export default router;
