---
title: linux_command
date: 2016-07-10 14:43:30
categories: linux
---
**整理了自己常用到一些Linux命令，自己使用的较多**

| 类型 | 命令                 | 作用 |
| -------- | -------------------- | -------------------- |
| 文件操作 | ls 20161*.log <br/> ls 20160[1-9]*.log  | 正则方式筛选输出|
| 文件操作 | tar -zcvf target.tar.gz sourcefile | 压缩|
| 文件操作 | tar -zxvf target.tar.gz | 解压缩|
| 文件操作 | du -hs path | 查看文件大小（Mb单位）|
| 文件操作 | df | 磁盘情况预览|
| 文件操作 | cp -r xx yy | 递归方式拷贝（拷贝所有文件和文件夹）|
| 文件操作 | wget http://a.com/b.jpg -P pic/ | wget 指定文件存放的目录|
| 文件操作 | chmod 755 imgcat | imgcat是imgcat.sh 去掉了后缀名,可以直接 ./imgcat (sh imgcat.sh)|
| 文件操作 | scp -r username@servername:/path/filename /target/path | 拷贝别人开发机的文件(-r 拷贝所有文件和文件夹)|
| hadoop | hadoop fs -getmerge /app/2016 data.txt | 2016目录下的所有文件merge到data.txt中 |
| hadoop | hadoop fs -cat,-ls,-dus,-rmr | fs类型的多种操作 |
| 进程 | ps -ax  ps -le &#166; grep node | 查看进程,加上grep进行各种过滤|
| 字符处理 | iconv -f 'utf-8' -t 'gbk' a.txt > b.txt | utf8=>gbk |
| 字符处理 | grep -o 'xxx' data.txt &#166; wc -l<br/> grep -r 'name' ./<br/> | data.txt中的xxx的出现次数<br/>查看当前目录下面的所有含有name字符串的文件 |
| 字符处理 | sed 's/\t/,/g’ data.txt | data.txt中的tab=>','|
| 字符处理 | sed -n '5,10p' data.txt <br/> sed -n '10p' data.txt<br/> cat nohup.out&#166; head -n 100<br/> cat nohup.out&#166; tail -n 100  | 看5-10行，看第10行,头100，尾100 |
| 其他 | date +%Y-%m-%d <br/>date -d yesterday +%Y%m%d <br/>date -d tomorrow +%Y%m%d <br/>date -d '30 days ago' +%Y%m%d | 时间获取 |
| 其他 | tailf nohup.out | 一旦nohup.out更新就去刷新输出 |
| 其他 | crontab -e | 定时任务配置 |
| 其他 | npm list --depth=1 2>/dev/null | 查看npm以及目录安装的包（过滤错误信息） |
