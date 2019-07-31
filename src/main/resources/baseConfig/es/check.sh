#!/bin/sh
JAVA_VERSION=`java -version 2>&1 |awk 'NR==1{ gsub(/"/,""); print $3 }'`
#echo $JAVA_VERSION
if [[ $JAVA_VERSION =~ "1.8." ]] 
then 
    if [ ${JAVA_VERSION:6} -lt 73 ] 
    then
        echo "It is need to install jdk version 1.8.0_73 or above."
    else
        echo "java version is $JAVA_VERSION, it seems not need to install java again."
    fi
else     
    echo "It is need to install jdk version 1.8.0_73 or above."
fi