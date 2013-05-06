
var salaries={
    "marketer":[100,50],
    "engineer":[130,60],
    "sales":[90,20],
    "secretary":[70,20]
};

var jobs=[
    "marketer",
    "engineer",
    "sales",
    "secretary"
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
	"Jane",
	"Jessica",
	"Cindy"
    ],
    last:[
	"Doe",
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
};

var employees={
    for_hire:[
	
    ],
    id:0,
    dirty:false
};

function employees_init() {
    while(true) {
	employee_random();
	if(Math.floor(Math.random()*5) == 0)
	    break;
    }
    loaded("employees");
}

function employee_random() {
    var job=jobs[Math.floor(Math.random()*jobs.length)];
    var name="";
    name+=names.first[Math.floor(Math.random()*names.first.length)]+" ";
    name+=names.last[Math.floor(Math.random()*names.last.length)];
    var e=new Employee(employees.id,name,
		       job,
		       Math.floor(salaries[job][0]+(Math.random()*salaries[job][1])-(salaries[job][1]/2)),
		       ["dark-suit","bald"]);
    employees.id+=1;
    employees.dirty=true;
    employees.for_hire.push(e);
}

function employees_update() {
    if(employees.dirty) {
	$("#employees").empty();
	for(var i=0;i<employees.for_hire.length;i++) {
	    var e=employees.for_hire[i];
	    $("#employees").append("<li id='employee-number-"+e.id+"' class='employee'>\n\
<span class='name'>"+e.name+"</span>\n\
<span class='job'>"+e.job+"</span>\n\
<span class='salary'>$"+e.salary+"</span>\n\
</li>");
	}
    }
}
