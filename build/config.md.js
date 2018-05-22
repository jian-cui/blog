const path = require('path');
const fs = require('fs');
// const md = require( "markdown" ).markdown;
const md = require('marked');
const glob = require('glob');

/**
 * 将markdown文件转换为html文件
 * 并且保存至html/路径下
 * @param {string} path markdown文件路径
 */
function MDtoHTML(path) {
  fs.readFile(path, {
    encoding: 'UTF-8'
  }, (err, data) => {
    if (err) throw err;
    let html = md(data);
    let htmlPath = path.replace(/md$/, 'html').replace(/markdown\//, 'html\/');
    fs.writeFile(htmlPath, html, (err) => {
      if (err) throw err;
      console.log(`转换成功 ${htmlPath}`);
    });
  });
}

// 转换md
glob('markdown/!(*.un).md', (err, files) => {
  // console.log(files);
  if (err) throw err;
  files.forEach((path) => {
    MDtoHTML(path);
  })
})

// 复制图片
glob('markdown/images/*', (err, files) => {
  // console.log(files);
  if (err) throw err;
  let newPath;
  files.forEach((path) => {
    // MDtoHTML(path);
    newPath = path.replace(/^markdown/, 'public');
    fs.copyFile(path, newPath, function(err) {
      if (err) throw err;
      console.log(`图片复制成功 ${path} to ${newPath}`)
    })
  })
})
