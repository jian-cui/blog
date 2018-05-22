# js中delete详解

js有自己的垃圾回收机制，因此delete用的时候不是很多，但是了解一下也还是有好处的。

1. 如果删除成功，返回true；反之，false;
2. 如果试图删除不存在的变量， delete不会起任何作用（废话），但是返回true;
3. delete只能删除对象自己的属性，不能删除其原型链上的属性

		function Person () {
		this.name = 'jim';
		}
		Person.prototype.height = '1.1';

		var a = new Person();

		a.name; // jim
		a.height; // height

		delete a.name; // true
		delete a.height; // true

		console.log(a.name); // undefined
		console.log(a.height); // 1.1

4. 用var声明的变量不能从全局或者函数作用域删除

	4.1. 全局作用域中的函数不能被delete, 不论是使用关键字声明还是使用函数表达式的 
	
	4.2. 隶属于某一对象的方法可以被delete

		var1 = 1;
		var var2 = 1;

		delete var1; // true
		delete var2; // false

		var obj = {
		    func: function () {}
		}

		delete obj.func // true


5. 使用let和const声明的变量不能从作用域范围被delete
6. Non-configurable的属性不能被delete(可通过Object.defineProperty()来修改)

		var Employee = {};
		Object.defineProperty(Employee, 'name', {configurable: false});

		delete Employee.name;  // false