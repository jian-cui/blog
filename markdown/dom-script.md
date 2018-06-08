#动态script标签

1. 用innerHTML添加的script标签是无法自动执行的，src中包含的外联文件也不会加载(这是符合w3c文档的)
2. 但是用appendChild追加上的script标签是可以

引用：
<https://www.cnblogs.com/lvdabao/p/4253704.html>