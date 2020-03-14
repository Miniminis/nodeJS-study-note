var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
    var url = req.url;
    console.log('요청 url 01 '+url);
    if(url == '/') {
        url = '/index.html';
    }
    if(url == '/favicon.ico') {
        return res.writeHead(404);
    }
    res.writeHead(200);
    res.end(fs.readFileSync(__dirname + url));
});

server.listen(3000, function(){
    console.log('서버가 시작되었습니다. ');
})