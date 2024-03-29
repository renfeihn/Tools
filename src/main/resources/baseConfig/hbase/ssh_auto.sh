#!/bin/bash

echo start
##[ ! -f ~/.ssh/id_rsa.pub ] && ssh-keygen -t rsa -P '' &>/dev/null
ssh-keygen -t rsa -n '' -f ~/.ssh/id_rsa
echo keygen ok
num=0
while read line
do
	if [ num == 0 ]
	then
	  continue
	fi
	num=num+1
        ip=`echo $line | cut -d " " -f1`
        user_name=`echo $line | cut -d " " -f2`
        pass_word=`echo $line | cut -d " " -f3`
	echo $ip..$user_name..$pass_word
expect <<EOF
        spawn ssh-copy-id -i ${HOME}/.ssh/id_rsa.pub $user_name@$ip
        expect {
                "yes/no" { send "yes\n";exp_continue}
                "password" { send "$pass_word\n"}
        }
        expect eof
EOF
done < ~/hbase/host_ip.txt
