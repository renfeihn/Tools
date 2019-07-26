package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;

import tc.bank.common.core.Timeline;
import tc.cama.aweb.bean.AppEventView;
import tc.cama.aweb.bean.PageAppAPMView;
import tc.cama.aweb.bean.PageAppServerSummary;

/**
 * 应用概览
 * @author zhangkun
 *
 */
public interface IAppPerform {
	
	/**
	 * 查询：
	 * 1.应用未解除事件数
	 * 2.应用预警事件数
	 * 3.应用告警事件数
	 * 4.一段时间内的告警预警数
	 * @param objId应用总览界面系统ID
	 * @return
	 */
	public AppEventView getTotalEvent(Long appId,int time,int interval,String username);

	/**
	 * 应用总体健康度
	 * @return
	 */
	public int getAppHealthy(Long appId);
	
	/**
	 * 查询：
	 * 1.应用下的逻辑服务器明细
	 * 2.应用下的逻辑服务器的预警数
	 * 3.应用下的逻辑服务器的告警数
	 * @param objId
	 * @return
	 */
	public List<PageAppServerSummary> getServerList(Long objId) throws Exception;
	
	
	/**
	 * 查询APM信息
	 * @param objectId
	 * @param startTime
	 * @param endTime
	 * @param orderType
	 * @return
	 * @throws Exception
	 */
	public PageAppAPMView getAPMPerformance(long objectId,int time,int interval) throws Exception;

	/**
	 * 取CPU的echarts
	 * 
	 * @param objectId
	 * @return
	 */
	Timeline<Double> getMetricCPUEcharts(Long objectId,int time,int interval);

	
	/**
	 * 取内存的echarts
	 * 
	 * @param objectId
	 * @return
	 */
	Timeline<Double> getMetricMEMEcharts(Long objectId,int time,int interval);

	
	/**
	 * 取磁盘io的echarts
	 * 
	 * @param objectId
	 * @return
	 */
	Timeline<Double> getMetricDiskIOEcharts(Long objectId,int time,int interval);

	
	/**
	 * 取网络io的echarts
	 * 
	 * @param objectId
	 * @return
	 */
	Timeline<Double> getMetricNETIOEcharts(Long objectId,int time,int interval);

	
	/**
	 * 查询监控对象事件数和监控数
	 * 
	 * @param categoryIds
	 * @param appId
	 * @return
	 * @throws Exception 
	 */
	Map<String, List<Integer>> getObjectEvent(List<Integer> categoryIds, int appId) throws Exception;

	
}
