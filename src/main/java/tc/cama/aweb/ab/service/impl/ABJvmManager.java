package tc.cama.aweb.ab.service.impl;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import com.aim.alibaba.fastjson.JSON;
import com.aim.alibaba.fastjson.JSONObject;

import tc.bank.cama.core.service.metric.IMetricHistoryQueryService;
import tc.bank.cama.core.service.metric.MetricConstants.Unit;
import tc.bank.common.core.Timeline;
import tc.bank.common.db.IDbService;
import tc.cama.aweb.ab.model.AimAbsDynamicCur;
import tc.cama.aweb.ab.model.AimAbsOsinfoCur;
import tc.cama.aweb.ab.service.IABJvmManager;
import tc.cama.aweb.bean.HeapBeanApm;
import tc.cama.aweb.bean.HeapMemBean;
import tc.cama.aweb.bean.JvmBean;
import tc.cama.aweb.bean.MemAnsyBean;
import tc.cama.aweb.utils.MathUtil;

public class ABJvmManager implements IABJvmManager{
	private IDbService dbService;
	private IMetricHistoryQueryService metricHistoryQueryService;
	public IDbService getDbService() {
		return dbService;
	}
	public void setDbService(IDbService dbService) {
		this.dbService = dbService;
	}
	public IMetricHistoryQueryService getMetricHistoryQueryService() {
		return metricHistoryQueryService;
	}
	public void setMetricHistoryQueryService(IMetricHistoryQueryService metricHistoryQueryService) {
		this.metricHistoryQueryService = metricHistoryQueryService;
	}
	@Override
	public Timeline<Double> getJVMEcharts(int objId, String[] metricNames, Map<String, String> tagkvs, Date startDate,
			Date endDate, long interval, TimeUnit timeUnit, Unit unit) {
		
		return metricHistoryQueryService.metricTimeline(objId, metricNames, tagkvs, startDate, endDate, interval, timeUnit, unit);
	}
	@Override
	public JvmBean getJvmBean(int objId) {
		JSONObject whereEx=new JSONObject();
		whereEx.put("mobjId", objId);
		AimAbsDynamicCur aimAbs=dbService.queryAsBean(AimAbsDynamicCur.class, whereEx);
		JvmBean jvmBean=new JvmBean();
		jvmBean.setFGC(aimAbs.getJvminfoFgc());
		jvmBean.setFGCT(aimAbs.getJvminfoFgct());
		jvmBean.setGCT(aimAbs.getJvminfoGct());
		jvmBean.setYGC(aimAbs.getJvminfoYgc());
		jvmBean.setYGCT(aimAbs.getJvminfoYgct());
		return jvmBean;
	}
	@Override
	public HeapBeanApm getHeapBeanApm(int objId) {
		JSONObject whereEx=new JSONObject();
		whereEx.put("mobjId", objId);
		DecimalFormat df=new DecimalFormat("#0.00");
		List<AimAbsDynamicCur> aimAbs=dbService.queryAsBeanList(AimAbsDynamicCur.class, whereEx);
		HeapBeanApm heapBeanApm=new HeapBeanApm();
		List<HeapMemBean> heaps=new ArrayList<HeapMemBean>();
		double sumInit=0;
		double sumUsed=0;
		int i=0;
		for(AimAbsDynamicCur abs:aimAbs){
			HeapMemBean bean=new HeapMemBean();
			i++;
			bean.setHeapName("堆内存"+i);
			bean.setHeapTotal(abs.getMemHeapinit());
			bean.setHeapUsed(abs.getMemHeapused());
			if(abs.getMemHeapinit()!=null&&abs.getMemHeapused()!=null){
				bean.setUseRate(df.format(new Long(abs.getMemHeapused())/new Long(abs.getMemHeapinit())));
			}
			
			sumInit+=new Double(abs.getMemHeapinit()==null?"0.0":abs.getMemHeapinit());
			sumUsed+=new Double(abs.getMemHeapused()==null?"0.0":abs.getMemHeapused());
			heaps.add(bean);
		}
		
		heapBeanApm.setHeaps(heaps);
		heapBeanApm.setTotal(String.valueOf(sumInit));
		heapBeanApm.setUsed(String.valueOf(sumUsed));
		return heapBeanApm;
	}
	@Override
	public AimAbsOsinfoCur getOsCur(String ip) {
		JSONObject whereEx=new JSONObject();
		whereEx.put("ip", ip);
		AimAbsOsinfoCur osInfo=dbService.queryAsBean(AimAbsOsinfoCur.class, whereEx);
		return osInfo;
	}
	@Override
	public MemAnsyBean getDynameic(int objId,String ip) {
		JSONObject whereEx=new JSONObject();
		JSONObject whereEx1=new JSONObject();
		whereEx.put("ip", ip);
		whereEx1.put("mobjId", objId);
		MemAnsyBean memAnsyBean=new MemAnsyBean();
		AimAbsOsinfoCur osInfo=dbService.queryAsBean(AimAbsOsinfoCur.class, whereEx);
		AimAbsDynamicCur dynamic =dbService.queryAsBean(AimAbsDynamicCur.class, whereEx1);
		memAnsyBean.setAbsDynam(dynamic);
		memAnsyBean.setAbsOs(osInfo);
		return memAnsyBean;
	}
	@Override
	public String getJVMInfo(String absname){
		JSONObject whereEx = new JSONObject();
		whereEx.put("srvAgentname", absname);
		AimAbsDynamicCur cur = dbService.queryAsBean(AimAbsDynamicCur.class, whereEx);
		int div = 1024*1024;
		cur.setJvmdtlCongenerationCapacity(MathUtil.divideBigDecimal(cur.getJvmdtlCongenerationCapacity(), div+"", 2));
		cur.setJvmdtlCongenerationUsed(MathUtil.divideBigDecimal(cur.getJvmdtlCongenerationUsed(), div+"", 2));
		cur.setJvmdtlEdenspaceCapacity(MathUtil.divideBigDecimal(cur.getJvmdtlEdenspaceCapacity(), div+"", 2));
		cur.setJvmdtlEdenspaceUsed(MathUtil.divideBigDecimal(cur.getJvmdtlEdenspaceUsed(), div+"", 2));
		cur.setJvmdtlFromspaceCapacity(MathUtil.divideBigDecimal(cur.getJvmdtlFromspaceCapacity(), div+"", 2));
		cur.setJvmdtlFromspaceUsed(MathUtil.divideBigDecimal(cur.getJvmdtlFromspaceUsed(), div+"", 2));
		cur.setJvmdtlTospaceCapacity(MathUtil.divideBigDecimal(cur.getJvmdtlTospaceCapacity(), div+"", 2));
		cur.setJvmdtlTospaceUsed(MathUtil.divideBigDecimal(cur.getJvmdtlTospaceUsed(), div+"", 2));
		cur.setMemHeapmax(MathUtil.divideBigDecimal(cur.getMemHeapmax(), div+"", 2));
		cur.setMemHeapused(MathUtil.divideBigDecimal(cur.getMemHeapused(), div+"", 2));
		return JSON.toJSONString(cur);
	} 
	
}
