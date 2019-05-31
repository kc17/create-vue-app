const execa = require('execa');
const Promise = require('promise');
const series = require('async').series;
const getInstallCmd = require('./get-install-cmd');
const output = require('./output');

module.exports = function install(opts) {
  const projectPath = opts.projectPath;
  const packages = opts.packages || {};
  const dependencies = packages.dependencies || [];
  const devDependencies = packages.devDependencies || [];

  const installCmd = getInstallCmd();

  process.chdir(projectPath);

  return new Promise(function(resolve, reject) {
    const installSpinner = output.wait('Installing npm modules...');

    series([
      function(callback) {
        installDependencies(dependencies)
          .then(function() {
            callback(null, 0);
          })
          .catch(function(err) {
            callback(err, undefined);
          })
      },
      function(callback) {
        installDevDependencies(devDependencies)
          .then(function() {
            callback(null, 0);
          })
          .catch(function(err) {
            callback(err, undefined);
          })
      },
    ], function(err, results) {
      installSpinner.stop();
      if (err) {
        return reject(new Error(`${installCmd} installation failed`));
      }

      resolve();
    })
    
  });

}

function installDependencies(dependencies) {
  const installCmd = getInstallCmd();
  const installArgs = getInstallArgs(installCmd, dependencies, false);
  return execa(installCmd, installArgs);
}
function installDevDependencies(devDependencies) {
  const installCmd = getInstallCmd();
  const installArgs = getInstallArgs(installCmd, devDependencies, true);
  return execa(installCmd, installArgs);
}

function getInstallArgs(cmd, packages, isDepPackages) {
  let args

  if (isDepPackages) {
    if (cmd === 'npm') {
      args = ['install', '--save-dev', '--save-exact'];
      return args.concat(packages, ['--verbose']);
    } else if (cmd === 'yarn') {
      args = ['add', '--dev'];
      return args.concat(packages);
    }
  } else {
    if (cmd === 'npm') {
      args = ['install', '--save', '--save-exact'];
      return args.concat(packages, ['--verbose']);
    } else if (cmd === 'yarn') {
      args = ['add'];
      return args.concat(packages);
    }
  }
}