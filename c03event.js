//event module 
//1. 클라이언트 접속 요청 : 웹서비스 
//2. 소켓에 데이터 도착 : 소켓 통신 
//3. 파일 오픈/읽기 완료 

//처리 : 
//- 비동기처리
//- 리스너 함수

// 이벤트 리스너 함수 등록
// – emitter.addListener(event, listener)
// – emitter.on(event, listener)
// – emitter.once(event, listener)

//이벤트를 다룰 수 있는 타입 : Readline 모듈
//on() : 페이지 로드 시마다 실행 
process.on('exit', function() {
    console.log('Exit 이벤트. on!');
});

// 한번만 동작
process.once('exit', function() {
    console.log('Exit 이벤트. once!');
});

// 이벤트 실행
process.emit('exit');
process.emit('exit', 0); // 리스너 함수의 파라미터로 0 전달


// 이벤트 리스너 함수 삭제
// – emitter.removeListener(event, listener)
// – emitter.removeAllListeners([event])

// • 최대 이벤트 핸들러 개수 (기본 10개)
// – emitter.setMaxListeners(n)
// – emitter.getMaxListeners()

//예외처리 
//process.on('uncaughtException', uncaughtExceptionListener);
// uncaughtException 예외 처리
process.on('uncaughtException', function(code) {
    console.log('uncaughtException Event ok : ', code);
});

// 정의되지 않은 함수 호출 - uncaughtException 발생
sayHello();