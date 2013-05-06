
function s(i) {
    if(i == 1)
	return "";
    else
	return "s";
}

var VERSION=[0,0,1];

var modules=["main","ui","tower","employees"];
var module_number=0;
var module_start_time;

function loaded(module) {
    if(!(module in modules))
	throw "ModuleError: nonexistent module '"+module+"'";
    if(modules[module] == true)
	throw "ModuleError: module '"+module+"' was loaded multiple times";
    console.log("Loaded "+module);
    module_number+=1;
    modules[module]=true;
    for(var i in modules) {
	if(modules[i] == false)
	    return;
    }
    done();
}

function init() {
    module_start_time=new Date().getTime();
    var m={};
    for(var i=0;i<modules.length;i++)
	m[modules[i]]=false;
    modules=m;
}

window.onload=function() {
    init();
    setTimeout(function() {
	ui_init();
	tower_init();
	employees_init();
	loaded("main");
    },0);
};

function done() {
    var time=new Date().getTime()-module_start_time;
    time=(time/1000).toFixed(3);
    console.log("Loaded "+module_number+" module"+s(module_number)+" in "+time+" second"+s(time))
    update();
}

function update() {
    requestAnimationFrame(update);
    tower_update();
    employees_update();
    ui_update();
}