#虚拟内存设置
vm_max_count="vm.max_map_count"
vm_swappiness="vm.swappiness"

if cat test.txt | grep "$vm_max_count">/dev/null
then
sed -i "s#vm.max_map_count=.*#vm.max_map_count=655360#g" test.txt
else
sed -i '$a vm.max_map_count=655360' test.txt
fi

if cat test.txt | grep "$vm_swappiness">/dev/null
then
sed -i "s#vm.swappiness=.*#vm.swappiness=1#g" test.txt
else
sed -i '$a vm.swappiness=1' test.txt
fi


#文件句柄
sed -i '$a * soft nofile 65536\n* hard nofile 65536\n' test.txt

#
sed -i '$a *          soft    nproc     4096\n' test.txt
