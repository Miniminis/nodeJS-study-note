//생성자 함수 정의
//지역변수처리 : this
function Movie (title, director) {
    //변수 정의
    this.title = title;
    this.director = director;

    //매서드 정의
    this.showData = function(){
        console.log(this.title + ' // '+ this.director);
    };

    this.makeObj = function() {
        return {
            title : this.title,
            diretor : this.director
        }
    }
}

//모듈을 반환하는 방법을 정해줌
//module.exports.Movie = Movie; 
module.exports = Movie;  