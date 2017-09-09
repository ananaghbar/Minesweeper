var Cell = function(element,x,y){
	this.element = element;
	this.x = x;
	this.y = y;
	this.isMine = false;
	this.isOpened = false;
	this.isFlagged = false;
	this.isEmpty = false;
	this.mineCount = 0;


	/*Set a mine in the cell*/
	this.setMine = function(){
		this.isMine=true;
	}

	/*set the open flag**/
	this.setOpened = function(){
		this.isOpened=true;
		//to change the style of the cell 
		this.element.classList.add('is-opened');
	}
	/*set the flagged flag*=>right clicked*/
	this.setFlagged = function(){
		this.isFlagged=true;
		//to change the style of the cell 
		this.element.classList.add('fa');
		this.element.classList.add('fa-flag');
	}
   	this.setUnflagged = function(){

      this.isFlagged = false;
      this.element.classList.remove('fa');
      this.element.classList.remove('fa-flag');
   	}

	this.open = function (){

      this.setOpened();

      if (this.isMine) {
         this.element.classList.add('fa');
         this.element.classList.add('fa-bomb');
         return this.element.classList.add('is-mine');
      }

      if (this.isEmpty) {
         return this.element.classList.add('is-empty');
      }

      //set the number of the sibllings
      this.element.textContent = this.mineCount;		
	}
}