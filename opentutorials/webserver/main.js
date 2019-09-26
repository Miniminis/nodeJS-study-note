var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function(req, res){
    var requestedUrl = req.url;
    var queryData = url.parse(requestedUrl, true).query;
    
    console.log('요청 url 01-1 ', url);
    console.log('요청 url 01-2 ', requestedUrl);
    console.log('요청 url 01-3 ', queryData);

    if(requestedUrl == '/') {
        //requestedUrl = '/webserver/index.html';
        //console.log(__dirname); //C:\Users\minhe\Documents\GitHub\nodeJS-study-note\opentutorials
        queryData.id = 'Welcome 이에요~!';
    }
    if(requestedUrl == '/favicon.ico') {
        return res.writeHead(404);
    }
    res.writeHead(200);

    var template =`
            <!doctype html>
            <html>
            <head>
            <title>${queryData.id}</title>
            <meta charset="utf-8">
            </head>
            <body>
            <h1><a href="/">${queryData.id}</a></h1>
            <ol>
                <li><a href="/?id=HTML">HTML</a></li>
                <li><a href="/?id=CSS">CSS</a></li>
                <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ol>
            <h2>${queryData.id}</h2>
            <p>The World Wide Web (abbreviated WWW or the Web) is an information space where documents and 
                other web resources are identified by Uniform Resource Locators (URLs), interlinked by hypertext links, and can be accessed via the Internet.[1] English scientist Tim Berners-Lee invented the World Wide Web in 1989. He wrote the first web browser computer program in 1990 while employed at CERN in Switzerland.[2][3] The Web browser was released outside of CERN in 1991, first to other research institutions starting in January 1991 and to the general public on the Internet in August 1991.
            </p>
            </body>
            </html>
            `;

 
    //res.end(fs.readFileSync(__dirname + url));
    res.end(template);
});
server.listen(3000, function(){
    console.log('서버가 시작되었습니다. ');
})

//request 가 있으면 : request 에 따라 실행된 로직 실행 
//+ 마지막에 server.listen(3000) 을 또 만나서 서버 로드 상태로 됨. 
//그래서 1번의 요청 당 2개의 값들이 찍혔음 (request 에 맞는 값 + 초기값)
