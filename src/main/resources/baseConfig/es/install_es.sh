#!/bin/sh
echo install storm ......

#echo cp storm ......

#cp es/elasticsearch-6.0.0.tar.gz ./
echo tar es ......
tar -zxf elasticsearch-6.0.0.tar.gz -C ~/

cd ~
echo add profile
sed -i '$a export DATA_DIR=~/data\nexport LOGS_DIR=~/logs\nexport ES_HOME=$HOME/elasticsearch-6.0.0' ~/.bash_profile

sleep 1s

source ~/.bash_profile

echo es_home:$ES_HOME

echo mkdir
mkdir -p $DATA_DIR/es $LOGS_DIR/es

echo copy elasticsearch.yml
cp es/elasticsearch.yml $ES_HOME/config/

echo start es
output=`$ES_HOME/bin/elasticsearch -d`

# template config
./es/create_index_temp.sh

echo install end ......
