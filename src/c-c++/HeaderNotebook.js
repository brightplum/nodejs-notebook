const fs = require('fs');

const { NodebookError } = require('../NodebookError.js');
const { Nodebook } = require('../Nodebook.js');

const err = new NodebookError('"name" cannot be undefined.');
class HeaderNotebook extends Nodebook {
	constructor(name, lang) {
		if (!name) throw err;
		let type;
		if (lang == 'c') type = 'h';
		else if (lang == 'c++') type = 'hpp';
		else type = 'h';

		super(name, type);
		this.name = name;
		this.lang = lang;
		HeaderNotebook.prototype.name = name;
		HeaderNotebook.prototype.lang = lang;
		HeaderNotebook.prototype.type = type;
	}
	include(module) {
		const err = new NodebookError('Please provide a module name.');
		if (!module) throw err;
		const name = HeaderNotebook.prototype.name;
		const type = HeaderNotebook.prototype.type;
		const filename = name.replace(/[ ]/g, '_');
		const file = `${filename}.${type}`;

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
	HeaderNotebook
};
