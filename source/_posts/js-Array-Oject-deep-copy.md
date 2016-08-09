---
title: 'js_Array&Oject_deep_copy'
date: 2016-04-10 12:45:41
categories: js
---

js传值使用了引用，在一些场景下会遇到一些奇怪的问题，如

```javascript
// 浅拷贝
var a = [1,2,3]
var b = a;
var c = a;
a[1] = '2nd';
// 实际输出a,b,c发现 都是 [1, "2nd", 3]


var a = {a:1231,b:312}
var b = a
var c =a
a.a = 'this is a in a'
// 实际输出a,b,c 发现都是 {a: "this is a in a", b: 312}
```

### array
```javascript
var a = [1,2,3]
// var b = a;
// var c = a;
var b = a.slice(0, a.length);
var c = a.concat();
a[0] = 'aaaa';
// b,c 没有变化
```

### object
```javascript
// 遍历每个属性，这个办法还是有问题的(一旦这个obj比较复杂,含有数组，这个function就不能用了)
var deepCopy = function(source) {
    var result = {};
    for (var key in source) {
        result[key] = typeof source[key]==='object'? deepCopy(source[key]): source[key];
    } 
    return result;
}
```
