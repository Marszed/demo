## http主要有哪些安全隐患
1. 窃听 `明文`
2. 伪装 `不认证通信双方`
3. 不完整 `无法确认请求响应内容是否被篡改`

## https的应对策略
1. ssl 加密`对称加密+非对称加密`
2. ssl 认证`CA`
3. ssl 完整性保护`MAC(Message Authentication Code)摘要`

## https的安全通信机制 （图解HTTP版本）
![https的安全通信机制](https://github.com/Marszed/demo/blob/master/blog/image/https1.png)
![SSL/TLS](https://github.com/Marszed/demo/blob/master/blog/image/ssl_password.jpg)
## SSL/TLS握手流程（IBM版本）
![SSL/TLS](https://github.com/Marszed/demo/blob/master/blog/image/sy10660a.gif)
[IBM知识库文档链接](https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_7.1.0/com.ibm.mq.doc/sy10660_.htm)
#### 备注：SYN 同步序列号、 ACK 确认字符

## SSL与TLS发展背景
- `Netscape`(网景通信公司)率先提出发展，开发过SSL3.0之前的版本，后转移到`IETF`(互联网工程任务组),已SSL3.0为基础开发了TLS1.0、TLS1.1、TLS1.2 

## https的弊端
- http: http -> tcp -> ip
- https: http -> ssl -> tcp -ip
1. 通信慢 (多了ssl握手)
2. 处理慢 (客户端服务端加解密资源消耗)
#### 解决方案
1. 针对处理慢，使用SSL加速器(专用服务器) 只做ssl加解密的处理，分担负载


## 常见的网络攻击
1. ##### SYN攻击(DOS攻击的一种)
- 攻击原理: 利用三次握手中的第二步(服务器ACK了客户端SYN，并且发送一个SYN，此时出于办理半连接状态`等待确认`
- 攻击方式: 客户端在短时间内伪造大量不存在的IP地址，向服务器不断地发送SYN包，服务器回复ACK确认包，并等待客户端的确认。
- 攻击影响: 由于源地址是不存在的，服务器需要不断的重发直至超时，这些伪造的SYN包将长时间占用未连接队列，正常的SYN请求被丢弃，目标系统运行缓慢，严重者引起网络堵塞甚至系统瘫痪
- 检测方式: 在服务器上看到大量的半连接状态时，特别是源IP地址是随机的。在Linux下可以如下命令检测是否被Syn攻击`netstat -n -p TCP | grep SYN_RECV`
- 防御方法: 一般较新的TCP/IP协议栈都对这一过程进行修正来防范SYN攻击，修改TCP协议实现。主要方法有SynAttackProtect保护机制、SYN cookies技术、增加最大半连接和缩短超时时间等

2. ##### 中间人攻击
- 攻击原理: 利用SSL握手协议中，协商密钥的时候（非对称加密阶段），进行劫持拿到证书的公钥和私钥
- 攻击方式: 
1. 服务器向客户端发送公钥。
2. 攻击者截获公钥，保留在自己手上。
3. 然后攻击者自己生成一个【伪造的】公钥，发给客户端。
4. 客户端收到伪造的公钥后，生成加密hash值发给服务器。
5. 攻击者获得加密hash值，用自己的私钥解密获得真秘钥。
6. 同时生成假的加密hash值，发给服务器。
7. 服务器用私钥解密获得假秘钥。
- 防御方法: 做好证书的校验

3. ##### XSS
- 攻击原理: 通过利用存在安全漏洞的Web网站的浏览器端运行非法的HTML或JS
- 攻击类型: 非持久型攻击(DOM XSS、反射型XSS)、持久型攻击(Stored XSS)
- 攻击影响: 
1. 利用虚假输入表单窃取个人信息
2. 窃取用户Cookie
3. 显示伪造的内容
- 防御方法: 永远不相信用户的输入。客户端与服务端做好转义与过滤、慎用eval、安全Cookie（HttpOnly）

4. ##### CSRF
- 攻击原理: 利用设置好的陷阱，强制对已完成认证的用户进行非法操作
- 防御方法: 做好XSS防御、指定, 检查Referer、设置token

        
