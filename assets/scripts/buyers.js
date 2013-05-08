
var Buyer=function(position) {
    this.position=position;
    this.energy=1;
    this.update=function() {
	if(this.energy < 0)
	    return true;
	var ceo=tower_ceo().position;
	var me=this.position;
	var rotation=Math.atan2(me[1]-ceo[1],me[0]-ceo[0]);
	var speed=0.05;
	if(distance(ceo,me) < 0.0005) {
	    console.log("HIT!!");
	    this.position=ceo;
	    tower.money-=1;
	    this.energy-=0.05;
	    tower_ceo().info.energy-=0.01;
	} else {
	    this.position[0]-=Math.cos(rotation)*speed;
	    this.position[1]-=Math.sin(rotation)*speed;
	}
    };
};

var buyers={
    buyers:{},
    id:0,
    timeout:5000
};

function buyers_init() {
    buyer_new();
    loaded("buyers");
    setTimeout(buyer_new,buyers.timeout);
}

function buyer_new() {
    var b;
    if(Math.floor(Math.random()*2) == 0) {
	if(Math.floor(Math.random()*2) == 0)
	    b=new Buyer([Math.floor(Math.random()*tower.size.x),-1]);
	else
	    b=new Buyer([Math.floor(Math.random()*tower.size.x),tower.size.y+2]);
    } else {
	if(Math.floor(Math.random()*2) == 0)
	    b=new Buyer([-1,Math.floor(Math.random()*tower.size.y)]);
	else
	    b=new Buyer([tower.size.x+2,Math.floor(Math.random()*tower.size.y)]);
    }
    buyers.buyers[buyers.id]=b;
    buyers.id+=1;
    setTimeout(buyer_new,buyers.timeout);
    buyers.timeout*=0.99;
    buyers.timeout=Math.max(buyers.timeout,100);
}

function buyers_update() {
    for(var i in buyers.buyers) {
	var b=buyers.buyers[i];
	if(b.update() == true) {
	    delete buyers.buyers[i];
	}
    }
}