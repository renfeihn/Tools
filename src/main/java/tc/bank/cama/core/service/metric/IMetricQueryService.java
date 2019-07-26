package tc.bank.cama.core.service.metric;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import tc.bank.cama.core.bean.MetricVO;
import tc.bank.common.core.Timeline;

/**
 * 指标查询服务 （指标名会改，不能直接使用字符串传参，引用 MetricConstants.Metric.name）
 * 
 * @author Win7-user
 * 
 */
public interface IMetricQueryService {

	/**
	 * 实时指标查询
	 * 
	 * @param objId
	 *            对象ID
	 * @param metricName
	 *            指标名称
	 * @return
	 */
	public MetricVO currentMetric(int objId, String metricName);

	/**
	 * 实时指标查询
	 * 
	 * @param objId
	 *            对象ID
	 * @param metricName
	 *            指标名称
	 * @param unit
	 *            指标单位
	 * @return
	 */
	public MetricVO currentMetric(int objId, String metricName, MetricConstants.Unit unit);

	/**
	 * 实时指标查询
	 * 
	 * @param objId
	 *            对象ID
	 * @param metricNames
	 *            指标名称
	 * @return
	 */
	public List<MetricVO> currentMetric(int objId, String[] metricNames);

	/**
	 * 实时指标查询
	 * 
	 * @param objId
	 *            对象ID
	 * @param metricNames
	 *            指标名称
	 * @param unit
	 *            单位
	 * @return
	 */
	public List<MetricVO> currentMetric(int objId, String[] metricNames, MetricConstants.Unit unit);

	/**
	 * 多对象实时指标查询
	 * 
	 * @param objIds
	 *            对象ID
	 * @param metricName
	 *            指标名称
	 * @return
	 */
	public List<MetricVO> currentMetric(int[] objIds, String metricName);

	/**
	 * 多对象实时指标查询
	 * 
	 * @param objIds
	 *            对象ID
	 * @param metricName
	 *            指标名称
	 * @param unit
	 * @return
	 */
	public List<MetricVO> currentMetric(int[] objIds, String metricName, MetricConstants.Unit unit);

	/**
	 * 带标签实时指标查询
	 * 
	 * @param objId
	 *            对象ID
	 * @param metricName
	 *            指标名称
	 * @param unit
	 *            单位
	 * @return
	 */
	public List<MetricVO> currentTagMetric(int objId, String metricName, MetricConstants.Unit unit);

	/**
	 * 单指标时间段数据查询
	 * 
	 * @param objId
	 *            对象ID
	 * @param metricName
	 *            指标名称
	 * @param startDate
	 *            开始时间（默认 结束时间1小时前时间）
	 * @param endDate
	 *            结束时间（默认当前时间）
	 * @param interval
	 *            间隔（默认60）
	 * @param timeUnit
	 *            间隔单位（默认秒）
	 * @return
	 */
	public Timeline<Integer> metricTimeline(int objId, String metricName, Date startDate, Date endDate, long interval,
			TimeUnit timeUnit);

	/**
	 * 单指标时间段数据查询
	 * 
	 * @param objId
	 *            对象ID
	 * @param metricName
	 *            指标名称
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
	public Timeline<Integer> metricTimeline(int objId, String metricName, Date startDate, Date endDate, long interval,
			TimeUnit timeUnit, MetricConstants.Unit unit);

	/**
	 * 单指标时间段数据查询
	 * 
	 * @param objId
	 *            对象ID
	 * @param metricName
	 *            指标名称
	 * @param tagvs
	 *            指标标签值（多个标签值用.分割）
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
	public Timeline<Integer> metricTimeline(int objId, String metricName, String tagvs, Date startDate, Date endDate,
			long interval, TimeUnit timeUnit, MetricConstants.Unit unit);

	/**
	 * 多指标时间段数据查询
	 * 
	 * @param objId
	 *            对象ID
	 * @param metricNames
	 *            指标名称
	 * @param startDate
	 *            开始时间（默认 结束时间1小时前时间）
	 * @param endDate
	 *            结束时间（默认当前时间）
	 * @param interval
	 *            间隔 （默认60）
	 * @param timeUnit
	 *            间隔单位（默认秒）
	 * @return
	 */
	public Timeline<Integer> metricTimeline(int objId, String[] metricNames, Date startDate, Date endDate,
			long interval, TimeUnit timeUnit);

	/**
	 * 多指标时间段数据查询
	 * 
	 * @param objId
	 *            对象ID
	 * @param metricNames
	 *            指标名称
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
	public Timeline<Integer> metricTimeline(int objId, String[] metricNames, Date startDate, Date endDate,
			long interval, TimeUnit timeUnit, MetricConstants.Unit unit);

	/**
	 * 多指标时间段数据查询
	 * 
	 * @param objId
	 *            对象ID
	 * @param metricNames
	 *            指标名称
	 * @param tagvs
	 *            指标标签值（多个标签值用.分割）
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
	public Timeline<Integer> metricTimeline(int objId, String[] metricNames, String tagvs, Date startDate, Date endDate,
			long interval, TimeUnit timeUnit, MetricConstants.Unit unit);

	/**
	 * 多对象单指标时间段数据查询
	 * 
	 * @param objId
	 *            对象ID
	 * @param metricName
	 *            指标名称
	 * @param startDate
	 *            开始时间（默认 结束时间1小时前时间）
	 * @param endDate
	 *            结束时间（默认当前时间）
	 * @param interval
	 *            间隔（默认60）
	 * @param timeUnit
	 *            间隔单位（默认秒）
	 * @return
	 */
	public Timeline<Integer> metricTimeline(int[] objId, String metricName, Date startDate, Date endDate, long interval,
			TimeUnit timeUnit);

	/**
	 * 多对象单指标时间段数据查询
	 * 
	 * @param objIds
	 *            对象ID
	 * @param metricName
	 *            指标名称
	 * @param tagvs
	 *            指标标签值（多个标签值用.分割）
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
	public Timeline<Integer> metricTimeline(int[] objIds, String metricName, Date startDate, Date endDate,
			long interval, TimeUnit timeUnit, MetricConstants.Unit unit);

	/**
	 * 多对象单指标时间段数据查询
	 * 
	 * @param objIds
	 *            对象ID
	 * @param metricName
	 *            指标名称
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
	public Timeline<Integer> metricTimeline(int[] objIds, String metricName, String tagvs, Date startDate, Date endDate,
			long interval, TimeUnit timeUnit, MetricConstants.Unit unit);

	/**
	 * 指标top查询
	 * 
	 * @param appId
	 *            应用系统
	 * @param metricName
	 *            指标名称
	 * @param top
	 * @return
	 */
	public List<MetricVO> topMetric(int appId, String metricName, int top);

	/**
	 * 指标top查询
	 * 
	 * @param appId
	 *            应用系统
	 * @param metricName
	 *            指标名称
	 * @param top
	 * @param unit
	 * @return
	 */
	public List<MetricVO> topMetric(int appId, String metricName, int top, MetricConstants.Unit unit);

}
