const fs = require('fs');

const { NodebookError } = require('../NodebookError.js');

class PlainNotebook {
	constructor(name) {
		this.name = name;

		PlainNotebook.prototype.name = name;
	}
	fileName(options) {
		if (typeof options !== 'object') throw optionsErr;
		let filename = this.name.replace(/[ ]/g, '_');
		options.lower == false;
		if (options.lower == true) filename = filename.toLowerCase();
		return filename;
	}
	resetFile() {
		const file = `${PlainNotebook.prototype.name.replace(/[ ]/g, '_')}`;
		if (!fs.existsSync(`${file}`)) throw new NodebookError(`"${file}" does not exist.`);

		console.log(`[Nodebook] Resetting file "${file}"...`);
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Reset File "${filename}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.unlinkSync(file);
		fs.writeFileSync(file, '');
	}
	deleteFile(delay) {
		const name = PlainNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');
		if (!fs.existsSync(`${filename}`)) throw new NodebookError(`"${filename}" does not exist.`);
		if (!delay) {
			fs.unlinkSync(`${filename}`);
			console.log(`[Nodebook] Deleted file "${filename}" in 0 seconds.`);
		}
		else {
			setTimeout(() => {
				fs.unlinkSync(`${filename}`);
				fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Deleted File "${filename}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
				console.log(`[Nodebook] Deleted file "${filename}" in ${delay} seconds.`);
			}, delay * 1000);
		}
	}
	fetchLine(num) {
		if (!num || (num * 1) % 1 !== 0 || isNaN(num * 1)) throw integerErr;
		const arrayNum = (num * 1) - 1;
		
		const name = PlainNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');

		if (!fs.existsSync(`${filename}`)) throw new NodebookError(`"${filename}" does not exist.`);

		const data = fs.readFileSync(`${filename}`, { encoding: 'utf-8' }).split('\n');
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Fetched Line "${num}" In File "${filename}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		return data[arrayNum];
	}
	deleteLine(num) {
		if (!num || (num * 1) % 1 !== 0 || isNaN(num * 1)) throw integerErr;
		const arrayNum = (num * 1) - 1;
		const name = PlainNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');

		if (!fs.existsSync(`${filename}`)) throw new NodebookError(`"${filename}" does not exist.`);

		const text = fs.readFileSync(`${filename}`).toString().split('\n');
		text[arrayNum] = '';
		fs.writeFileSync(`${filename}`, text.join('\n'));
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Deleted Line "${num}" In File "${filename}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	editLine(num, key) {
		if (!num || (num * 1) % 1 !== 0 || isNaN(num * 1)) throw integerErr;
		if (!key) throw undefinedErr;
		const arrayNum = (num * 1) - 1;
		const name = PlainNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');

		if (!fs.existsSync(`${filename}`)) throw new NodebookError(`"${filename}" does not exist.`);

		const text = fs.readFileSync(`${filename}`).toString().split('\n');
		text[arrayNum] = key;
		fs.writeFileSync(`${filename}`, text.join('\n'));
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Edited Line "${num}" In File "${filename}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	addLine(key) {
		const name = PlainNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');
		if (!key) throw undefiendErr;

		fs.writeFileSync(`${filename}`, `${key}\n`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Added Line in File "${filename}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	content() {
		const name = PlainNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');

		return fs.readFileSync(`${filename}`, { encoding: 'utf-8' }).toString();
	}
}
module.exports = {
	PlainNotebook
}