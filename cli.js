#!/usr/bin/env node

const program = require('commander');
const pkg = require('./package.json');

let projectName

program
  .version(pkg.version, '-v, --version')
  .arguments('<project-name>')
  .usage('<project-name> [options]')
  .action(function(name) {
    projectName = name;
  })
  .parse(process.argv);

if (typeof projectName === 'undefined') {
  console.error('error: project name is required.');
  process.exit(1);
}

console.log(projectName, 'projectName');