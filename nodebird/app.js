const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');   //passport 모듈 로드 
require('dotenv').config(); //env 따로 관리 

const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const {sequelize} = require('./models'); //sequelize 이용해 서버와 모델(db) 연결 01 : ./models/index.js
const passportConfig = require('./passport');    //passport 모듈 연결 01 : ./passport/index.js 의 생략 

//express app 생성 
const app = express();
sequelize.sync();   //sequelize 이용해 서버와 모델(db) 연결 02
passportConfig(passport); // passport 모듈 연결 02

//app 기본 설정 
app.set('views', path.join(__dirname, 'views')); //모든 view 파일들은 views 이름의 폴더에 넣어준다. 
app.set('view engine', 'pug');  //view engine 은 pug를 사용 
app.set('port', process.env.PORT || '3000');    //process.env 객체에 PORT 속성이 있으면 그 값을 사용, 아니면 3000번 기본값을 사용 

//사용할 미들웨어 설정 
app.use(morgan('dev')); //요청에 대한 정보를 콘솔에 기록 
app.use(express.static(path.join(__dirname, 'public'))); //정적파일 저장위치 명시
app.use('/img', express.static(path.join(__dirname, 'uploads'))); //사용자가 업로드한 사진 저장 디렉토리 static 과 연결  
app.use(express.json()); //body-parser 
app.use(express.urlencoded({extended: false})); //body-parser 
app.use(cookieParser(process.env.COOKIE_SECRET)); //요청에 동봉된 쿠키를 해석. 매개변수 : 클라이언트에서 수정 막음 
app.use(session({   //세션설정(for 로그인 등)
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false,
    }
}));
app.use(flash()); //일회성 메시지들을 웹 브라우저에 나타낼때 사용. cookie-parser & expression-session 뒤에 위치! 
app.use(passport.initialize()); //passport 모듈 연결03
//req 요청에 passport 설정을 심음 
app.use(passport.session());    //passport 모듈 연결04
//req.session 객체에 passport 정보를 저장 
//req.session 객체가 express-session 에서 생성하는 것이므로 express-session 뒤에 연결해야함 

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

//에러처리 미들웨어 404 
app.use((req, res, next)=> {
    const err = new Error('NOT FOUND');
    err.status = 404;
    next(err);
}); 
//에러 핸들링 미들웨어 
app.use((err, req, res)=> {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') == 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 서버 연결!');
});

