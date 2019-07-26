package tc.cama.aweb.base_monitor.ES;

import java.util.List;
import java.util.Map;

public interface IESService {
	
	List<Map<String,Object>> getNodesList(int service_id );
	/**
	 * 索引列表
	 * @param service_id
	 * @return
	 */
	List<Map<String,Object>> getIndexList(int service_id );
	/**
	 * 
	 * @param node_key
	 * @return
	 */
	Map<String,Object> getNodeDetailMetric(String node_key,int service_id );
	/**
	 * 
	 * @param node_key
	 * @param service_id
	 * @param time
	 * @param interval
	 * @return
	 */
	Map<String,Object> getCpuMemEcharts(String node_key,int service_id,int time,int interval );
	/**
	 * 
	 * @param node_key
	 * @param service_id
	 * @param time
	 * @param interval
	 * @return
	 */
	Map<String,Object> getThreadEcharts(String node_key,int service_id,int time,int interval );
	/**
	 * jvm
	 * @param node_key
	 * @param service_id
	 * @param time
	 * @param interval
	 * @return
	 */
	Map<String,Object> getJVMEcharts(String node_key,int service_id,int time,int interval );
	/**
	 * 
	 * @param node_key
	 * @param service_id
	 * @param time
	 * @param interval
	 * @return
	 */
	Map<String,Object> getLoadSegEcharts(String node_key,int service_id,int time,int interval );
}
