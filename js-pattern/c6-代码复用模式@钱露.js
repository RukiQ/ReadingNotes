//============================ 使用类式继承时的预期结果 ========================
// 父构造函数
function Parent(name) {
  this.name = name || 'Adam';
}

Parent.prototype.say = function() {
  return this.name;
}

// 空白的子构造函数
function Child(name) {}

// 继承
inherit(Child, Parent);

//========================== 1.默认模式：追溯原型链 ==========================
function inherit(C, P) {
  C.prototype = new P();
}

var kid = new Child();
kid.say();  // 'Adam'

//========================== 2.借用构造函数 ==========================
function Child(name) {
  Parent.apply(this, arguments);
}

var kid = new Chlid('Patrick');
kid.name; // 'Patrick'
typeof kid.say; // 'undefined'

//========================== 3.借用和设置原型 ==========================
function Chlid(name) {
  Parent.apply(this, arguments);
}

Child.prototype = new Parent(); // 第一次调用

var kid = new Chlid('Patrick'); // 第二次调用
kid.name; // 'Patrick'
kid.say();  // 'Patrick'
delete kid.name;
kid.say();  // 'Adam'


//========================== 4.共享原型 ==========================
function inherit(C, P) {
  C.prototype = P.ptototype;
}

//========================== 5.临时构造函数 ==========================
function inherit(C, P) {
  var F = function() {};
  F.prototype = P.prototype;
  C.prototype = new F();

  // 存储超类
  C.uber = P.ptototype;

  // 重置构造函数指针
  C.prototype.constructor = C;
}

var kid = new Child();

/**
 * 优化：避免在每次需要继承时都创建临时（代理）构造函数
 */
var inherit = (function() {
  var F = function() {};
  return function(C, P) {
    F.prototype = P.prototype;
    C.prototype = new F();
    C.uber = P.prototype;
    C.prototype.constructor = C;
  }
}());


//========================== 6.原型继承 ==========================
/**
 * 使用字面量创建父对象
 */
var parent = {
  name: 'Papa'
};

function object(o) {
  function F() {};
  F.prototype = o;
  return new F();
}

// 新对象
var child = object(parent);

/**
 * 使用构造函数创建父对象
 */
function Person() {
  this.name = 'Adam';
}

Person.prototype.getName = function() {
  return this.name;
}

/**
 * 继承方法1
 */
var papa = new Person();
var kid = object(papa);
kid.getName();  // 'Adam'

/**
 * 继承方法2：
 * 仅继承现有构造函数的原型对象
 */
var kid2 = object(Person.prototype);

typeof kid.getName;   // 'function'
typeof kid.name;  // 'undefined'

/**
 * 继承方法3：
 * 使用 Object.create()，可以扩展新对象自身的属性，并返回该新对象
 */
var child = Object.create(parent);
var child2 = Object.create(parent, {
  age: {value: 2}
})
child2.hasOwnProperty('age'); // true


//========================== 7.通过复制属性实现继承 ==========================
function extend(parent, child) {
  var i;
  child = child || {};
  for (i in parent) {
    if (parent.hasOwnProperty(i)) {
      child[i] = parent[i];
    }
  }
  return child;
}