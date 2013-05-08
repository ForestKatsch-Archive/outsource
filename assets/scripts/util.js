
function distance(a,b) {
    var x=a[0]-b[0];
    var y=a[1]-b[1];
    return Math.sqrt(x*x*y*y);
}

function s(i) {
    if(i == 1)
	return "";
    else
	return "s";
}

function choose(l) {
    return l[Math.floor(Math.random()*l.length)];
}