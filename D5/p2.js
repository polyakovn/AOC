let fs = require("fs");
let text = fs.readFileSync("input.txt").toString("utf-8");

let shortest_polymer_length = 100000;
for(let i=0; i<26; i++) {
    let temp_text = text;
    let letter = String.fromCharCode(i + 65);
    let regex = new RegExp(letter, 'gi');
    temp_text = temp_text.replace(regex,"");
    let cur_length = make_polymer_reaction(temp_text);
    if(cur_length < shortest_polymer_length) {
        shortest_polymer_length = cur_length;
    }
}
console.log(shortest_polymer_length);



function make_polymer_reaction(text){
    let left_p = 0;
    let right_p = 1;
    while(right_p < text.length) {
        let char1 = text.charAt(left_p);
        let char2 = text.charAt(right_p);
        if(is_match(char1, char2)) {
            text = text.slice(0,left_p) + text.slice(right_p+1);
            if(left_p > 0) {
                left_p = left_p-1;
                right_p = right_p-1;
            }
        } else {
            left_p++;
            right_p++;
        }
    }
    return text.length;
}

function is_match(char1, char2) {
     let utf_diff = Math.abs(char1.charCodeAt(0) - char2.charCodeAt(0));
     if(utf_diff === 32) {
         return true;
     }
     return false;
}


