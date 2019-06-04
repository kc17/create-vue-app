/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);

async function guardRoute(to, from, next) {
  const auth = true;
  // eslint-disable-next-line
  if (!auth) return next({ path: '/login' });
  return next();
}

const router = new Router({
  mode: 'history',
  routes: routes.map(route => ({
    ...route,
    beforeEnter: (to, from, next) => {
      // document.title = route.title;

      // Auth navigation guard.
      if (route.component && route.component.isPublic === false) return guardRoute(to, from, next);
      return next();
    },
  })),
});

export default router;
