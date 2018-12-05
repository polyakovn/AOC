let fs = require("fs");
let text = fs.readFileSync("input.txt").toString('utf-8');
let num_array = text.split("\n");

let result = 0;
num_array.forEach(function(element) {
	let operator = element.charAt(0);
	let num = parseInt(element.substring(1,element.length));
	if(operator == '+') {
		result += num;
	} else if(operator =='-') {
		result -= num;
	}
});

console.log(result);
