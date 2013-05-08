
var ui={};

function u(v) {
    return tower.size.cell*v;
}

function ui_init() {
    ui.active=[-1,-1];
    ui.cc=$("#c").get(0).getContext("2d");
    $(window).mousemove(function(e) {
	var o=$("#c").offset();
	var x=Math.floor(((e.pageX-o.left)/tower.size.cell)+0.5);
	var y=Math.floor(((e.pageY-o.top)/tower.size.cell)+0.5);
	ui.active=[x,y];
    });
    $("#c").mousedown(function(e) {
	var o=$("#c").offset();
	var x=Math.floor(((e.pageX-o.left)/tower.size.cell)+0.5);
	var y=Math.floor(((e.pageY-o.top)/tower.size.cell)+0.5);
	if(!tower_is_empty(x,y))
	    return;
	if(employees.selected == -1)
	    return;
	if(employees.for_hire[employees.selected].salary > tower.money)
	    return;
	var e=employee_hire();
	var c=new Cell(EMPLOYEE,e,[x,y]);
	tower_add_cell(c);
    });
    loaded("ui");
}

function ui_clear() {
    ui.cc.fillStyle="#ddd";
    ui.cc.fillRect(0,0,ui.cc.canvas.width,ui.cc.canvas.height);
}

function ui_draw_head(type,size) {
    ui.cc.globalAlpha=1;
    if(size == undefined)
	size=1;
    size*=0.8;
    if(type == "bald") {
	ui.cc.beginPath();
	ui.cc.fillStyle="#da7";
	ui.cc.arc(0,0,u(0.3*size),0,Math.PI*2);
	ui.cc.fill();
	ui.cc.beginPath();
	ui.cc.fillStyle="#fff";
	ui.cc.arc(u(-0.1*size),u(-0.1*size),u(0.1*size),0,Math.PI*2);
	ui.cc.fill();
    } else if(type == "white") {
	size*=0.6;
	ui.cc.beginPath();
	ui.cc.fillStyle="#eee";
	ui.cc.arc(0,0,u(0.3*size),0,Math.PI*2);
	ui.cc.arc(3,3,u(0.3*size),0,Math.PI*2);
	ui.cc.arc(-3,3,u(0.3*size),0,Math.PI*2);
	ui.cc.arc(-3,-3,u(0.3*size),0,Math.PI*2);
	ui.cc.arc(3,-3,u(0.3*size),0,Math.PI*2);
	ui.cc.fill();
	ui.cc.beginPath();
	ui.cc.fillStyle="#ccc";
	ui.cc.arc(u(-0.1*size),u(-0.1*size),u(0.1*size),0,Math.PI*2);
	ui.cc.fill();
    } else if(type == "black") {
	ui.cc.beginPath();
	ui.cc.fillStyle="#000";
	ui.cc.arc(0,0,u(0.3*size),0,Math.PI*2);
	ui.cc.fill();
	ui.cc.beginPath();
	ui.cc.fillStyle="#444";
	ui.cc.arc(u(-0.1*size),u(-0.1*size),u(0.1*size),0,Math.PI*2);
	ui.cc.fill();
    } else if(type == "brown") {
	ui.cc.beginPath();
	ui.cc.fillStyle="#873";
	ui.cc.arc(0,0,u(0.3*size),0,Math.PI*2);
	ui.cc.fill();
    } else if(type == "red") {
	ui.cc.beginPath();
	ui.cc.fillStyle="#f62";
	ui.cc.arc(0,0,u(0.3*size),0,Math.PI*2);
	ui.cc.fill();
    } else if(type == "blond") {
	size*=0.6;
	ui.cc.beginPath();
	ui.cc.fillStyle="#fda";
	ui.cc.arc(0,0,u(0.3*size),0,Math.PI*2);
	ui.cc.arc(3,3,u(0.3*size),0,Math.PI*2);
	ui.cc.arc(-3,3,u(0.3*size),0,Math.PI*2);
	ui.cc.arc(-3,-3,u(0.3*size),0,Math.PI*2);
	ui.cc.arc(3,-3,u(0.3*size),0,Math.PI*2);
	ui.cc.fill();
    }
}

function ui_draw_body(color,size) {
    ui.cc.globalAlpha=1;
    ui.cc.save();
    if(size == undefined)
	size=1;
    ui.cc.scale(1,1);
    if(color == undefined) {
	color="#555";
    } else if(color == "dark-suit") {
	color="#555"
    } else if(color == "dark-tee") {
	color="#555"
    } else if(color == "light-tee") {
	ui_draw_body("dark-tee",size);
	size*=0.95;
	color="#fdc"
    } else if(color == "color-tee") {
	color="#f57"
    } else if(color == "light-suit") {
	ui_draw_body("#aaa",size);
	color="#fff";
	size*=0.9;
    }
    size*=0.8;
    ui.cc.beginPath();
    ui.cc.fillStyle=color;
    ui.cc.arc(0,0,u(0.45*size),0,Math.PI*2);
    ui.cc.fill();
    ui.cc.restore();
}

function ui_draw_ceo(c) {
    ui_draw_body("dark-suit",1.5);
    ui_draw_head("bald",1.5);
}

function ui_draw_fire_ray(c) {
    ui.cc.globalAlpha=c.power;
    ui.cc.beginPath();
    ui.cc.strokeStyle="#f66";
    ui.cc.lineWidth=5;
    ui.cc.lineCap="round";
    ui.cc.moveTo(0,0);
    ui.cc.lineTo(u(buyers.buyers[c.target].position[0]-c.position[0]),u(buyers.buyers[c.target].position[1]-c.position[1]));
    ui.cc.stroke();
}

function ui_draw_fire_field(c) {
    ui.cc.globalAlpha=c.power*0.5;
    ui.cc.beginPath();
    ui.cc.strokeStyle="#f66";
    ui.cc.lineWidth=5;
    ui.cc.arc(0,0,
	      u(range[c.info.job][1]),
	      0,Math.PI*2);
    ui.cc.stroke();
    ui.cc.globalAlpha*=0.5;
    ui.cc.fillStyle="#f66";
    ui.cc.fill();
}

function ui_draw_employee(c) {
    if(c.info.working == false)
	ui.cc.globalAlpha=0.2;
    else
	ui.cc.globalAlpha=1;
    if(range[c.info.job][0] == true) {
	if(c.target in buyers.buyers)
	    ui_draw_fire_ray(c);
    } else {
	ui_draw_fire_field(c);
    }
    ui_draw_body(c.info.body[0]);
    ui_draw_head(c.info.body[1]);
}

function ui_draw_cell(c) {
    if(c.type == CEO)
	ui_draw_ceo(c);
    else if(c.type == EMPLOYEE)
	ui_draw_employee(c);
}

function ui_draw_grid() {
}

function ui_draw_grids(c) {
    ui.cc.strokeStyle="#bbb";
    ui.cc.lineWidth=1;
    for(var y=0;y<tower.size.y+1;y++) {
	ui.cc.save();
	ui.cc.translate(0,u(y));
	ui.cc.beginPath();
	ui.cc.moveTo(-0.5,u(0.5)-0.5);
	ui.cc.lineTo(ui.cc.canvas.width+0.5,u(0.5)-0.5);
	ui.cc.stroke();
	ui.cc.restore();
    }
    for(var x=0;x<tower.size.x+1;x++) {
	ui.cc.save();
	ui.cc.translate(u(x),0);
	ui.cc.beginPath();
	ui.cc.moveTo(u(0.5)-0.5,-0.5);
	ui.cc.lineTo(u(0.5)-0.5,ui.cc.canvas.height+0.5);
	ui.cc.stroke();
	ui.cc.restore();
    }
}

function ui_draw_cells() {
    for(var i=0;i<tower.cells.length;i++) {
	var c=tower.cells[i];
	ui.cc.save();
	ui.cc.translate(u(c.position[0])-0.5,u(c.position[1])-0.5);
	ui_draw_cell(c);
	ui.cc.restore();
    }
}

function ui_draw_buyer(b) {
    var w=2;
    ui.cc.globalAlpha=Math.max(b.energy,0);
    ui.cc.lineWidth=w;
    ui.cc.beginPath();
    ui.cc.fillStyle="#555";
    ui.cc.arc(0,0,u(0.5)+0.5,0,Math.PI*2);
    ui.cc.fill();
    ui.cc.beginPath();
    ui.cc.fillStyle="#f00";
    ui.cc.strokeStyle="#fff";
    ui.cc.arc(0,0,u(0.35)+0.5-w/2,0,Math.PI*2);
    ui.cc.fill();
    ui.cc.stroke();
}

function ui_draw_buyers() {
    for(var i in buyers.buyers) {
	var b=buyers.buyers[i];
	ui.cc.save();
	ui.cc.translate(u(b.position[0])-0.5,u(b.position[1])-0.5);
	ui_draw_buyer(b);
	ui.cc.restore();
    }
}

function ui_draw_active() {
    if(employees.selected == -1)
	return;
    ui.cc.save();
    ui.cc.translate(u(ui.active[0])-0.5,u(ui.active[1])-0.5);
    if(tower_is_empty(ui.active[0],ui.active[1]))
	ui.cc.fillStyle="#000";
    else
	ui.cc.fillStyle="#f00";
    if(employees.for_hire[employees.selected].salary > tower.money)
	ui.cc.fillStyle="#f00";
    ui.cc.globalAlpha=0.25;
    ui.cc.fillRect(u(-0.5)-0.5,u(-0.5)-0.5,u(1)+1,u(1)+1);
    ui.cc.restore();
}

function ui_update() {
    ui_clear();
    ui_draw_grids();
    ui_draw_cells();
    ui_draw_buyers();
    ui_draw_active();
    var m="";
    if(tower.money < 0) {
	$("#info .money").addClass("unpaid");
	m="-";
    }
    $("#info .money").text(m+"$"+Math.abs(Math.round(tower.money)));
    if(employees.unpaid > 0)
	$("#info .money").addClass("unpaid");
}