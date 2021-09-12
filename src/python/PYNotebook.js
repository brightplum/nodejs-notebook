const fs = require('fs');
const child = require('child_process');
const { Nodebook } = require('../Nodebook.js');
const { NodebookError } = require('../NodebookError.js');

const err = new NodebookError('"name" must be defined.');
const undefinederror = new NodebookError('\'code\' must be defined.');
class PYNotebook extends Nodebook {
	constructor(name) {
		if (!(name)) throw err;
		super(name, 'py');
	}
	note(code) {
		if (!code) throw undefinederror;
		const name = PYNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');
		const file = `${filename}.py`;
		fs.writeFileSync(file, `${code}\n`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Wrote File "${filename}.py"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	import(module) {
		const err = new NodebookError('Please provide a module name.');
		if (!module) throw err;
		const name = PYNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');
		const file = `${filename}.py`;

		if (!fs.existsSync(file)) {
			fs.writeFileSync(file, '\n', { encoding: 'utf-8' });
		}
		const lines = fs.readFileSync(file, { encoding: 'utf-8' }).split('\n');

		const oldline = lines[0];
		lines[0] = `import ${module}\n${oldline}`;
		fs.writeFileSync(file, lines.join('\n'), { encoding: 'utf-8' });
	}
	comment(comment) {
		if (!comment) throw new NodebookError('comment() requires a comment to place.');
		const file = `${PYNotebook.prototype.name.replace(/[ ]/g, '_')}.c`;
		fs.writeFileSync(file, `""" ${comment} """`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Commented In File "${file}`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	run() {
		const name = PYNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');
		const file = `${filename}.py`;

		const err = new NodebookError(`${filename}.py does not exist`);
		if (!fs.existsSync(file)) throw err;
		child.exec(`python ${file}`, { encoding: 'utf-8' }, (err, stdout, stderr) => {
			if (err !== null) {
				console.error(err);
			}
			console.log(`STDOUT: ${stdout}`);
			console.log(`STDERR: ${stderr}`);
		});
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Run File "${filename}.py"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
}

module.exports = {
	PYNotebook,
};
