const fs = require('fs');
const child = require('child_process');

const { NodebookError } = require('../NodebookError.js');
const { Nodebook } = require('../Nodebook.js');

class HeaderNotebook extends Nodebook {
	constructor(name, lang) {
		let type = 'c';
		if (lang == 'c') type = 'h';
		else if (lang == 'c++') type = 'hpp';

		super(name, type);
		this.name = name;
		this.lang = lang;
		HeaderNotebook.prototype.name = name;
		HeaderNotebook.prototype.lang = lang;
		HeaderNotebook.prototype.type = type;
	}
	include(module) {
		let err = new NodebookError('Please provide a module name.');
		if (!module) throw err;
		const name = HeaderNotebook.prototype.name;
		const type = HeaderNotebook.prototype.type;
		const filename = name.replace(/[ ]/g, '_');
		const file = `${filename}.${type}`;

		if (!fs.existsSync(file)) {
			fs.writeFileSync(file, `\n`, { encoding: 'utf-8'});
		}
		let lines = fs.readFileSync(file, { encoding: 'utf-8'}).split('\n');

		let oldline = lines[0];
		lines[0] = `#include <${module}>\n${oldline}`;
		fs.writeFileSync(file, lines.join('\n'), { encoding: 'utf-8'});
	}
}