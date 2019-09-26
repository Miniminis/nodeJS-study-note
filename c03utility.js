//상속 
//util.inherits(ChildClassFunction, ParentClassFunction);
//util.inherits(constructor, superConstructor);

var util = require('util');

//parent() 함수 선언
function Parent() {}
//함수 정의
Parent.prototype.sayHello = function() {
    console.log('Hello World, from Parent Class!');
}
var obj = new Parent();
obj.sayHello(); //Hello World, from Parent Class!

//child() 함수 정의
function Child() {}

// 상속
util.inherits(Child, Parent);
var obj2 = new Child();
obj2.sayHello(); //Hello World, from Parent Class!