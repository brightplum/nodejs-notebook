class NodebookError extends Error {
	constructor(message) {
		super(message);
		this.name = "NodebookError";
	}
	delete() {
		
	}
}
module.exports = {
	NodebookError
}