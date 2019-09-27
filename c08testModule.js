var greeting = require('./c08greeting.js'); 
//node 내부에서는 같은 dir 내에 존재하는 파일에 대해서 ./ 표시 해줘야함 
var Movie = require('./c08movie.js');

console.log('모듈예제 '+)
greeting.greeting();

var movie = new Movie('내머릿속의 지우개', '감독01');
movie.showData();


