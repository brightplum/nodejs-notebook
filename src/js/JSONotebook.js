const fs = require('fs');
const jsyaml = require('js-yaml');

const { NodebookError } = require('../NodebookError.js');
const { Nodebook } = require('../Nodebook.js');

class JSONotebook extends Nodebook {
	constructor(name) {
		if (typeof name !== 'string') throw new NodebookError('Nodebook names must be strings.');
		if (!name) throw new NodebookError('Please provide a nodebook name.');
		super(name, 'json');
		this.name = name;
		JSONotebook.prototype.name = name;
	}
	note(key, value) {
		if (!key) throw new NodebookError('note() key cannot be undefiend.');
		if (!value) throw new NodebookError('note() value cannot be undefined.');
		const name = JSONotebook.prototype.name;

		const filename = name.replace(/[ ]/g, '_');
		if (!fs.existsSync(`${filename}.json`)) {
			fs.writeFileSync(`${filename}.json`, '{}');
			const file = require(`../${filename}.json`);

			file[`${key}`] = value;
			fs.writeFileSync(`${filename}.json`, JSON.stringify(file));
		}
		else {
			const file = require(`../${filename}.json`);

			file[`${key}`] = value;
			fs.writeFileSync(`${filename}.json`, JSON.stringify(file));
		}
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Wrote File "${filename}.json"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	push(key, newkey) {
		if (!newkey) throw new NodebookError('note() key cannot be undefiend.');
		const name = JSONotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');
		if (!fs.existsSync(`${filename}.json`)) throw new NodebookError(`"${filename}.json" does not exist.`);

		const file = require(`../${filename}.json`);
		const value = file[`${key}`];
		if (typeof value !== 'object') {
			throw new NodebookError('Selected ID Key is not an Array');
		}
		key.push(newkey);
		fs.writeFileSync(`${filename}.json`, JSON.stringify(file));
	}
	fetch(key) {
		const name = JSONotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');
		if (!fs.existsSync(`${filename}.json`)) throw new NodebookError(`"${filename}.json" does not exist.`);

		const file = require(`../${filename}.json`);
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Fetched Key "${key}" In File "${filename}.js"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		return file[`${key}`];
	}
	erase(key) {
		if (!key) throw new NodebookError('erase() must provide a key.');
		const name = JSONotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');
		if (!fs.existsSync(`${filename}.json`)) throw new NodebookError(`"${filename}.json" does not exist.`);

		const file = require(`../${filename}.json`);
		file[`${key}`] = undefined;
		fs.writeFileSync(`${filename}.json`, JSON.stringify(file));
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Erased Key "${key}" In File "${filename}.json"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	toYML() {
		const name = JSONotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');
		const content = require(`../${filename}.json`);

		return (jsyaml.dump(content));
	}
}

module.exports = {
	JSONotebook,
};
