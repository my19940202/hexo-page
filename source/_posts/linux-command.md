---
title: linux_command
date: 2016-07-10 14:43:30
tags:
---
**整理了自己常用到一些Linux命令，自己使用的较多**

<table border=1> <thead> <tr> <td>类型<td>命令<td>作用   <tbody> <tr> <td>文件操作<td>tar -zcvf target.tar.gz sourcefile<td>压缩  <tr> <td>文件操作<td>tar -zxvf target.tar.gz<td>解压缩  <tr> <td>文件操作<td>du -hs path<td>查看文件大小（Mb单位）  <tr> <td>文件操作<td>cp -r xx yy<td>递归方式拷贝（拷贝所有文件和文件夹）  <tr> <td>文件操作<td>wget http://a.com/b.jpg -P pic/<td>wget 指定文件存放的目录  <tr> <td>文件操作<td>chmod 755 imgcat<td>imgcat是imgcat.sh 去掉了后缀名,可以直接 ./imgcat (sh imgcat.sh)  <tr> <td>文件操作<td>scp -r username@servername:/path/filename /target/path<td>拷贝别人开发机的文件(-r 拷贝所有文件和文件夹)  <tr> <td>字符处理<td>sed 's/\t/,/g’ data.txt<td>data.txt中的tab=>','  <tr> <td>字符处理 <td> grep -o 'xxx' data.txt | wc -l<br> grep -r 'name' ./<br>  <td>data.txt中的xxx的出现次数<br>查看当前目录下面的所有含有name字符串的文件  <tr> <td>字符处理<td>iconv -f 'utf-8' -t 'gbk' a.txt > b.txt<td>utf8=>gbk  <tr> <td>字符处理 <td> sed -n '5,10p' data.txt <br> sed -n '10p' data.txt<br> cat nohup.out| head -n 100<br> cat nohup.out| tail -n 100  <td>看5-10行，看第10行,头100，尾100  <tr> <td>hadoop<td>hadoop fs -getmerge /app/2016 data.txt<td>2016目录下的所有文件merge到data.txt中  <tr> <td>hadoop<td>hadoop fs -cat,-ls<td>fs类型的多种操作  <tr> <td>其他<td>ps -ax<td>查看所有进程  <tr> <td>其他<td>crontab -e<td>定时任务配置  <tr> <td>其他 <td> date +%Y-%m-%d <br> date -d yesterday +%Y%m%d <br> date -d tomorrow +%Y%m%d <br> date -d '30 days ago' +%Y%m%d  <td>时间获取  </table>


<!-- 
<table border="1">
    <thead>
        <tr>
            <td>类型</td><td>命令</td><td>作用</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>文件操作</td><td>tar -zcvf target.tar.gz sourcefile</td><td>压缩</td>
        </tr>
        <tr>
            <td>文件操作</td><td>tar -zxvf target.tar.gz</td><td>解压缩</td>
        </tr>
        <tr>
            <td>文件操作</td><td>du -hs path</td><td>查看文件大小（Mb单位）</td>
        </tr>
        <tr>
            <td>文件操作</td><td>cp -r xx yy</td><td>递归方式拷贝（拷贝所有文件和文件夹）</td>
        </tr>
        <tr>
            <td>文件操作</td><td>wget http://a.com/b.jpg -P pic/</td><td>wget 指定文件存放的目录</td>
        </tr>

        <tr>
            <td>文件操作</td><td>chmod 755 imgcat</td><td>imgcat是imgcat.sh 去掉了后缀名,可以直接 ./imgcat (sh imgcat.sh)</td>
        </tr>
        <tr>
            <td>文件操作</td><td>scp -r username@servername:/path/filename /target/path</td><td>拷贝别人开发机的文件(-r 拷贝所有文件和文件夹)</td>
        </tr>
        <tr>
            <td>字符处理</td><td>sed 's/\t/,/g’ data.txt</td><td>data.txt中的tab=>','</td>
        </tr>
        <tr>
            <td>字符处理</td>
            <td>
                grep -o 'xxx' data.txt | wc -l<br/>
                grep -r 'name' ./<br/>
            </td>
            <td>
                data.txt中的xxx的出现次数<br/>
                查看当前目录下面的所有含有name字符串的文件
            </td>
        </tr>
        <tr>
            <td>字符处理</td><td>iconv -f 'utf-8' -t 'gbk' a.txt > b.txt</td><td>utf8=>gbk</td>
        </tr>
        <tr>
            <td>字符处理</td>
            <td>
            sed -n '5,10p' data.txt <br/>
            sed -n '10p' data.txt<br/>
            cat nohup.out| head -n 100<br/>
            cat nohup.out| tail -n 100 
            </td>
            <td>看5-10行，看第10行,头100，尾100</td>
        </tr>
        <tr>
            <td>hadoop</td><td>hadoop fs -getmerge /app/2016 data.txt</td><td>2016目录下的所有文件merge到data.txt中</td>
        </tr>
        <tr>
            <td>hadoop</td><td>hadoop fs -cat,-ls</td><td>fs类型的多种操作</td>
        </tr>

        <tr>
            <td>其他</td><td>ps -ax</td><td>查看所有进程</td>
        </tr>
        <tr>
            <td>其他</td><td>crontab -e</td><td>定时任务配置</td>
        </tr>
        <tr>
            <td>其他</td>
            <td>
                date +%Y-%m-%d <br/>
                date -d yesterday +%Y%m%d <br/>
                date -d tomorrow +%Y%m%d <br/>
                date -d '30 days ago' +%Y%m%d
            </td>
            <td>时间获取</td>
        </tr>
    </tbody>
</table>
-->

** 本来在编辑的时候，markdown 无法使用表格自己就用了html的表格，发现原文的换行会被转换成'&lt;br/&gt;', 以后在markdown里面用到table元素需要注意这点**