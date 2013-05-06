
var CEO=0;
var HALL=1;
var EMPLOYEE=2;

var Cell=function(type,position) {
    this.type=type;
    this.position=position;
};

var tower={
    cells:[
	
    ],
    size:{
	x:32,
	y:24,
	cell:20
    }
};

function tower_init() {
    tower_add_cell(new Cell(CEO,[16,12]));
    loaded("tower");
}

function tower_add_cell(cell) {
    tower.cells.push(cell);
}

function tower_update() {

}