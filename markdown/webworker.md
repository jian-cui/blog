# Web Worker

web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。

_所有主流浏览器均支持 web worker，除了 Internet Explorer。_

> 测试代码见[github](https://github.com/jian-cui/worker_test)

## 专用worker

1. 创建外部worker

   ```javascript
   // worker.js
   var i = 0;
   // function post() {
   //    postMessage(i++); // 发送数据
   //    setTimeout('post()', 500);
   // }
   // post();

   // 接收数据
   onmessage = function(e) {
       // e.data为接收的真实数据
       postMessage(i); // 发送数据
       if (e.data[i] == 0) {
           close(); // 终止worker
       }
   }
   ```

2. 在主文件中创建web worker对象

   ```javascript
   // main.js
   var wyWorker;
   if(window.Worker)
     {
     // Yes! Web worker support!
   	wyWorker = new Worker('workers.js');
     }
   else
     {
     // Sorry! No Web Worker support..
     }
   ```

3. 向worker传递数据

   ```javascript
   document.querySelector('#input').onchange = function(e) {
       myWorker.postMessage(['#input发生修改', e.value]); //往worker.js发送数据
   }
   ```

4. 主线程事件监听，处理数据

   ```javascript
   // 事件监听，处理数据
   wyWorker.onmessage = function(e) {
       // e.data为外部worker发送的数据
       document.getElementById('result').innerHTML = e.data;
   }
   ```

5. 终止web worker

   ```javascript
   // 主线程终止web worker方法
   wyWorker.terminate();
   // 或者
   // 外部worker终止方法
   close();
   ```

6. 生成subworker

   ```javascript
   // 外部worker.js中
   importScripts('subworker1.js', ''subworker2.js); // 生成subworker
   // 注意下载顺序不固定
   ```

   ​

## 共享worker

共享worker可以被多个脚本使用

1. 创建共享worker

   ```javascript
   // main.js
   var mySharedWorker = new SharedWorker('worker.js');
   ```

   **与共享worker通信必须通过端口对象—一个确切的打开的端口供脚本与worker通信（在专用worker中这一部分是隐式进行的）**

   在传递消息之前，端口连接必须被显式打开，打开方式是使用**onmessage**事件处理函数或者**start()**方法。

   start()方法的调用只在**一种情况**下需要，那就是消息事件被addEventListener()方法使用。使用start()方法打开端口连接时，如果父级线程和worker线程需要双向通信，那么他们都需要调用start()方法。

   ```javascript
   //main.js
   // 如果使用addEventListenr监听message必须用start()
   // 否则就不用
   mySharedWorker.port.addEventListener('messge', function(e) {
       // ...
   }, false);
   mySharedWorker.port.start(); // 父级线程中的调用
   ```

   ```javascript
   // worker.js
   port.start(); // worker线程中的调用, 假设port变量代表一个端口
   ```

   ```javascript
   mySharedWorker.port.onmessage = function(e) {
       // ...
   }
   ```

   ​

2. 共享worker中消息的接收和发送

   **postMessage()**方法必须被端口对象调用

   ```javascript
   // main.js
   elm.onchange = function(e) {
       // 通过port调用onmessage
       myShareWorker.port.postMesage(e.value);
   }

   // worker.js
   // 当一个端口连接被创建时，使用onconnect来执行代码
   onconnect = function(e) {
       var port = e.ports[0];
       // 通过port调用onmessage
       port.onmessage = function(e) {
           var result = 'Result: ' + e.data;
           port.postMessage(result);
   	}
   }
   ```

   ​



在HTML文档中，只要引入main.js文件就可以，worker.js会自动下载。*

**注意：** 由于web worker位于外部文件中，它们无法访问以下对象：

 * window
 * document
 * parent



**参考**

> 1. <http://www.w3school.com.cn/html5/html_5_webworkers.asp>
> 2. <https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers>