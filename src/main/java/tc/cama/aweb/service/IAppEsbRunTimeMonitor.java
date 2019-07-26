package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;

import tc.cama.aweb.esb.model.EsbMonMS;

/**
 * ESB系统运行监控
 * @author Win-User
 *
 */
public interface IAppEsbRunTimeMonitor {

	/**
	 * 服务提供者运行情况
	 */
	public List<EsbMonMS> getServiceProvider() throws Exception;
	
	/**
	 * 服务消费者运行情况
	 */
	public List<EsbMonMS> getServiceConsumer() throws Exception;
	
	/**
	 * Esb服务运行情况
	 * @return
	 */
	public List<EsbMonMS> getEsbService() throws Exception;
	/**
	 * esb服务系统成功率Echarts 图
	 * @return
	 * @throws Exception 
	 */
	public Map<String,List<String>> getEsbSysRate() throws Exception;
	/**
	 * Esb运行情况
	 * @return
	 */
	public List<EsbMonMS> getEsbRunningCondition() throws Exception;
	
	/**
	 * 全局拓扑图
	 * @return
	 * @throws Exception
	 */
	public Map<String,List<?>> getGobalTopo() throws Exception; 
	
	/**
	 * 交易量echarts
	 * @throws Exception
	 */
	public Map<String, List<String>> getTransCountEcharts(int time,int interval) throws Exception;
	
	/**
	 * TPS echarts
	 * @throws Exception
	 */
	public Map<String, List<String>> getTPSEcharts(int time,int interval) throws Exception;
	
	
	/**
	 * 平均响应时间 echarts
	 * @throws Exception
	 */
	public Map<String, List<String>> getRspTimeAvgEcharts(int time,int interval) throws Exception;
	
	/**
	 * 实时平均响应时间 echarts
	 * @return
	 * @throws Exception
	 */
	Map<String, List<String>> getCurrRspTimeAvgEcharts() throws Exception;

	/**
	 * 实时交易量echarts
	 * @return
	 * @throws Exception
	 */
	Map<String, List<String>> getCurrTransCountEcharts() throws Exception;

	/**
	 * 实时TPS echarts
	 * @return
	 * @throws Exception
	 */
	Map<String, List<String>> getCurrTPSEcharts() throws Exception;
	
	
}
