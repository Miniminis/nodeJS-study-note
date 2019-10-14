//경량 HTTP 웹 프레임워크 : express module 
var express = require('express');
var app = express();

//미들웨어 : path : 경로. 생략 시 루트 : '/'
app.use(function(req, res, next){ //next callback() 적어줘야함
    var now = new Date();
    console.log(now.toDateString() + ' : '+req.method);
    next(); //다음 미들웨어 실행
})

app.use(function(req, res){
    //응답 미들웨어 : 다음 미들웨어가 없음
    res.send('hello, 안녕하세요, 니하오마!');
})

//미들웨어 통해서 REST 구성 
// app.get('/v1/movies', movieList);
// app.post('/v1/movies', movieCreate);
// app.put('/v1/movies/1', movieEdit);

app.listen(3000);

function movieList() {
   console.log('movie List '); 
}

function movieCreate() {
    console.log('movie Create '); 
 }

 function movieEdit() {
    console.log('movie Edit '); 
 }