###### 随着业务越来越复杂，项目迭代速度也越来越快，那么项目间的常用业务代码共享变得非常之有必要。而对于公司的业务代码我们当然是不能开源的。这时候就需要搭建一个类似于 http:// npmjs.org 平台私有的npm仓库，用于企业里面常用的业务模块，如业务组件的存放和快速安装。

#### 试想一下没有npm私有库我们可能需要做哪些工作？

1. 了解哪些已有项目有我们需要的可复用业务组件
2. 找到项目模块代码并定位组件
3. 详细查看组件代码，考量功能是否契合
4. copy组件到自己的项目

#### 如果人工拷贝需要1-2个小时的话，那么npm私有仓库命令行安装可能只需要1-2分钟。并且私有仓库一般在自己的服务器搭建，更快速稳定。总结来说私有npm仓库有如下好处：

1. 便于管理企业内的业务组件或者模块
2. 私密性
3. 确保npm服务快速、稳定
4. 控制npm模块质量和安全（防止恶意代码植入）

#### 推荐使用主流方案sinopia
##### sinopia比较偏向于一个零配置、轻量型的私有npm模块管理工具，不需要额外的数据库配置，它内部自带小型数据库，支持私有模块管理的同时也支持缓存使用过的公共模块，发布及缓存的模块以静态资源形式本地存储。支持静态配置型用户管理机制，以及分层模块权限设置。
[github地址](https://github.com/rlidwka/sinopia)

首先服务端需要安装sinopia
```sh
yarn global add sinopia 或者 npm install -g sinopia
```

##### 默认启动端口4873，通过http://localhost:4873/ 可以浏览你上传的包
- 需要切换npm源，优先去找私有库里的包
```sh
npm config set registry http://xxx.xx.xx.xx:xxxx/ // （xx对应对外开放的ip和端口号）
```
- 启动sinopia
```sh
sinopia
```

##### 上面方式启动sinopia只是暂时的，退出命令行就没有了，因此需要一个长期开启sinopia方案，通过pm2托管，可以让sinopia进程永远活着，就算意外挂了也可自动重启。pm2提供开机自启动功能

- 安装pm2
```sh
yarn global add pm2 或者 npm install -g pm2
```


- 使用pm2启动sinopia
```sh
pm2 start sinopia
```a

3. 新建用户
```sh
npm adduser
```

- 客户端配置 建议客户端使用nrm 进行npm registry地址管理和切换
```sh
yarn global add nrm 或者 npm install -g nrm

```
- 添加sinopia仓库地址
```sh
nrm add sinopia http://xxx.xx.xx.xx:xxxx/

```
- （之前服务端开放的地址）切换到私有仓库
```sh
nrm use sinopia
```

- 登录
```sh
npm login
```

- 进入到要上传的代码目录，执行初始化
```sh
npm init
```

- 初始化完成后就执行发布命令
```sh
npm publish xxx
```

- 然后就可以在其他项目中拉到上传的包
```sh
npm install xxx
```

