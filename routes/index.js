const express = require('express'),
      mysql = require('mysql'),
      dbConfig = require('../db_config'),
      path = require('path');

const router = express.Router();
const connection = mysql.createConnection(dbConfig);

// 首页
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'My Blog'});
  connection.query('SELECT id, title, date_format(time, "%Y-%m-%d") as time FROM articles', function (err, results) {
    if (err) next(err);
    res.render('index', {
      title: 'Posts',
      nav: [{
        url: '#',
        title: 'Home'
      }, {
        url: '#',
        title: 'About'
      }, {
        url: '#',
        title: 'CV'
      }, {
        url: '#',
        title: 'Tools'
      }],
      list: results
    });
  })
})

// 内容页
router.get('/article/:id', function (req, res) {
  console.log(req.params.id);
  connection.query('SELECT * FROM articles where id = ?',
    [req.params.id], function (err, results) {
      console.log(111);
      res.render('article', {
        nav: [{
          url: '#',
          title: 'Home'
        }, {
          url: '#',
          title: 'About'
        }, {
          url: '#',
          title: 'CV'
        }, {
          url: '#',
          title: 'Tools'
        }],
        article: results[0]
      })
    })
  // res.render('index', { title: 'My Blog'})
})

// // 测试页
router.get('/test/:html', function (req, res) {
  // res.send('<p>This is a test</p>');
  // console.log('/html/' + req.params.html + '.html');
  res.sendFile(path.join(__dirname, '../public/html/' + req.params.html + '.html'));
})

// react测试页
router.get('/react', function (req, res) {
  res.sendFile('/html/index.html')
})

module.exports = router;
