const fs = require('fs');
const child = require('child_process');

const { NodebookError } = require('../NodebookError.js');
const { JSNotebook } = require('./JSNotebook.js');

let err = new NodebookError('"name" cannot be undefined.');
class TSNotebook extends JSNotebook {
	constructor(name) {
		if (!name) throw err;
		if (!fs.existsSync('tsconfig.json')) {
			let tsdata = '{\n%%"compilerOptions": {\n%%%%"target": "es6",\n%%%%"lib": ["esnext", "dom"],\n%%%%"module": "commonjs",\n%%%%"moduleResolution": "node",\n%%%%"strict": true,\n%%%%"jsx": "react",\n%%%%"allowJs": true,\n%%%%"sourceMap": true,\n%%%%"inlineSources": true,\n%%%%"types": ["node"],\n%%%%"allowSyntheticDefaultImports": true,\n%%%%"experimentalDecorators": true\n%%}\n}'.replace(/[%]/g, ' ')
			fs.writeFileSync('tsconfig.json', tsdata, { encoding: 'utf-8'});
		}
		super(name, 'ts');

		this.name = name;

		TSNotebook.prototype.name = name;
	}
}

module.exports = {
	TSNotebook
}