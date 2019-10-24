function inputNum() {
    var num = $('#num').val();
    var arr = new Array();
    
    
    
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