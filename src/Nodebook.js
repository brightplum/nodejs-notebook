const fs = require('fs');
const zlib = require('zlib');

const { NodebookError } = require('./NodebookError.js');

const optionsErr = new TypeError('"options" must be an object.');
const integerErr = new TypeError('"num" must be a valid integer.');
const undefiendErr = new TypeError('"key" must be defined.');
let stringErr = new TypeError('"options.newname" must be a string.');

class Nodebook {
	constructor(name, type) {
		this.name = name;
		this.type = type;
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
		const type = this.type;
		const file = `${this.name.replace(/[ ]/g, '_')}.${type}`;
		if (!fs.existsSync(`${file}`)) throw new NodebookError(`"${file}" does not exist.`);

		console.log(`[Nodebook] Resetting file "${file}"...`);
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Reset File "${file}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.unlinkSync(file);
		fs.writeFileSync(file, '');
	}
	deleteFile(delay) {
		const type = this.type;
		const name = this.name;
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
		const type = this.type;
		const name = this.name;
		const filename = name.replace(/[ ]/g, '_');

		if (!fs.existsSync(`${filename}.${type}`)) throw new NodebookError(`"${filename}.${type}" does not exist.`);

		const data = fs.readFileSync(`${filename}.${type}`, { encoding: 'utf-8' }).split('\n');
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Fetched Line "${num}" In File "${filename}.${type}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		return data[arrayNum];
	}
	deleteLine(num) {
		if (!num || (num * 1) % 1 !== 0 || isNaN(num * 1)) throw integerErr;
		const arrayNum = (num * 1) - 1;
		const type = this.type;
		const name = this.name;
		const filename = name.replace(/[ ]/g, '_');

		if (!fs.existsSync(`${filename}.${type}`)) throw new NodebookError(`"${filename}.${type}" does not exist.`);

		const text = fs.readFileSync(`${filename}.${type}`).toString().split('\n');
		text[arrayNum] = '';
		fs.writeFileSync(`${filename}.${type}`, text.join('\n'));
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Deleted Line "${num}" In File "${filename}.${type}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	editLine(num, key) {
		if (!num || (num * 1) % 1 !== 0 || isNaN(num * 1)) throw integerErr;
		if (!key) throw undefiendErr;
		const arrayNum = (num * 1) - 1;
		const type = this.type;
		const name = this.name;
		const filename = name.replace(/[ ]/g, '_');

		if (!fs.existsSync(`${filename}.${type}`)) throw new NodebookError(`"${filename}.${type}" does not exist.`);

		const text = fs.readFileSync(`${filename}.${type}`).toString().split('\n');
		text[arrayNum] = key;
		fs.writeFileSync(`${filename}.${type}`, text.join('\n'));
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Edited Line "${num}" In File "${filename}.${type}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	addLine(key) {
		const type = this.type;
		const name = this.name;
		const filename = name.replace(/[ ]/g, '_');
		if (!key) throw undefiendErr;

		fs.writeFileSync(`${filename}.${type}`, `${key}\n`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Added Line in File "${filename}.${type}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	content(encoding) {
		let encode = 'utf-8';
		if (encoding) encode = encoding.toString();

		const type = this.type;
		const name = this.name;
		const filename = name.replace(/[ ]/g, '_');

		if (encode == 'utf-8') {
			return fs.readFileSync(`${filename}.${type}`, { encoding: 'utf-8' }).toString();
		}
		else {
			return fs.readFileSync(`${filename}.${type}`, { encoding: encode }).toString();
		}
	}
	lines(encoding) {
		let encode = 'utf-8';
		if (encoding) encode = encoding.toString();

		const type = this.type;
		const name = this.name;
		const filename = name.replace(/[ ]/g, '_');

		if (encode == 'utf-8') {
			return fs.readFileSync(`${filename}.${type}`, { encoding: 'utf-8' }).split('\n');
		}
		else {
			return fs.readFileSync(`${filename}.${type}`, { encoding: encode }).split('\n');
		}
	}
	duplicate(options) {
		if (options && typeof options !== 'object' || Array.isArray(options)) throw optionsErr;

		let newFileName = `${this.name}_duplicate`;
		let encode = 'utf-8';

		const type = this.type;

		if (typeof options.newname !== 'string') throw stringErr;

		stringErr = new TypeError('"options.encoding" must be a string.');
		if (options.newname) newFileName = options.newname;
		if (options.encoding) encode = options.encoding;

		fs.writeFileSync(`${newFileName}.${type}`, fs.readFileSync(`${this.name}.${type}`).toString(), { encoding: encode });

		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Duplicated File "${this.name}.${type}" as "${newFileName}.${type}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	compress(type) {
		const name = this.name;
		const filetype = this.type;

		const err = new NodebookError('"type" must be "zip", "tar", or "gz"');

		if (!type || typeof type !== 'string' || (type !== 'zip' && type !== 'tar' && type !== 'gz')) throw err;

		const gzip = zlib.createGzip();

		const input = fs.createReadStream(`${name}.${filetype}`);
		const output = fs.createWriteStream(`${name}.${filetype}.${type}`);

		input.pipe(gzip).pipe(output);
	}

}
module.exports = {
	Nodebook,
};
