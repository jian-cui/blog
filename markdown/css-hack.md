# css hack

1. \9、*、_的css hack

```css
.ie_7_8 {
    color:blue; /*所有浏览器*/
    color:red\9; /*IE8以及以下版本浏览器*/
    *color:green; /*IE7及其以下版本浏览器*/
    _color:purple; /*IE6浏览器*/
}
```

以上代码，在IE6浏览器显示purple，IE7显示green, IE8显示red, 其他浏览器显示blue;