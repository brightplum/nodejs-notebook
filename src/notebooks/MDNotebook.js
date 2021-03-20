const fs = require('fs');

const { NodebookError } = require('../NodebookError.js');
const { Nodebook } = require('../Nodebook.js');

const undefinedErr = new NodebookError('\'url\' cannot be undefined.');
const arrayOnlyErr = new NodebookError('\'list\' must be a valid array.');

class MDNotebook extends Nodebook {
	constructor(name) {
		super(name, 'md');
		this.name = name;
		MDNotebook.prototype.name = name;
	}
	note(value) {
		if (!value) throw new NodebookError('note() value cannot be undefined.');
		const name = MDNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');

		fs.writeFileSync(`${filename}.md`, value, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Wrote File "${filename}.md"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	createHeader(value, options) {
		if (!value) throw new NodebookError('note() value cannot be undefined.');
		if (typeof options !== 'object') throw new NodebookError('note() options must be an object.');
		const name = MDNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');

		let header = '# ';
		if (options.type == '1') header = '# ';
		else if (options.type == '2') header = '## ';
		else if (options.type == '3') header = '### ';
		else if (options.type == '4') header = '#### ';
		else if (options.type == '5') header = '##### ';
		else if (options.type == '6') header = '###### ';
		fs.writeFileSync(`${filename}.md`, `${header}${value}\n`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Added Header Type "h${options.type}" In File "${filename}.md"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	createLink(url, text) {
		if (!url) throw undefinedErr;
		const name = MDNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');

		if (!text) {
			fs.writeFileSync(`${filename}.md`, `[${url}](${url})\n`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		}
		else {
			fs.writeFileSync(`${filename}.md`, `[${text}](${url})\n`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		}
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Created Link In File "${filename}.md"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	createList(list, options) {
		if (typeof list !== 'object') throw arrayOnlyErr;
		const name = MDNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');

		let listType = '*';
		if (options.type == 'unordered') listType = '*';
		else if (options.type == 'ordered') listType = '1';
		else options.type = 'unordered';

		let i = 0;
		while (i < list.length) {
			if (listType === '*') {
				fs.writeFileSync(`${filename}.md`, `* ${list[i]}\n`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
			}
			else if (listType === '1') {
				fs.writeFileSync(`${filename}.md`, `${i + 1}. ${list[i]}\n`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
			}
			i++;
		}
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Created "${options.type}" List In File "${filename}.md"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
}

module.exports = {
	MDNotebook,
};
