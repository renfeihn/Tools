此安装程序 mysql 最多支持安装双活

#如果是双主策略,需要下配置

登录10.7.1.11，运行mysql客户端
$MYSQL_HOME/bin/mysql -uroot
执行以下sql：
create user repl_user11;
grant replication slave on *.* to repl_user11@'10.7.1.12' identified by 'AgreeDB';
flush privileges;


在10.7.1.11，执行以下sql：
change master to 
master_host='10.1.1.12',
master_port=3306,
master_user='repl_user12',
master_password='AgreeDB',
master_auto_position=1;
start slave;
