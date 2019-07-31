#!/bin/sh
echo install mysql start ......

echo tar mysql ......
tar -zxf mysql-5.7.20-linux-glibc2.12-x86_64.tar.gz -C ~/
cd ~

echo add profile
sed -i '$a export DATA_DIR=~/data\nexport LOGS_DIR=~/logs\nexport MYSQL_HOME=~/mysql-5.7.20-linux-glibc2.12-x86_64\nexport PATH=$MYSQL_HOME/bin:$PATH' ~/.bash_profile

source ~/.bash_profile

echo mkdir
mkdir -p $DATA_DIR/mysql $LOGS_DIR/mysql

#修改 $MYSQL_HOME/support-files/mysql.server  有风险？
sed -i "s#basedir=.*#basedir= $MYSQL_HOME#g" $MYSQL_HOME/support-files/mysql.server

#my.cnf文件替换
cp mysql_install/my.cnf $MYSQL_HOME/my.cnf

#初始化数据库
$MYSQL_HOME/bin/mysqld --defaults-file=$MYSQL_HOME/my.cnf --initialize-insecure

#启动数据库
$MYSQL_HOME/support-files/mysql.server start

echo install mysql end ......
