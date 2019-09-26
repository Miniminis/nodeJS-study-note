//서버 구현을 위한 모듈 로드 
//http.Server
var http = require('http'); //서버
var queryString = require('querystring'); //쿼리스트링 타입으로 넘어온 데이터 읽기 
var fs = require('fs'); //파일
var formidable = require('formidable'); //이미지 폼 데이터 읽기 위한 외부 모듈 
var pathUtil = require('path');

//data 출력을 위한 변수 설정 
var movieList = [
    {title : '내 머릿속의 지우개', director : '누구지?', poster : 'image/zootopia01.jpg'},
    {title : '스타워즈', director : '조지루카스', poster : 'image/flash.jpg'}
];

//image 경로 : 
var imgDir = __dirname+'/image';

//서버 구현 
var server = http.createServer(function(req, res){

    var method01 = req.method.toLowerCase();
    console.log('요청 시작 :'+method01); // 요청 매서드 확인

    var url = req.url;
    console.log('요청된 url : '+url);

    //파일타입이 아닐때 
    if(url == '/' && method01 == 'get') {
        console.log('요청 타입 01 : 루트 + get ');      
        showList(req, res);
        //파일타입일때 
    } else if(url.indexOf('/image/') == 0 && method01 == 'get') {
        console.log('요청 타입 02 : 이미지 포함 + get');
        //파일 경로 읽기 
        var urlPath = __dirname + url; ///image/gun.png
        console.log('요청 타입 02-1 : __dirname '+urlPath+' / '+__dirname);
        //파일 타입 설정 
        res.writeHead(200, {'Content-Type' : 'image/jpg' });
        //읽은 url 응답 표시 
        fs.createReadStream(urlPath).pipe(res);
    } else if (url == '/', method01 == 'post') {
        addNewMovie(req, res);
    } else if(url=='/v1/movies' && method01 == 'get') {
        responseJson(req, res);
    }
});
server.listen(3000, function(){
    console.log('3000번 포트로 서버가 시작됨 ');
}); //3000번 포트로 실행 


//GET 요청시 응답할 함수 정의 
function showList(req, res) {
    //movieList[] 를 출력해서 사용자에게 보여줄 html 
    
    //응답 헤더 설정 : 상태번호, 콘텐츠 타입 등
    res.writeHeader(200, {'Content-Type' : 'text/html; charset=utf-8;'});
   
    //응답 바디 설정 : 반환할 내용 
    res.write('<html>');
    res.write('<meta charset="UTF-8">');
    res.write('<body>');
    res.write('<h3>Favorite Movie</h3>');
    res.write('<div><ul>');
    movieList.forEach(function (item) {
        res.write('<li>' + item.title + '(' + item.director + ') <img src="'+item.poster+'" "height=100px; width=100px;"> </li>');
        }, this);
        res.write('</ul></div>');
        res.write(
        '<form method="post" enctype="multipart/form-data"><h4>새 영화 입력</h4>' +
        '<div><input type="text" name="title" placeholder="영화제목"></div>' +
        '<div><input type="text" name="director" placeholder="감독"></div>' +
        '<div><input type="file" name="poster" /></div>' +
        '<input type="submit" value="upload">' +
        '</form>'
        );
        res.write('</body>');
        res.write('</html>');

    //응답 종료 
    res.end(); //response.write() + response.end()
}

//POST 방식으로 처리될 때 함수 정의 
function addNewMovie(req, res) {

    var form = formidable.IncomingForm();
    form.uploadDir = imgDir;

    form.parse(req, function(err, fields, files) {
        var title = fields.title;
        var director = fields.director;
        var image = files.poster;
        
        //이미지 파일명 설정
        var date = new Date();
        var newImgName = 'img_'+date.getHours()+date.getMinutes()+date.getSeconds();

        //확장자 설정 
        var ext = pathUtil.parse(image.name).ext;

        //이미지 전체 저장 경로 설정 
        var newPath = __dirname+'/image/'+newImgName+ext;

        //원본 이미지의 경로를 새로운 경로로 설정 
        fs.renameSync(image.path, newPath);

        var newPosterImgUrl = 'image/'+newImgName+ext;

        var info = {
            title : title, 
            director : director,
            poster : newPosterImgUrl
        }
        
        movieList.push(info);

        res.statusCode=302;
        res.setHeader('Location', '.');
        res.end('File Upload SUCCESS!!!!!');
    })
}

//JSON 형식으로 데이터 반환
function responseJson(req, res){
    res.writeHeader(200, {'Content-Type' : 'application/json'});
    res.end(JSON.stringify(movieList));
}