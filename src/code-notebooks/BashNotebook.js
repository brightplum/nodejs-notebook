const fs = require('fs');
const child = require('child_process');

const { NodebookError } = require('../NodebookError.js');
const { Nodebook } = require('../Nodebook.js');

const undefinederror = new NodebookError('\'code\' must be defined.');
const stringOnly = new NodebookError('This parameter must be a string.');
class BashNotebook extends Nodebook {
	constructor(name) {
		super(name, 'sh');
		this.name = name;
		BashNotebook.prototype.name = name;
	}
	note(code) {
		if (!code) throw undefinederror;
		const name = BashNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');
		const file = `${filename}.sh`;
		fs.writeFileSync(file, `${code}\n`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Wrote File "${filename}.sh"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	runFile() {
		const file = `${BashNotebook.prototype.name.replace(/[ ]/g, '_')}.sh`;
		const filename = BashNotebook.prototype.name.replace(/[ ]/g, '_');
		if (!fs.existsSync(`${file}`)) throw new NodebookError(`"${file}" does not exist.`);
		console.log(`[Nodebook] Executing File "${file}" ...`);
		const output = child.exec(`bash ${file}`, { encoding: 'utf-8' }, (err, stdout, stderr) => {
			if (err !== null) {
				console.error(err);
			}
			console.error(stderr);
			console.log(stdout);
		});
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Executed File "${filename}.sh"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		return output;
	}
	runCMD(command) {
		if (typeof command !== 'string') throw stringOnly;

		const output = child.exec(command, (err, stdout, stderr) => {
			if (err !== null) {
				console.error(err);
			}
			console.log(`STDOUT: ${stdout}`);
			console.log(`STDERR: ${stderr}`);
		});
		return output;
	}
}
module.exports = {
	BashNotebook,
};
