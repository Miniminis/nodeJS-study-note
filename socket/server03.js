//server.js 

//express 모듈 로딩 + 초기화
var app = require('express')();
//http 모듈 로딩, http server에 app 연결 
var http = require('http').createServer(app); 
//app 연결한 http server를 다시 socket.io 에 연결 
var io = require('socket.io')(http);    

//모든 요청에 대해 client02.html 로 전달 
app.get('/passenger',function(req, res){  //2
  res.sendFile(__dirname + '/client03.html');
}); 

app.get('/driver',function(req, res){  //2
  res.sendFile(__dirname + '/driver03.html');
}); 

//소켓 연결 이벤트 리스너
io.on('connection', function(socket){ 
  //socket parameter: 접속한 사용자의 socket 
  console.log('user connected: ', socket.id);  //접속한 사용자의 고유한 socket id 
  //disconnect event listener: 사용자가 접속을 끊을 때 발생하는 이벤트 처리
  socket.on('disconnect', function(){ 
    console.log('user disconnected: ', socket.id);
  });

  //send message listener: 사용자가 메시지를 보내는 이벤트 발생시 처리
  socket.on('send payinfo', function(date, paymethod, startpoint, endpoint){ 
    console.log('결제 내역 출력 : '+endpoint);
    io.emit('receive info', date, paymethod, startpoint, endpoint); 
  });
});

//app, socket과 모두 연결한 http 서버를 연결
http.listen(3000, function(){ 
  console.log('3000번 서버가 시작됨!'); 
});