/* eslint-disable no-console */

const path = require('path');
const shelljs = require('shelljs');

shelljs.exec('gulp lint --gulpfile ' + path.join(__dirname, 'lint.js'));