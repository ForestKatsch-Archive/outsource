
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
    loaded("ui");
}

function ui_clear() {
    ui.cc.fillStyle="#ddd";
    ui.cc.fillRect(0,0,ui.cc.canvas.width,ui.cc.canvas.height);
}

function ui_draw_head(type,size) {
    if(size == undefined)
	size=1;
    if(type == "bald") {
	ui.cc.beginPath();
	ui.cc.fillStyle="#da7";
	ui.cc.arc(0,0,u(0.3*size),0,Math.PI*2);
	ui.cc.fill();
	ui.cc.beginPath();
	ui.cc.fillStyle="#fff";
	ui.cc.arc(u(-0.1*size),u(-0.1*size),u(0.1*size),0,Math.PI*2);
	ui.cc.fill();
    }
}

function ui_draw_body(color,size) {
    if(size == undefined)
	size=1;
    if(color == undefined) {
	color="#555";
    } else if(color == "dark-suit") {
	color="#555"
    } else if(color == "light-suit") {
	ui_draw_body("#aaa",size);
	color="#fff";
	size*=0.9
    }
    ui.cc.beginPath();
    ui.cc.fillStyle=color;
    ui.cc.arc(0,0,u(0.45*size),0,Math.PI*2);
    ui.cc.fill();
}

function ui_draw_ceo(c) {
    ui_draw_body("dark-suit");
    ui_draw_head("bald");
}

function ui_draw_cell(c) {
    if(c.type == CEO)
	ui_draw_ceo(c);
}

function ui_draw_grid() {
    ui.cc.strokeStyle="#bbb";
    ui.cc.lineWidth=1;
    ui.cc.beginPath();
    ui.cc.moveTo(u(-0.5)-0.5,u(0.5)+0.5);
    ui.cc.lineTo(u(-0.5)-0.5,u(-0.5)-0.5);
    ui.cc.lineTo(u(0.5)+0.5,u(-0.5)-0.5);
    ui.cc.stroke();
}

function ui_draw_grids(c) {
    for(var y=0;y<tower.size.y+1;y++) {
	for(var x=0;x<tower.size.x+1;x++) {
	    ui.cc.save();
	    ui.cc.translate(u(x),u(y));
	    ui_draw_grid();
	    ui.cc.restore();
	}
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

function ui_draw_active() {
    ui.cc.save();
    ui.cc.translate(u(ui.active[0])-0.5,u(ui.active[1])-0.5);
    ui.cc.fillStyle="#555";
    ui.cc.globalAlpha=0.25;
    ui.cc.fillRect(u(-0.5),u(-0.5),u(1),u(1));
    ui.cc.restore();
}

function ui_update() {
    ui_clear();
    ui_draw_grids();
    ui_draw_cells();
    ui_draw_active();
}