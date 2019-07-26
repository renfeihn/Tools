package tc.cama.aweb.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import tc.bank.cama.core.bean.MetricVO;
import tc.bank.common.core.Timeline;
import tc.cama.aweb.bean.AppMetric;
import tc.cama.aweb.bean.PageAppLogicServers;
import tc.cama.aweb.bean.PageAppObjectClassify;

/**
 * 应用性能-系统监控
 * @author huangjun
 *
 */
public interface IAppSysMonitor {

	/**
	 * 获取系统关联的逻辑服务器
	 * @param appObjectId 系统对象ID
	 * @return
	 * @throws Exception 
	 */
	List<PageAppLogicServers> getAppRelatedServers(Long appObjectId, String username) throws Exception;
	
	/**
	 * 查询应用下不同对象分类的总数
	 * @return
	 * @throws Exception 
	 */
	PageAppObjectClassify getClassifyCounts(Long appObjectId) throws Exception;
	/**
	 * 根据应用id获取指标top信息和echarts数据
	 * 单对象,多指标
	 * @throws Exception 
	 */
	AppMetric getAppMetricByAppId(long appId,Date startDate,Date endDate,long interval) throws Exception;
	/**
	 * 多对象实时指标查询（单指标）
	 * @throws Exception 
	*/
	Timeline<Double> getAppMetricByAppServerId(int[] objId, String  metricName,Date startDate,Date endDate,long interval) throws Exception;
	/**
	 * 多对象实时指标查询
	 * @param objIds
	 * @param metricName
	 * @return
	 * @throws Exception 
	 */
	Map<String,List<String>> currentMetric(int[] objIds, String metricName) throws Exception;
	/**
	 * 应用实时指标查询
	 */
	public List<MetricVO> getCurrentMetric(long appId,String[] metricName );
}
