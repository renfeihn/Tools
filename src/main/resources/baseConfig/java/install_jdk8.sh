#!/bin/sh
echo install JDK ......

#echo cp JDK ......
#cp /home/renfei/test/shell/java/jdk-8u102-linux-x64.tar /opt
echo tar JDK ......

tar -xf jdk-8u102-linux-x64.tar -C ${javaPath}


echo add profile
sed -i '$a export JAVA_HOME=${javaPath}/jdk1.8.0_102\nexport PATH=$JAVA_HOME/bin:$PATH\n' /etc/profile

source /etc/profile
echo install end ......
