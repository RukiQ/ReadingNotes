//=================================== 1.命名空间模式 ===================================
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
