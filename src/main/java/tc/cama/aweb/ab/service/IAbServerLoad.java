package tc.cama.aweb.ab.service;

import java.util.List;

import tc.cama.aweb.ab.model.AbServerLoad;

public interface IAbServerLoad {
	/**
	 * 获取服务器挂载采集对象
	 * 
	 * 挂载数	 oIdCount
	 * agent名字
	 *serAgentName;
	 * 采集时间
	 * serAgentTime;
	 * @return
	 */
   List<AbServerLoad> getAsbServerLoad();
}
