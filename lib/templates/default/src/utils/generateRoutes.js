function getRoute(filename, pageModules) {
  const path = filename
    .toLocaleLowerCase()
    .replace(/\./, '')
    .replace(/\.vue/, '')
    .replace(/\/index/, '')
    .replace(/\/_/g, '/:');

  const name = path
    .replace(/:/g, '')
    .replace(/^\//, '')
    .replace(/\//g, '-');

  const component = pageModules(filename).default;

  return { path, name, component };
}

export default function (options) {
  const extendRoutes = (options && options.extendRoutes) || [];
  const pageModules = require.context('@/pages', true, /\.vue/);

  const routes = pageModules
    .keys()
    .sort((a, b) => a.indexOf('_') - b.indexOf('_'))
    .map(filename => getRoute(filename, pageModules))
    .filter(route => !extendRoutes.map(({ name }) => name).includes(route.name));

  return [
    ...routes,
    ...extendRoutes,
  ];
}
