const fs = require('fs');
const child = require('child_process');

const { NodebookError } = require('../NodebookError.js')
const { Nodebook } = require('../Nodebook.js');

class CPPNotebook extends Nodebook {
	constructor(name) {
		super(name, 'cpp');
		this.name = name;
		CPPNotebook.prototype.name = name;
	}
	note(code) {
		if (!code) throw undefinederror;
		let name = CPPNotebook.prototype.name;
		let filename = name.replace(/[ ]/g, '_');
		let file = `${filename}.cpp`;
		fs.writeFileSync(file, `${code}\n`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Wrote File "${filename}.cpp"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 })
	}
	comment(comment) {
		if (!comment) throw new NodebookError('comment() requires a comment to place.');
		let file = `${CPPNotebook.prototype.name.replace(/[ ]/g, '_')}.cpp`;
		fs.writeFileSync(file, `/* ${comment} */`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 })
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Commented In File "${filename}.cpp"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 })
	}
	compile() {
		let name = CPPNotebook.prototype.name;
		let filename = name.replace(/[ ]/g, '_');
		let file = `${filename}.cpp`;

		child.exec(`g++ ${file}`, { encoding: 'utf-8'}, (err, stdout, stderr) => {
			if (err !== null) {
				console.error(err);
			}
			console.log(`STDOUT: ${stdout}`);
			console.log(`STDERR: ${stderr}`);
		});
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Compiled File "${filename}.cpp"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 })
	}
}
module.exports = {
	CPPNotebook
}