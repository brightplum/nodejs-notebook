const { Nodebook } = require('./Nodebook.js');
const { NodebookError } = require('./NodebookError.js');
const fs = require('fs');

let err;
class NodebookManager {
	constructor() {
		fs.writeFileSync('.booklog.txt', `\n[Nodebook  ${Date.now()}] - Fetched Manager`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
	}
	copyToFolder(path, ...nodebooks) {
		err = new NodebookError('"path" must be a valid string.');

		if (!path || typeof path !== 'string') throw err;
		err = new NodebookError('"nodebooks" must contain at least one Nodebook.');

		if (nodebooks.length < 1) throw err;

		err = new NodebookError('"nodebooks" has a value that is not a Nodebook.');

		nodebooks.forEach(nb => {
			if (!(nb instanceof Nodebook.Nodebook)) throw err;
		});

		fs.mkdirSync(path);

		try {
			nodebooks.forEach(nb => {
				fs.writeFileSync(`${path}/${nb.name}.${nb.type}`, nb.content(), { encoding: 'utf-8' });
				console.log(`[Nodebook Manager] Wrote File ""${nb.name}.${nb.type}" to "${path}" `);
			});
		}
		catch (err) {
			console.error(err);
		}
	}
}

module.exports = {
	NodebookManager
};
