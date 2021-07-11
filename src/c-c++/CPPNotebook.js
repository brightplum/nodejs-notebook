const fs = require('fs');
const child = require('child_process');

const { NodebookError } = require('../NodebookError.js');
const { Nodebook } = require('../Nodebook.js');

const undefinederror = new NodebookError('\'code\' must be defined.');
class CPPNotebook extends Nodebook {
	constructor(name) {
		super(name, 'cpp');
		this.name = name;
		CPPNotebook.prototype.name = name;
	}
	note(code) {
		if (!code) throw undefinederror;
		const name = CPPNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');
		const file = `${filename}.cpp`;
		fs.writeFileSync(file, `${code}\n`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Wrote File "${filename}.cpp"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	comment(comment) {
		if (!comment) throw new NodebookError('comment() requires a comment to place.');
		const file = `${CPPNotebook.prototype.name.replace(/[ ]/g, '_')}.cpp`;
		fs.writeFileSync(file, `/* ${comment} */`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Commented In File "${file}`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	compile() {
		const name = CPPNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');
		const file = `${filename}.cpp`;

		const err = new NodebookError(`${filename}.cpp does not exist`);
		if (!fs.existsSync(file)) throw err;
		child.exec(`g++ ${file}`, { encoding: 'utf-8' }, (err, stdout, stderr) => {
			if (err !== null) {
				console.error(err);
			}
			console.log(`STDOUT: ${stdout}`);
			console.log(`STDERR: ${stderr}`);
		});
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Compiled File "${filename}.cpp"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	include(module) {
		const err = new NodebookError('Please provide a module name.');
		if (!module) throw err;
		const name = CPPNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');
		const file = `${filename}.cpp`;

		if (!fs.existsSync(file)) {
			fs.writeFileSync(file, '\n', { encoding: 'utf-8' });
		}
		const lines = fs.readFileSync(file, { encoding: 'utf-8' }).split('\n');

		const oldline = lines[0];
		lines[0] = `#include <${module}>\n${oldline}`;
		fs.writeFileSync(file, lines.join('\n'), { encoding: 'utf-8' });
	}
}
module.exports = {
	CPPNotebook,
};
