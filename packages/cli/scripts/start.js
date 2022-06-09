process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const { findArgsFromCli } = require('@craco/craco/lib/args');

// Make sure this is called before "paths" is imported.
findArgsFromCli();

const { log } = require('@craco/craco/lib/logger');
const { getCraPaths, start } = require('@craco/craco/lib/cra');
const { loadCracoConfigAsync } = require('@craco/craco/lib/config');
const {
  overrideWebpackDev,
} = require('@craco/craco/lib/features/webpack/override');
const {
  overrideDevServer,
} = require('@craco/craco/lib/features/dev-server/override');
const { validateCraVersion } = require('@craco/craco/lib/validate-cra-version');
const { processCracoConfig } = require('@craco/craco/lib/config');

const config = require('../config/craco.config');

log('Override started with arguments: ', process.argv);
log('For environment: ', process.env.NODE_ENV);

const context = {
  env: process.env.NODE_ENV,
};

const loadConfig = async config => {
  const cracoConfig = processCracoConfig(config, context);

  validateCraVersion(cracoConfig);

  context.paths = getCraPaths(cracoConfig);

  overrideWebpackDev(cracoConfig, context);
  overrideDevServer(cracoConfig, context);

  start(cracoConfig);
};

loadConfig(config);
