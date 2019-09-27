//server.js 

//express 모듈 로딩 + 초기화
var app = require('express')();
//http 모듈 로딩, http server에 app 연결 
var http = require('http').createServer(app); 
//app 연결한 http server를 다시 socket.io 에 연결 
var io = require('socket.io')(http);    

//모든 요청에 대해 client02.html 로 전달 
app.get('/',function(req, res){  //2
  res.sendFile(__dirname + '/client02.html');
}); 

//사용자 구분을 위한 count 변수 선언 및 초기화 
var count=1;
//connection event listener 
//사용자가 접속하게 되면 socket.io 를 통해서 connection event 가 자동으로 발생하게 됨! 
// io.on(connection) : 내부에 사용자와 관련된 모든 이벤트를 정의
io.on('connection', function(socket){ //socket parameter: 접속한 사용자의 socket 
  console.log('user connected: ', socket.id);  //접속한 사용자의 고유한 socket id 
  var name = "user" + count++;                 //사용자의 이름 임의로 생성 : user 1부터 시작 
  io.to(socket.id).emit('change name',name);   
  //to(접속한 사용자의 고유한 socket id로)
  //emit(change name event 발생시킴 : 해당 socket id 에 맞는 
  //  사용자 client page 에서 이벤트 리스너에 의해서 이벤트 처리될 것임)) 

  //disconnect event listener: 사용자가 접속을 끊을 때 발생하는 이벤트 처리
  socket.on('disconnect', function(){ 
    console.log('user disconnected: ', socket.id);
  });

  //send message listener: 사용자가 메시지를 보내는 이벤트 발생시 처리
  socket.on('send message', function(name,text){ 
    var msg = name + ' : ' + text;
    console.log(msg);
    io.emit('receive message', msg); //받은 메시지 전체 클라이언트에게 전달하는 이벤트 정의
    //to() 로 특정 사용자에게 전달하지 않고, 전체 클라이언트에게 일괄 전송
  });
});

//app, socket과 모두 연결한 http 서버를 연결
http.listen(3000, function(){ 
  console.log('server on!'); 
  //서버 초기 연결 시 콘솔에 메시지 출력
});