package tc.cama.aweb.ab.service.impl;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import com.aim.alibaba.fastjson.JSONObject;

import tc.bank.cama.core.bean.MetricVO;
import tc.bank.cama.core.service.alert.EventConstants.EventClosed;
import tc.bank.cama.core.service.alert.EventConstants.EventType;
import tc.bank.cama.core.service.alert.IEventCounter;
import tc.bank.cama.core.service.alert.IHealthDegreeService;
import tc.bank.cama.core.service.metric.IMetricHistoryQueryService;
import tc.bank.cama.core.service.metric.IMetricQueryService;
import tc.bank.cama.core.service.metric.MetricConstants.Metric;
import tc.bank.cama.core.service.metric.MetricConstants.Unit;
import tc.bank.common.core.Point;
import tc.bank.common.core.Timeline;
import tc.bank.common.db.IDbService;
import tc.bank.common.utils.TimelineUtils;
import tc.cama.aweb.ab.model.AimAbcListCur;
import tc.cama.aweb.ab.model.AimAbsAgentCur;
import tc.cama.aweb.ab.model.AimAbsDynamicCur;
import tc.cama.aweb.ab.model.AimAbsPlatformTimeCur;
import tc.cama.aweb.ab.model.AimAbsStatisConfig;
import tc.cama.aweb.ab.service.IABSManager;
import tc.cama.aweb.bean.ABEvent;
import tc.cama.aweb.bean.AbsBean;

public class ABSManagerImpl implements IABSManager {

	private IDbService dbService;

	private IEventCounter eventCounter;

	private IHealthDegreeService healthDegreeService;
	
	private IMetricHistoryQueryService metricHistoryQueryService;

	private IMetricQueryService metricQueryService;

	public IMetricQueryService getMetricQueryService() {
		return metricQueryService;
	}

	public void setMetricQueryService(IMetricQueryService metricQueryService) {
		this.metricQueryService = metricQueryService;
	}

	public IMetricHistoryQueryService getMetricHistoryQueryService() {
		return metricHistoryQueryService;
	}

	public void setMetricHistoryQueryService(IMetricHistoryQueryService metricHistoryQueryService) {
		this.metricHistoryQueryService = metricHistoryQueryService;
	}

	public IEventCounter getEventCounter() {
		return eventCounter;
	}

	public void setEventCounter(IEventCounter eventCounter) {
		this.eventCounter = eventCounter;
	}

	public IDbService getDbService() {
		return dbService;
	}

	public void setDbService(IDbService dbService) {
		this.dbService = dbService;
	}

	public IHealthDegreeService getHealthDegreeService() {
		return healthDegreeService;
	}

	public void setHealthDegreeService(IHealthDegreeService healthDegreeService) {
		this.healthDegreeService = healthDegreeService;
	}
	
	@Override
	public AbsBean getPlatformState(int objId) {
		JSONObject whereEx = new JSONObject();
		DecimalFormat df = new DecimalFormat("#0.00");

		whereEx.put("mobjId", objId);
		AimAbsAgentCur abs = dbService.queryAsBean(AimAbsAgentCur.class, whereEx);
		AimAbsDynamicCur dynamic = dbService.queryAsBean(AimAbsDynamicCur.class, whereEx);

		// 未关闭事件数
		int eventcount = eventCounter.objUnclosedEvent(objId, EventType.ALARM_WARING);
		MetricVO metric = metricQueryService.currentMetric(objId, Metric.OS_DISK_BUSY_PCT.getName());

		String io = "0%";
		if (metric != null && metric.getValue() != null && !"".equals(metric.getValue()))
			io = metric.getValue() + "%";

		AbsBean bean = new AbsBean();

		bean.setEventcount(eventcount);
		bean.setIo(io); // I/O

		if (abs != null) {
			bean.setAbcCount(Integer.parseInt(abs.getConnectnum()));
			bean.setPhPc(abs.getPmem());

			bean.setPupc(abs.getPcpu());
			bean.setThreadState(abs.getStat());
			bean.setPortState((Integer.parseInt(abs.getFilenum()) == 0) && (Integer.parseInt(abs.getTimewaitnum()) == 0)
					&& (Integer.parseInt(abs.getClosewaitnum()) == 0));

		}

		if (dynamic != null) {
			if (dynamic.getJvmTotalmem() != null && dynamic.getRunMaxmem() != null) {
				String use_Max = df.format(new Double(dynamic.getJvmTotalmem()) / new Double(dynamic.getRunMaxmem()));
				bean.setVimMen(use_Max); // 虚拟内存
			}

			if (dynamic.getJdbcConnectioncount() != null)
				bean.setDbcount(dynamic.getJdbcConnectioncount()); // 数据库连接数

			if (dynamic.getTaskAveragetasktime() != null) // 任务平均处理时间
				bean.setTaskAvgTime(dynamic.getTaskAveragetasktime());
		}

		//获取当前时间作为对象的上次体检时间
		Date date=new Date();
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		
		AimAbsPlatformTimeCur cur=dbService.queryAsBean(AimAbsPlatformTimeCur.class, whereEx);
		if(cur==null){
			//若数据库中没有该对象的时间记录,则插入新记录
			AimAbsPlatformTimeCur  newRecord=new AimAbsPlatformTimeCur();
			newRecord.setMobjId(objId);
			newRecord.setInspectTime(date);
			dbService.save(newRecord);
		}else{
			//更新数据库上次体检记录
			JSONObject updateData=new JSONObject();
			updateData.put("inspectTime", date);
			dbService.updateWithDict(AimAbsPlatformTimeCur.class, updateData, whereEx);
		}
		
		bean.setLastTime(sdf.format(date));
		return bean;
	}

	@Override
	public AimAbsDynamicCur getAimAbsDynamicCur(int mobjId) {
		JSONObject whereEx = new JSONObject();
		whereEx.put("mobjId", mobjId);
		return dbService.queryAsBean(AimAbsDynamicCur.class, whereEx);
	}

	@Override
	public Timeline<Integer> getAbsEventTotal(int objectId, int time, int interval) {
		// 获取当前时间戳
		long nowTime = System.currentTimeMillis();
		// 获取开始时间戳
		long startTime = nowTime - time * 60 * 1000;

		// 开始时间
		Date startDate = new Date(startTime);

		// 结束时间
		Date endDate = new Date(nowTime);

		List<Point<Date, Integer>> eventCount = eventCounter.appEventTimeline(objectId, startDate, endDate, interval,
				TimeUnit.MINUTES, EventType.ALARM);
		if (eventCount == null || eventCount.size() == 0)
			return null;

		return TimelineUtils.getTimeline(null, null, interval, TimeUnit.MINUTES, eventCount, TimelineUtils.INT_HANDLER());
	}

	@Override
	public List<AimAbcListCur> getAbcListByBrnos(List<String> brnosList, int mobjId) {
		JSONObject whereEx = new JSONObject();
		whereEx.put("brno", brnosList);
		whereEx.put("mobjId", mobjId);
		return dbService.queryAsBeanList(AimAbcListCur.class, whereEx);
	}

	@Override
	public Map<String, List<String>>  getLoginCountEcharts(int mobjId, int time, int interval) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		SimpleDateFormat sdf1 = new SimpleDateFormat("HH:mm:ss");
		
		String endDate=sdf.format(new Date());
		String startDate=sdf.format(System.currentTimeMillis()-time*60*1000);
		
		String sql="select sample_time,count(tellerno) logincount from aim_abc_list_cur_his where tellerno is not null and mobj_id= ? and sample_time between ? and ? group by sample_time ASC ";
		
		Object[] params={mobjId,startDate,endDate};
		
		List<Map<String, Object>> result = dbService.queryAsMapListBySQL(sql, params);
		
		if(result==null)
			return null;
		
		// echarts数据格式
		Map<String, List<String>> echartsData = new HashMap<String, List<String>>();
		

		List<String> times = new ArrayList<String>();
		// 按时间点去筛选元素

		List<String> loginCount = new ArrayList<String>();
		
		for(Map<String, Object> map:result){
			if(map.get("sample_time")!=null && map.get("logincount")!=null){
				String time1=sdf1.format(map.get("sample_time"));
				times.add(time1.toString());
				loginCount.add(map.get("logincount").toString());
			}
		}
		
		echartsData.put("time", times);
		echartsData.put("line1", loginCount);
		
		return echartsData;
	}

	@Override
	public Timeline<Double> getCPUMEMEcharts(int mobjId, int time, int interval, TimeUnit timeUnit) {
		// 指标名称
		String[] metricNames = { Metric.AB_PCPU.getName(), Metric.AB_PMEM.getName() };
		Date startDate=getStartDate(time);
		
		// 单对象多指标查询
		Timeline<Double> metricEcharts = metricHistoryQueryService.metricTimeline(mobjId, metricNames, null, startDate,
				null, interval, timeUnit, Unit.PERCENTNUM);
		return metricEcharts;
	}

	@Override
	public Timeline<Double> getFileNumEcharts(int mobjId, int time, int interval, TimeUnit timeUnit) {
		String metricName = Metric.AB_FILENUM.getName();
		Date startDate=getStartDate(time);
		// 单对象单指标查询
		Timeline<Double> metricEcharts = metricHistoryQueryService.metricTimeline(mobjId, metricName, null, startDate,
				null, interval, timeUnit, null);
		return metricEcharts;
	}

	@Override
	public Timeline<Double> getPortListenEcharts(int mobjId, int time, int interval, TimeUnit timeUnit) {
		// 指标名称
		String[] metricNames = { Metric.AB_FINNUM.getName(), Metric.AB_TIMEWAITNUM.getName(),
				Metric.AB_CLOSEWAITNUM.getName(), Metric.AB_ESTABLISHEDNUM.getName(), Metric.AB_CONNECTNUM.getName() };
		Date startDate=getStartDate(time);
		// 单对象多指标查询
		Timeline<Double> metricEcharts = metricHistoryQueryService.metricTimeline(mobjId, metricNames, null, startDate,
				null, interval, timeUnit, null);
		return metricEcharts;
	}

	@Override
	public Timeline<Double> getConnectCountEcharts(int mobjId, int time, int interval, TimeUnit timeUnit) {
		// 指标名称
		String metricName = Metric.AB_JDBC_CONNECTIONCOUNT.getName();
		Date startDate=getStartDate(time);
		// 单对象单指标查询
		Timeline<Double> metricEcharts = metricHistoryQueryService.metricTimeline(mobjId, metricName, null, startDate,
				null, interval, timeUnit, null);
		return metricEcharts;
	}

	@Override
	public Timeline<Double> getTaskAvgTimeEcharts(int mobjId, int time, int interval, TimeUnit timeUnit) {
		// 指标名称
		String metricName = Metric.AB_TASK_AVERAGETASKTIME.getName();
		Date startDate=getStartDate(time);
		// 单对象单指标查询
		Timeline<Double> metricEcharts = metricHistoryQueryService.metricTimeline(mobjId, metricName, null, startDate,
				null, interval, timeUnit, null);
		return metricEcharts;
	}

	@Override
	public Timeline<Double> getCommTradeCountEcharts(int mobjId,int time, int interval, TimeUnit timeUnit) {
		// 指标名称
		String[] metricNames = { Metric.AB_COMMCOUNT.getName(), Metric.AB_TRADECOUNT.getName() };
		Date startDate=getStartDate(time);
		// 单对象多指标查询
		Timeline<Double> metricEcharts = metricHistoryQueryService.metricTimeline(mobjId, metricNames, null, startDate,
				null, interval, timeUnit, null);
		return metricEcharts;
	}

	@Override
	public Timeline<Double> getJDBCMaxNumEcharts(int mobjId, int time, int interval, TimeUnit timeUnit) {
		// 指标名称
		String[] metricNames = { Metric.AB_JDBC_CONNECTIONCOUNT.getName(), Metric.AB_JDBC_POOLMAXIMUMCONNECTIONS.getName() };
		Date startDate=getStartDate(time);
		// 单对象多指标查询
		Timeline<Double> metricEcharts = metricHistoryQueryService.metricTimeline(mobjId, metricNames, null, startDate,
				null, interval, timeUnit, null);
		return metricEcharts;
	}

	@Override
	public Timeline<Double> getJDBCMaxIDLEEcharts(int mobjId, int time, int interval, TimeUnit timeUnit) {
		// 指标名称
		String metricName = Metric.AB_JDBC_POOLMAXIMUMIDLECONNECTIONS.getName();
		Date startDate=getStartDate(time);
		// 单对象单指标查询
		Timeline<Double> metricEcharts = metricHistoryQueryService.metricTimeline(mobjId, metricName, null, startDate,
				null, interval, timeUnit, null);
		return metricEcharts;
	}

	@Override
	public Timeline<Double> getJDBCWaitQueueEcharts(int mobjId, int time, int interval, TimeUnit timeUnit) {
		// 指标名称
		String metricName = Metric.AB_JDBC_WAITBUCKETQUEUESIZE.getName();
		Date startDate=getStartDate(time);
		// 单对象单指标查询
		Timeline<Double> metricEcharts = metricHistoryQueryService.metricTimeline(mobjId, metricName, null, startDate,
				null, interval, timeUnit, null);
		return metricEcharts;
	}

	@Override
	public Timeline<Double> getJDBCBadConnectEcharts(int mobjId, int time, int interval, TimeUnit timeUnit) {
		// 指标名称
		String metricName = Metric.AB_JDBC_BADCONNECTIONCOUNT.getName();
		Date startDate=getStartDate(time);
		// 单对象单指标查询
		Timeline<Double> metricEcharts = metricHistoryQueryService.metricTimeline(mobjId, metricName, null, startDate,
				null, interval, timeUnit, null);
		return metricEcharts;
	}

	@Override
	public Timeline<Double> getJDBCCheckOutEcharts(int mobjId, int time, int interval, TimeUnit timeUnit) {
		// 指标名称
		String metricName = Metric.AB_JDBC_CLAIMEDOVERDUECONNECTIONCOUNT.getName();
		Date startDate=getStartDate(time);
		// 单对象单指标查询
		Timeline<Double> metricEcharts = metricHistoryQueryService.metricTimeline(mobjId, metricName, null, startDate,
				null, interval, timeUnit, null);
		return metricEcharts;
	}
	
	/**
	 * 获取一定距现在一定间隔的时间
	 * @param time (以分钟为单位)
	 * @return
	 */
	public static Date getStartDate(int time){
		long nowTime = System.currentTimeMillis();
		// 获取开始时间戳
		long startTime = nowTime - time * 60 * 1000;
		return new Date(startTime);
		
	}

	@Override
	public ABEvent getJDBCEventByMetric(int appId) {
		
		//获取JDBC配置指标名
		String[] metrics=getJDBCMetrics();
		
		/**
		 * 已解除
		 */
		int deal=eventCounter.appMetricEvent(appId, EventType.ALARM_WARING, EventClosed.TRUE, metrics);
		/**
		 * 未解除
		 */
		int unDeal=eventCounter.appMetricEvent(appId, EventType.ALARM_WARING, EventClosed.FALSE, metrics);
		/**
		 * 告警已解决数
		 */
		int hDoAlarmCount=eventCounter.appMetricEvent(appId, EventType.ALARM, EventClosed.TRUE, metrics);
		/**
		 * 告警未解决数
		 */
		int unDoAlarmCount=eventCounter.appMetricEvent(appId, EventType.ALARM, EventClosed.FALSE, metrics);
		/**
		 * 预警已解决数
		 */
		int hDoWaringCount=eventCounter.appMetricEvent(appId, EventType.WARING, EventClosed.TRUE, metrics);
		/**
		 * 预警未解决数
		 */
		int unDoWaringCount=eventCounter.appMetricEvent(appId, EventType.WARING, EventClosed.FALSE, metrics);
		ABEvent abEvent=new ABEvent();
		abEvent.sethDoEvent(deal);
		abEvent.setUnDoEvent(unDeal);
		abEvent.setAlarmHDoCount(hDoAlarmCount);
		abEvent.setAlarmUnDoCount(unDoAlarmCount);
		abEvent.setWaingHDoCount(hDoWaringCount);
		abEvent.setWaingUnDoCount(unDoWaringCount);
		return abEvent;
	}

	@Override
	public int getJDBCHealthy(int objectId) {
		//获取JDBC配置指标名
		String[] metrics=getJDBCMetrics();
		return healthDegreeService.healthInspectByObjIdAndMetrics(objectId, metrics);	 
	}
	
	/**
	 * 获取JDBC配置指标名
	 * @return
	 */
	public String[] getJDBCMetrics() {
		String[] metrics = { Metric.AB_JDBC_BADCONNECTIONCOUNT.getName(),
				Metric.AB_JDBC_CLAIMEDOVERDUECONNECTIONCOUNT.getName(), Metric.AB_JDBC_CONNECTIONCOUNT.getName(),
				Metric.AB_JDBC_POOLMAXIMUMCONNECTIONS.getName(), Metric.AB_JDBC_POOLMAXIMUMIDLECONNECTIONS.getName(),
				Metric.AB_JDBC_WAITBUCKETQUEUESIZE.getName() };
		return metrics;
	}

	@Override
	public AimAbsStatisConfig getStaticsConfig(int mobjId) {
		JSONObject whereEx = new JSONObject();
		whereEx.put("mobjId", mobjId);
		return dbService.queryAsBean(AimAbsStatisConfig.class, whereEx);
	}

	@Override
	public String getPlatformTime(int mobjId) {
		JSONObject whereEx = new JSONObject();
		whereEx.put("mobjId", mobjId);
		AimAbsPlatformTimeCur timeCur=dbService.queryAsBean(AimAbsPlatformTimeCur.class, whereEx);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String lastTime="无记录";
		if(timeCur!=null && timeCur.getInspectTime()!=null){
			lastTime=sdf.format(timeCur.getInspectTime());
		}
		return lastTime;
			
	}

	

	
}
