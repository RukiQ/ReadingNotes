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

