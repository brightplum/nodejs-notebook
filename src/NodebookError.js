class NodebookError extends Error {
	constructor(message) {
		super(message);
		this.name = 'NodebookError';
	}
}
module.exports = {
	NodebookError
};
