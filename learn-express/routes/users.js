var express = require('express');
var router = express.Router();

//라우터에서는 반드시 요청에 대한 응답을 보내거나 에러 핸들러로 요청을 넘겨야 함

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//next('route') 의 사용 : 다음의 미들웨어들이 실행되지않고, 바로 주소와 일치하는 다음 라우터로 넘어간다. 
// router.get('/', function(req, res, next) {
//   next('route');
// }, function(req, res, next) {
//   console.log('실행되지 않습니다');
//   next();
// }, function(req, res, next) {
//   console.log('실행되지 않습니다');
//   next();
// });

// router.get('/', function(req, res) {
//   console.log('실행됩니다');
//   res.render('index', { title:'Express' });
// });

//자주 사용되는 패턴 
router.get('/users/:id', function(req, res) {
  console.log(req.params, req.query);
});
///users/123?limit=5&skip=10
//req.params.id = 123 
//req.query.limit = 5
//req.query.skip = 10 

//주의 : 일반 라우터보다 뒤에 위치해야 한다는 것

//라우터의 응답 : 
// res.send(버퍼 또는 문자열 또는 HTML 또는 JSON)
// res.sendFile(파일 경로);
// res.json(JSON 데이터);
// res.redirect(주소);
// res.render('템플릿 파일 경로', { 변수 });  //pug or ejs 확장자 파일은 이 매서드로 호출

//status() 사용해서 응답하기 
//res.status(200).send('정상적인 응답!');
//res.status(404).send('Not Found');

module.exports = router; //라우터 모듈로 만듬 
