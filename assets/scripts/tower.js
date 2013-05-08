
var CEO=0;
var HALL=1;
var EMPLOYEE=2;

// ray == true, force field == false
// distance
// energy per second

var range={
    "marketer":[true,3,20],
    "engineer":[true,4,100],
    "sales":[false,1.5,100],
    "manager":[false,2,100],
    "secretary":[true,3,10],
    "godzilla":[true,10,100],
};

var PAYDAY=10; // seconds between invoices

var Cell=function(type,info,position) {
    this.type=type;
    this.info=info;
    this.position=position;
    this.rotation=0;
    this.firing=false;
    this.target=-1;
    this.power=0; // for fade in/out
    this.last_update=new Date().getTime();
    this.update=function() {
	if(this.type == EMPLOYEE && this.info.working == false)
	    return;
	if(this.type == CEO)
	    return;
	var time=new Date().getTime();
	if(range[this.info.job][0] == true) {
	    var closest_buyer=-1;
	    var closest_buyer_distance=Infinity;
	    for(var i in buyers.buyers) {
		var b=buyers.buyers[i];
		var d=distance(b.position,this.position);
		if(d < closest_buyer_distance) {
		    closest_buyer=i;
		    closest_buyer_distance=d;
		}
	    }
	    this.target=closest_buyer;
	    if(this.target == -1) {
		return;
	    }
	    if(distance(buyers.buyers[this.target].position,this.position) < (range[this.info.job][1])) {
		this.firing=true;
		this.power+=0.05;
	    } else {
		this.firing=false;
		this.power-=0.05;
	    }
	    if(this.firing)
		buyers.buyers[this.target].energy-=((time-this.last_update)/1000)*((range[this.info.job][2])/100);
	} else {
	    this.firing=false;
	    for(var i in buyers.buyers) {
		var b=buyers.buyers[i];
		var d=distance(b.position,this.position);
		if(d < range[this.info.job][1]) {
		    this.power+=0.05;
		    this.firing=true;
		    b.energy-=((time-this.last_update)/1000)*((range[this.info.job][2])/100);
		}
	    }
	    if(this.firing == false)
		    this.power-=0.05;
	}
	this.power=Math.min(Math.max(this.power,0),1)
	this.last_update=time;
    };
};

var tower={
    cells:[
	
    ],
    money:250,
    size:{
	x:16,
	y:12,
	cell:40
    }
};

function tower_init() {
    tower_add_cell(new Cell(CEO,{body:["dark-suit","bald"]},[8,6]));
    loaded("tower");
}

function tower_ceo() {
    for(var i=0;i<tower.cells.length;i++) {
	var c=tower.cells[i];
	if(c.type == CEO)
	    return c;
    }
}

function tower_is_empty(x,y) {
    for(var i=0;i<tower.cells.length;i++) {
	var c=tower.cells[i];
	if(c.position[0] == x && c.position[1] == y)
	    return false;
    }
    return true;
}

function tower_add_cell(cell) {
    tower.cells.push(cell);
}

function tower_update() {
    for(var i=0;i<tower.cells.length;i++) {
	var c=tower.cells[i];
	var time=new Date().getTime();
	if(c.info.last_paid+PAYDAY*1000 < time) {
	    tower.money+=advantage[c.info.job]*c.info.salary;
	    c.info.last_paid=time;
	    if(c.info.invoice() == true) {
		tower.cells.splice(i,1); // employee quit
	    }
	}
	c.update();
    }
    tower.money=parseFloat((tower.money).toFixed(3));
}