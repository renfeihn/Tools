package tc.cama.aweb.ab.service;

import java.util.List;
import java.util.Map;

import tc.cama.aweb.ab.model.AbServerLoad;
import tc.cama.aweb.ab.model.AimAbsAgentCur;
import tc.cama.aweb.bean.AbsBean;
import tc.cama.aweb.bean.AsbPortState;

public interface IAimAbcAgentCurManager {
	/**
	 * 根据对象id查询
	 * 单ABS代理采集实时运行数据查询
	 * @return
	 */
	AimAbsAgentCur getAgentCurByObjId(Integer objId);  
	/**根据对象id 和日期查询
	 * 单ABS代理采集历史运行数据查询
	 * @return
	 */
	Map<String,List<String>> getAgentCurByObjIdDate(Integer objId);	
	/**
	 * 
	 * 获取端口数
	 * @param objId
	 * @return
	 */
	AsbPortState getAgentRepPortsByObjId(Integer objId);
	/**
	 * 获取文件句柄数
	 * @param objId
	 * @return
	 */
	Map<String,List<String>> getAgentFileByObjId(Integer objId);
	/**
	 * 平台体检
	 * 虚拟机内存
	 * 端口状态
	 * 进程状态
	 * cpu使用率
	 * 物理内存使用率
	 * abc连接数
	 */
	AbsBean getPlatformState(Integer objId);
	/**
	 * 获取asb服务器挂载数
	 * @return
	 */
	List<AbServerLoad> getServerLoad();
}
