var Cell = function(element,x,y){
	this.element = element;
	this.x = x;
	this.y = y;
	this.isMine = false;
	this.isOpened = false;
	this.isFlagged = false;
	this.isEmpty = false;
	this.mineCount = 0;
}