const { NodebookError } = require('../NodebookError.js');
const fs = require('fs');

let err = new NodebookError('"parent" must be a valid string.');
class CSSSTyle {

	constructor(data) {
		function parsePrefix(type) {
			if (type === 'class') return '.';
			else if (type === 'id') return '#';
			else return '';
		}

		this.type = data.type;
		this.prefix = parsePrefix(data.type);
		this.name = data.name;
		this.file = {
			name: data.filename,
			type: data.filetype
		};

	}

	newStyle(style, content) {
		const name = this.file.name;
		const type = this.file.type;

		if (!style || typeof style !== 'string') throw err;

		err = new NodebookError('"content" must be a valid string.');

		if (!content || typeof content !== 'string') throw err;
		const prefix = this.prefix;
		const parent = this.name;

		const lines = fs.readFileSync(`${name}.${type}`, { encoding: 'utf-8' }).split('\n');
		const styleLine = lines.indexOf(`${prefix}${parent} {`) + 1;

		const oldCode = lines[styleLine];

		const newCode = `˘˘${style}: ${content};`.replace(/[˘]/g, ' ');

		lines[styleLine] = `${oldCode}\n${newCode}`;

		fs.writeFileSync(`${name}.${type}`, lines.join('\n'), { encoding: 'utf-8' });
		fs.writeFileSync('.booklog.txt', `[Nodebook  ${Date.now()}] Added Style "${style}" with Value "${content}" In File: "${name}.${type}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
}

module.exports = {
	CSSSTyle
};
