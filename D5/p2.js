let fs = require("fs");
let text = fs.readFileSync("input.txt").toString("utf-8");

let shortest_polymer_length = 100000;
for(let i=0; i<26; i++) {
    let temp_text = text;
    let upper_case = String.fromCharCode(i + 65);
    let lower_case = String.fromCharCode(i + 65 + 32);
    let regex_lower = new RegExp(lower_case, 'g');
    let regex_upper = new RegExp(upper_case, 'g');
    temp_text = temp_text.replace(regex_lower,"");
    temp_text = temp_text.replace(regex_upper,"");
    let cur_length = make_polymer_reaction(temp_text);
    if(cur_length < shortest_polymer_length) {
        shortest_polymer_length = cur_length;
    }
}
console.log(shortest_polymer_length);



function make_polymer_reaction(temp_text){
    let left_p = 0;
    let right_p = 1;
    while(right_p < temp_text.length) {
        let char1 = temp_text.charAt(left_p);
        let char2 = temp_text.charAt(right_p);
        if(is_match(char1, char2)) {
            temp_text = temp_text.slice(0,left_p) + temp_text.slice(right_p+1);
            if(left_p > 0) {
                left_p = left_p-1;
                right_p = right_p-1;
            }
        } else {
            left_p++;
            right_p++;
        }
    }
    return temp_text.length;
}

function is_match(char1, char2) {
     let utf_diff = Math.abs(char1.charCodeAt(0) - char2.charCodeAt(0));
     if(utf_diff === 32) {
         return true;
     }
     return false;
}


