## 一、Node.js 中的控制台

（1） `console.log` 方法：用于进行标准输出流的输出。

1：表示重定向标准输出流

	node app.js 1>info.log	// 将 app.js 中的内容输出到 info.log 文件中

（2）`console.error`/`console.warn` 方法：用于进行标准错误输出流的输出。

2：表示重定向标准错误输出流

（3）`console.time` 方法：标记开始时间；`console.timeEnd` 方法：标记结束时间

	console.time(label)
	console.tiemEnd(label)

（4）`console.trace` 方法：将当前位置处的栈信息作为标准错误进行输出
	
	console.trace(label)	// label 用于标识此处输出的标准错误信息

（5）`console.assert` 方法：用于对一个表达式的执行结果进行评估

## 二、Node.js中的全局作用域及全局函数

（1）全局对象：

- `global` 对象

（2）全局函数：

- `setTimeout` 和 `clearTimeout`
		
		setTimeout(cb, ms, [args], [...])

		var timer = setTimeout(testFunction, 5000, 'this is a parameter.');
		clearTimeout(timer);

- `setInterval` 和 `clearInterval`

		setInterval(cb, ms, [args], [...])

		var timer = setInterval(testFunction, 5000, 'this is a parameter.');
		clearInterval(timer);

- 定时器对象的 `unref` 方法与 `ref` 方法：用于取消 `setTimeout` 和 `setInterval` 函数中指定的回调函数的调用，会产生性能影响，谨慎使用。

		timer.unref();
		timer.ref();

（3）与模块相关的全局函数及对象：

- 使用 `require` 函数加载模块

	> 模块在首次加载后将缓存在内存缓存区中，即对于相同模块的多次引用得到的都是同一个模块对象，也即对于相同模块的多次引用不会引起模块内代码的多次执行。
	
- 使用 `require.resolve` 函数查询完整模块名（带有绝对路径）

- `require.cache` 对象：代表缓存了所有已被加载模块的缓存区

	> 当使用 `delete` 关键字删除缓存区中缓存的某个模块对象后，下次加载该模块时将重新运行该模块中的代码。

- `__filename` 变量与 `__dirname` 变量：用于获取当前模块文件名（带有绝对路径）和当前目录名。

（4）事件处理机制及事件环机制

- EventEmitter 类
	
	- addListener(event, listener)
	
	- on(event, listener)
	
	- once(event, listener)
	
	- removeListener(event, listener)
	
	- removeAllListener([even])
	
	- setMaxListeners(n)
	
	- listeners(event)
	
	- emit(event, [arg1], [arg2], [...])

- EventEmitter 类的各个方法

		var http = require('http');
		var server = http.createServer();
		
		// 当服务器接收到客户端请求时，执行回调函数进行输出
		server.on('request', function(req, res) {
		
		    /**
		     * 浏览器为页面在收藏夹中的显示图标（默认为favicon.ico）
		     * 如果不判断，也会输出 /favicon.ico
		     */
		    if (req.url !== '/favicon.ico') {
		        console.log(req.url);   // 输出用户输入的目标URL地址
		    }
		    
		    res.end();
		});
		
		// 可以通过多个 on 方法的执行来对同一个事件绑定多个事件处理函数
		server.on('request', function(req, res) {
		    if (req.url !== '/favicon.ico') {
		        console.log('发送响应完毕');
		    }
		    
		    res.end();
		});
		
		server.listen(1337, '127.0.0.1');