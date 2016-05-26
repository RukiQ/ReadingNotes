## 温故 JavaScript

### <p style="background:orange">&nbsp;变量作用域，函数提升和执行环境对象</p>

##### <p style="background: #cfc9fa">1. 变量作用域<p>

在 JavaScript 中，<span style="color:red">`变量`</span> 的 <span style="color:red">`作用域`</span> 由 <span style="color:red">`函数`</span> 限定，即：唯一能定义变量作用域的语块就是 <span style="color:red">`函数`</span>。

`变量` 要么是全局的，要么是局部的。

- 全局变量：在函数外部定义，处处可以访问；
- 局部变量：在函数内部定义，只有在声明它的地方才能访问。

> ES6 引入块级作用域——> `let` 语句
	
	let (prisoner = 'I am in prison!') {
		console.log( prisoner );	// "I am in prison!"
	}

	console.log( prisoner );	// Erroe:prisoner is not defined"


##### <p style="background: #cfc9fa">2. 变量提升</p>

在 JavaScript 中，当变量被声明时，声明会被提升到它所在函数的顶部，并被赋予 undefined 值。这就使得在函数的任意位置声明的变量存在于整个函数中，尽管在赋值之前，它的值一直为 undefined。

![变量提升1]()
	
	function prison () {
	    console.log(prisoner);  // "undefined"
	
	    var prisoner = 'Now I am defined!';
	
	    console.log(prisoner);  // "Now I am defined!"
	}
	
	prison();

- 因为变量声明总是被提升到函数作用域的顶部，所以在函数的顶部声明变量总是最好的做法，更好的是使用**单个 `var` 语句**，这样可以和 JavaScript 的做法保持一致。

##### <p style="background: #cfc9fa">3. 作用域和变量提升结合</p>

[例1：]

	var name = 'Joe';
	
	function prison () {
	    console.log(name);	// "Joe"
	}
	
	prison();

[例2：变量在声明前是未定义的]

	var name = 'Joe';
	
	function prison () {
	    console.log(name);	// "undefined"
	    var name;	// name的声明被提升到函数的顶部，在查找全局作用域的name之前，会先检查这一被提升的声明
	}
	
	prison();

[例3：变量在声明前有值]

	// 变量作为参数传入
	var name = 'Joe';

	function prison ( name ) {
	    console.log(name);  // "Bob"
	    var name;	// 变量name已经由参数赋值，当声明它时，不会用undefined值覆盖。这里的声明是多余的。
	
	    console.log(name);  // "Bob"
	}
	
	prison( 'Bob' );


##### <p style="background: #cfc9fa">4. 高级变量提升和执行环境对象</p>

<span style="color:#ac4a4a">**提升**</span>

JavaScript 引擎在进入作用域时，会对代码分两轮处理：（1）初始化变量；（2）执行代码。

第一轮**初始化变量**，JavaScript 引擎分析代码，并做了以下3件事情：

1）声明并初始化函数参数；

2）声明局部变量，包括将匿名函数赋给一个局部变量，但并不初始化他们；

3）声明并初始化函数。

> 在第一轮，**局部变量并未被赋值**，因为可能需要在代码执行后才能确定它的值，而第一轮不会执行代码。

> **参数被赋值了**，因为在向函数传递参数之前，任何决定参数值的代码都可以运行了。

![第一轮初始化变量]()

<span style="color:#ac4a4a">**执行环境和执行环境对象**——>理解 javaScript 引擎在第一轮是如何保存变量的</span>

JavaScript 引擎把变量作为一个属性保存在一个对象上，这个对象称为 <span style="color:red">`执行环境对象`</span>。

- <span style="color:red">`执行环境`</span>：每当函数被调用的时候，就会产生一个新的执行环境，即，指函数的执行。
- <span style="color:red">`函数声明`</span>：描述了当函数执行的时候会发生什么事情。
- 属于执行环境部分的变量和函数，被保存在 <span style="color:red">`执行环境对象`</span> 中，执行环境对象是对执行环境的 ECMA 标准实现。

> `执行环境` 是一种概念，是<span style="background:yellow">运行中的函数</span>的意思，由函数在执行时发生的所有事物组成，它不是对象。
>
> `执行环境` 和 `函数声明` 是分离的。

所有在函数中定义的 `变量` 和 `函数` 都是 `执行环境` 的一部分。当谈论函数的 `作用域` 时，`执行环境` 也是其所指的一部分。如果变量在当前执行环境中可访问，则变量在作用域内（即：如果在函数运行时变量可访问，则该变量在作用域内）。

在 JavaScript 引擎中，<span style="color:red">`执行环境对象`</span> 是一种对象，属于 JavaScript 实现层面的东西，在开发的时候无法直接访问。<span style="background:yellow">间接地访问执行环境对象</span>是很容易的，因为每次使用变量，就是在访问执行环境对象的属性。

![执行环境对象]()


### <p style="background:orange">&nbsp;解释变量作用域链以及为什么要使用它们</p>

### <p style="background:orange">&nbsp;使用原型创建 JavaScript 对象</p>

### <p style="background:orange">&nbsp;编写自执行匿名函数</p>

### <p style="background:orange">&nbsp;使用模块模式和私有变量</p>

### <p style="background:orange">&nbsp;探索闭包的乐趣和好处</p>