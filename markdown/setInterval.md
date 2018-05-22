# setInterval坑

setInterval和setTimeout基本一致，但是setInterval有一处比较坑的地方，即只要定时器到了时间，不论上次的回调函数是否执行完毕，都会开始这一次的执行。

```javascript
function doSomething() {
}

setInterval(doSomething, 1000);
// 这个例子中，如果有什么原因导致doSomething的执行时间超过1s，到了1s后，第二次还是会继续执行doSomething。

function repeat() {
    setTimeout(function() {
        doSomething();
        repeat();
    }, 1000);
}
repeat();
// 这种方式只有等到第一次doSomething()执行完毕才会执行第二次。
```

