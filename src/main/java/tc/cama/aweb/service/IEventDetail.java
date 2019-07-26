package tc.cama.aweb.service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import tc.bank.cama.core.bean.EventBo;
import tc.bank.cama.core.bean.EventDealBo;
import tc.bank.cama.core.bean.MetricVO;
import tc.bank.cama.core.service.alert.EventConstants.SimilarEvent;
import tc.bank.common.core.Page;
import tc.bank.common.core.Timeline;
import tc.cama.aweb.bean.LogicIp;

/**
 * 事件详情
 * 
 * @author zhangkun
 * 
 */
public interface IEventDetail {
	/**
	 * 按id获取事件
	 * 
	 * @param eventId
	 * @return
	 */
	EventBo getEventById(int eventId);
	
	/**
	 * 按id获取事件
	 * 
	 * @param eventId
	 * @return
	 */
	EventBo getEventByIdAndEventType(int eventId);

	/**
	 * 获取事件处理明细
	 * 
	 * @param eventId
	 * @return
	 */
	List<EventDealBo> getEventDealsById(int eventId);

	/**
	 * 获取相似事件
	 * 
	 * @param similar
	 * @param seconds
	 * @param eventId
	 * @param pageable
	 * @param sort
	 * @return
	 */
	Page<EventBo> getSimilarEvents(SimilarEvent similar, long seconds, int eventId, int page, int size);

	/**
	 * @return 发生事件的系统 {系统ID:系统名称}
	 */
	Map<Integer, String> getApplications();

	/**
	 * 根据事件ID获取指标echartsData
	 * 
	 * @param eventId
	 * @param metricName
	 * @param startDate
	 * @param endDate
	 * @param interval
	 * @param timeUnit
	 * @return
	 */
	Timeline<Double> metricTimeline(int objId, String metricName, Date startDate, Date endDate, long interval,
			TimeUnit timeUnit);

	/**
	 * 获取事件相关的指标
	 * 
	 * @return
	 */
	Map<String, String> getMetricName(Integer eventId);

	/**
	 * 获取事件发生时的指标
	 * 
	 * @param eventId
	 *            事件ID
	 * @return
	 */
	List<MetricVO> eventMetric(int eventId);

	/**
	 * 获取相似条件
	 * 
	 * @return
	 */
	List<String> getSimilarType();

	/**
	 * 获取事件发生时的指标
	 * 
	 * @param eventId
	 *            事件ID
	 * @param objId
	 *            对象ID
	 * @param metricName
	 *            指标名称
	 * @return
	 */
	Timeline<Double> eventMetricTimeline(int eventId, int objId,
			String metricName);

	/**
	 * 
	 * @param objectId
	 * @return
	 */
	List<LogicIp> getIps(Long objectId) throws Exception;

	List<EventBo> getEventSeries(int eventId, long interval, TimeUnit timeUnit);

	List<Map<String, String>> getEventTopoData(int eventId, long interval,
			TimeUnit timeUnit);
}
