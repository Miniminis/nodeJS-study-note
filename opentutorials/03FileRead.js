var fs = require('fs');

fs.readFile('sample.txt', 'utf-8', (err, data) => { //읽으려는 파일명, 인코딩, 에러+데이터
    if(err) {
        throw err;
    }
    console.log(data);
})