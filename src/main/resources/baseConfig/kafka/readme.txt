## 需要上传到 kafka用户根目录

1.执行check.sh

3.执行install_es.sh

安装安装检测
1.执行jps命令,可看到"Kafka"进程的运行
2.执行netstat命令,可看到9092端口在监听状态
3.执行以下命令,可查看到topic信息
$KAFKA_HOME/bin/kafka-topics.sh --describe --zookeeper ${topics_zk}/kafka

修改分区数
$KAFKA_HOME/bin/kafka-topics.sh --zookeeper ${topics_zk}/kafka --alter --partitions 8 --topic asda

