const path = require('path');
const fs = require('fs');
const execa = require('execa');
const copyDir = require('./utils/copy-dir');
const install = require('./utils/install');
const messages = require('./messages');

module.exports = function createVueApp(opts) {
  const projectName = opts.projectName;

  if (!projectName) {
    console.log(messages.missingProjectName());
    process.exit(1);
  }

  if (fs.existsSync(projectName) && projectName !== '.') {
    console.log(messages.alreadyExists(projectName));
    process.exit(1);
  }

  const projectPath = (opts.projectPath = process.cwd() + '/' + projectName);
  const templatePath = path.resolve(__dirname, './templates/default');

  copyDir({
    templatePath: templatePath,
    projectPath: projectPath,
    projectName: projectName,
  })
    .then(generatePackageNameWithMessageFactory(opts))
    .then(generateHTMLTitleWithMessageFactory(opts))
    .then(installWithMessageFactory(opts))
    .then(gitInitWithMessageFactory(opts))
    .catch(function (err) { throw err; });
}

function installWithMessageFactory(opts) {
  const projectName = opts.projectName;
  const projectPath = opts.projectPath;

  return function installWithMessage() {
    return install({
      projectName: projectName,
      projectPath: projectPath,
      packages: {
        dependencies: [
          'axios',
          'core-js@2.6.5',
          'js-cookie',
          'normalize.css',
          'vue',
          'vue-i18n',
          'vue-router',
          'vuex',
        ],
        devDependencies: [
          '@vue/cli-plugin-babel',
          '@vue/cli-plugin-eslint',
          '@vue/cli-service',
          '@vue/eslint-config-airbnb',
          'babel-eslint',
          'eslint',
          'eslint-plugin-vue',
          'husky',
          'lint-staged',
          'sass',
          'sass-loader',
          'vue-template-compiler',
        ],
      },
    })
  };
}

function gitInitWithMessageFactory(opts) {
  const projectPath = opts.projectPath;

  return function gitInitWithMessage() {
    process.chdir(projectPath);
    execa.shellSync('git init');
    execa.shellSync('git add .');
    execa.shellSync('git commit -m "init"');
    process.chdir(__dirname);
  }
}

function generatePackageNameWithMessageFactory(opts) {
  const projectPath = opts.projectPath;
  const projectName = opts.projectName;

  return function generatePackageNameWithMessage() {
    const file = path.resolve(projectPath, './package.json');
    const fileStr = fs.readFileSync(file, 'utf8');
    const fileStrWithName = fileStr.replace(/<%= name %>/, projectName);

    return fs.writeFileSync(file, fileStrWithName, 'utf8');
  }
}

function generateHTMLTitleWithMessageFactory(opts) {
  const projectPath = opts.projectPath;
  const projectName = opts.projectName;

  return function generateHTMLTitleWithMessage() {
    const htmlFile = path.resolve(projectPath, './public/index.html');
    const htmlStr = fs.readFileSync(htmlFile, 'utf8');
    const htmlStrWithTitle = htmlStr.replace(/<%= TITLE %>/, projectName);

    return fs.writeFileSync(htmlFile, htmlStrWithTitle, 'utf8');
  }
}