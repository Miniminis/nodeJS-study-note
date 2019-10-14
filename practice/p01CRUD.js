var r_idx = 14;
var room = new Array();
room.push('room'+r_idx);
console.log(room);

room.push('room'+17);
room.push('room'+35);
console.log(room);

var roomIdx = room.indexOf('room'+14);
var isexist = roomIdx != -1;
console.log(roomIdx);
console.log(isexist); 