class NodebookError extends Error {
	constructor(message) {
		super(message);
		this.name = 'NodebookError';
		this.stack = <call stack>
	}
}
module.exports = {
	NodebookError
}
