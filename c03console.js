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