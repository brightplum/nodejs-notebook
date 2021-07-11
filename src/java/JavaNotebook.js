const fs = require('fs');
const child = require('child_process');

const { NodebookError } = require('../NodebookError.js');
const { Nodebook } = require('../Nodebook.js');

const undefinederror = new NodebookError('"code" must be defined.');
let err = new NodebookError('"name" cannot be undefined.');
class JavaNotebook extends Nodebook {
	constructor(name) {
		if (!name) throw err;
		const caps = name.charAt(0).toUpperCase() + name.slice(1);
		super(caps, 'java');
		if (caps !== name) console.log('\x1b[34m[Nodebook] INFO Java Classes are recommended to be capitalized. Auto-Capitalizing...\x1b[0m');

		this.name = caps;

		JavaNotebook.prototype.name = caps;
	}
	note(code) {
		if (!code) throw undefinederror;
		const name = JavaNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');
		const file = `${filename}.java`;
		fs.writeFileSync(file, `${code}`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Wrote File "${filename}.java"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	import(pkg) {
		err = new NodebookError('Please provide a package.');
		if (!pkg) throw err;

		const name = JavaNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');
		const file = `${filename}.java`;

		if (!fs.existsSync(file)) {
			fs.writeFileSync(file, '\n', { encoding: 'utf-8' });
		}
		const lines = fs.readFileSync(file, { encoding: 'utf-8' }).split('\n');

		const oldline = lines[0];

		lines[0] = `import ${pkg};\n${oldline}`;
		fs.writeFileSync(file, lines.join('\n'), { encoding: 'utf-8' });
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Imported Package "${pkg}" In "${file}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	compile() {
		const name = JavaNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');
		const file = `${filename}.java`;

		err = new NodebookError(`"${file}" does not exist.`);
		if (!fs.existsSync(file)) throw err;

		child.exec(`javac ${file}`, { encoding: 'utf-8' }, (err, stdout, stderr) => {
			if (err !== null) {
				console.error(err);
			}
			else {
				console.log(`STDOUT: ${stdout}`);
				console.log(`STDERR: ${stderr}`);
			}
		});
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Compiled File "${file}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	comment(comment) {
		if (!comment) throw new NodebookError('comment() requires a comment to place.');
		const file = `${JavaNotebook.prototype.name.replace(/[ ]/g, '_')}.java`;
		fs.writeFileSync(file, `/* ${comment} */`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Commented In File "${file}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	run() {
		const name = JavaNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');
		const file = `${filename}.java`;

		err = new NodebookError(`"${file}" does not exist.`);
		if (!fs.existsSync(file)) throw err;

		child.exec(`javac ${file}`, { encoding: 'utf-8' }, (err, stdout, stderr) => {
			if (err !== null) {
				console.error(`(compile) ${err}`);
			}
			else {
				console.log(`(compile) STDOUT: ${stdout}`);
				console.log(`(compile) STDERR: ${stderr}`);
			}
		}).then(() => {
			child.exec(`java ${filename}`, { encoding: 'utf-8' }, (err, stdout, stderr) => {
				if (err !== null) {
					console.error(err);
				}
				else {
					console.log(`STDOUT: ${stdout}`);
					console.log(`STDERR: ${stderr}`);
				}
			});
			fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Executed File "${file}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		});
	}
}
module.exports = {
	JavaNotebook,
};
