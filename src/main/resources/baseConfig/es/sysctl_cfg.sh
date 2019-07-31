#虚拟内存设置
vm_max_count="vm.max_map_count"
vm_swappiness="vm.swappiness"

if cat /etc/sysctl.conf | grep "$vm_max_count">/dev/null
then
sed -i "s#vm.max_map_count=.*#vm.max_map_count= 655360#g" /etc/sysctl.conf
else
sed -i '$a vm.max_map_count=655360\n' /etc/sysctl.conf
fi

if cat /etc/sysctl.conf | grep "$vm_swappiness">/dev/null
then
sed -i "s#vm.swappiness=.*#vm.swappiness= 1#g" /etc/sysctl.conf
else
sed -i '$a vm.swappiness=1\n' /etc/sysctl.conf
fi


#文件句柄
sed -i '$a * soft nofile 65536\n* hard nofile 65536\n' /etc/security/limits.conf

#
sed -i '$a *          soft    nproc     4096\n' /etc/security/limits.d/90-nproc.conf
