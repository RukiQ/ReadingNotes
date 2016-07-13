### <p style="background:orange;">第1章 关于this</p>

`this` 是自动定义在所有函数的作用域中的关键字，用于引用合适的*上下文对象*。

##### 为什么要使用 `this` ？

- `this` 提供了一种更优雅的方式来隐式“传递”一个对象引用，因此可以将API设计得更加简洁并且易于复用。

##### 对 `this` 的误解

- `this` 不指向函数自身，也不指向函数的词法作用域。

	- 作用域“对象”无法通过JavaScript代码访问，存在于JavaScript引擎内部

##### `this` 到底是什么

- `this` 是在函数被调用时发生的绑定，和函数声明的位置没有关系，它的上下文（指向）取决于函数调用时的各种条件。
- 当一个函数被调用时，会创建一个活动记录（执行上下文）。
	- 这个记录会包含函数在哪里被调用（调用栈）、函数的调用方法、传入的参数等信息。`this` 就是记录的其中一个属性，会在函数执行的过程中用到。

### <p style="background:orange;">第2章 this全面解析</p>

##### 调用位置（调用方法）

`调用栈`：为了到达当前执行位置所调用的所有函数，类似于函数调用链。

调用位置就是在当前执行的函数的前一个调用中。

	function baz() {
	  // 当前调用栈是：baz
	  // 因此，当前调用位置是全局作用域
	
	  console.log('baz');
	  bar();  // <-- bar 的调用位置
	}
	
	function bar() {
	  // 当前调用栈是：baz -> bar
	  // 因此，当前调用位置在 baz 中
	
	  console.log('bar');
	}
	
	baz();  // <-- baz 的调用位置

##### 绑定规则

1.&nbsp;默认绑定：独立函数调用，`this` 指向全局对象

	function foo() {
	  console.log(this.a);
	}
	
	var a = 2;
	foo();  // 2

> 严格模式下，全局对象将无法使用默认绑定，`this` 会绑定到 `undefined`

2.&nbsp;隐式绑定：考虑调用位置是否有上下文对象

	function foo() {
	  console.log(this.a);
	}
	
	/**
	 * 无论是直接在 obj 中定义还是先定义再添加引用属性，foo() 严格来说都不属于 obj 对象
	 */
	var obj2 = {
	  a: 42,
	  foo: foo	// 当做 obj 的引用属性添加
	};
	
	var obj1 = {
	  a: 2,
	  obj2: obj2
	}
	
	/**
	 * 对象属性引用链中只有最顶层或者说最后一层会影响调用位置。
	 * 调用位置使用 obj2 的上下文来引用函数
	 */
	obj1.obj2.foo();  // 42

> 当函数有上下文对象时，`隐式绑定` 规则会把函数调用中的 `this` 绑定到这个上下文对象。

<span style="color:red">*隐式丢失*</span>：被 `隐式绑定` 的函数会丢失绑定对象，即会应用 `默认绑定`。

[例1：]

	function foo() {
	  console.log(this.a);
	}
	
	var obj = {
	  a: 2,
	  foo: foo
	};
	
	var bar = obj.foo;  // 函数别名！
	var a = "oops, global"; // a是全局对象的属性
	bar();  // 'oops, global'

[例2：*传入回调函数* ]

	function foo() {
	  console.log(this.a);
	}
	
	// 参数传递其实就是一种隐式赋值
	function doFoo(fn) {
	  // fn 其实引用的是 foo
	
	  fn(); // <-- 调用位置！
	}
	
	var obj = {
	  a: 2,
	  foo: foo
	};
	
	var a = "oops, global"; // a是全局对象属性
	
	doFoo(obj.foo); // 'oops, global'

	// 传入语言内置的函数
	setTimeout(obj.foo, 2000); // 'oops, global'

JavaScript 环境中内置的 setTimeout() 函数实现和下面的伪代码类似：

	function setTimeout(fn, delay) {
	  // 等待 delay 毫秒
	  fn(); // <-- 调用位置
	}

> 调用回调函数的函数可能会修改 this。
>
> 在一些流行的 JavaScript 库中事件处理器常会把回调函数的 `this` 强制绑定到触发事件的 DOM 元素上。
> 
> 实际上，你无法控制回调函数的执行方式，因此就没有办法控制会影响绑定的调用位置。

3.&nbsp;显示绑定

4.&nbsp;`new` 绑定

### <p style="background:orange;">第3章 对象</p>

### <p style="background:orange;">第4章 混合对象“类”</p>

### <p style="background:orange;">第5章 原型</p>

### <p style="background:orange;">第6章 行为委托</p>