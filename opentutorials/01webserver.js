var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
    var url = req.url;
    console.log('요청 url 01 '+url);
    if(url == '/') {
        url = '/webserver/index.html';
        console.log(__dirname); //C:\Users\minhe\Documents\GitHub\nodeJS-study-note\opentutorials
    }
    if(url == '/favicon.ico') {
        return res.writeHead(404);
    }
    res.writeHead(200);
    res.end(fs.readFileSync(__dirname + url));
});
server.listen(3000, function(){
    console.log('서버가 시작되었습니다. ');
})

//node js 는 웹서버로서 작동중!
//현재 서버가 실행되는 곳이 루트 디렉토리 '/' ! 
//이곳을 기점으로 실행됨! 

//두 웹 서버의 차이점 
//python, django, node : 프로그래밍 적으로 사용자에게 전달할 데이터를 생산할 수 있다! 
//nginx, apache : 클라이언트의 요청과 서버의 응답을 전해주는 역할만 할 뿐, 데이터를 직접 생산할 수 없다. 