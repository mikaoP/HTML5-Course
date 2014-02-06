function Map () {
	this.cells = {};
}
Map.prototype.getCellAt = function (pos) {

	var cell = this.cells[pos];

	if (cell === undefined) {
		cell = new Cell ();
		this.cells[pos] = cell;
	}
	
	return cell;
}