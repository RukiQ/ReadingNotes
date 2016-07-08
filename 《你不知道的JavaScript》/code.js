/**
 * eval
 */
function foo(str, a) {
  eval( str );  // 欺骗！
  console.log(a, b);
}

var b = 2;

foo( 'var b = 3;', 1);  // 1,3


/**
 * with
 */
var obj = { a: 1, b: 2, c: 3 };

// 单调乏味重复的 'obj'
obj.a = 2;
obj.b = 3;
obj.c = 4;

// 简单的快捷方式
with(obj) {
  a = 3;
  b = 4;
  c = 5;
}

function foo(obj) {
  with(obj) {
    a = 2;
  }
}

var o1 = { a: 3 };

var o2 = { b: 3 };

foo( o1 );  
o1.a; // 2
foo( o2 );  
o2.a; // undefined
a;  // 2——a被泄露到全局作用域上了


setTimeout(function timeoutHandler() {
  //...
}, 1000);