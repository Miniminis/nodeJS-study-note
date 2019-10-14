const crypto = require('crypto');

console.log('base64:', crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('hex:', crypto.createHash('sha512').update('비밀번호').digest('hex'));
console.log('base64:', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));

//createHash('sha512') : 사용할 해시 알고리즘 매개변수.  md5와 sha1은 이미 취약점이 발견
//update('비밀번호')  : 변환할 문자열
//digest('base64') : 인코딩할 알고리즘. base64, hex, latin1이 주로 사용되는데, 그중 base64가 결과 문자열이 가장 짧아 애용됨
// 언젠가 sha512도 취약점이 발견 --> 그렇게 된다면 더 강력한 알고리즘인 sha3으로 이전하면 됨