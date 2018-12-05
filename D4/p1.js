let fs = require("fs");
let text = fs.readFileSync("input.txt").toString('utf-8');;
let records = text.split("\n");

//step 1: organize records by chronological order
records = records.sort();
console.log(records);

//step 2: find guard that has most minutes asleep
let guard_sleeptime = {};
let longest_sleep = [0,0];
const id_pattern = /\#(.*?)\ /;
const time_pattern = /\[(.*?)]/;

    for(let i=0; i<records.length; i++) {
        if (records[i].toString().includes('Guard')){
            let guard_id = id_pattern.exec(records[i])[1];
            let sleep = find_mins_asleep(i);
            if(guard_id in guard_sleeptime) {
                guard_sleeptime[guard_id] += sleep.time_asleep();
            } else {
                guard_sleeptime[guard_id] = sleep.time_asleep();
            }
            if(guard_sleeptime[guard_id] > longest_sleep[1]){
                longest_sleep[0] = guard_id;
                longest_sleep[1] = guard_sleeptime[guard_id];
            }
            i = sleep.index_stopped()-1;
        }
    }
    return (parseInt(longest_sleep[0])*longest_sleep[1]);
}


function find_mins_asleep(record_num) {
    let time_asleep = 0;
    for(let r = record_num + 1; r<records.length; r++) {
        if(records[r].toString().includes('falls asleep')){
            let start_time = new Date(time_pattern.exec(records[r])[1]);
            let end_time = new Date(time_pattern.exec(records[r+1])[1]);
            time_asleep += (end_time - start_time)/60000;
        } else if(records[r].toString().includes('Guard') || r == records.length-1) {
            return {
                time_asleep: function () {
                    return time_asleep;
                },
                index_stopped: function () {
                    return r;
                }
            }
        }
    }
} 

