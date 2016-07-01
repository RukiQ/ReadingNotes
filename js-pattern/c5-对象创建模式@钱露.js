//=================================== 1.命名空间模式 =================================
// 全局变量
var MYAPP = {};

// 构造函数
MYAPP.Parent = function() {};
MYAPP.Child = function() {};

// 一个变量
MYAPP.some_var = 1;

// 一个对象容器
MYAPP.modules = {};

// 嵌套对象
MYAPP.modules.module1 = {};
MYAPP.modules.module1.data = {a: 1, b: 2};
MYAPP.modules.module2 = {};


//=================================== 2.声明依赖模式 =================================
var myFunction = function() {
  // 依赖
  var event = YAHOO.util.Event,
      dom = YAHOO.util.Dom;

  // 使用事件和DOM变量
  // 下面的函数...
}


//================================= 私有属性和方法 =================================
/**
 * 利用构造函数+闭包实现私有成员
 */
function Gadget() {
  // 私有成员
  var name = "iPod";
  var color = ['red'];

  // 公有函数
  this.getName = function() {
    return name;
  };

  // 反模式
  // 不要传递需要保持私有性的对象和数组的引用
  this.getColor = function() {
    return color;
  };

}

var toy = new Gadget();

toy.name; // 'undefined'
toy.getName();  // 'iPod'

var newColor = toy.getColor();
newColor[0] = 'black';
toy.getColor();  // 'black'


//=============== 模块模式的基础框架：对象字面量以及私有性 ===================
/**
 * 使用对象字面量+匿名函数实现私有成员
 */
var myobj;
(function() {
  // 私有成员
  var name = 'my, oh my';

  // 实现公有部分
  // 注意，没有 'var' 修饰符
  myobj = {
    // 特权方法
    getName: function() {
      return name;
    }
  }
}());

myobj.getName();  // 'my, oh my'

/**
 * 实现2
 */
var myobj = (function() {
  // 私有成员
  var name = 'my, oh my';

  // 实现公有部分
  return {
    getName: function() {
      return name;
    }
  }
}());

myobj.getName();  // 'my, oh my'
