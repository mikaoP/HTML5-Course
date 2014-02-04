function Map () {
	this.cells = {};
}
Map.prototype.getCellAt = function (pos) {

	var index = pos.getIndex();
	var cell = this.cells[index];

	if (cell === undefined) {
		cell = new Cell ();
		this.cells[index] = cell;
	}
	
	return cell;

}