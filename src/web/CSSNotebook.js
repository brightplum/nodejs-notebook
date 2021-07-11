const fs = require('fs');

const { NodebookError } = require('../NodebookError.js');
const { Nodebook } = require('../Nodebook.js');
const { CSSSTyle } = require('./CSSStyle.js');

let err = new NodebookError('"type" must be a valid string.');
class CSSNotebook extends Nodebook {
	constructor(name) {
		super(name, 'css');

		this.name = name;
	}
	create(type, name) {
		if (!type || typeof type !== 'string') throw err;
		err = new NodebookError('"type" must be "class", "id", or "element".');
		if (type !== 'class' && type !== 'id' && type !== 'element') throw err;
		err = new NodebookError('"name" must be a valid string or array (for elements).');
		if (!name || typeof name !== 'string' && (Array.isArray(name) && type !== 'element')) throw err;

		if (!fs.existsSync(`${this.name}.css`)) {
			fs.writeFileSync(`${this.name}.css`, '', { encoding: 'utf-8' });
		}
		const contents = fs.readFileSync(`${this.name}.css`, { encoding: 'utf-8' }).split('\n');
		if (type == 'class') {
			if (contents.indexOf(`.${name} {`) !== -1) {
				return new CSSSTyle({ filename: this.name, filetype: this.type, name: name, type: 'class' });
			}
			else {
				const classDefault = `.${name} {\n\n}\n`;

				fs.writeFileSync(`${this.name}.css`, classDefault, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
				fs.writeFileSync('.booklog.txt', `[Nodebook  ${Date.now}] Created Class ".${name}" in File "${this.name}.css"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });

				return new CSSSTyle({ filename: this.name, filetype: this.type, name: name, type: 'class' });
			}
		}
		else if (type == 'id') {
			if (contents.indexOf(`#${name} {`) !== -1) {
				return new CSSSTyle({ filename: this.name, filetype: this.type, name: name, type: 'id' });
			}
			else {
				const idDefault = `#${name} {\n\n}\n`;
				fs.writeFileSync(`${this.name}.css`, idDefault, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
				fs.writeFileSync('.booklog.txt', `[Nodebook  ${Date.now}] Created ID "#${name}" in File "${this.name}.css"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });

				return new CSSSTyle({ filename: this.name, filetype: this.type, name: name, type: 'id' });
			}
		}
		else if (type == 'element') {
			if (typeof name === 'string' && contents.indexOf(`${name} {`) !== -1) {
				return new CSSSTyle({ filename: this.name, filetype: this.type, name: name, type: 'element' });
			}
			else if (Array.isArray(name) && contents.indexOf(`${name.join(', ')} {`) !== -1) {
				return new CSSSTyle({ filename: this.name, filetype: this.type, name: name, type: 'element' });
			}
			else {
				let elementDefault = `${name} {\n\n}\n`;
				if (Array.isArray(name)) elementDefault = `${name.join(', ')} {\n\n}\n`;
				fs.writeFileSync(`${this.name}.css`, elementDefault, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });

				let nameCorrect = name;
				if (Array.isArray(name)) nameCorrect = name.join(', ');
				fs.writeFileSync('.booklog.txt', `[Nodebook  ${Date.now}] Created Element(s) "${nameCorrect}" in File "${this.name}.css"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });

				return new CSSSTyle({ filename: this.name, filetype: this.type, name: name, type: 'element' });
			}
		}
	}
}

module.exports = {
	CSSNotebook
};
