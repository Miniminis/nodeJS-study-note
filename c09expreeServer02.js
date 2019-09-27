
//1. express server 모듈 로딩 
var express =  require('express');
var app = express();

//express 의 static 함수 
app.use('/image', express.static(__dirname+'/image'))


//2. 미들웨어를 통한 사용자 요청 매핑 : 사용자의 응답 분기처리  
// 1) 미들웨어 사용 
// 2) 라우터 분기 : app.get(), app.post(), app.put(), app.delete()
// 3) 라우터 함수 이용 
//: app.route('경로').get(['경로']).post(['경로']).put(['경로']).delete(['경로']);
// 4) 라우터 코드를 모듈로 구성 

// 2) 라우터 분기 사용 : app.get(), app.post(), app.put(), app.delete()
app.get('/test', function(req, res){
    res.send('app.get() 을 사용했당께');
})

//3. router 함수 사용 
app.route('/book').get(function(req, res){
    res.send('app.route().get() 를 사용했어부러~!');
}).post(function(req, res){
    res.send('app.route().post() 를 사용했어부러~!');
}).put(function(req, res){
    res.send('app.route().put() 를 사용했어부러~!');
}).delete(function(req, res){
    res.send('app.route().delete() 를 사용했어부러~!');
});

// 4) 라우터 코드를 모듈로 구성 하는 방법
app.use('/v1/outrouter', require('./c09router'))

app.listen(3000, function(){
    console.log('서버 시작했어라유~');
});