export default function registerVueComponents(Vue) {
  const componentModules = require.context('@/components', true, /\.vue/);
  const layoutModules = require.context('@/layouts', false, /\.vue/);

  componentModules.keys().forEach((filename) => {
    const registerName = filename.replace(/(\.\/|\.vue)/g, '');
    const startIndex = filename.replace(/(\.\/|\.vue)/g, '').lastIndexOf('/') + 1;
    const registerComponentName = registerName.slice(startIndex);

    Vue.component(registerComponentName, componentModules(filename).default);
  });


  layoutModules.keys().forEach((filename) => {
    const registerName = filename.replace(/(\.\/|\.vue)/g, '');
    Vue.component(registerName, layoutModules(filename).default);
  });
}
