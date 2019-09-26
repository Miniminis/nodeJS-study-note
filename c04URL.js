var url = require('url');
var urlstr = 'http://idols.com/q?group=EXID&name=하니&since=';
var parsedurl = url.parse(urlstr);

global.console.log(parsedurl);

//결과 : 
// Url {
//     protocol: 'http:',
//     slashes: true,
//     auth: null,
//     host: 'idols.com',
//     port: null,
//     hostname: 'idols.com',
//     hash: null,
//     search: '?group=EXID&name=하니&since=',
//     query: 'group=EXID&name=하니&since=',
//     pathname: '/q',
//     path: '/q?group=EXID&name=하니&since=',
//     href: 'http://idols.com/q?group=EXID&name=하니&since=' }

parsedurl = url.parse(urlstr, true);
global.console.log(parsedurl);

//RESULT : 
// query:
// [Object: null prototype] { group: 'EXID', name: '하니', since: '' },
