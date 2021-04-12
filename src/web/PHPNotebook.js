const fs = require('fs');

const { NodebookError } = require('../NodebookError.js');
const { Nodebook } = require('../Nodebook.js');

let err = new NodebookError('"name" must be a valid string.');
class PHPNotebook extends Nodebook {
	constructor(name) {
		super(name, 'php');

		if (!name || typeof name !== 'string') throw err;
		this.name = name;
		if (!fs.existsSync(`${name}.php`)) {
			const phpDefault = '<?php\n\n?>';
			fs.writeFileSync(`${name}.php`, phpDefault, { encoding: 'utf-8' });
		}
	}
	note(code) {
		err = new NodebookError('"code" must be a valid string.');
		if (!code || typeof code !== 'string') throw err;

		const oldcode = fs.readFileSync(`${this.name}.php`, { encoding: 'utf-8' }).replace('<?php', '').replace('?>', '');
		const newcode = oldcode + code;
		fs.writeFileSync(`${this.name}.php`, `<?php${newcode.toString()}?>`, { encoding: 'utf-8' });
	}
	comment(comment) {
		err = new NodebookError('"comment" must be a valid string.');
		if (!comment || typeof comment !== 'string') throw err;

		const oldcode = fs.readFileSync(`${this.name}.php`, { encoding: 'utf-8' }).replace('<?php', '').replace('?>', '');
		const newcode = oldcode + `\n/* ${comment} */`;
		fs.writeFileSync(`${this.name}.php`, `<?php${newcode.toString()}?>`, { encoding: 'utf-8' });
	}
}
module.exports = {
	PHPNotebook
};
