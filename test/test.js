function inputNum() {
    
    /*
    1. 사용자의 숫자 입력
    2. 그 값에 맞는 길이의 배열 생성 
    - 홀수만 뽑아서 홀수배열 생성  
    - 홀수배열 : 랜덤정렬 후 하나씩 요소 출력 
    - 전체 배열에 출력된 요소 추가, 해당요소_1 추가.
    - 제한조건 : 해당요소 == input num +1 조치 안함 
    - 여기까지오면 arr는 랜덤+페어 정렬상태
    - 해당 배열 span 태그에 하나씩 추가 
    3. 배열 클릭 이벤트 
    - 컬러배열 선언, 초기화 
    - 배열 클릭 시
    - 첫 요소부터 + 배열길이만큼 색 칠하기 : 클릭된 숫자 value % 색 배열길이로 반복처리 
    - 다른 번호 클릭시 : 색칠 0으로 초기화 + 다시 첫요소부터 배열길이만큼 색칠 매서드 실행 
    */ 
    
    var num = $('#num').val(); 
    var arr = new Array(); //전체 배열 
    var oddArr = new Array(); //홀수 배열 
    
    
    
    
    
    /*//pair 로 배열 생성 완료 
    var i = 1;    
    if(num%2==1) {
        while(i<=num-1) {
            arr.push([i, i+1]);
            console.log('현재 arr'+arr);
            i =i+2;
        }
        arr.push([num]);
    } else {
        while(i<=num) {
            arr.push([i, i+1]);
            console.log('현재 arr'+arr);
            i =i+2;
        }
    }
    
    console.log('arr final : '+arr);
    //console.log('요소접근 '+arr[0][0]);
    
    //해당 배열을 랜덤 shuffle 
    arr.sort(function(a, b) {
        //return b[0] - a[0]; 내림차순 정렬 
        return 0.5 - Math.random();
    });
    
    console.log('after shuffle : '+arr);
    
    //shuffle 된 값들을 화면에 표시 
    var result = '';
    for(var i=0; i<arr.length; i++) {
        for(var j=0; j<2; j++) {
            result += '<span>'+arr[i][j]+'</span>';
        }
    }
    $('#array').html(result);*/
    
    
};


//[1 2], [3, 4], [5, 6], [7, 8]