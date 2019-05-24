const fse = require('fs-extra');

module.exports = function copyDir(opts) {
  const templatePath = opts.templatePath;
  const projectPath = opts.projectPath;
  const projectName = opts.projectName;

  fse.copy(templatePath, projectPath);
}