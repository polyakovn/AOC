let fs = require("fs");
let text = fs.readFileSync("input.txt").toString('utf-8');;
let records = text.split("\n");

records = records.sort();

let guard_sleeptime = {};
let guard_mintimes = {};
let longest_sleep = [0,0];
const id_pattern = /\#(.*?)\ /;
const min_pattern = /\:(.*?)\]/;


function get_guard(){
    for(let i=0; i<records.length; i++) {
        if (records[i].toString().includes('Guard')){
            let guard_id = id_pattern.exec(records[i])[1];
            var sleep = find_mins_asleep(i);
            if(guard_id in guard_sleeptime) {
                guard_sleeptime[guard_id] += sleep.time_asleep();
                guard_mintimes[guard_id].push.apply(guard_mintimes[guard_id], sleep.sleeping_times()); 
            } else {
                guard_sleeptime[guard_id] = sleep.time_asleep();
                guard_mintimes[guard_id] = sleep.sleeping_times();
            }
            if(guard_sleeptime[guard_id] > longest_sleep[1]){
                longest_sleep[0] = guard_id;
                longest_sleep[1] = guard_sleeptime[guard_id];
            }
            i = sleep.index_stopped()-1;
        }
    }
    return longest_sleep[0];
}

function find_mins_asleep(record_num) {
    let sleeping_times = [];
    let time_asleep = 0;
    for(let r = record_num + 1; r<records.length; r++) {
        if(records[r].toString().includes('falls asleep')){
            let start_time = parseInt(min_pattern.exec(records[r])[1]);
            let end_time = parseInt(min_pattern.exec(records[r+1])[1]);
            time_asleep += end_time - start_time;
            for(let t = start_time; t<end_time; t++) {
                sleeping_times.push(t);
            }    
        } else if(records[r].toString().includes('Guard') || r == records.length-1) {
            return {
                time_asleep: function () {
                    return time_asleep;
                },
                index_stopped: function () {
                    return r;
                },
                sleeping_times: function () {
                    return sleeping_times;
                }
            }
        }
    }
} 

function find_highest_min(guard_arr) {
    let min_dict = {}
    let highest_pair = [0,0];
    for(let i=0; i<guard_arr.length; i++) {
        if(guard_arr[i] in min_dict) {
            min_dict[guard_arr[i]] += 1;
        } else {
            min_dict[guard_arr[i]] = 1;
        }

        if(min_dict[guard_arr[i]] > highest_pair[1]) {
            highest_pair[0] = guard_arr[i];
            highest_pair[1] = min_dict[guard_arr[i]];
        }

    }
    return(highest_pair[0]);

}
let longest_sleeper = guard_mintimes[get_guard()];
console.log(find_highest_min(longest_sleeper));