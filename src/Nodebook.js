const fs = require('fs');

const { NodebookError } = require('./NodebookError.js');

const optionsErr = new TypeError('"options" must be an object.');
const integerErr = new TypeError('"num" must be a valid integer.');
const undefiendErr = new TypeError('"key" must be defined.');
class Nodebook {
	constructor(name, type) {
		this.name = name;
		this.type = type;
		Nodebook.prototype.name = name;
		Nodebook.prototype.type = type;
		if (!fs.existsSync('.booklog.txt')) fs.writeFileSync('.booklog.txt', '# Beginning of Nodebook Log');
	}
	fileName(options) {
		if (typeof options !== 'object') throw optionsErr;
		let filename = this.name.replace(/[ ]/g, '_');
		options.lower == false;
		if (options.lower == true) filename = filename.toLowerCase();
		return filename;
	}
	resetFile() {
		const type = Nodebook.prototype.type;
		const file = `${Nodebook.prototype.name.replace(/[ ]/g, '_')}.${type}`;
		if (!fs.existsSync(`${file}`)) throw new NodebookError(`"${file}" does not exist.`);

		console.log(`[Nodebook] Resetting file "${file}"...`);
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Reset File "${filename}.${type}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.unlinkSync(file);
		fs.writeFileSync(file, '');
	}
	deleteFile(delay) {
		const type = Nodebook.prototype.type;
		const name = Nodebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');
		if (!fs.existsSync(`${filename}.${type}`)) throw new NodebookError(`"${filename}.${type}" does not exist.`);
		if (!delay) {
			fs.unlinkSync(`${filename}.${type}`);
			console.log(`[Nodebook] Deleted file "${filename}.${type}" in 0 seconds.`);
		}
		else {
			setTimeout(() => {
				fs.unlinkSync(`${filename}.${type}`);
				fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Deleted File "${filename}.${type}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
				console.log(`[Nodebook] Deleted file "${filename}.${type}" in ${delay} seconds.`);
			}, delay * 1000);
		}
	}
	fetchLine(num) {
		if (!num || (num * 1) % 1 !== 0 || isNaN(num * 1)) throw integerErr;
		const arrayNum = (num * 1) - 1;
		const type = Nodebook.prototype.type;
		const name = Nodebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');

		if (!fs.existsSync(`${filename}.${type}`)) throw new NodebookError(`"${filename}.${type}" does not exist.`);

		const data = fs.readFileSync(`${filename}.${type}`, { encoding: 'utf-8' }).split('\n');
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Fetched Line "${num}" In File "${filename}.${type}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		return data[arrayNum];
	}
	deleteLine(num) {
		if (!num || (num * 1) % 1 !== 0 || isNaN(num * 1)) throw integerErr;
		const arrayNum = (num * 1) - 1;
		const type = Nodebook.prototype.type;
		const name = Nodebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');

		if (!fs.existsSync(`${filename}.${type}`)) throw new NodebookError(`"${filename}.${type}" does not exist.`);

		const text = fs.readFileSync(`${filename}.${type}`).toString().split('\n');
		text[arrayNum] = '';
		fs.writeFileSync(`${filename}.${type}`, text.join('\n'));
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Deleted Line "${num}" In File "${filename}.${type}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	editLine(num, key) {
		if (!num || (num * 1) % 1 !== 0 || isNaN(num * 1)) throw integerErr;
		if (!key) throw undefinedErr;
		const arrayNum = (num * 1) - 1;
		const type = Nodebook.prototype.type;
		const name = Nodebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');

		if (!fs.existsSync(`${filename}.${type}`)) throw new NodebookError(`"${filename}.${type}" does not exist.`);

		const text = fs.readFileSync(`${filename}.${type}`).toString().split('\n');
		text[arrayNum] = key;
		fs.writeFileSync(`${filename}.${type}`, text.join('\n'));
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Edited Line "${num}" In File "${filename}.${type}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	addLine(key) {
		const type = Nodebook.prototype.type;
		const name = Nodebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');
		if (!key) throw undefiendErr;

		fs.writeFileSync(`${filename}.${type}`, `${key}\n`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Added Line in File "${filename}.${type}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	content() {
		const type = Nodebook.prototype.type;
		const name = Nodebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');

		return fs.readFileSync(`${filename}.${type}`, { encoding: 'utf-8' }).toString();
	}
}
module.exports = {
	Nodebook,
};
