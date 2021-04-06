/*

Nodebook (node-notebook) v1.0.3

Created by GamerCoder215

*/

// Default Classes
const { NodebookError } = require('./src/NodebookError.js');
const { Nodebook } = require('./src/Nodebook.js');

// C/C++
const { CPPNotebook } = require('./src/c-c++/CPPNotebook.js');
const { CNotebook } = require('./src/c-c++/CNotebook.js');

// JS Notebooks
const { JSNotebook } = require('./src/js/JSNotebook.js');
const { JSONotebook } = require('./src/js/JSONotebook.js');

// Text Notebooks
const { TXTNotebook } = require('./src/text/TXTNotebook.js');
const { MDNotebook } = require('./src/text/MDNotebook.js');

// Other
const { YMLNotebook } = require('./src/other/YMLNotebook.js');
const { BashNotebook } = require('./src/other/BashNotebook.js');

module.exports = {
	// Default
	Nodebook,
	NodebookError,
	// JS
	JSONotebook,
	JSNotebook,
	// Other
	BashNotebook,
	YMLNotebook,
	// Text
	MDNotebook,
	TXTNotebook,
	// C/C++
	CPPNotebook,
	CNotebook
};
