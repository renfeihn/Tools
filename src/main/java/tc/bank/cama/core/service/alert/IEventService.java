package tc.bank.cama.core.service.alert;

import java.util.List;
import java.util.Map;

import tc.bank.cama.core.bean.EventBo;
import tc.bank.cama.core.bean.EventDealBo;
import tc.bank.cama.core.bean.MetricVO;
import tc.bank.cama.core.service.alert.EventConstants.SimilarEvent;
import tc.bank.common.core.Page;
import tc.bank.common.core.Pageable;
import tc.bank.common.core.Timeline;
import tc.bank.common.db.Sort;

public interface IEventService {

	/**
	 * 按id获取事件
	 * 
	 * @param eventId
	 * @return
	 */
	EventBo getEventById(int eventId);

	/**
	 * 获取事件处理明细
	 * 
	 * @param eventId
	 * @return
	 */
	List<EventDealBo> getEventDealsById(int eventId);

	/**
	 * 获取所有未关闭的事件
	 * 
	 * @return
	 */
	List<EventBo> getUnclosedEvents();

	/**
	 * @return 获取所有事件
	 */
	List<EventBo> getEvents();

	/**
	 * 获取所有事件
	 * 
	 * @param query
	 * @param pageable
	 * @param sort
	 * @return
	 */
	Page<EventBo> getEvents(EventQuery query, Pageable pageable, Sort sort);

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
	Page<EventBo> getSimilarEvents(SimilarEvent similar, long seconds,
			int eventId, Pageable pageable, Sort sort);

	/**
	 * @return 发生事件的系统 {系统ID:系统名称}
	 */
	Map<Integer, String> getApplications();

	/**
	 * 获取事件发生时的指标
	 * 
	 * @param eventId
	 *            事件ID
	 * @return
	 */
	List<MetricVO> eventMetric(int eventId);

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

}
