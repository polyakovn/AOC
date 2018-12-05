//of all guards - which guard is MOST FREQUENTLY asleep on the same minute?
//answer: guardID * minute they slept

let fs = require("fs");
let text = fs.readFileSync("input.txt").toString('utf-8');;
let records = text.split("\n");

records = records.sort();

let guard_mintimes = {};
let longest_sleep = [0,0];
const id_pattern = /\#(.*?)\ /;
const min_pattern = /\:(.*?)\]/;

function get_guard(){
    let highest_min_count = 0;
    let highest_min = '';
    let highest_min_guard = '';

    for(let i=0; i<records.length; i++) {
        if (records[i].toString().includes('Guard')){
            let guard_id = id_pattern.exec(records[i])[1];
            var sleep = find_sleeping_mins(i);
            if(guard_id in guard_mintimes) {
                guard_mintimes[guard_id].push.apply(guard_mintimes[guard_id], sleep.sleeping_times()); 
            } else {
                guard_mintimes[guard_id] = sleep.sleeping_times();
            }
            let cur_mins = find_highest_min(guard_mintimes[guard_id]);
            if(cur_mins[1] > highest_min_count) {
                highest_min_count = cur_mins[1];
                highest_min_guard = guard_id;
                highest_min = cur_mins[0];
            }
            i = sleep.index_stopped()-1;
        }
    }
    let highest = {'guard_id':highest_min_guard, 'the_minute':highest_min, 'min_count': highest_min_count};
    return highest;
}

function find_sleeping_mins(record_num) {
    let sleeping_times = [];
    for(let r = record_num + 1; r<records.length; r++) {
        if(records[r].toString().includes('falls asleep')){
            let start_time = parseInt(min_pattern.exec(records[r])[1]);
            let end_time = parseInt(min_pattern.exec(records[r+1])[1]);
            for(let t = start_time; t<end_time; t++) {
                sleeping_times.push(t);
            }    
        } else if(records[r].toString().includes('Guard') || r == records.length-1) {
            return {
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
            highest_pair[0] = guard_arr[i]; //the minute
            highest_pair[1] = min_dict[guard_arr[i]]; //# of those minutes
        }

    }
    return(highest_pair);

}
//let longest_sleeper = guard_mintimes[get_guard()];
console.log(get_guard());
