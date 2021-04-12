/*

Nodebook (nodejs-notebook) v1.0.3

Created by GamerCoder215

*/
const fs = require('fs');

// Default Classes
const { NodebookError } = require('./src/NodebookError.js');
const { Nodebook } = require('./src/Nodebook.js');

// C/C++
const { CPPNotebook } = require('./src/c-c++/CPPNotebook.js');
const { CNotebook } = require('./src/c-c++/CNotebook.js');
const { HeaderNotebook } = require('./src/c-c++/HeaderNotebook.js');

// Java
const { JavaNotebook } = require('./src/java/JavaNotebook.js');

// Web
const { CSSNotebook } = require('./src/web/CSSNotebook.js');
const { PHPNotebook } = require('./src/web/PHPNotebook.js');
const { HTMLNotebook } = require('./src/web/HTMLNotebook.js');

// JS Notebooks
const { JSNotebook } = require('./src/js/JSNotebook.js');
const { JSONotebook } = require('./src/js/JSONotebook.js');
const { TSNotebook } = require('./src/js/TSNotebook.js');

// Text Notebooks
const { TXTNotebook } = require('./src/text/TXTNotebook.js');
const { MDNotebook } = require('./src/text/MDNotebook.js');
const { PlainNotebook } = require('./src/text/PlainNotebook.js');

// Other
const { YMLNotebook } = require('./src/other/YMLNotebook.js');
const { BashNotebook } = require('./src/other/BashNotebook.js');

function clearLog() {
	console.log('[Nodebook] Clearing ".booklog.txt" ...');
	fs.unlinkSync('.booklog.txt');
	fs.writeFileSync('.booklog.txt', `# Beginning of Nodebook Log\n[Nodebook  ${Date.now()}] - Reset Logs`, { encoding: 'utf-8', flag: 'a+', mode: 0o666 });
}


module.exports = {
	// Functions
	clearLog,
	// Default
	Nodebook,
	NodebookError,
	// Java
	JavaNotebook,
	// JS
	JSONotebook,
	JSNotebook,
	TSNotebook,
	// Web
	CSSNotebook,
	PHPNotebook,
	HTMLNotebook,
	// Other
	BashNotebook,
	YMLNotebook,
	// Text
	MDNotebook,
	TXTNotebook,
	PlainNotebook,
	// C/C++
	CPPNotebook,
	CNotebook,
	HeaderNotebook,
};
