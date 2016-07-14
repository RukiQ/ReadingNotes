### <p style="background:orange;">第1章 关于this</p>

`this` 是自动定义在所有函数的作用域中的关键字，用于引用合适的*上下文对象*。

##### ☞ 为什么要使用 `this` ？

- `this` 提供了一种更优雅的方式来隐式“传递”一个对象引用，因此可以将API设计得更加简洁并且易于复用。

##### ☞ 对 `this` 的误解

- `this` 不指向函数自身，也不指向函数的词法作用域。

	- 作用域“对象”无法通过JavaScript代码访问，存在于JavaScript引擎内部

##### ☞ `this` 到底是什么

- `this` 是在函数被调用时发生的绑定，和函数声明的位置没有关系，它的上下文（指向）取决于函数调用时的各种条件。
- 当一个函数被调用时，会创建一个活动记录（执行上下文）。
	- 这个记录会包含函数在哪里被调用（调用栈）、函数的调用方法、传入的参数等信息。`this` 就是记录的其中一个属性，会在函数执行的过程中用到。

### <p style="background:orange;">第2章 this全面解析</p>

##### ☞ 调用位置（调用方法）

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

##### ☞ 绑定规则

###### ① 默认绑定：独立函数调用，`this` 指向全局对象

		function foo() {
		  console.log(this.a);
		}
		
		var a = 2;
		foo();  // 2

> 严格模式下，全局对象将无法使用默认绑定，`this` 会绑定到 `undefined`

###### ② 隐式绑定：考虑调用位置是否有上下文对象

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

<span style="color:red">*※ 隐式丢失*</span>：被 `隐式绑定` 的函数会丢失绑定对象，即会应用 `默认绑定`。

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

###### ③ 显式绑定：call()、apply()

<span style="color:red">1) *硬绑定*</span> ：显式绑定的一个变种，解决丢失绑定问题

	function foo() {
	  console.log(this.a);
	}
	
	var obj = {
	  a: 2
	};
	
	var a = 3;
	
	/**
	 * 显式绑定
	 * 仍然存在丢失绑定问题
	 */
	foo.call(obj);  // 2
	foo.call(null); // 3
	
	/**
	 * 硬绑定：显式的强制绑定
	 * 解决丢失绑定问题
	 */
	var bar = function() {
	  foo.call(obj);
	};
	
	bar();  // 2
	setTimeout(bar, 100); // 2
	
	// 硬绑定的 bar 不可能再修改它的 this
	bar.call(window); // 2

[ *硬绑定的典型应用场景* ]：创建一个包裹函数，传入所有的参数并返回接收到的所有值。

	function foo(something) {
	  console.log(this.a, something);
	  return this.a + something;
	}
	
	var obj = {
	  a: 2
	};
	
	var bar = function() {
	  return foo.apply(obj, arguments);
	};
	
	var b = bar(3); // 2 3
	console.log(b); // 5

[ *硬绑定的应用场景2* ]：创建一个 `i` 可重复使用的辅助函数（bind实现及内置函数）

	function foo(something) {
	  console.log(this.a, something);
	  return this.a + something;
	}
	
	/**
	 * 简单的辅助绑定函数：
	 * 返回一个硬编码的新函数，把参数设置为 this 的上下文并调用原始函数
	 */
	function bind(fn, obj) {
	  return function() {
	    return fn.apply(obj, arguments);
	  }
	}
	
	var obj = {
	  a: 2
	};
	
	var bar = bind(foo, obj);
	
	var b = bar(3); // 2 3
	console.log(b); // 5
	
	/**
	 * 硬绑定模式内置方法：
	 * Function.prototype.bind
	 */
	var bar2 = foo.bind(obj);
	
	var b2 = bar(4);  // 2 4
	console.log(b2); // 6

<span style="color:red">2) *API调用的“上下文”*</span> ：提供“上下文”的可选参数，确保回调函数使用指定的 `this`
	
	function foo(el) {
	  console.log(el, this.id);
	}
	
	var obj = {
	  id: 'awesome'
	};
	
	// 调用foo(...)时把 this 绑定到 obj
	[1,2,3].forEach(foo, obj);  // 1 "awesome" 2 "awesome" 3 "awesome"

###### ④ `new` 绑定

在 JavaScript 中，构造函数只是有些使用 `new` 操作符时被调用的函数。它们并不会属于某个类，也不会实例化一个类。实际上并不存在所谓的“构造函数”，只有对于函数的“构造调用”。

使用 `new` 来调用函数时，会自动执行下面的操作：
	
> 1）创建（或者说构造）一个全新的对象；
>
> 2）这个新对象会被执行[[原型]]连接；
>
> 3）这个新对象会绑定到函数调用的 `this`；
>
> 4）如果函数没有返回其他对象，那么 `new` 表达式中的函数调用会自动返回这个新对象。

##### ☞ 优先级/判断 `this`

1. 由 `new` 调用？——> 绑定到新创建的对象。
2. 由 `call` 或 `apply`（或者 `bind`）调用？——> 绑定到指定的对象。
3. 由上下文对象调用？——> 绑定到那个上下文对象。
4. 默认——> 在严格模式下绑定到 `undefined`，否则绑定到全局对象。

[*例子*]:

	function foo(p1, p2) {
	  this.val = p1 + p2;
	}
	
	// 是所以使用 null 是因为在本例中我们并不关心硬绑定的 this 是什么
	// 反正使用 new 时 this 会被修改
	var bar = foo.bind(null, 'p1');
	
	var baz = new bar('p2');
	
	console.log(baz.val); // p1p2

> 在 `new` 中使用硬绑定函数，主要目的是预先设置函数的一些参数，这样在使用 `new` 进行初始化时就可以只传入其余的参数。
>
> bind(...)的功能之一就是可以把第一个参数（第一个参数用于绑定 this）之外的其他参数都传给下层的函数（这种技术成为“部分应用”，是“柯里化”的一种）。

##### ☞ 绑定例外

###### ① 被忽略的 `this`

如果你把 `null` 或者 `undefined` 作为 `this` 的绑定对象传入 `call`、`apply` 或者 `bind`，这些值在调用时会被忽略，实际应用的是默认绑定规则。

- 传入 `null` 的情况：

	- 使用 `apply(...)` 来“展开”一个数组，并当做参数传入一个函数。
	- bind(...)可以对参数进行柯里化（预先设置一些参数）。





###### ② 间接引用
###### ③ 软绑定


### <p style="background:orange;">第3章 对象</p>

### <p style="background:orange;">第4章 混合对象“类”</p>

### <p style="background:orange;">第5章 原型</p>

### <p style="background:orange;">第6章 行为委托</p>