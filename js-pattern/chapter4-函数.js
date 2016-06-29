//=================================== 1.回调模式 ===================================

/**
 * 1.回调模式
 * 功能逻辑解耦
 */
var findNodes() = function(callback) {
  var i = 10000,
      nodes = [],
      found;

  // 检查回调函数是否为可调用的
  if (typeof callback !== 'function') {
    callback = false;
  }

  while (i) {
    i -= 1;

    // 运行回调函数
    if (callback) {
      callback(found);
    }

    nodes.push(found);
  }

  return nodes;  
}

/**
 * 解决回调中存在的作用域问题——>当回调作为对象的方法时
 * 解决方法：绑定作用域，传递该回调函数所属的对象
 */
var findNodes = function(callback, callback_obj) {
  //...
  if (typeof callback === 'function') {
    callback.call(callback_obj, found);
  }
}

//使用=>
findNodes(myapp.paint, myapp);

/**
 * 更好的方案：无需重复两次输入对象的名称
 */
var findNodes = function(callback, callback_obj) {
  if (typeof callback === 'string') {
    callback = callback_obj[callback];
  }

  //...
  if (typeof callback === 'function') {
    callback.call(callback_obj, found);
  }
  //...
}

//使用=>
findNodes('paint', myapp);