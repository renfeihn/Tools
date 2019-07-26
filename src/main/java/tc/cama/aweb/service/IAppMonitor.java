package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;

import tc.cama.aweb.bean.PageMonitorApmTop;

public interface IAppMonitor {

	/**
	 * 日交易量top
	 * @param top
	 * @return
	 * @throws Exception
	 */
	List<Object> getApmTransTop(int top) throws Exception;

	/**
	 * 成功率-日业务成功率top
	 * @param top
	 * @return
	 * @throws Exception
	 */
	List<PageMonitorApmTop> getApmBussSucTop(int top,Map<Integer, List<String>> map) throws Exception;
	
	/**
	 * 响应率-日系统成功率top
	 * @param top
	 * @return
	 * @throws Exception
	 */
	List<PageMonitorApmTop> getApmSysSucTop(int top,Map<Integer, List<String>> map) throws Exception;

	/**
	 * tps 日top
	 * @param top
	 * @return
	 * @throws Exception
	 */
	List<PageMonitorApmTop> getApmTpsTop(int top,Map<Integer, List<String>> map) throws Exception;

	/**
	 * 耗时 日top
	 * @param top
	 * @return
	 * @throws Exception
	 */
	List<PageMonitorApmTop> getApmTimeTop(int top,Map<Integer, List<String>> map) throws Exception;
	/**
	 * 查询交易量最多的top?系统和系统对应的类型
	 * @throws Exception 
	 */
	Map<Integer, List<String>> getMobjAndType(int top) throws Exception;
}
