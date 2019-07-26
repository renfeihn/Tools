package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import tc.bank.cama.core.bean.MetricVO;
import tc.bank.common.core.Timeline;
import tc.cama.aweb.bean.PageMQBaseInfo;

/**
 * MQ详情
 * @author Joe
 *
 */
public interface IMQDetail {
	
	/**
	 * 根据MQmanager获取所属MQ基本信息
	 * @return
	 */
	public PageMQBaseInfo getMQBase(int objectId);
	/**
	 * 获取各种指标echarts
	 * 
	 * @param objectId
	 * @param startDate
	 * @param interval
	 * @param metricNames
	 * @param unit
	 * @return
	 */
	public Timeline<Double> getEcharts(int objId, String[] metricNames, int time, int interval, TimeUnit unit);
	
	/**
	 * 获取实时指标列表
	 * @return
	 */
	public List<MetricVO> getCurrMetric(int objId, String[] metricNames);
	/**
	 * 得到MQ管理器
	 * @return
	 */
	public List<Map<String, Object>> getMQManager(int objectId);
	
	
	/**
	 * 获取队列明细
	 * @param objId
	 * @return
	 */
	public List<Map<String, Object>> getQueueDetail(int objId);
	/**
	 * 获取队列深度百分比
	 * @param objId
	 * @return
	 */
	public List<Map<String, Object>> getQueueDepthPer(int objId);
	
	/**
	 * 获取队列深度百分比TOP5
	 * @return
	 */
	public List<Map<String, Object>> getQueueDepthPerTop5(int objId);
	/**
	 * 获取队列深度TOP5
	 * @return
	 */
	public List<Map<String, Object>> getQueueDepthTOP5(int objId);
	
	/**
	 * 获取通道列表
	 * @param objId
	 * @return
	 */
	public List<Map<String, Object>> getChanneList(int objId);
	/**
	 * 获取通道状态分布
	 * @param objId
	 * @return
	 */
	public List<Map<String, Object>> getChanneStatus(int objId);
	/**
	 * 保留小数
	 * @param num
	 * @return
	 */
	public String numFormate(Double num);
	/**
	 * 链接数Echarts
	 * @param objId
	 * @param time
	 * @return
	 */
	public Map<String, List<String>> getLinkEcharts(int objId,int time);
	/**
	 * 错误日志
	 * @param objId
	 * @return
	 */
	public List<Map<String,Object>> getErrLog(int objId);
	
}
