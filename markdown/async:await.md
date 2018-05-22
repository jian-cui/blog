# 关于async/await的要点

1. async函数返回的是一个Promise对象
2. await后面一般要跟一个Promise对象
3. 语句执行到await后，await后面的函数会立即执行，然后跳出async函数，继续执行其他

```javascript
function output() {
  return new Promise(resolve => {
    console.log('a')
  });
}

async function test() {
  setTimeout(() => {
    console.log('b');
  }, 0);
  var t = await output();
}


test();
console.log('c')
// 输出
a
c
b
```

3. 正常情况下，`await`命令后面是一个 Promise 对象。如果不是，会被转成一个立即`resolve`的 Promise 对象。
4. await执行后的值：
   1. 如果后直接跟着值就直接返回正常值
   2. 如果后面是一个Promis对象(**没有then**)，则返回resolve(value)中的value
   3. 如果后面是一个Promise.then()则返回then中return的值



