## 正则表达式

`正则表达式` 是一个拆分字符串并查询相关信息的过程。

> 练习网站：[JS Bin](http://jsbin.com/?html,output)

> 正则表达式测试网站：[Regular Expression Test Page for JavaScript](http://www.regexplanet.com/advanced/javascript/index.html)

### <p style="background:#orange;">正则表达式进修</p>

> `正则表达式` 通常被称为 `模式`，是一个用简单方式描述或匹配一系列符合某个句法规则的字符串。

###### <span style="color:#ac4a4a">创建正则表达式的两种方法：</span>

（1）通过正则表达式字面量（推荐）；
	
	var pattern = /test/;

就像字符串是用引号进行界定一样，正则字面量是用 `正斜杠` 进行界定的。

（2）通过构造 RegExp 对象的实例。

	var patter = new RegExp("test");

\* 在开发中，如果正则式已知的，则优先选择字面量语法，而构造器方式则是用于在运行时，通过动态构建字符串来构建正则表达式。

> 正则表达式的3个标志——>这些标志将附加到字面量尾部：`/test/ig`，或者作为 RegExp 构造器的第二个字符参数：`new RegExp("test","ig")`：

> i：不区分大小写

> g：匹配模式中的所有实例

> m：允许匹配多个行

###### <span style="color:#ac4a4a">术语与操作符</span>

**`精确匹配`**：如果一个字符不是特殊字符或操作符，则表示该字符必须在表达式中出现。

	/test/：匹配字符串 test

**`匹配一类字符`**：匹配一个有限字符集中的某一个字符，可以把字符集放到中括号内，来指定该 *字符集(类)操作符*。

> 若想匹配一组有限字符集以外的字符，可以通过在中括号第一个开括号的后面加一个插入符（^）来实现。

> 字符集的变异操作：制定一个范围。（-）

	[abc]：匹配 "a","b","c" 中的任何一个字符
	[^abc]：匹配除了 "a","b","c" 以外的任意字符
	[a-m]：匹配 "a" 和 "m" 之间的任何一个小写字母

**`转义`**：使用反斜杠对任意字符进行转义，让被转义字符作为字符本身进行匹配。（在字符串中使用时，需要对反斜杠进行转义）

	\[：匹配 [ 字符
	\\：匹配 \ 字符

**`匹配开始或结束`**：插入符号(^)表示从字符串的开头进行匹配，美元符号($)表示该模式必须出现在字符串的结尾

> 这里的插入符号只是 ^ 字符的一个重载，它还可以用于否定一个字符类集。

	/^test$/：同时使用^和$，表明指定的模式必须包含整个候选字符串

**`重复出现`**：匹配任意数量的相同字符

- `?`：在一个字符后面加一个问号，定义为该字符是可选的（可以出现一次或根本不出现）

		/t?est/：可以匹配 "test" 和 "est"

- `+`：如果一个字符要出现一次或多次，可以使用加号

		/t+est/：可以匹配 "test" "ttest" "tttest"

- `*`：如果一个字符要出现0次或多次，可以使用星号

		/t*est/：可以匹配 "test" "ttest" "tttest" "est"

- `{n}`：在字符后面的花括号里指定一个数字来表示重复次数

		/a{4}/：表示匹配含有连续四个 "a" 字符的字符串

- `{n,m}`：在字符后面的花括号里指定两个数字（用逗号隔开），表示重复次数区间

		/a{4,10}/：表示匹配任何含有连续4个至10个 "a" 字符的字符串

- `{n,}`：次数区间的第二个值是可选的（但是要保留逗号），表示一个开区间

		/a{4,}/：表示匹配任何含有连续4个或多于4个 "a" 字符的字符串

> 这些重复操作符可以是 <span style="color:red">*贪婪的* </span>或 <span style="color:red">*非贪婪的*</span>。默认情况下，它们是 *贪婪的*：它们匹配所有的字符组合。

> 在操作符后面加一个问号 <span style="color:red">`?`</span> 字符（`?` 操作符的一个重载），如 <span style="color:red">`a+?`</span>，可以让该表达式编程称为 <span style="background:yellow">*非贪婪的*：进行最小限度的匹配。</span>

	// 对字符串 "aaa" 进行匹配
	/a+/：将匹配所有这三个字符
	/a+?/：只匹配一个 a 字符，因为一个 a 字符就可以满足 a+ 术语

**`预定义字符类`**：匹配一些不可能用字面量字符来表示的字符（如像回车这样的控制字符、小数位数或一组空白字符）

![7-1](https://github.com/RukiQ/blog-learning-patch/blob/master/JS-JSNinja/img/7-1.png?raw=true)

**`分组`**：如果将操作符应用于一组术语，可以像数学表达式一样在该组上使用小括号

	/(ab)+/：匹配一个或多个连续出现的子字符串 "ab"

- 当正则表达式有一部分是用括号进行分组时，它具有双重责任，同时也创建所谓的 <span style="color:red">*捕获*</span>。

**`或操作符(OR)`**：可以用竖线 ( `|` ) 表示或者的关系。

	/a|b/：匹配 "a" 或 "b" 字符
	/(ab)+|(cd)+/：匹配出现一次或多次的 "ab" 或 "cd"

**`反向引用`**：正则表达式中最复杂的术语是，在正则中所定义的 <span style="color:red">*捕获* </span>的反向引用，将 *捕获* 作为正则表达式中能够成功匹配术语时的候选字符串。

> 这种术语表示法是在 `反斜杠` 后面加一个要引用的捕获数量，该数字从1开始，如\1、\2等。

	/^([dtn])a\1/：可以任意一个以 "d","t","n" 开头，且后面跟着一个 a 字符，并且再后面跟着的是和第一个捕获相同字符的字符串

> 不同于 /[dtn]a[dtn]/，a 后面的字符有可能不是 "d" "t" 或 "n" 开头，但这个字符肯定是以触发该匹配的其中一个字符 ("d" "t" 或 "n") 开头。因此，\1 匹配的字符需要在执行的时候才能确定。

### <p style="background:#orange;">编译正则表达式</p>

正则表达式的两个重要阶段：

（1）<span style="color:red">*编译*</span>：发生在正则表达式第一次被创建的时候；

（2）<span style="color:red">*执行*</span>：发生在我们使用编译过的正则表达式进行字符串匹配的时候。

<span style="background:yellow;">注意</span>：每个正则表达式都有一个独立的对象表示，每次创建正则表达式（也因此被编译），都会为此创建一个新的正则表达式对象。和其他的原始类型不太一样，<span style="color:#b01c57">其结果将永远是独一无二的</span>。

<span style="background:yellow;">特别重要的一点</span>，用 `构造器` 创建正则表达式的使用，这种技术允许我们，<span style="color:#b01c57">在运行时通过动态创建的字符串构建和编译一个正则表达式</span>。对于构建大量重用的复杂表达式来说，这是非常有用的。

### <p style="background:#orange;">用正则表达式进行捕捉操作</p>

正则表达式的 **实用性** 表现在捕获已匹配的结果上，这样我们便可以在其中进行处理。

##### 1.&nbsp;执行简单的捕获 —— <span style="color:red">`match()`</span>

- `match()` 返回的数组的第一个索引的值总是该匹配的完整结果，然后是每个后续捕获结果。

- 记住，<span style="background:yellow;">捕获是由正则表达式中的小括号所定义。</span>

##### 2.&nbsp;用全局表达式（/g）进行匹配 —— <span style="color:red">`match()` `exec()`</span>

- 使用 <span style="color:red">`局部正则表达式`</span> 时，返回的该数组包含了在匹配操作中成功匹配的整个字符串以及其他捕获结果。

- 使用 <span style="color:red">`全局正则表达式`</span> 时，匹配所有可能的匹配结果，返回的数组包含了全局匹配结果，而不仅仅是第一个匹配结果。

使用 <span style="color:red">`match()` 或 `exec()`</span>，我们总是可以找到想要寻找的精确匹配。

#####3.&nbsp;捕获的引用

有 *两种方法* ，可以引用捕获到的匹配结果：

（1）自身匹配

（2）替换字符串

> 与反向引用不同，通过调用 <span style="color:red">`replace()`</span> 方法替换字符串获得捕捉的引用时，使用 <span style="color:red">`$1`、`$2`、`$3`</span> 语法表示每个捕获的数字

##### 4.&nbsp;没有捕获的分组

<span style="background:yellow;">小括号的双重责任：（1）进行分组；（2）指定捕获。<span>

- 由于捕获和表达式分组都使用了小括号，所以无法告诉正则表达式处理引擎，哪个小括号是用于分组，以及哪个是用于捕获的。

- 所以会将小括号<span style="color:#b01c57;">既视为分组，又视为捕获</span>，由于有时候需要指定一些正则表达式分组，所以会导致捕获的信息比我们预期的还要多。

要让一组括号<span style="color:#b01c57;">不进行结果捕获</span>，正则表达式的语法允许我们在开始括号后加一个<span style="color:red"> `?:`</span> 标记，这就是所谓的 <span style="color:red">*被动子表达式*</span>。

	var pattern = /((?:ninja-)+)sword/;
	// 外层小括号 ——> 定义捕获（sword之前的字符串）
	// 内层小括号 ——> 针对 + 操作符，对 "ninja-" 文本进行分组
	// ?: ——> 只会为外层的括号创建捕获，内层括号被转换为一个被动子表达式

### <p style="background:#orange;">利用函数进行替换</p>

<span style="color:red">`String` 对象的 `replace` 方法</span>:

（1）将正则表达式作为第一个参数，导致在该模式的匹配元素上进行替换。

	"ABCDEfg".replace(/[A-Z]/g, "X");	// XXXXXfg，替换所有的大写字母为“X”

（2）<span style="color:#b01c57">（最强大特性）</span>接受一个函数作为替换值，函数的返回值是即将要替换的值。（这样可以在运行时确定该替换的字符串，并掌握大量与匹配有关的信息。）

	/* 
	 * 第一个参数：传入完整的字符串
	 * 第二个参数：捕获结果
	 */
	function upper(all, letter) {
		return letter.toUpperCase();
	}

	/* 
	 * 函数第一次调用时，传入 "-b" 和 "b"
	 * 函数第二次调用时，传入 "-w" 和 "w"
	 */
	"border-bottom-width".replace(/-(\w)/g, upper);	// borderBottomWidth


> 当替换值（第二个参数）是一个函数时，每个匹配都会调用该函数并带有一串参数列表。

> - 匹配的完整文本。

> - 匹配的捕获，一个捕获对应一个参数。

> - 匹配字符在源字符串中的索引。

> - 源字符串。

<span style="color:#ac4a4a">例子：</span>

	/*
	 * 让查询字符串转换成另外一个符合我们需求的格式
	 * 原始字符串：foo=1&foo=2&blah=a&blah=b&foo=3
	 * 转换成：foo=1,2,3&blah=a,b
	 */
	function compress(source) {
		var keys = {};	// 保存局部键
	
		source.replace(
			/([^=&]+)=([^&]*)/g,
			function(full, key, value) {
				keys[key] = (keys[key] ? keys[key] + "," : "") + value;	// 提取键值对信息
	
				/* 
				 * 返回空字符串，因为我们确实不关注源字符串中发生的替换操作
				 * 我们只需要利用该函数的副作用，而不需要实际替换结果
				 */
				return "";
			}
		);
	
		// 收集键的信息
		var result = [];
		for (var key in keys) {
			result.push(key + "=" + keys[key]);
		}
	
		// 使用&将结果进行合并
		return result.join("&");
	}
	
	var origin = "foo=1&foo=2&blah=a&blah=b&foo=3";
	compress(origin);	// "foo=1,2,3&blah=a,b"
	
- <span style="color:red">一个有趣点：</span>如何使用字符串的 `replace()` 方法来遍历一个字符串，而不是一个实际的搜索替换机制。

- <span style="color:red">两个关键点：</span>1）传递一个函数作为替换值参数；2）该函数并不是返回实际的值，而是简单地利用它作为一种搜索手段。

> 利用这种技巧，我们可以使用 `String` 对象的 `replace()` 方法作为<span style="background:yellow">字符串搜索机制</span>。搜索结果不仅快速，而且简单、有效。

### <p style="background:#orange;">常用正则表达式</p>

###### <span style="color:#ac4a4a">修建字符串：</span>




###### <span style="color:#ac4a4a">匹配换行符：</span>





###### <span style="color:#ac4a4a">Unicode：</span>