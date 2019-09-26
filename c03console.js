//console.info();
//console.log('info', 'information message!');
//console.log('log', 'log message');
//console.warn('warn', 'warn message');
//console.error('error', 'error message');

//실행 시간측정
console.time('TIMER');
var sum = 0;
for(var i = 1 ; i < 100000; i++ ) {
    sum += i;
}
console.log('sum : ', sum);
console.timeEnd('TIMER');

// 객체형 출력 
var obj = {
    name : 'NodeJS',
    how : 'Interesting'
};
console.log('obj : ' + obj);
console.log('obj : ', obj); // 객체 내의 정보를 알고 싶을때는 , 이용해서 출력


