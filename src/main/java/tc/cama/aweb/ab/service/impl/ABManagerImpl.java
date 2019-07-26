package tc.cama.aweb.ab.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Stack;
import java.util.concurrent.TimeUnit;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import tc.bank.cama.cmdb.model.table.CmdbObjectSummary;
import tc.bank.cama.core.service.alert.EventConstants.EventClosed;
import tc.bank.cama.core.service.alert.EventConstants.EventDealStatus;
import tc.bank.cama.core.service.alert.EventConstants.EventType;
import tc.bank.cama.core.service.alert.IEventCounter;
import tc.bank.cama.core.service.alert.IHealthDegreeService;
import tc.bank.cama.core.service.metric.IMetricHistoryQueryService;
import tc.bank.cama.core.service.metric.MetricConstants.Metric;
import tc.bank.cama.core.service.metric.MetricConstants.Unit;
import tc.bank.common.core.Timeline;
import tc.bank.common.db.IDbService;
import tc.cama.aweb.ab.model.AimAbcListCur;
import tc.cama.aweb.ab.model.AimAbsBrinfoCfg;
import tc.cama.aweb.ab.model.AimAbsBrinfoCfgAbcCount;
import tc.cama.aweb.ab.model.AimAbsCommLog;
import tc.cama.aweb.ab.model.AimAbsCommcount;
import tc.cama.aweb.ab.model.AimAbsDynamicCur;
import tc.cama.aweb.ab.model.AimAbsIpmsg;
import tc.cama.aweb.ab.model.AimAbsStatisConfig;
import tc.cama.aweb.ab.service.IABManager;
import tc.cama.aweb.bean.ABEvent;

public class ABManagerImpl implements IABManager{

	private IDbService dbService;

	private IHealthDegreeService healthDegreeService;
	private IMetricHistoryQueryService metricHistoryQueryService;
	private IEventCounter eventCounter;
	public IHealthDegreeService getHealthDegreeService() {
		return healthDegreeService;
	}

	public void setHealthDegreeService(IHealthDegreeService healthDegreeService) {
		this.healthDegreeService = healthDegreeService;
	}

	public IDbService getDbService() {
		return dbService;
	}

	public void setDbService(IDbService dbService) {
		this.dbService = dbService;
	}

	public IEventCounter getEventCounter() {
		return eventCounter;
	}

	public void setEventCounter(IEventCounter eventCounter) {
		this.eventCounter = eventCounter;
	}

	public IMetricHistoryQueryService getMetricHistoryQueryService() {
		return metricHistoryQueryService;
	}

	public void setMetricHistoryQueryService(IMetricHistoryQueryService metricHistoryQueryService) {
		this.metricHistoryQueryService = metricHistoryQueryService;
	}

	@Override
	public int getObjectHealthy(int objectId) {
	  return healthDegreeService.healthInspectByObjId(objectId);
	}

	@Override
	public AimAbcListCur getAbcCur(String oid) {
		JSONObject whereEx=new JSONObject();
		whereEx.put("oid", oid);
		return dbService.queryAsBean(AimAbcListCur.class, whereEx);
	}
	
	@Override
	public int getCountTellerno() {
		JSONObject whereEx = new JSONObject();
		whereEx.put("tellerno", "(NOT NULL)");
		return dbService.count(AimAbcListCur.class, whereEx);
	}
	
	@Override
	public int getCountAbcIp() {
		JSONObject whereEx = new JSONObject();
		whereEx.put("abcIp", "(NOT NULL)");
		return dbService.count(AimAbcListCur.class, whereEx);
	}
	
	@Override
	public int getAbsCountOnline(String instStatus) {
		JSONObject whereEx = new JSONObject();
		whereEx.put("instStatus", instStatus);
		return dbService.count(AimAbsStatisConfig.class, whereEx);
	}

	@Override
	public int getAbsCount() {
		JSONObject whereEx = new JSONObject();
		return dbService.count(AimAbsStatisConfig.class, whereEx);
	}
	
	@Override
	public int getTradeCount(String method) {
		JSONObject whereEx = new JSONObject();
		whereEx.put("method", method);
		String logDate = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
		whereEx.put("logdate", logDate);
		return dbService.count(AimAbsCommLog.class, whereEx);
	}
	
	@Override
	public int getConnCount() {
		String sampleTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
		JSONObject whereEx = new JSONObject();
		whereEx.put("sampleTime", sampleTime);
		return dbService.count(AimAbsCommcount.class, whereEx);
	}
	
	@Override
	public List<AimAbsBrinfoCfgAbcCount> getBrnoCountList(int mobjId){
		//最终bean
		
		List<AimAbsBrinfoCfgAbcCount> brnos = new ArrayList<AimAbsBrinfoCfgAbcCount>();
		List<AimAbsBrinfoCfg> brnoInfos = this.getBrnoList();
		if(brnoInfos!=null&&brnoInfos.size()>0){
			for(int i=0;i<brnoInfos.size();i++){
				AimAbsBrinfoCfgAbcCount brno = new AimAbsBrinfoCfgAbcCount();
				//机构类表塞值
				brno.setBrinfo(brnoInfos.get(i));
				//子机构号查询，包含自身
				Set<String> subBrnos = getSubMemuIds(brnoInfos.get(i).getBrno());
				//子机构号塞值
				brno.setSubIds(subBrnos);
				JSONObject whereEx = new JSONObject();
				whereEx.put("brno", subBrnos);
				if(0!=mobjId){
					whereEx.put("mobjId", mobjId);
				}
				//abc 数量塞值
				brno.setAbcCount(dbService.count(AimAbcListCur.class, whereEx));
				brnos.add(brno);
			}
			
		}
		return brnos;
	}
	
	@Override
	public List<AimAbsBrinfoCfg> getBrnoList(){
		JSONObject whereEx = new JSONObject();
		return dbService.queryAsBeanList(AimAbsBrinfoCfg.class, whereEx);
	}
	
	
	@Override
	public Set<String> getSubMemuIds(String mid) {

		// 查询菜单结构信息
		List<AimAbsBrinfoCfg> menus = this.getBrnoList();
		if (null == menus)
			return null;

		/*
		 * map初始化菜单结构信息 map-key，父菜单id map-value，父菜单id对应的直接子菜单id集合
		 */
		Map<String, Set<String>> map = new HashMap<String, Set<String>>();
		for (AimAbsBrinfoCfg menu : menus) {
			String pid = menu.getSubrno();
			String cid = menu.getBrno();
			if (!map.containsKey(pid))
				map.put(pid, new HashSet<String>());
			map.get(pid).add(cid);
		}

		// idSet存放返回的子菜单id包括当前菜单id
		Set<String> idSet = new HashSet<String>();
		// 添加当前菜单id
		idSet.add(mid);

		// map包含mid，说明它存在子菜单
		if (map.containsKey(mid)) {
			// 使用栈的方式遍历子菜单
			Stack<String> stack = new Stack<String>();
			// 初始化，把mid对应的直接子菜单压栈
			stack.addAll(map.get(mid));
			// 添加当前菜单id的直接子菜单id
			idSet.addAll(map.get(mid));

			while (!stack.isEmpty()) {
				String id = stack.pop();
				if (map.containsKey(id)) {
					// 若map包含id，说明id不是叶子菜单，把它的直接子菜单添加到栈中
					stack.addAll(map.get(id));
					idSet.addAll(map.get(id));
				} else {
					// 若map不包含id，说明id是叶子菜单，把它添加到输出集合中
					idSet.add(id);
				}
			}
		}

		return idSet;
	}
	
	@Override
	public List<AimAbcListCur> getAbcListByBrnos(List<String> brnosList){
		JSONObject whereEx = new JSONObject();
		whereEx.put("brno", brnosList);
		return dbService.queryAsBeanList(AimAbcListCur.class, whereEx);
	}
	
	@Override
	public Timeline<Double> getCpuEcharts(int[] objIds, Date startDate, int interval, TimeUnit unit) throws Exception {

		// 指标名称
		String metricName = Metric.AB_PCPU.getName();
		// 多对象单指标查询
		Timeline<Double> metricEchars =  metricHistoryQueryService.metricTimeline( objIds,  metricName, null ,startDate, getDate(), interval, unit ,Unit.PERCENTNUM);
		if(metricEchars==null){
			metricEchars = new Timeline<Double>();
		}
		metricEchars.setAlias(getAbcListByBrnos(objIds));
		return metricEchars;
	}
	
	@Override
	public Timeline<Double> getMemEcharts(int[] objIds, Date startDate, int interval, TimeUnit unit) throws Exception {

		// 指标名称
		String metricName = Metric.AB_PMEM.getName();
		// 多对象单指标查询
		Timeline<Double> metricEchars =  metricHistoryQueryService.metricTimeline( objIds,  metricName, null ,startDate, getDate(), interval, unit ,Unit.PERCENTNUM);
		if(metricEchars==null){
			metricEchars = new Timeline<Double>();
		}
		metricEchars.setAlias(getAbcListByBrnos(objIds));
		return metricEchars;
	}
	
	@Override
	public Timeline<Double> getConnectionsEcharts(int[] objIds, Date startDate, int interval, TimeUnit unit) throws Exception {

		// 指标名称
		String metricName = Metric.AB_CONNECTNUM.getName();
		// 多对象单指标查询
		Timeline<Double> metricEchars =  metricHistoryQueryService.metricTimeline( objIds,  metricName, null ,startDate, getDate(), interval, unit ,null);
		if(metricEchars==null){
			metricEchars = new Timeline<Double>();
		}
		metricEchars.setAlias(getAbcListByBrnos(objIds));
		return metricEchars;
	}
	
	@Override
	public Timeline<Double> getCommEcharts(int[] objIds, Date startDate, int interval, TimeUnit unit) throws Exception {
		
		// 指标名称
		String metricName = Metric.AB_COMMCOUNT.getName();
		// 多对象单指标查询
		Timeline<Double> metricEchars =  metricHistoryQueryService.metricTimeline( objIds,  metricName, null ,startDate, getDate(), interval, unit ,null);
		if(metricEchars==null){
			metricEchars = new Timeline<Double>();
		}
		metricEchars.setAlias(getAbcListByBrnos(objIds));
		return metricEchars;
	}
	
	private List<String> getAbcListByBrnos(int[] objIds){
		List<String> names = new ArrayList<String>();
		Map<Long, String> map= new HashMap<Long, String>();
		//查询absid对应的名称
		JSONObject whereEx = new JSONObject();
		whereEx.put("objectId", objIds);
		List<CmdbObjectSummary> AbsNames = dbService.queryAsBeanList(CmdbObjectSummary.class, whereEx);
		if(null!=AbsNames&&AbsNames.size()>0){
			for(CmdbObjectSummary obj:AbsNames){
				map.put(obj.getObjectId(),obj.getObjectName());
			}
		}
		if(null!=objIds&&objIds.length>0){
			for(int i=0;i<objIds.length;i++){
				if(map.containsKey((long)objIds[i])){
					names.add(map.get((long)objIds[i]));
				}else{
					names.add(String.valueOf(objIds[i]));
				}
			}
		}
		return names;
	}
	
	@Override
	public JSONArray getAbsGroups() {
		List<AimAbsStatisConfig> configs= dbService.queryAsBeanList(AimAbsStatisConfig.class, null);
		List<AimAbsIpmsg> ipmsgs = dbService.queryAsBeanList(AimAbsIpmsg.class, null);
		List<AimAbsDynamicCur> dynamics = dbService.queryAsBeanList(AimAbsDynamicCur.class, null);
		List<Map<String, Object>> abccounts = dbService.queryAsMapListBySQL("select count(abc_ip) c ,mobj_id from aim_abc_list_cur where abc_ip is not null group by mobj_id"); 
		int index = 1;
		JSONArray jsonArray = new JSONArray();
		
		List<AimAbsDynamicCur> hasClustered = new ArrayList<AimAbsDynamicCur>();
		for(AimAbsStatisConfig config : configs){
			String clusters = config.getInstClusters();
			String[] ipports= clusters.split("\n");
			boolean isneedcluster = true;
			JSONObject object = new JSONObject();
			for(String ipport:ipports){
				if(!isneedcluster){
					break;
				}
				String ip = ipport.split(":",-1)[0].replaceAll("tcp://", "");
				String port = ipport.split(":",-1)[1];
				for(AimAbsDynamicCur dc : dynamics){
					if(dc.getSrvIp().equals(ip) && dc.getPort().equals(port)){
						if(!hasClustered.contains(dc)){
							hasClustered.add(dc);
							JSONArray array = null;
							if(object.containsKey("clusterarray")){
								array = object.getJSONArray("clusterarray");
							}else{
								array = new JSONArray();
								object.put("clusterarray", array);
							}
							if(!object.containsKey("clustername")){
								object.put("clustername", "集群"+index);
							}
							JSONObject absobject = new JSONObject();
							absobject.put("host", dc.getAgrentName());
							absobject.put("ip", ip);
							absobject.put("mobj_id", dc.getMobjId());
							absobject.put("AgentName", dc.getAgrentName());
							absobject.put("health", this.getObjectHealthy(dc.getMobjId()));
							for(AimAbsIpmsg ipmsg : ipmsgs){
								if(ipmsg.getIp().equals(ip)){
									absobject.put("type", ipmsg.getType());
								}
							}
							for(Map<String, Object> map : abccounts){
								int mobj_id = (Integer) map.get("mobj_id");
								if(mobj_id==dc.getMobjId()){
									absobject.put("count", map.get("c"));
								}
							}
							if(object.containsKey("count")){
								object.put("count", (Integer)object.get("count")+(Integer)absobject.get("count"));
							}else{
								object.put("count", absobject.get("count"));
							}
							array.add(absobject);
						}else{
							isneedcluster = false;
							break;
						}
					}
				}
			}
			if(!object.isEmpty()){
				jsonArray.add(object);
			}
			if(isneedcluster){
				index ++;
			}
		}
		return jsonArray;
	}

	@Override
	public int getServerCount() {
		// TODO Auto-generated method stub
		List<AimAbsStatisConfig> configs = this.dbService.queryAsBeanList(AimAbsStatisConfig.class, null);
		String ins = "";
		for(AimAbsStatisConfig config : configs){
			ins = ins+config.getMobjId()+",";
		}
		ins = ins.substring(0, ins.length()-1);
		List<Map<String,Object>> ret = this.dbService.queryAsMapListBySQL("select distinct(count(target_object_id)) c from cmdb_object_relation where source_object_id in ("+ins+")");
		if(ret!=null && ret.size()>0){
			return (Integer)ret.get(0).get("c");
		}
		return 0;
	}	
	
	@Override
	public ABEvent getABEventByAppId(int appId) {
		/**
		 * 已解除
		 */
		int deal=eventCounter.appDealEvent(appId, EventDealStatus.DEALT);
		/**
		 * 未解除
		 */
		int unDeal=eventCounter.appDealEvent(appId, EventDealStatus.DEALING);
		/**
		 * 告警已解决数
		 */
		int hDoAlarmCount=eventCounter.appEvent(appId, EventType.ALARM, EventClosed.TRUE);
		/**
		 * 告警未解决数
		 */
		int unDoAlarmCount=eventCounter.appEvent(appId, EventType.ALARM, EventClosed.FALSE);
		/**
		 * 预警已解决数
		 */
		int hDoWaringCount=eventCounter.appEvent(appId, EventType.WARING, EventClosed.TRUE);
		/**
		 * 预警未解决数
		 */
		int unDoWaringCount=eventCounter.appEvent(appId, EventType.WARING, EventClosed.FALSE);
		ABEvent abEvent=new ABEvent();
		abEvent.sethDoEvent(deal);
		abEvent.setUnDoEvent(unDeal);
		abEvent.setAlarmHDoCount(hDoAlarmCount);
		abEvent.setAlarmUnDoCount(unDoAlarmCount);
		abEvent.setWaingHDoCount(hDoWaringCount);
		abEvent.setWaingUnDoCount(unDoWaringCount);
		return abEvent;
	}	
	
	private Date getDate() throws Exception{
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sf.parse(sf.format(new Date()));
	}
}
