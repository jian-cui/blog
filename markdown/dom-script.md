#动态script标签执行

1. 用innerHTML添加的script标签是无法自动执行的，src中包含的外联文件也不会加载(这是符合w3c文档的)
2. 但是用appendChild追加上的script标签是可以
3. eval(scriptText)
4. 用document.write, 此方法在页面上输出的任何内容都是立即执行的
5. jQuery.prototype.html() -内部会用eval和创建新节点的方法进行处理

引用：
<https://www.cnblogs.com/lvdabao/p/4253704.html>