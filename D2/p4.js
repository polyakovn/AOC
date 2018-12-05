let fs = require("fs");
let text = fs.readFileSync("input.txt").toString('utf-8');
let box_ids = text.split("\n");

function find_common_string(box_ids){
	for(let i=0; i<box_ids.length; i++) {
		let box1 = box_ids[i];
		for(let j=1; j<box_ids.length; j++) {
			let box2 = box_ids[j];
			let is_similar = is_common(box1,box2).common();
			let common_chars = is_common(box1,box2).common_s();
			if(is_similar){
				return(common_chars);
			}
		}
	}
}

function is_common(box1, box2) {
	let num_differences = 0;
	let difference_index = 0;
	let common_string = box1;
	let is_similar = true;
	for(let i=0; i<box1.length; i++) {
		if(box1.charAt(i) != box2.charAt(i)) {
			num_differences += 1;
			difference_index = i;
		}
		if(num_differences > 1) {
			is_similar = false;
			break;
		}
	} 
	if(num_differences == 0) {
		is_similar = false;
	}

	if(num_differences == 1) {
		common_string = common_string.slice(0,difference_index) + common_string.slice(difference_index+1);
	}

	return {
		common: function() {
			return is_similar;
		},
		common_s: function() {
			return common_string;
		}
	}
}

console.log(find_common_string(box_ids));