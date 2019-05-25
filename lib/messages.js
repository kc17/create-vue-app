const chalk = require('chalk');

exports.missingProjectName = function() {
  return 'error: project name is required.';
}

exports.alreadyExists = function(projectName) {
  return `There's already a directory called ${chalk.red(projectName)}. Please try a different name or delete that folder.`
}

exports.copying = function(projectName) {
  return `Creating ${chalk.bold(chalk.green(projectName))}...`;
}