//1. 모듈 등록 
var http = require('http'); //웹 서버 생서 모듈 

//2. 필요한 객체 생성 
http.createServer(function(request, response){
    //3. 매서드, 변수 설정
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('<h2>hello, node.js!!!!!! nice to meet you:) </h2>');
    //4. listen(port 번호) 이벤트 호출 
}).listen(3000); 