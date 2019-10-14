var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express(); //app 객체 생성

// view engine setup
app.set('views', path.join(__dirname, 'views'));    //템플릿 파일들이 위치한 폴더를 지정
app.set('view engine', 'pug');                      //

app.use(logger('dev')); //morgan
app.use(express.static(path.join(__dirname, 'public'))); //매개변수 : 정적인자가 담긴 폴더 
// app.use('/img', express.static(path.join(__dirname,'public')));
//직접 정적파일을 제공할 주소를 지정할 수도 있음! 
//정적파일 요청 경로 : http://localhost:3000/img/abc.png
//정적파일을 로드하지 못할 경우 : 아래의 미들웨어를 거치는 것은 낭비이므로 
//보통 morgan 아래에 두어 에러상황여부가 기록되게 하며 쓸데없는 자원의 낭비를 막는다. 
app.use(express.json()); //요청의 본문을 해석해주는 미들웨어 'body-parser' 의 기능이 express 에 내장됨 (since 4.16.0+)
app.use(express.urlencoded({ extended: false })); //요청의 본문을 해석해주는 미들웨어 'body-parser' 의 기능이 express 에 내장됨 (since 4.16.0+)
app.use(cookieParser('secret code'));
app.use(session({   //express-session 은 인자로 세션에 대한 설정정보를 전달받음 
  resave : false,   //요청시 세션에 수정사항이 생기지 않더라도 세션을 다시 저장할지에 대한 설정 
  saveUninitialized: false,   //세션에 저장할 내역이 없더라도 세션을 저장하지에 대한 설정 
  secret:'secret code',   //cookie-parser의 비밀키와 같은 역할 : 클라이언트에서 사용자가 임의로 수정하면 에러 발생 
  cookie: {               //cookie-parser의 secret과 같게 설정해야 합니다.
    httpOnly: true,       //세션쿠키 
    secure: false,        //httpOnly: 클라이언트에서 쿠키를 확인하지 못하도록 함 
  },                      //secure는 false로 해서 https가 아닌 환경에서도 사용할 수 있게함 
}))

//router 에 주소 설정 : 특정 주소에 해당하는 요청이 왔을 때만 미들웨어가 동작
//get, post, put, patch, delete 같은 HTTP 메서드를 사용가능 
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
