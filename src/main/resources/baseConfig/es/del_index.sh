#!/bin/sh
log=$HOME/logs/es/del-idx.log
pfx=$(/bin/date +'%Y-%m-%d %T')': '
ip=$1
if [ -z $1 ]; then
  ip=`/sbin/ifconfig -a|/bin/grep 'inet ' |/bin/grep -v '127.0.0.1'|/bin/awk '{print $2}'|/usr/bin/tr -d "addr:"|/usr/bin/head -n 1` >>$log
  /bin/echo $pfx'ip is empty, set ip='$ip >>$log
fi
idx='http://'$ip':9200/applog-'$(/bin/date -d "-7 day" +%Y%m%d)
/bin/echo $pfx'delete '$idx >>$log
/usr/bin/curl -XDELETE $idx >>$log 2>&1
/bin/echo >>$log
/bin/echo 'delete index done.'>>$log
/bin/echo >>$log
