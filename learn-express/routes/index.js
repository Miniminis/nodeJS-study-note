var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//라우터도 app과 같이 http 매서드를 붙일 수 있다. 
//router 하나에 여러개의 미들웨어 장착 가능 

module.exports = router;  //라우터를 모듈로 만듬 
