package tc.cama.aweb.base_monitor.Kafka;

import java.util.List;
import java.util.Map;

public interface IKafkaService {
	/**
	 * 
	 * @return
	 */
	Map<String,Object> getKPIDetails();
	
	/**
	 * 集群汇总页列表
	 * @param id
	 * @param name
	 * @return
	 */
	Map<String,Object> getTableData(Object id,String name);
	/**
	 * topic列表
	 * 
	 * @param objId
	 * @return
	 */
	List<Map<String,Object>>getTopicList(int objId);
	/**
	 * 集群明细KPI信息
	 * @param id
	 * @return
	 */
	Map<String,Object> getKPIDetail2(int id);
	/**
	 * 节点信息
	 * @param objId
	 * @return
	 */
	List<Map<String,Object>> getNodeList(int objId);
	/**
	 * message、bytein和byteout Echarts
	 * @param id
	 * @return
	 */
	Map<String,Object> getMessageEcharts(int id,int intervel,int time);
}
