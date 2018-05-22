# Event Loop精要

> Event Loop有两种browsing contexts和workers。

**要点**：

* 一个事件循环(event loop)会有一个或多个任务队列(task queue)
* task queue 就是 macrotask queue
* 每一个event loop都有一个microtask queue

**执行原理**：

* 事件循环的顺序，决定了JavaScript代码的执行顺序。它从script(整体代码)开始第一次循环。之后全局上下文进入函数调用栈。直到调用栈清空(只剩全局)，然后执行所有的micro-task。当所有可执行的micro-task执行完毕之后。循环再次从macro-task开始，找到其中一个任务队列执行完毕，然后再执行所有的micro-task，这样一直循环下去。
* 包裹在一个 script 标签中的js代码也是一个 task 确切说是 macrotask。



**task(macrotask)**:

- setTimeout
- setInterval
- setImmediate
- I/O
- UI渲染



**microtask(job)**: 

* process.nextTick

- promise
- Object.observe
- MutationObserver



参考：

> 1. <https://github.com/creeperyang/blog/issues/21>
> 2. <https://www.w3.org/TR/html5/webappapis.html#event-loop>
> 3. <https://html.spec.whatwg.org/multipage/webappapis.html#task-queue>
> 4. <https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/>