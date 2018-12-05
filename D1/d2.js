let fs = require("fs");
let text = fs.readFileSync("input.txt").toString('utf-8');
let num_array = text.split("\n");

// let num_array = ['+1','+2','+3','-2','-1']; //3

function find_duplicate(num_array){
	let cur_frequency = 0;
	let frequencies = [];
	let duplicate_found = false;

	while(!duplicate_found){
		for(let i=0; i<num_array.length; i++){
			let element = num_array[i]; 
			let operator = element.charAt(0) 
			let num = parseInt(element.substring(1,element.length));
			if(operator == '+') {
				cur_frequency += num;
				if(frequencies.includes(cur_frequency)) {
					return cur_frequency;
				}
				frequencies.push(cur_frequency);
			} else if (operator == '-') {
				cur_frequency -= num;
				if(frequencies.includes(cur_frequency)) {
					return cur_frequency;
				}
				frequencies.push(cur_frequency);
			}
		}
	}
}


console.log(find_duplicate(num_array));

