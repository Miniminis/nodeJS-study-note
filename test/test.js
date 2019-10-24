/* 전략
1. 사용자의 숫자 입력
2. 그 값에 맞는 길이의 배열 생성 
- 홀수만 뽑아서 홀수배열 생성  
- 홀수배열 : 랜덤정렬 후 하나씩 요소 출력 
- 전체 배열에 출력된 요소 추가, 해당요소+1 추가.
- 제한조건 : 해당요소 == input num  --> 조치 안함 
- 여기까지오면 arr는 랜덤+페어 정렬상태
- 해당 배열 span 태그에 하나씩 추가 
3. 배열 클릭 이벤트 
- 컬러배열 선언, 초기화 
- 배열 클릭 시
    - 전체 배열 배경색 색칠 0으로 초기화 - 그래야 다른 숫자 선택시 색이 겹치지 않음
        - 별점이랑 비슷함
    - 첫 요소부터 ~ 선택한숫자까지 색 칠하기 : value % 색 배열길이 로 반복처리 
*/ 

function inputNum() {
    var num = $('#num').val(); 
    $('#num').val(''); //input clear 
    var arr = new Array(); //전체 배열 
    var oddArr = new Array(); //홀수 배열 
    
    //홀수 요소만 따로 배열에 넣기 
    for(var i=0; i<=(num-1)/2; i++) {
        oddArr.push(2*i+1);
    }
    
    //console.log('oddArr 출력 : '+oddArr);
    
    //홀수 배열 랜덤 정렬 
    oddArr.sort(function(a, b) {
        return Math.random() - Math.random();
    });
    //console.log('oddArr after shffle  : '+oddArr);
    
    //홀수 배열 요소 꺼내서 전체 배열에 삽입 
    for(var i in oddArr) {
        arr.push(oddArr[i]);
        if(oddArr[i] == num) {
            continue;
        } else {
            arr.push(oddArr[i]+1);
        }
    }
    
    //console.log('arr 출력 : '+arr);
    
    //shuffle 된 값들을 화면에 표시 
    var result = '';
    for(var i=0; i<arr.length; i++) {
        result += '<span id="'+arr[i]+'" onclick="putColors('+arr[i]+')">'+arr[i]+'</span>';
    }
    
    $('#array').html(result);
          
};

function putColors(number) {
    //컬러배열
    var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple'];
    
    //console.log(colors[number % colors.length]);
    //console.log($('#'+number+'').siblings());
    
    $('span').siblings().css("background-color", "transparent");
    for(var i=1; i<=number; i++) {
        $('span:nth-child('+i+')').css("background-color", colors[(i-1) % colors.length]);
    }
}
