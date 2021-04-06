const fs = require('fs');
const child = require('child_process');

const { NodebookError } = require('../NodebookError.js');
const { Nodebook } = require('../Nodebook.js');

const undefinederror = new NodebookError('\'code\' must be defined.');
class CNotebook extends Nodebook {
	constructor(name) {
		super(name, 'c');
		this.name = name;
		CNotebook.prototype.name = name;
	}
	note(code) {
		if (!code) throw undefinederror;
		const name = CNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');
		const file = `${filename}.c`;
		fs.writeFileSync(file, `${code}\n`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Wrote File "${filename}.c"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	comment(comment) {
		if (!comment) throw new NodebookError('comment() requires a comment to place.');
		const file = `${CNotebook.prototype.name.replace(/[ ]/g, '_')}.c`;
		fs.writeFileSync(file, `/* ${comment} */`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Commented In File "${file}`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	compile() {
		const name = CNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');
		const file = `${filename}.c`;

		let err = new NodebookError(`${filename}.c does not exist`);
		if (!fs.existsSync(file)) throw err;
		child.exec(`gcc ${file}`, { encoding: 'utf-8' }, (err, stdout, stderr) => {
			if (err !== null) {
				console.error(err);
			}
			console.log(`STDOUT: ${stdout}`);
			console.log(`STDERR: ${stderr}`);
		});
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Compiled File "${filename}.c"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
}
module.exports = {
	CNotebook,
};
