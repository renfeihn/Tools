## ��Ҫ�ϴ��� kafka�û���Ŀ¼

1.ִ��check.sh

3.ִ��install_es.sh

��װ��װ���
1.ִ��jps����,�ɿ���"Kafka"���̵�����
2.ִ��netstat����,�ɿ���9092�˿��ڼ���״̬
3.ִ����������,�ɲ鿴��topic��Ϣ
$KAFKA_HOME/bin/kafka-topics.sh --describe --zookeeper ${topics_zk}/kafka

�޸ķ�����
$KAFKA_HOME/bin/kafka-topics.sh --zookeeper ${topics_zk}/kafka --alter --partitions 8 --topic asda

