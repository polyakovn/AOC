let fs = require("fs");
let text = fs.readFileSync("input.txt").toString('utf-8');
let box_ids = text.split("\n");


function find_checksum(box_ids) {
	let num_doubles = 0;
	let num_triples = 0;
	box_ids.forEach(function(box_id){
		let letter_dict = {}
		for(let i=0; i<box_id.length; i++) {
			let cur_char = box_id.charAt(i);
			if(!letter_dict[cur_char]){
				letter_dict[cur_char] = 1;
			} else {
				letter_dict[cur_char] += 1;
			}
		}

		if(dict_has_val(letter_dict,'2')) {
			num_doubles += 1;
		}

		if(dict_has_val(letter_dict,'3')) {
			num_triples +=1;
		}

	});
	return num_doubles*num_triples;
}

function dict_has_val(dict_name, value) {
	for(key in dict_name) {
		if(dict_name[key]==value){
			return true;
		}
	}
	return false;
}

console.log(find_checksum(box_ids));