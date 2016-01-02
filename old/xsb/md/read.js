// 关于文件操作 文章更新
var child_process = require('child_process');

var path = ".";
var nameList = [];
child_process.execFile('/bin/ls', ['-CF', path], function (err, result) {
    names = result.replace(/\*/g, '');
    var names = names.split(/\s/g);
    for (var i = 0; i < names.length; i++) {
    	if (names[i] !== '') {
    		nameList.push(names[i]);
    	}
    }
    console.log(nameList);
});