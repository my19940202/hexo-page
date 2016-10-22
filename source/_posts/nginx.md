---
title: nginx
date: 2016-08-13 16:27:29
categories: backend
---

#### 上周初配了一天的nginx，整理一下关于nginx的简单配置

> 上周做的事情其实就是给nginx多加一个接口，只提供unionimage.baidu.com:7890，
unionimage.baidu.com:7891两个出口，所以不能简单复制一份nginx配置，修改端口就能完事。
需要在原来的上，给URL后新建路径提供新服务，类似于 unionimage.baidu.com:7890/newservice/ 这样的形式。

> 实际操作中发现公司内容不用到的nginx,和网上找到的nginx目录里面还是有些不同的，但是主要还是修改conf/nginx.conf
,conf/server.conf,其他公用配置就没有修改


_conf/nginx.conf_
```nginx
server {
        # 监听7891端口
        listen       7891 deferred;
        server_name  localhost;


        access_log  logs/access.log main;
        error_log   logs/error.log;

        #之前老配置
        location / {
            proxy_pass http://backend;
            proxy_set_header Host      $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
        #新增配置
        location /coupon {
            proxy_pass http://couponend;
        }
        fastcgi_intercept_errors on;
        server_tokens  off;

        error_page 400 403 404 "/search/error.html";
        error_page 500 501 502 503 504 505 "/search/blank.html";

    }
}
```


_conf/server.conf_
```nginx
#之前老配置 分发给另外两台机器
upstream backend {
        random;
        retry 2;
        server 10.195.159.33:7892;
        server 10.195.159.16:7892;
}
#新增配置
upstream couponend {
        retry 2;
        server 10.67.34.24:8189;
}
```