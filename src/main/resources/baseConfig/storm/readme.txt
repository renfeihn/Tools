由于需要安装拓扑，需要先配置kafka、hbase、zk、es、afa等信息
将storm 复制到需要安装的用户主目录
1.check.sh

2.install_storm.sh

安装完成
需要手动刷新当前环境变量
source ~/.bash_profile

启动
./start.sh

校验
执行命令,无错误信息则安装成功： storm list