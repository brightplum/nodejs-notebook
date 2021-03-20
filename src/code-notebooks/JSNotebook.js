const fs = require('fs');
const child = require('child_process');

const { NodebookError } = require('../NodebookError.js');
const { Nodebook } = require('../Nodebook.js');

const undefinederror = new NodebookError('Your code cannot be undefined.');
class JSNotebook extends Nodebook {
	constructor(name) {
		super(name, 'js');
		this.name = name;

		JSNotebook.prototype.name = name;
	}
	note(code) {
		if (!code) throw undefinederror;
		const name = JSNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');
		const file = `${filename}.js`;
		fs.writeFileSync(file, `${code}\n`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Wrote File "${filename}.js"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	run() {
		const file = `${JSNotebook.prototype.name.replace(/[ ]/g, '_')}.js`;
		const filename = JSNotebook.prototype.name.replace(/[ ]/g, '_');
		if (!fs.existsSync(`${file}`)) throw new NodebookError(`"${file}" does not exist.`);
		console.log(`[Nodebook] Executing File "${file}" ...`);
		const output = child.exec(`node ${file}`, { encoding: 'utf-8' }, (err, stdout, stderr) => {
			if (err !== null) {
				console.error(err);
			}
			console.log(`STDOUT: ${stdout}`);
			console.log(`STDERR: ${stderr}`);
		});
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Executed File "${filename}.js"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		return output;
	}
	comment(comment) {
		if (!comment) throw new NodebookError('comment() requires a comment to place.');
		const file = `${JSNotebook.prototype.name.replace(/[ ]/g, '_')}.js`;
		fs.writeFileSync(file, `/* ${comment} */`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Commented In File "${file}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
}
module.exports = {
	JSNotebook,
};
