package tc.cama.aweb.ab.service;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import tc.bank.common.core.Timeline;
import tc.cama.aweb.ab.model.AimAbsDynamicCur;

public interface IABSTaskManager {

	/**
	 * 获取任务平均处理时间echarts
	 * @param objId
	 * @param startDate
	 * @param interval
	 * @param unit
	 * @return
	 * @throws Exception 
	 */
	Timeline<Double> getTaskAvgTimeEcharts(int objId, Date startDate, int interval, TimeUnit unit) throws Exception;

	/**
	 * 获取任务平均间隔时间echarts
	 * @param objId
	 * @param startDate
	 * @param interval
	 * @param unit
	 * @return
	 * @throws Exception 
	 */
	Timeline<Double> getTaskInternalTimeEcharts(int objId, Date startDate, int interval, TimeUnit unit) throws Exception;

	/**
	 * 获取当前运行数echarts
	 * @param objId
	 * @param startDate
	 * @param interval
	 * @param unit
	 * @return
	 * @throws Exception 
	 */
	Timeline<Double> getRunningTasksEcharts(int objId, Date startDate, int interval, TimeUnit unit) throws Exception;
	
	/**
	 * 获取线程池信息echarts
	 * @param objId
	 * @param startDate
	 * @param interval
	 * @param unit
	 * @return
	 * @throws Exception 
	 */
	Timeline<Double> getThreadPoolEcharts(int objId, Date startDate, int interval, TimeUnit unit) throws Exception;

	/**
	 * 线程池信息--累计分配线程数
	 * @param objId
	 * @return
	 */
	List<AimAbsDynamicCur> getThreadCount(int objId);

	/**
	 * 线程池信息--历史最大线程数
	 * @param objId
	 * @return
	 */
	Object getMaxHisThreadCount(int objId);

}
