export default function (options) {
  const extendRoutes = (options && options.extendRoutes) || [];
  const pageModules = require.context('@/pages', true, /\.vue/);

  const routes = pageModules
    .keys()
    .sort((a, b) => a.indexOf('_') - b.indexOf('_'))
    .map((filename) => {
      const path = filename
        .toLocaleLowerCase()
        .replace(/\./, '')
        .replace(/\.vue/, '')
        .replace(/\/index/, '')
        .replace(/_/g, ':');

      const name = path
        .replace(/:/g, '')
        .replace(/^\//, '')
        .replace(/\//g, '-');

      const component = pageModules(filename).default;

      if (extendRoutes.map(({ name }) => name).includes(name)) return;

      return {
        path,
        name,
        component,
      }
    })
    .filter(Boolean);

  return [
    ...routes,
    ...extendRoutes,
  ];
}