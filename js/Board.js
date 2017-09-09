var Board = function(element){

	//assign the selector element
	this.element = element;

	//define the basic components of the board
	this.rows=0;
	this.cols=0;
	this.dimension = 0;
	this.mineCount = 0;
	this.cells = [];

	//initilize the Board object
	this.init = function(rows,cols,dimension, mineCount){

		this.rows=rows;
		this.cols=cols;

		this.dimension=dimension;
		this.mineCount=mineCount;

	}//init
}