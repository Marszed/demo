##### gitHub配置ssh (Mac)

1.   ls -al ~/ .ssh (检验有误.pub文件，若无需要生成新的)
2.   ssh-keygen -t rsa -b 4096 -C “1181939891@qq.com"
3.   Enter (接受默认生成文件路径)
4.   Enter Password (2次)
5.   eval $(ssh-agent -s)   （将SSH Key添加到ssh-agent）
6.   ssh-add ~/.ssh/id_rsa   (提示输入passphrase，输入passphrase后(建议直接回车，不用密码)
7.   ssh -T git@github.com (验证ssh连接)