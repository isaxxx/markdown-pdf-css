const markdownpdf = require('markdown-pdf');
const chalk = require('chalk');
const rimraf = require('rimraf');
const fs = require('fs-extra');
const ejs = require('ejs');

const cssPath = 'markdown-pdf.css';
const ejsPath = 'markdown-pdf.ejs';
const jsPath = 'markdown-pdf.js';

let srcDocPath = 'src/' + process.argv[2] + '/document.md';
let destDocPath = 'src/' + process.argv[2] + '/document.pdf';
let jsonDocPath = 'src/' + process.argv[2] + '/document.json';

fs.readFile(jsonDocPath, 'utf8', (err, body) => {
    let options = JSON.parse(body.replace(/\n/g, ''));
    ejs.renderFile(ejsPath, options, (err, str) => {
	    fs.outputFile(jsPath, str, (err) => {
            markdownpdf({
				cssPath: cssPath,
				runningsPath: jsPath
			}).from(srcDocPath).to(destDocPath, (err) => {
				rimraf(jsPath, () => {
					if (err) {
						console.error(chalk.red(err));
					} else {
						console.log(chalk.green('Output: ' + destDocPath));
					}
				});
			});
	    });
	});
});
