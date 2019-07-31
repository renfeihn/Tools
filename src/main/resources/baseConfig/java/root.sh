#!/bin/sh

echo su root ......

basepath=$(cd `dirname $0`; pwd)

su - root -s /bin/sh $basepath/install_jdk8.sh