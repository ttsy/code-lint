/* eslint-disable no-console */

const exec = require('child_process').exec;
const path = require('path');
const cmd = 'gulp lint --gulpfile ' + path.join(__dirname, 'lint.js');

exec(cmd, function (error, stdout, stderr) {
    console.log(stdout);
    if (error) {
        console.log(stderr);
        process.exit(1);
    }
});
