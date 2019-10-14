const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const pageRouter = require('./routes/page');

const app = express();

app.set('views', path.join(__dirname, 'views')); //모든 view 파일들은 views 이름의 폴더에 넣어준다. 
app.set('view engine', 'pug');  //view engine 은 pug를 사용 
app.set('port', process.env.PORT || '3000');    //process.env 객체에 PORT 속성이 있으면 그 값을 사용, 아니면 3000번 기본값을 사용 
