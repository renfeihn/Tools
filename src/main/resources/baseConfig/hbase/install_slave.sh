#!/bin/sh
echo install slave ......

cd ~
tar -cf hhp.tar \
  ./`basename $HADOOP_HOME` \
  ./`basename $HBASE_HOME` \
  ./`basename $PHOENIX_HOME` \
  ./.bash_profile \
  ./data

#有几台生成几台命令
scp hhp.tar @10.7.1.31:
scp hhp.tar @10.7.1.33:
scp hhp.tar @10.7.1.34:


ssh 10.7.1.31 'tar -xf hhp.tar'
ssh 10.7.1.33 'tar -xf hhp.tar'
ssh 10.7.1.34 'tar -xf hhp.tar'
