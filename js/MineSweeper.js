// defualt values

var ROWS=9;
var COLS=9;
var MINES=8;


//max values
var MAX_ROWS=30;
var MAX_COLS=30;


//define the MineSweeper Object

var MineSweeper = function(row,col,mines){
	//define the selectors for the main game's component:
	var selBoard = '.board';
	var selTimer = '.time';
	var selMine = '.mines-count';
	var selRestartButton ='.restart-button';

	var selRow ='.row';
	var selCol = '.col';
	var selMines = '.mines';
	var selStartButton = '.start';

	//push the game's component into the components obj
	this.components = {};
	this.components.board = document.querySelector(selBoard);
	this.components.time = document.querySelector(selTimer);
	this.components.mine = document.querySelector(selMine);
	this.components.restartButton = document.querySelector(selRestartButton);


	this.components.row= document.querySelector(selRow);
	this.components.col= document.querySelector(selCol);
	this.components.mines= document.querySelector(selMines);
	this.components.startButton= document.querySelector(selStartButton);

	this.dimension = 0;
	this.mineCount = 0;
	this.timer = null;


	this.isMineSweeperOver = false;
	this.initialize = false;
	this.time = 0;
	this.leftMineCount = this.mineCount;

	//create new object of Board 
	this.board = new Board(this.components.board);

	//assign the rows,cols,mines to object's property
	this.generateGame(row,col,mines);
	this.init();
}



//add new method "property" to "MineSweeper" object to generate new game
MineSweeper.prototype.generateGame = function(rows,cols,mines) {
   this.dimension = rows*cols;
   this.mineCount = mines;
}

////add new method "property" to "MineSweeper" object to initialize new game
MineSweeper.prototype.init = function() {
   this.isMineSweeperOver = false;
   this.time = 0;
   this.components.time.textContent = 0;
   this.components.mine.textContent = this.mineCount;
   this.leftMineCount = this.mineCount;


   var rows=this.components.row.value;
   var cols=this.components.col.value;


   //initialize the board object
   this.board.init(rows,cols,this.dimension, this.mineCount);
   
   if (! this.initialize) {
   		//assign the events with their handlers
      this.eventsHandlers();
   }

   this.initialize = true;
}


MineSweeper.prototype.eventsHandlers = function() {

   this.components.restartButton.addEventListener('click', this.restartClickHandler.bind(this));
   this.components.startButton.addEventListener('click', this.startClickHandler.bind(this));
   this.board.element.addEventListener('click', this.leftClickHandler.bind(this));
   this.board.element.addEventListener('contextmenu', this.rightClickHandler.bind(this));
}

/*events handler functions*/

MineSweeper.prototype.restartClickHandler = function() {

   this.components.row.value=ROWS;
   this.components.col.value=COLS;
   this.components.mines.value=MINES;
   new MineSweeper(ROWS,COLS,MINES);
}

//timer functions
MineSweeper.prototype.startTimer = function() {
   this.timer = setInterval(function() {
      ++this.time;
      this.components.time.textContent = this.time;
   }.bind(this), 1000);
}

MineSweeper.prototype.stopTimer = function() {
   clearInterval(this.timer);
}
/********/
MineSweeper.prototype.startClickHandler = function(){

   var rows=this.components.row.value;
   var cols=this.components.col.value;
   var mines=this.components.mines.value;
   if(mines >= Math.min(rows,cols)){
      alert("The number of the mines should be less than: "+Math.min(rows,cols));
      return;
   }
   if(rows ==0){
      alert("The number of the rows should be greater than ZERO");
      return;
   }
   if(cols ==0){
      alert("The number of the cols should be greater than ZERO");
      return;
   }
   if(rows ==0){
      alert("The number of the mines should be greater than ZERO");
      return;
   }
   if(rows > MAX_ROWS){
      alert("Max. number of rows = "+MAX_ROWS);
      return;
   }
   if(rows > MAX_COLS){
      alert("Max. number of rows = "+MAX_ROWS);
      return;
   }   
   this.generateGame(rows,cols,mines);
   this.init();
}


//open the cell function 
MineSweeper.prototype.leftClickHandler = function(event) {
   if (this.isMineSweeperOver || ! event.target.classList.contains('cell')) {
      return;
   }

   var cell = this.findCellByEvent(event);

   if (this.time == 0) {
      this.startTimer();
   }

   if (cell.isFlagged) {
      return;
   }

   if (cell.isMine) {
      cell.element.classList.add('is-clicked');
      return this.MineSweeperIsover();
   }

   cell.open();

   if (cell.isEmpty) {
      this.board.openCellSibllings(cell);
   }

   if (this.isWin()) {
      return this.MineSweeperIsover(true);
   }
}

//return the clicked cell
MineSweeper.prototype.findCellByEvent = function(event) {
   var x = event.target.getAttribute('x');
   var y = event.target.getAttribute('y');
   return this.board.cells[x][y];
}

//to check if the game is over!
MineSweeper.prototype.MineSweeperIsover = function(isWin) {

   var win = isWin || false;

   this.stopTimer();
   this.isMineSweeperOver = true;
   this.board.open();
	   if (win){
	      alert('You win!');
	   	}
}

MineSweeper.prototype.isWin = function() {
   return this.board.getNotOpenedCells().length <= this.mineCount;
}


//to set the flag
MineSweeper.prototype.rightClickHandler = function(event) {
   event.preventDefault();

   if (this.isMineSweeperOver || ! event.target.classList.contains('cell')) {
      return;
   }

   var cell = this.findCellByEvent(event);

   if (cell.isFlagged) {
      this.increaseLeftMineCount();
      cell.setUnflagged();
   } else {
      this.decrementLeftMineCount();
      cell.setFlagged();
   }
}

MineSweeper.prototype.decrementLeftMineCount = function() {
   this.leftMineCount--;
   this.components.mine.textContent = this.leftMineCount;
}

MineSweeper.prototype.increaseLeftMineCount = function() {
   this.leftMineCount++;
   this.components.mine.textContent = this.leftMineCount;
}
