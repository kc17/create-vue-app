const path = require('path');
const Promise = require('promise');
const messages = require('../messages');
const fs = require('fs-extra');
const output = require('./output');


module.exports = function copyDir(opts) {
  const templatePath = opts.templatePath;
  const projectPath = opts.projectPath;
  const projectName = opts.projectName;

  console.log(messages.copying(projectName));

  return new Promise(function (resolve, reject) {
    const copySpinner = output.wait('Copying files');
    fs.copy(templatePath, projectPath)
      .then(function() {
        return fs.move(
          path.resolve(projectPath, './gitignore'),
          path.resolve(projectPath, './.gitignore')
        );
      })
      .then(function() {
        copySpinner.stop();
        output.success(`Created files for "${output.cmd(projectName)}" vue app`);

        return this;
      })
      .then(resolve)
      .catch(function(err) {
        console.error(err);
        copySpinner.stop();
        output.error('Copy command failed, try again.');
        reject(err);
        process.exit(1);
      });
  });
}