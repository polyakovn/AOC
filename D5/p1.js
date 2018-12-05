let fs = require("fs");
let text = fs.readFileSync("input.txt").toString("utf-8");

function make_polymer_reaction(){
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

console.log(make_polymer_reaction());