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


		//drow the cells
		this.draw();
		//pant the mines on the cells
		this.plantMines();
	}//init


	this.draw=function(){
		this.element.innerHTML = "";
		var cell;

		for (var x = 0; x < this.rows; x++) {
			this.cells[x] = [];
			for (var y = 0; y < this.cols; y++) {
				cell = document.createElement('span');
				cell.className = 'cell';
				cell.setAttribute('x', x);
				cell.setAttribute('y', y);
				this.element.appendChild(cell);
				this.cells[x][y] = new Cell(cell, x, y);
			}
		//to add space between the row's cells
		this.appendClearfixElement();
		}
		//to add space between the col's cells
		this.appendClearfixElement();
	}

   this.appendClearfixElement = function() {
      var element = document.createElement('div');
      element.classList.add('clearfix');
      this.element.appendChild(element);
   }

   /**distribute the mines randomly***/
   this.plantMines = function() {
      var plantedMines = 0;
      var xArr=[];
      var yArr=[];
      var cell;
      while (plantedMines < this.mineCount) {
         xArr=this.getRandomNumbersArr(this.rows);
         console.log("x arr: "+xArr);
         yArr=this.getRandomNumbersArr(this.cols);
         console.log("x arr: "+yArr);
         for(var r=0 ; r < this.mineCount; r++){
               cell = this.cells[xArr[r]][yArr[r]];
               if (! cell.isMine) {
                  cell.setMine();
                  plantedMines++;
                  console.log("mine: "+plantedMines);   
               }
         }
      }
   }//plantMines

   //generate random integers for mine's index
   this.getRandomNumbersArr=function(maxRow)
   {
      var minesRows=[];
      var infiniteLoop=0;
      while(minesRows.length < this.mineCount){
          var randomNumber = Math.ceil(Math.random()*maxRow-1);
          //var randomNumber = Math.floor(Math.random() * (maxRow - 1)) + 1;
          if(minesRows.indexOf(randomNumber) > -1){
            infiniteLoop++;
            continue;
          } 
          minesRows[minesRows.length] = randomNumber;
         }
      return minesRows;
   }
}//Board