package tc.cama.aweb.ab.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import com.aim.alibaba.fastjson.JSONObject;

import tc.bank.cama.core.service.metric.IMetricHistoryQueryService;
import tc.bank.cama.core.service.metric.MetricConstants.Metric;
import tc.bank.common.core.Timeline;
import tc.bank.common.db.IDbService;
import tc.cama.aweb.ab.model.AimAbsDynamicCur;
import tc.cama.aweb.ab.service.IABSTaskManager;

public class ABSTaskManagerImpl implements IABSTaskManager {

	private IDbService dbService;
	private IMetricHistoryQueryService metricHistoryQueryService;

	public IDbService getDbService() {
		return dbService;
	}

	public IMetricHistoryQueryService getMetricHistoryQueryService() {
		return metricHistoryQueryService;
	}

	public void setDbService(IDbService dbService) {
		this.dbService = dbService;
	}

	public void setMetricHistoryQueryService(IMetricHistoryQueryService metricHistoryQueryService) {
		this.metricHistoryQueryService = metricHistoryQueryService;
	}

	@Override
	public Timeline<Double> getTaskAvgTimeEcharts(int objId, Date startDate, int interval, TimeUnit unit) throws Exception {

		// 指标名称
		String metricName = Metric.AB_TASK_AVERAGETASKTIME.getName();
		// 单对象单指标查询
		Timeline<Double> metricEchars = metricHistoryQueryService.metricTimeline(objId, metricName, null, startDate,
				getDate(), interval, unit, null);
		return metricEchars;
	}
	
	@Override
	public Timeline<Double> getTaskInternalTimeEcharts(int objId, Date startDate, int interval, TimeUnit unit) throws Exception {
		
		// 指标名称
		String metricName = Metric.AB_TASK_COMPUTEAVERAGEINTERVAL.getName();
		// 单对象单指标查询
		Timeline<Double> metricEchars = metricHistoryQueryService.metricTimeline(objId, metricName, null, startDate,
				getDate(), interval, unit, null);
		return metricEchars;
	}
	
	@Override
	public Timeline<Double> getRunningTasksEcharts(int objId, Date startDate, int interval, TimeUnit unit) throws Exception {
		
		// 指标名称
		String[] metricName = {Metric.AB_TASK_RUNNINGTASKS.getName(), Metric.AB_TASK_COMPLETEDTASKS.getName()};
		// 单对象单指标查询
		Timeline<Double> metricEchars = metricHistoryQueryService.metricTimeline(objId, metricName, null, startDate,
				getDate(), interval, unit, null);
		return metricEchars;
	}
	
	@Override
	public Timeline<Double> getThreadPoolEcharts(int objId, Date startDate, int interval, TimeUnit unit) throws Exception {
		
		// 指标名称
		String[] metricName = {Metric.AB_THREADPOOL_ACTIVECOUNT.getName(),Metric.AB_THREADPOOL_SIZE.getName()};
		// 多对象单指标查询
		Timeline<Double> metricEchars = metricHistoryQueryService.metricTimeline(objId, metricName, null, startDate,
				getDate(), interval, unit, null);
		return metricEchars;
	}
	
	@Override
	public List<AimAbsDynamicCur> getThreadCount(int objId) {
		JSONObject whereEx = new JSONObject();
		whereEx.put("mobjId", objId);
		return dbService.queryAsBeanList(AimAbsDynamicCur.class, whereEx);
	}
	
	@Override
	public Object getMaxHisThreadCount(int objId) {
		List<Map<String, Object>> result = dbService.queryAsMapListBySQL("select max(THREADPOOL_ACTIVECOUNT) maxCount from aim_abs_dynamic_cur_his where mobj_id=?", objId);
		Object maxCount = null;
		if(result!=null&&result.size()==1){
			maxCount=result.get(0).get("maxCount"); 
		}
		return maxCount!=null?maxCount:new Object();
	}
	
	private Date getDate() throws Exception{
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sf.parse(sf.format(new Date()));
	}
	
}
