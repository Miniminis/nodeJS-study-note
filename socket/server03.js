//express 모듈 로딩 + 초기화
var app = require('express')();
//http 모듈 로딩, http server에 app 연결 
var http = require('http').createServer(app); 
//app 연결한 http server를 다시 socket.io 에 연결 
var io = require('socket.io')(http);    

//모든 요청에 대해 client02.html 로 전달 
app.get('/passenger',function(req, res){  
  res.sendFile(__dirname + '/client03.html');
}); 

app.get('/driver',function(req, res){  
  res.sendFile(__dirname + '/driver03.html');
}); 


//소켓 연결 이벤트 리스너
io.on('connection', function(socket){ 
  
  var room = new Array();
  var roomIdx;
  //socket parameter: 접속한 사용자의 socket 
  console.log('user connected: ', socket.id);  //접속한 사용자의 고유한 socket id 
  //disconnect event listener: 사용자가 접속을 끊을 때 발생하는 이벤트 처리
  socket.on('disconnect', function(){ 
    console.log('user disconnected: ', socket.id);
  });

  //listener : join room 
  socket.on('join room', function(payidx){
    console.log('01 ) join room r_idx ? '+payidx);
    
    roomIdx = room.indexOf('room'+payidx);
    if(roomIdx == -1) { //만약 payidx 번 방이 존재하지 않다면,
      room.push('room'+payidx); //신규 방 생성 
    }
    
    socket.join(room[roomIdx], function(){
      io.to(room[roomIdx]).emit('after join room', payidx);
    });
  });

  //listener : send message : 사용자가 메시지를 보내는 이벤트 발생시 처리
  socket.on('send payinfo', function(date, paymethod, startpoint, endpoint){ 
    console.log('02 ) 결제 내역 출력 : '+endpoint);
    io.to(room[roomIdx]).emit('receive info', date, paymethod, startpoint, endpoint); 
    //모든 사용자들이 방에 조인한 이후에야 이벤트 발생 결과를 얻을 수 있으므로 
    //sendpayinfo 이벤트가 정상적으로 작동하려면
    // driver page 를 먼저 로딩 한 후 
    // passenger page 를 로딩 시켜야 한다.  
  });

  //두 사용자는 일정 시간 이후 페이지가 redirect 되므로 == socket 연결이 끊어지므로 
  //room leave 이벤트는 따로 정의하지 않음.  
});

//app, socket과 모두 연결한 http 서버를 연결
http.listen(3000, function(){ 
  console.log('3000번 서버가 시작됨!'); 
});

//운행중 
//1. 사용자 도착버튼 누름 : emit arrive event  
//2. 노드 서버 : on  arrive event 
//- console 에서 확인 
//- emit go pay page event 
//3. 사용자는 이미 결제페이지로 location.replace 됨 
//4. 운전자는 on go pay page : location.replace 처리  

//결제 
//1. 사용자 결제 완료 후 내역 페이지 로딩
//2. 서버 : on send payinfo 
//- emit receive info 
//3. 사용자는 이미 review write 페이지로 location.replace 됨 
//4. 운전자는 on receive info + 5초 후 review write 페이지로 location.replace 
 