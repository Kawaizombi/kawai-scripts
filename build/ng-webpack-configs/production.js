/* eslint-disable @typescript-eslint/no-var-requires */
const provider = require('./common');

module.exports = (project) => provider(project, { dev: false });
