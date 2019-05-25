const path = require('path');
const fs = require('fs');
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
    .then(generateHTMLTitleWithMessageFactory(opts))
    .then(installWithMessageFactory(opts))
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
          'core-js@2.6.5',
          'normalize.css',
          'vue', 
          'vue-router',
        ],
        devDependencies: [
          '@vue/cli-plugin-babel',
          '@vue/cli-service',
          'sass',
          'sass-loader',
          'vue-template-compiler',
        ],
      },
    })
  };
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