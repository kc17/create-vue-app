/* eslint-disable */
import generateRoutes from '@/utils/generateRoutes';

const routes = generateRoutes({
  extendRoutes: [
    {
      name: 'notfound',
      path: '*',
      component: require('@/pages/notfound').default,
    },
  ]
});

// const routes = [
//   {
//     name: 'home',
//     path: '/',
//     component: require('@/pages/index').default,
//   },
//   {
//     name: 'notfound',
//     path: '*',
//     component: require('@/pages/notfound').default,
//   },
// ];

export default routes;