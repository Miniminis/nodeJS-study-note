var M = {
    v: 'V',
    f : function(){
        console.log(this.v);
    }
}

module.exports = M;
//M 객체를 module 밖에서도 사용할 수 있도록 한다!