�˰�װ���� mysql ���֧�ְ�װ˫��

#�����˫������,��Ҫ������

��¼10.7.1.11������mysql�ͻ���
$MYSQL_HOME/bin/mysql -uroot
ִ������sql��
create user repl_user11;
grant replication slave on *.* to repl_user11@'10.7.1.12' identified by 'AgreeDB';
flush privileges;


��10.7.1.11��ִ������sql��
change master to 
master_host='10.1.1.12',
master_port=3306,
master_user='repl_user12',
master_password='AgreeDB',
master_auto_position=1;
start slave;
