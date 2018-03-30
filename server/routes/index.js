const express = require('express'),
      mysql = require('mysql'),
      dbConfig = require('../db_config'),
      path = require('path'),
      fs = require('fs');
const markdown = require( "markdown" ).markdown;
const router = express.Router();
const connection = mysql.createConnection(dbConfig);
const ReactDOMServer = require('react-dom/server');

const reactComponent = require(`process.cwd()/public/script/app.js`);
console.log(reactComponent)
/**
 * 渲染代码
 * @param {React.ComponentType} component 
 */
function handleRender(component, callback) {
  console.log(component);
  const html = ReactDOMServer.renderToString(component);
  console.log(html)
  const template = process.cwd() + '/react/template.html';
  // 加载 index.html 的内容
  fs.readFile(template, 'utf8', function (err, data) {
    if (err) throw err;
    // 把渲染后的 React HTML 插入到 div 中
    const document = data.replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`);

    // 把响应传回给客户端
    // res.send(document);
    callback(document);
  });
}

// // 首页
// router.get('/', function (req, res, next) {
//   // res.render('index', { title: 'My Blog'});
//   connection.query('SELECT id, title, date_format(time, "%Y-%m-%d") as time FROM article', function (err, results) {
//     if (err) next(err);
//     res.render('index', {
//       title: 'Posts',
//       nav: [{
//         url: '#',
//         title: 'Home'
//       }, {
//         url: '#',
//         title: 'About'
//       }, {
//         url: '#',
//         title: 'CV'
//       }, {
//         url: '#',
//         title: 'Tools'
//       }],
//       list: results
//     });
//   })
// })

// // 内容页
// router.get('/article/:id', function (req, res) {
//   // console.log(req.params.id);
//   connection.query('SELECT * FROM articles where id = ?',
//     [req.params.id], function (err, results) {
//       res.render('article', {
//         nav: [{
//           url: '#',
//           title: 'Home'
//         }, {
//           url: '#',
//           title: 'About'
//         }, {
//           url: '#',
//           title: 'CV'
//         }, {
//           url: '#',
//           title: 'Tools'
//         }],
//         article: results[0]
//       })
//     })
//   // res.render('index', { title: 'My Blog'})
// })

/**
 * 首页
 */
router.get('*', function (req, res) {
  // res.sendFile(path.join(__dirname, '../../public/html/index.html'));
  handleRender(reactComponent, function(doc) {
    console.log(doc);
    res.send(doc);
  })
})

/**
 * 返回文章内容
 */
// router.get('/post/:name', function (req, res) {
//   fs.readFile(process.cwd() + `/markdown/${req.params.name}.md`, function(err, data) {
//     if (err) {
//       console.log(err);
//       throw err
//     }
//     const html = markdown.toHTML(data.toString());
//     res.send(html);
//   });
// }) 

module.exports = router;
