const fs = require('fs');
const child = require('child_process');

const { NodebookError } = require('../NodebookError.js');
const { Nodebook } = require('../Nodebook.js');

const undefinederror = new NodebookError('Your code cannot be undefined.');
class JSNotebook extends Nodebook {
	constructor(name, type) {
		if (!type) type = 'js';
		super(name, type);
		this.name = name;
		this.type = type;
	}
	note(code) {
		if (!code) throw undefinederror;
		const name = this.name;
		const type = this.type;
		const filename = name.replace(/[ ]/g, '_');
		const file = `${filename}.${type}`;
		fs.writeFileSync(file, `${code}`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Wrote File "${filename}.${type}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	run() {
		const type = this.type;
		const file = `${this.name.replace(/[ ]/g, '_')}.${type}`;
		const filename = this.name.replace(/[ ]/g, '_');
		if (!fs.existsSync(`${file}`)) throw new NodebookError(`"${file}" does not exist.`);
		console.log(`[Nodebook] Executing File "${file}" ...`);
		let output;
		if (type == 'js') {
			output = child.exec(`node ${file}`, { encoding: 'utf-8' }, (err, stdout, stderr) => {
				if (err !== null) {
					console.error(err);
				} else {
					console.log(`STDOUT: ${stdout}`);
					console.log(`STDERR: ${stderr}`);
				}
			});
		} else if (type == 'ts') {
			output = child.exec(`tsc ${file}`, { encoding: 'utf-8' }, (err, stdout, stderr) => {
				if (err !== null) {
					console.error(err);
				} else {
					console.log(`STDOUT: ${stdout}`);
					console.log(`STDERR: ${stderr}`);
				}
			});
		} else output = 404;
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Executed File "${filename}.${type}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		return output;
	}
	comment(comment) {
		if (!comment) throw new NodebookError('comment() requires a comment to place.');
		const type = this.type;
		const file = `${this.name.replace(/[ ]/g, '_')}.${type}`;
		fs.writeFileSync(file, `/* ${comment} */`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Commented In File "${file}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	req(varname, module, usets) {
		const type = this.type;
		let err = new NodebookError('Please provide a variable name.');

		if (!varname) throw err;

		err = new NodebookError('Please provide a module name.');

		if (!module) throw err;

		const file = `${this.name.replace(/[ ]/g, '_')}.${type}`;

		if (!fs.existsSync(file)) {
			fs.writeFileSync(file, '\n', { encoding: 'utf-8'});
		}
		let lines = fs.readFileSync(file, { encoding: 'utf-8'}).split('\n');
		
		let oldline = lines[0];

		if (type == 'js') {
			lines[0] = `const ${varname} = require('${module}');\n${oldline}`;	
		} else if (type == 'ts') {
			if (!usets) usets = false;
			if (importwhole == true) {
				lines[0] = `import * as ${varname} from "${module}";\n${oldline}`;
			} else {
				lines[0] = `const ${varname} = require('${module}');\n${oldline}`;
			};
		}
		fs.writeFileSync(file, lines.join('\n'), { encoding: 'utf-8'});
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Added Module "${module}" In File "${file}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
}

module.exports = {
	JSNotebook,
};
