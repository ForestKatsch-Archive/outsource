
var salaries={
    "marketer":[100,50],
    "engineer":[130,60],
    "sales":[90,20],
    "manager":[300,50],
    "secretary":[70,20],
    "godzilla":[1000,100]
};

var advantage={
    "marketer":1.5,
    "engineer":2,
    "sales":1.5,
    "manager":0,
    "secretary":0.5,
    "godzilla":0.5,
}

var bodies={
    "marketer":["light-tee","red"],
    "engineer":["color-tee","white"],
    "sales":["dark-suit","black"],
    "manager":["dark-suit","bald"],
    "secretary":["dark-tee","blond"],
    "godzilla":["light-tee","bald"]
};

var jobs=[
    "marketer",
    "engineer",
    "sales",
    "secretary",
    "manager",
    "godzilla",
];

var names={
    first:[
	"Dwight",
	"Robert",
	"Joe",
	"Bill",
	"John",
	"Marcus",
	"Carrie",
	"Jacob",
	"Emily",
	"Daniel",
	"Jane",
	"Jessica",
	"Cindy"
    ],
    last:[
	"Doe",
	"Smith",
	"Johnson",
	"Daniels",
	"Roberts",
	"Anderson",
	"Jones",
	"Miller",
	"Adams",
	"Wilson",
	"White",
	"Lopez",
	"Atwood",
	"Bay",
	"Reynolds",
	"Noss",
	"Swigert",
    ]
};

var Employee=function(id,name,job,salary,body) {
    this.id=id;
    this.name=name;
    this.job=job;
    this.salary=salary;
    this.body=body;
    this.working=true;
    this.last_paid=-1;
    this.quit=function() {
	var q=Math.floor(Math.random()*50) == 0?true:false;
	if(q)
	    console.log(this.name+" has decided to quit the company.");
	return q;
    };
    this.invoice=function() {
	this.working=true;
	if(this.quit()) {
	    return true;
	} else if(tower.money-this.salary < 0) {
	    employees.unpaid+=1;
	    this.working=false;
	    console.log("The company can't afford to pay "+this.name+", "+this.job+".");
	} else {
	    employees.unpaid-=1;
	    tower.money-=this.salary;
	    console.log(this.name+", "+this.job+", was paid $"+this.salary);
	}
    };
};

var employees={
    for_hire:{
	
    },
    unpaid:0,
    selected:-1,
    id:0,
    dirty:false
};

function employees_init() {
    var min_for_hire=5;
    var max_for_hire=10;
    for(var i=Math.floor((Math.random()*(max_for_hire-min_for_hire))+min_for_hire);i>0;i--) {
	employee_add_random();
    }
    loaded("employees");
    setInterval(function() {
	employee_random_action();
    },10000);
}

function employee_random_action() {
    var remove_employee=Math.floor(Math.random()*4) == 0?true:false;
    if(remove_employee)
	employee_remove_random();
    else
	employee_add_random();
}

function employee_add_random() {
    var job=choose(jobs);
    var middle=choose("qwertyuiopasdfghjklcvbnmeaeaeaopoptgtgyalllanvl                                          ").toUpperCase();
    if(middle != " ")
	middle+=". "
    var name=choose(names.first)+" "+middle+choose(names.last);
    var e=new Employee(employees.id,name,
		       job,
		       Math.floor(salaries[job][0]+(Math.random()*salaries[job][1])-(salaries[job][1]/2)),
		       bodies[job]);
    employees.for_hire[employees.id]=e;
    employees.id+=1;
    employees.dirty=true;
}

function employee_hire() {
    var e=employees.for_hire[employees.selected];
    console.log(e.name+" has been hired by the company.");
    e.employed=true;
    e.last_paid=new Date().getTime();
    delete employees.for_hire[employees.selected];
    employees.selected=-1;
    employees.dirty=true;
    $("canvas").removeClass("employee-selected");
    return e;
}

function employee_remove_random() {
    var e_ids=[];
    for(var i in employees.for_hire)
	e_ids.push(i);
    if(e_ids.length == 0)
	return;
    var e=employees.for_hire[choose(e_ids)];
    if(e.id == employees.selected) {
	employees.selected=-1;
	$("canvas").removeClass("employee-selected");
    }
    console.log(e.name+" has found a job somewhere else.");
    delete employees.for_hire[e.id];
    employees.dirty=true;
}

function employees_update() {
    if(employees.dirty) {
	employees.dirty=false;
	$("#employees").empty();
	for(var i in employees.for_hire) {
	    var e=employees.for_hire[i];
	    $("#employees").append("<li id='employee-number-"+e.id+"' class='employee'>\n\
<span class='name'>"+e.name+"</span>\n\
<span class='job'>"+e.job+"</span>\n\
<span class='salary'>$"+e.salary+"</span>\n\
</li>");
	    if(employees.selected == i) {
		$(".employee#employee-number-"+i).addClass("selected");
	    }
	    $(".employee#employee-number-"+e.id).mouseup(function() {
		var id=parseInt(this.id.substr("employee-number-".length));
		$(".employee").removeClass("selected");
		$("canvas").removeClass("employee-selected");
		if(id == employees.selected) {
		    employees.selected=-1;
		} else {
		    $("canvas").addClass("employee-selected");
		    $(this).addClass("selected");
		    employees.selected=id;
		}
	    });
	}
    }
}
