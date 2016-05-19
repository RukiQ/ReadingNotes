
// 原型链继承--基本模式
function SuperType() {
	this.property = true;
}

SuperType.prototype.getSuperValue = function() {
	return this.property;
};

function SubType() {
	this.subproperty = false;
}

/*
 * 继承实现方式：通过创建 SuperType 的实例，并将该实例赋给 SubType.prototype
 * 实现本质：重写原型对象，代之以一个新类型的实例
 */
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function() {
	return this.subproperty;
}

// 使用
var instance = new SubType();
alert(instance.getSuperValue());	// true