# Promise备忘

1. new Promise(function(resolve, reject) { … })中的function(resolve, reject)会立即执行

2. Promise.then()会放到Promise job queue中，放到本次event loop的最后执行(因为Promise.then是micro task)

   *注意：setTimout是放到下一次event loop的最前面执行*

```javascript
(function test() {
    setTimeout(function() {console.log(4)}, 0);
    new Promise(function executor(resolve) {
        console.log(1);
        for( var i=0 ; i<10000 ; i++ ) {
            i == 9999 && resolve();
        }
        console.log(2);
    }).then(function() {
        console.log(5);
    });
    console.log(3);
})()

// 输出
1
2
3
5
4
```

3. Promise.then会返回一个Promise对象，所以可以链式调用

```javascript
var a = new Promise((resolve, reject) => {
    ...
    resolve(value);
})
a.then(function(value) {
    console.log(value)
}).then(function(value) {
    console.log(value)
})
// 第一次then没有返回值，但是会默认返回undefined的Promise供第二个then使用
```

