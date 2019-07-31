执行脚本顺序：
1.check.sh

2.install_hbase.sh

3.免密生成：每台需要安装的服务器上执行 ssh_auto.sh
注意
需要查看host_ip.txt 中IP、用户、密码是否正确
自动生成免密需要 expect命令的支持

4.主节点安装完成后执行(将主节点东西下发到各slave)
install_slave.sh

5.首次安装时执行
查看service_init.sh请按脚本中顺序依次在各服务器中执行


6.启动服务
start.sh