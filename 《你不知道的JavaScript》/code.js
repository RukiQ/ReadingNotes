function foo(a, b) {
  console.log("a:" + a + ", b:" + b);
}

// 把数组“展开”成参数
foo.apply(null, [2, 3]); // a:2, b:3

// 在ES6中，可以用...操作符代替apply(...)来“展开”数组
foo(...[1,2]);  

// 使用 bind(...) 进行柯里化
var bar = foo.bind(null, 3);
bar(4); // a:3, b:4