const fs = require('fs');

const { Nodebook } = require('../Nodebook.js');
const { NodebookError } = require('../NodebookError.js');

let err = new NodebookError('"title" must be a valid string.');
class HTMLNotebook extends Nodebook {
	constructor(name, htmltype) {
		if (!htmltype) htmltype = 'html';
		let realHtmlType;
		if (htmltype == 'html') realHtmlType = 'html';
		else if (htmltype.toLowerCase() == 'php') realHtmlType = 'php';
		else if (htmltype.toLowerCase() == 'xml') realHtmlType = 'xml';

		super(name, realHtmlType);
		this.name = name;
		this.type = realHtmlType;

		if (!fs.existsSync(`${name}.${realHtmlType}`)) {
			const htmlDefault = `<!DOCTYPE html>\n<html lang="en" dir="ltr">\n˘˘<head>\n˘˘˘˘<meta charset="utf-8">\n˘˘˘˘<title>${name}</title>\n˘˘</head>\n˘˘<body>\n˘˘</body>\n</html>`.replace(/[˘]/g, ' ');
			fs.writeFileSync(`${name}.${realHtmlType}`, htmlDefault, { encoding: 'utf-8' });
		}
	}
	setTitle(title) {
		if (!title || typeof title !== 'string') throw err;

		const name = this.name;
		const type = this.type;

		const lines = fs.readFileSync(`${name}.${type}`, { encoding: 'utf-8' }).split('\n');
		const titleLine = fs.readFileSync(`${name}.${type}`, { encoding: 'utf-8' }).replace(/[ ]/g, '').split('>').indexOf('\n<title');

		lines[titleLine] = `˘˘˘˘<title>${title}</title>`.replace(/[˘]/g, ' ');
		fs.writeFileSync(`${name}.${type}`, lines.join('\n'), { encoding: 'utf-8' });
		fs.writeFileSync('.booklog.txt', `[Nodebook  ${Date.now()}] Edited Title to "${title}" In File "${name}.${type}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	setMeta(property, content) {
		err = new NodebookError('"property" must be a valid string.');
		if (!property || typeof property !== 'string') throw err;
		err = new NodebookError('"content" must be a valid string.');
		if (!content || typeof content !== 'string') throw err;

		const name = this.name;
		const type = this.type;

		const fileString = fs.readFileSync(`${name}.${type}`, { encoding: 'utf-8' }).toString();
		const lines = fs.readFileSync(`${name}.${type}`, { encoding: 'utf-8' }).split('\n');
		const metaLine = fs.readFileSync(`${name}.${type}`, { encoding: 'utf-8' }).replace(/[ ]/g, '').split('>').indexOf('\n<head') + 1;

		const oldcode = lines[metaLine];
		const newcode = `˘˘˘˘<meta property="${property}" content="${content}">`.replace(/[˘]/g, ' ');

		if (fileString.includes(`˘˘˘˘<meta property="${property}"`.replace(/[˘]/g, ' '))) {
			lines[lines.indexOf(oldcode)] = newcode;
		}
		else lines[metaLine] = `${newcode}\n${oldcode}`;

		fs.writeFileSync(`${name}.${type}`, lines.join('\n'), { encoding: 'utf-8' });
		fs.writeFileSync('.booklog.txt', `[Nodebook  ${Date.now()}] Created Meta with Property "${property}" In File "${name}.${type}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	setLink(rel, href) {
		err = new NodebookError('"rel" must be a valid string.');
		if (!rel || typeof rel !== 'string') throw err;
		err = new NodebookError('"href" must be a valid stirng.');
		if (!href || typeof rel !== 'string') throw err;

		const name = this.name;
		const type = this.type;

		const fileString = fs.readFileSync(`${name}.${type}`, { encoding: 'utf-8' }).toString();
		const lines = fs.readFileSync(`${name}.${type}`, { encoding: 'utf-8' }).split('\n');
		const linkLine = fs.readFileSync(`${name}.${type}`, { encoding: 'utf-8' }).replace(/[ ]/g, '').split('>').indexOf('\n<head') + 1;

		const oldcode = lines[linkLine];

		const newcode = `˘˘˘˘<link rel="${rel}" href="${href}"˘/>`.replace(/[˘]/g, ' ');
		err = new NodebookError('<link> has been irregularly modified. Please do not rearrange the rel/href or delete the />.');

		if (fileString.includes(`˘˘˘˘<link rel="${rel}"`.replace(/[˘]/g, ' '))) {
			lines[lines.indexOf(oldcode)] = newcode;
		}
		else lines[linkLine] = `${newcode}\n${oldcode}`;

		fs.writeFileSync(`${name}.${type}`, lines.join('\n'), { encoding: 'utf-8' });
		fs.writeFileSync('.booklog.txt', `[Nodebook  ${Date.now()}] Created Link with Relationship "${rel}" From "${href}" In File "${name}.${type}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	addElement(element, value, inBody, selfClose, style, styleclass, styleid, spaces) {
		const name = this.name;
		const type = this.type;

		err = new NodebookError('Please provide a valid element name.');
		if (!element || typeof element !== 'string') throw err;

		err = new NodebookError('Please provide the element\'s value as a valid string. If it is self closing, this is the href.');
		if (!value || typeof value !== 'string') throw err;

		err = new NodebookError('"inBody" must be a valid boolean.');

		if (!inBody) inBody = true;
		if (typeof inBody !== 'boolean') throw err;

		err = new NodebookError('"selfClose" must be a valid boolean.');
		if (!selfClose) selfClose = false;
		if (typeof selfClose !== 'boolean') throw err;

		if (!style) style = '';
		if (!styleclass) styleclass = '';
		if (!styleid) styleid = '';

		err = new NodebookError('"style" must be a valid string.');

		if (typeof style !== 'string') throw err;

		err = new NodebookError('"styleclass" must be a valid string.');

		if (typeof styleclass !== 'string') throw err;

		err = new NodebookError('"styleid" must be a valid string.');

		if (typeof styleid !== 'string') throw err;

		err = new NodebookError('"spaces" must be a valid integer.');
		if (!spaces) spaces = 0;
		if (typeof spaces !== 'number' || !Number.isInteger(spaces)) throw err;

		function parseSpaces(spaceInt) {
			let spaceString = '';
			for (let i = 0; i < spaceInt; i++) {
				spaceString = spaceString + '˘';
			}

			return spaceString;
		}
		const lines = fs.readFileSync(`${name}.${type}`, { encoding: 'utf-8' }).split('\n');
		let elementLine = fs.readFileSync(`${name}.${type}`, { encoding: 'utf-8' }).toString().split('\n').indexOf('</html>') + 1;
		if (inBody) {
			elementLine = fs.readFileSync(`${name}.${type}`, { encoding: 'utf-8' }).toString().split('\n').indexOf('˘˘</body>'.replace(/[˘]/g, ' ')) - 1;
		}
		const oldcode = lines[elementLine];

		const newcode = selfClose ? (parseSpaces(spaces) + `<${element} href="${value}" style="${style}" class="${styleclass}" id="${styleid}">`).replace(/[˘]/g, ' ') : (parseSpaces(spaces) + `<${element} style="${style}" class="${styleclass}" id="${styleid}">${value}</${element}>`).replace(/[˘]/g, ' ');

		lines[elementLine] = `${oldcode}\n${newcode}`;

		fs.writeFileSync(`${name}.${type}`, lines.join('\n'), { encoding: 'utf-8' });
		fs.writeFileSync('.booklog.txt', `[Nodebook  ${Date.now()}] Added Element "${element}":\nSelf Closing: ${selfClose}\nValue (or href): ${value}\nClass: "${styleclass}"\nID: "${styleid}"\nStyle: "${style}"\nFile: "${name}.${type}"`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });

	}
}

module.exports = {
	HTMLNotebook
};
