const fs = require('fs');
const jsyaml = require('js-yaml');

const { NodebookError } = require('../NodebookError.js');
const { Nodebook } = require('../Nodebook.js');

class YMLNotebook extends Nodebook {
	constructor(name) {
		super(name, 'yml');
		this.name = name;
		YMLNotebook.prototype.name = name;
	}
	note(key, value) {
		if (!key) throw new NodebookError('note() key cannot be undefiend.');
		if (!value) throw new NodebookError('note() value cannot be undefined.');
		const name = YMLNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');

		if (fs.existsSync(`${filename}.yml`)) {
  		const contents = fs.readFileSync(`${filename}.yml`, { encoding: 'utf-8' }).split('\n');
  		const existing = contents.indexOf(`${key}: ${value}`);
  		if (existing !== -1) {
  			contents[existing] = `${key}: ${value}`;
  			fs.writeFileSync(`${filename}.yml`, contents.join('\n'));
  		}
  		else {
  			fs.writeFileSync(`${filename}.yml`, `${key}: ${value}`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
  		}
		}
		else {
			fs.writeFileSync(`${filename}.yml`, `${key}: ${value}`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
		}
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Wrote File "${filename}.yml"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	toJSON() {
		const name = YMLNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');

		return (jsyaml.load(`${filename}.yml`, 'utf-8'));
	}
	getValue(key) {
		if (!key) throw new NodebookError('note() key cannot be undefined.');
		const name = YMLNotebook.prototype.name;
		const filename = name.replace(/[ ]/g, '_');

		const json = jsyaml.load(`${filename}.yml`, 'utf-8');
		return (json[`${key}`]);
	}
}
module.exports = {
	YMLNotebook,
};
