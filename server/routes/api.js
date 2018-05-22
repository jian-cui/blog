const fs = require('fs');
const express = require('express'),
  mysql = require('mysql'),
  dbConfig = require('../db_config'),
  path = require('path');

const router = express.Router();
const connection = mysql.createConnection(dbConfig);

function getTags(data) {
  let tagObj = [];
  for (let i = 0; i < data.length; i++) {
    tagObj.push({
      name: data.title,
      url: '/tag/' + data.tag_id
    })
  }
  return tagObj;
}
router.post('/tagList', function (req, res, next) {
  connection.query('SELECT id, title as tagName from tag', function (err, results) {
    if (err) next(err);
    res.send(results);
  })
})

// 首页列表
router.post('/articleList', function (req, res, next) {
  // const data = req.body;
  // connection.query(`
  //   SELECT a.id, a.title, a.title_en, a.view, date_format(a.time, '%Y-%d-%m %H:%i') as time , group_concat(t.id) as tag_id, group_concat(t.title) as tag_title
  //   FROM
  //     article a,
  //     article_tag r,
  //     tag t
  //   WHERE
  //     a.id = r.article_id AND t.id = r.tag_id group by a.id;`, function (err, results) {
  //     if (err) next(err);
  //     res.send(results);
  //   })
  console.log('getting article list')
  connection.query(`
    SELECT id, title, title_en, view, date_format(time, '%Y-%m-%d %H:%i') as time
    FROM
      article
    WHERE
      visible=1
    order by time DESC`, function (err, results) {
      if (err) next(err);
      res.send(results);
    })
})

// 文章内容
router.post('/articleContent', function (req, res) {
  const name = req.body.id;

  // let path = `html/${name}.html`;
  // fs.readFile(path, {
  //   encoding: 'UTF-8'
  // }, (err, data) => {
  //   if (err) {
  //     res.send({
  //       state: 404,
  //       html: '<h1>页面未找到</h1>'
  //     })
  //   } else {
  //       res.send({
  //         status: 200,
  //         html: data
  //       });
  //   }
  // })

  connection.query(`
    update article set view=view+1 
      where title_en='${name}'
  `, function (err, results) {
    if (err) {
      res.send({
        html: '<h1>更新数据库时发生错误</h1>'
      })
    } else {
      let path = `html/${name}.html`;
      fs.readFile(path, {
        encoding: 'UTF-8'
      }, (err, data) => {
        if (err) {
          res.send({
            state: 404,
            html: '<h1>页面未找到</h1>'
          })
        } else {
            res.send({
              status: 200,
              html: data
            });
        }
      })
    }
  })
})

module.exports = router;