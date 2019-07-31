#!/bin/sh
echo install storm ......

#echo cp storm ......

#cp es/elasticsearch-6.0.0.tar.gz ./
echo tar storm ......
tar -zxf elasticsearch-6.0.0.tar.gz -C ~/

cd ~
echo add profile
sed -i '$a export DATA_DIR=~/data\nexport LOGS_DIR=~/logs\nexport ES_HOME=$HOME/elasticsearch-6.0.0' ~/.bash_profile

source ~/.bash_profile

echo mkdir
mkdir -p $DATA_DIR/es $LOGS_DIR/es

echo copy storm.yaml
cp storm/storm.yaml ~/apache-storm-1.2.2/conf/

echo start es
$ES_HOME/bin/elasticsearch -d

#≈‰÷√ƒ£∞Â
./storm/index_temp.sh

echo install end ......
