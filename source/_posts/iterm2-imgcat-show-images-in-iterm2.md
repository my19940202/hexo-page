---
title: 'iterm2_imgcat:show_images_in_iterm2'
date: 2016-03-02 10:36:20
categories: linux
---

# iterm2 配置imgcat显示图片
---

最近更新的iterm2 提示可以在terminal里面显示图片
于是我就试了一下，官网上只是提供了imgcat.txt 这个文件，具体步骤没有具体说，我想了一下才记起配置环境变量这个事情

* 首先处理imgcat 文件
imgcat这个文件可以随便防止，只要添加到path里面即可
```shell
mv imgcat.txt imgcat
chmod 755 imgcat //赋权限 使./imgcat直接运行
mv imgcat ~/Document/mybin/imgcat 
```

* 添加环境变量
在.bash_profile的path里面加上imgcat所在的目录
有两种写法

```shell
export PATH=/Users/pro/Document/mybin/:$PATH
export PATH=”/Users/pro/sdcfe/tools/ant/bin:/Users/pro/Documents/mybin”
```
最后source 一下 就好了
```shell
source .bash_profile
```
