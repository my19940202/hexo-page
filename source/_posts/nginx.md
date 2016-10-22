---
title: nginx相关知识
date: 2016-08-13 16:27:29
categories: backend
---

### 上周初配了一天的nginx，整理一下关于nginx的简单配置

> 上周做的事情其实就是给nginx多加一个接口,主要是copy一个已有服务,稍作修改新建一个新服务

> 实际操作中发现公司内容用到的nginx,和网上找到的nginx目录里面还是有些不同的
_但是主要配置文件一样 都在conf/nginx.conf,conf/server.conf_

> 修改了nginx配置之后，采取热启动 kill -HUP pid,更新配置

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
        #新增配置 新增了coupon 路由
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
#老配置 random分发给另外两台机器 负载均衡
upstream backend {
        random;
        retry 2;
        server 10.195.159.33:7892;
        server 10.195.159.16:7892;
}
#新增配置  超时后进行retry
upstream couponend {
        retry 2;
        server 10.67.34.24:8189;
}
```

### 本周做日志统计工作,处理了nginx log

> 统计工作集中在后端请求失败率上 浏览器---nginx---后端，统计从前端日志、nginx日志、后端日志
验证，nginx上主要是看请求数和请求失败数，


#### 基础知识
```nginx
# nginx log_format
log_format  main  '$http_clientip $remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" [$upstream_response_time|$request_time]';
```
字段含义
* http_clientip 客户端ip
* status http状态码
* http_user_agent user_agent   
* request_time
> request processing time in seconds with a milliseconds resolution; time elapsed between the first bytes were read from the client and the log write after the last bytes were sent to the client
可以归纳成nginx接受到http请求到完全返回结果数据的耗时

* upstream_response_time
> keeps times of responses obtained from upstream servers; times are kept in seconds with a milliseconds resolution. Several response times are separated by commas and colons like addresses in the $upstream_addr variable
可以归纳成nginx请求后端拿到数据到关闭连接的耗时
[-|1.015] 有时会出现这样的日志数据,nginx做了缓存处理，没有请求后端，将缓存结果返回给了客户端

#### 获取日志条数以及request_time的区间分布(懒得统计后端，nginx和后端耗时较少)
这个比较简单,python或者shell截取字符串其实都可以
```python
#!/usr/local/bin/python
import sys
"""
stat the upstream_response_time|$request_time
in nginx log
str example:
1. [-|1.015] hit the nginx cache
2. [12,13|0.100] upstream_response_time fail and retry
3. [1.22|1.00] normal
"""
def main():
    num = 0
    list_num = 0
    detail_num = 0
    time_list = range(31)
    hit_cache = 0
    timeGapArr = [0 for x in time_list ]
    for line in sys.stdin:
        item = line
        recommend_flag = 'GET /get_';
        recommend_flag1 = 'GET /get_list.do';
        recommend_flag2 = 'GET /get_detail.do';
        seprateStr = '" ['
        if (recommend_flag1 in line):
            list_num += 1
        if (recommend_flag2 in line):
            detail_num += 1
        if (recommend_flag1 in line and seprateStr in line):
            line = line.replace('\n', '')
            line = line.split(seprateStr)[1].replace(']','')
            line = line.split('|')
            if (line[1].replace('.','').isdigit()):
                num += 1
                req_time = float(line[1])
                idx = int(req_time)
                if (idx <= 30):
                    timeGapArr[idx] += 1
        if ('[-|' in item):
            hit_cache += 1
    print 'list page req num:', list_num
    print 'detail page req num:', detail_num
    print 'total req num', (list_num + detail_num), ' hit cache ', hit_cache
    print time_list
    print timeGapArr
    return None
if __name__ == '__main__':
    main()
```
输出结果
cat data.m1 | python stat.py
> list page req num: 40155
detail page req num: 64
// cache的命中情况
total req num 40219  hit cache  904
// req_time的在 0 1 2 3、、、秒的分布情况
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
[37948, 693, 257, 139, 71, 1026, 3, 3, 0, 0, 3, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]



### 总结
每个项目初版完成后, 前端工作大体上基本完成，后面进入优化阶段。这个阶段优化的都是建立在数据分析的
基础上，最近也就开始搞搞数据分析。
下面是经理给我列的两个数据分析的原则
* 先给出分析的结论
> 一方面自己需要总结分析结论，另外一方面你的上级没有精力去看你的分析数据自己总结

* 不能令人信服的结论结合原始数据分析
> 有争议的数据 最后还是以数据为准