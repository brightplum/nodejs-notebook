const fs = require('fs');

const { NodebookError } = require('../NodebookError.js');
const { Nodebook } = require('../Nodebook.js');

class TXTNotebook extends Nodebook {
	constructor(name) {
		super(name, 'txt');
		if (typeof name !== 'string') throw new NodebookError('Nodebook names must be strings.');
		if (!name) throw new NodebookError('Please provide a nodebook name.');
		this.name = name;
		TXTNotebook.prototype.name = name;
	}
	note(value) {
		if (!value) throw new NodebookError('note() value cannot be undefined.');
		const name = TXTNotebook.prototype.name;

		const filename = name.replace(/[ ]/g, '_');
		fs.writeFileSync(`${filename}.txt`, value, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Wrote File "${filename}.txt"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	erase(value, options) {
		const name = TXTNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');

		options.flag = '';
		const flag = options.flag;
		const regex = new RegExp(value, flag);

		let text = fs.readFileSync(`${filename}.txt`).toString();
		text = text.replace(regex, '');

		fs.writeFileSync(`${filename}.txt`, text);
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Erased Value "${value}" In File "${filename}.txt"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
}

module.exports = {
	TXTNotebook,
};
