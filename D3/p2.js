let fs = require("fs");
let text = fs.readFileSync("input.txt").toString('utf-8');;
let claims = text.split("\n");

//step 1: fill in matrix
let dim = 1500;
let fabric = new Array(dim).fill(0).map(() => new Array(dim).fill(0));
let pattern = /\#(\d+?) \@ (\d+?)\,(\d+?)\: (\d+?)x(\d+)/;
let num_duplicates = 0;
for (let c =0; c < claims.length; c++) {
	var match = pattern.exec(claims[c]);
	fill_fabric(parseInt(match[2]),parseInt(match[3]),parseInt(match[4]),parseInt(match[5]));
	var fabric_temp = fabric;
}
//console.log(fabric);
for (let c =0; c < claims.length; c++) {
	var match = pattern.exec(claims[c]);
	if(check_fabric(parseInt(match[2]),parseInt(match[3]),parseInt(match[4]),parseInt(match[5]))){
		console.log('here');
		console.log(c+1);
	}
}

function fill_fabric(left_edge, top_edge, rect_x, rect_y){
	for(let i=0; i<rect_x; i++){
		for(let j=0; j<rect_y; j++) {
			// console.log(i,j);
			if(fabric[i+left_edge][j+top_edge]==0) {
				fabric[i+left_edge][j+top_edge] = 1;
			} else if(fabric[i+left_edge][j+top_edge]==1){
				fabric[i+left_edge][j+top_edge] = 2;
				num_duplicates += 1;
			}
		}
	}
	return num_duplicates;
}

function check_fabric(left_edge, top_edge, rect_x, rect_y){
	for(var r=0; r<rect_x; r++) {
		for(var c=0; c<rect_y; c++) {
			if(fabric[r+left_edge][c+top_edge]===2){
				return false;
			} 
		}
	}
	return true;
}
