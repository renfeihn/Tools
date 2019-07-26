package tc.bank.cama.core.service.metric;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import tc.bank.cama.core.bean.MetricVO;
import tc.bank.common.core.Timeline;

public interface IMetricHistoryQueryService {

	/**
	 * 历史指标查询
	 * 
	 * @param sampleDate
	 *            采集时间
	 * @param objId
	 *            对象ID
	 * @param metricName
	 *            指标名称
	 * @param metricTagKvs
	 *            指标标签
	 * @return
	 */
	List<MetricVO> historyMetric(Date sampleDate, int objId, String metricName,
			String metricTagKvs);

	/**
	 * 历史指标查询
	 * 
	 * @param x
	 * @param objId
	 *            对象ID
	 * @param metricName
	 *            指标名称
	 * @param metricTagKvs
	 *            指标标签
	 * @param startDate
	 *            开始时间
	 * @param endDate
	 *            结束时间
	 * @param interval
	 *            间隔（默认60）
	 * @param timeUnit
	 *            间隔单位（默认秒）
	 * @return
	 */
	public Timeline<Double> metricTimeline(Date x, int objId,
			String metricName, String metricTagKvs, Date start, Date end,
			long interval, TimeUnit unit);

	/**
	 * 单指标时间段数据查询
	 * 
	 * @param objId
	 *            对象ID
	 * @param metricName
	 *            指标名称
	 * @param tagkvs
	 *            指标标签键值对
	 * @param startDate
	 *            开始时间（默认 结束时间1小时前时间）
	 * @param endDate
	 *            结束时间（默认当前时间）
	 * @param interval
	 *            间隔（默认60）
	 * @param timeUnit
	 *            间隔单位（默认秒）
	 * @param unit
	 * @return
	 */
	public Timeline<Double> metricTimeline(int objId, String metricName,
			Map<String, String> tagkvs, Date startDate, Date endDate,
			long interval, TimeUnit timeUnit, MetricConstants.Unit unit);

	/**
	 * 多指标时间段数据查询
	 * 
	 * @param objId
	 *            对象ID
	 * @param metricNames
	 *            指标名称
	 * @param tagkvs
	 *            指标标签键值对
	 * @param startDate
	 *            开始时间（默认 结束时间1小时前时间）
	 * @param endDate
	 *            结束时间（默认当前时间）
	 * @param interval
	 *            间隔 （默认60）
	 * @param timeUnit
	 *            间隔单位（默认秒）
	 * @param unit
	 * @return
	 */
	public Timeline<Double> metricTimeline(int objId, String[] metricNames,
			Map<String, String> tagkvs, Date startDate, Date endDate,
			long interval, TimeUnit timeUnit, MetricConstants.Unit unit);

	/**
	 * 多对象单指标时间段数据查询
	 * 
	 * @param objIds
	 *            对象ID
	 * @param metricName
	 *            指标名称
	 * @param tagkvs
	 *            指标标签键值对
	 * @param startDate
	 *            开始时间（默认 结束时间1小时前时间）
	 * @param endDate
	 *            结束时间（默认当前时间）
	 * @param interval
	 *            间隔（默认60）
	 * @param timeUnit
	 *            间隔单位（默认秒）
	 * @param unit
	 * @return
	 */
	public Timeline<Double> metricTimeline(int[] objIds, String metricName,
			Map<String, String> tagkvs, Date startDate, Date endDate,
			long interval, TimeUnit timeUnit, MetricConstants.Unit unit);
}
