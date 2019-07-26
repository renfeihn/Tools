package cn.com.agree.aweb.struts2.action.config;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONArray;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.service.IMonitorCfgManager;
@Scope("prototype")
@Controller("MonitorCfgManagerActionBean")
public class MonitorCfgManagerAction extends StandardActionSupport {
	private static final long serialVersionUID = 1L;
	private String metricKind;
	private String mid;
	private String triggerId;
	int flag;
	String obj_id;
	String obj_type;
	String server_id;
	String type;
	String event_type;
	int app_id;
	String alert_name;
	String alert_sound;
	String alert_level;
	String status;
	String vaild_time_flag;
	String trigger_list;
	String alert_message;
	String recover_message;
	String resole_advise;
	String gid;
	List<String> triggerIds;
	List<String> objIds;
	List<String> userIds;
	int option;
	String category_name;
	String category_kind;
	String executor_id;
	String metype;
	String cate1;
	String cate2;
	String cate3;
	String delayTime;
	String messStatus;
	String fiter;
	String tagkvs;
	String roleid;
	
	/**
	 * 指标来源:1-业务预警,2-关键字预警,3-自监控预警
	 */
	private Integer itemSource;
	
	/**
	 * 统计维度;item_source=1时使用;1-按交易码
	 */
	private Integer busiField;
	
	/**
	 * 指标列表;item_source=1时使用;item_source=1时使用;avgtime-平均耗时,success_rate-成功率,fail_rate-失败率,num-交易量,success_num-成功笔数,fail_num-失败笔数
	 */
	private String busiItem;
	
	/**
	 * 自定义sql
	 */
	private String busiSql;
	
	
	/**
	 * 类型：1 计划/2 实时;item_source=1时使用;另存为预警时使用
	 */
	private Integer busiPlanType;
	
	/**
	 * 定时器执行类型 1:hour/2:day/3:week/4:month;item_source=1时使用;另存为预警时使用
	 */
	private Integer busiScheduleType;
	
	/**
	 * 触发条件 1结果数：2主机数；3应用数；4日志源数；5自定义;item_source=1时使用;另存为预警时使用
	 */
	private Integer busiConditions;
	
	/**
	 * 时间间隔;item_source=1时使用;另存为预警时使用
	 */
	private String busiIntervalTime;
	
	/**
	 * 自定义表达式;item_source=1时使用;另存为预警时使用;busi_conditions=5时使用
	 */
	private String busiCustomize;
	
	/**
	 * 数据源id;item_source=2时使用;
	 */
	private Integer keySourceid;
	
	/**
	 * 结构化字段;item_source=2时使用;
	 */
	private String keyField;
	
	/**
	 * 结构化字段类型;item_source=2时使用;1-原文搜索,2-公有结构化字段,3-私有结构化字段
	 */
	private Integer keyFieldType;
	
	@Autowired
	private IMonitorCfgManager monitorCfgManager;
	
	public String getMetricKind() {
		return metricKind;
	}
	public void setMetricKind(String metricKind) {
		this.metricKind = metricKind;
	}
	
	public String getMid() {
		return mid;
	}
	public void setMid(String mid) {
		this.mid = mid;
	}
	
	public String getTriggerId() {
		return triggerId;
	}
	public void setTriggerId(String triggerId) {
		this.triggerId = triggerId;
	}
	
	public Integer getItemSource() {
		return itemSource;
	}
	public void setItemSource(Integer itemSource) {
		this.itemSource = itemSource;
	}
	public Integer getBusiField() {
		return busiField;
	}
	public void setBusiField(Integer busiField) {
		this.busiField = busiField;
	}
	public String getBusiItem() {
		return busiItem;
	}
	public void setBusiItem(String busiItem) {
		this.busiItem = busiItem;
	}
	public String getBusiSql() {
		return busiSql;
	}
	public void setBusiSql(String busiSql) {
		this.busiSql = busiSql;
	}
	public Integer getBusiPlanType() {
		return busiPlanType;
	}
	public void setBusiPlanType(Integer busiPlanType) {
		this.busiPlanType = busiPlanType;
	}
	public Integer getBusiScheduleType() {
		return busiScheduleType;
	}
	public void setBusiScheduleType(Integer busiScheduleType) {
		this.busiScheduleType = busiScheduleType;
	}
	public Integer getBusiConditions() {
		return busiConditions;
	}
	public void setBusiConditions(Integer busiConditions) {
		this.busiConditions = busiConditions;
	}
	public String getBusiIntervalTime() {
		return busiIntervalTime;
	}
	public void setBusiIntervalTime(String busiIntervalTime) {
		this.busiIntervalTime = busiIntervalTime;
	}
	public String getBusiCustomize() {
		return busiCustomize;
	}
	public void setBusiCustomize(String busiCustomize) {
		this.busiCustomize = busiCustomize;
	}
	public Integer getKeySourceid() {
		return keySourceid;
	}
	public void setKeySourceid(Integer keySourceid) {
		this.keySourceid = keySourceid;
	}
	public String getKeyField() {
		return keyField;
	}
	public void setKeyField(String keyField) {
		this.keyField = keyField;
	}
	public Integer getKeyFieldType() {
		return keyFieldType;
	}
	public void setKeyFieldType(Integer keyFieldType) {
		this.keyFieldType = keyFieldType;
	}
	public IMonitorCfgManager getMonitorCfgManager() {
		return monitorCfgManager;
	}
	public void setMonitorCfgManager(IMonitorCfgManager monitorCfgManager) {
		this.monitorCfgManager = monitorCfgManager;
	}
	public String getRoleid() {
		return roleid;
	}
	public void setRoleid(String roleid) {
		this.roleid = roleid;
	}
	public int getFlag() {
		return flag;
	}
	public void setFlag(int flag) {
		this.flag = flag;
	}
	public String getObj_id() {
		return obj_id;
	}
	public void setObj_id(String obj_id) {
		this.obj_id = obj_id;
	}
	public String getObj_type() {
		return obj_type;
	}
	public void setObj_type(String obj_type) {
		this.obj_type = obj_type;
	}
	public String getServer_id() {
		return server_id;
	}
	public void setServer_id(String server_id) {
		this.server_id = server_id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getApp_id() {
		return app_id;
	}
	public void setApp_id(int app_id) {
		this.app_id = app_id;
	}
	public String getAlert_name() {
		return alert_name;
	}
	public void setAlert_name(String alert_name) {
		this.alert_name = alert_name;
	}
	public String getAlert_sound() {
		return alert_sound;
	}
	public void setAlert_sound(String alert_sound) {
		this.alert_sound = alert_sound;
	}
	public String getAlert_level() {
		return alert_level;
	}
	public void setAlert_level(String alert_level) {
		this.alert_level = alert_level;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getVaild_time_flag() {
		return vaild_time_flag;
	}
	public void setVaild_time_flag(String vaild_time_flag) {
		this.vaild_time_flag = vaild_time_flag;
	}
	
	public String getAlert_message() {
		return alert_message;
	}
	public void setAlert_message(String alert_message) {
		this.alert_message = alert_message;
	}
	public String getRecover_message() {
		return recover_message;
	}
	public void setRecover_message(String recover_message) {
		this.recover_message = recover_message;
	}
	public String getResole_advise() {
		return resole_advise;
	}
	public void setResole_advise(String resole_advise) {
		this.resole_advise = resole_advise;
	}
	
	public String getEvent_type() {
		return event_type;
	}
	public void setEvent_type(String event_type) {
		this.event_type = event_type;
	}
	
	public String getTrigger_list() {
		return trigger_list;
	}
	public void setTrigger_list(String trigger_list) {
		this.trigger_list = trigger_list;
	}
	
	public String getGid() {
		return gid;
	}
	public void setGid(String gid) {
		this.gid = gid;
	}
	
	public List<String> getTriggerIds() {
		return triggerIds;
	}
	public void setTriggerIds(List<String> triggerIds) {
		this.triggerIds = triggerIds;
	}
	
	public int getOption() {
		return option;
	}
	public void setOption(int option) {
		this.option = option;
	}
	
	public String getCategory_name() {
		return category_name;
	}
	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}
	
	public String getCategory_kind() {
		return category_kind;
	}
	public void setCategory_kind(String category_kind) {
		this.category_kind = category_kind;
	}
	public String getExecutor_id() {
		return executor_id;
	}
	public void setExecutor_id(String executor_id) {
		this.executor_id = executor_id;
	}
	public String getMetype() {
		return metype;
	}
	public void setMetype(String metype) {
		this.metype = metype;
	}
	
	public List<String> getObjIds() {
		return objIds;
	}
	public void setObjIds(List<String> objIds) {
		this.objIds = objIds;
	}
	
	public String getCate1() {
		return cate1;
	}
	public void setCate1(String cate1) {
		this.cate1 = cate1;
	}
	public String getCate2() {
		return cate2;
	}
	public void setCate2(String cate2) {
		this.cate2 = cate2;
	}
	
	public String getCate3() {
		return cate3;
	}
	public void setCate3(String cate3) {
		this.cate3 = cate3;
	}
	public String getDelayTime() {
		return delayTime;
	}
	public void setDelayTime(String delayTime) {
		this.delayTime = delayTime;
	}
	
	public List<String> getUserIds() {
		return userIds;
	}
	public void setUserIds(List<String> userIds) {
		this.userIds = userIds;
	}
	
	public String getMessStatus() {
		return messStatus;
	}
	public void setMessStatus(String messStatus) {
		this.messStatus = messStatus;
	}
	
	public String getFiter() {
		return fiter;
	}
	public void setFiter(String fiter) {
		this.fiter = fiter;
	}
	
	public String getTagkvs() {
		return tagkvs;
	}
	public void setTagkvs(String tagkvs) {
		this.tagkvs = tagkvs;
	}
	/**
	 * 得到全部记录
	 * @return
	 * @throws Exception
	 */
	public String queryAllConfig() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("cfgList", monitorCfgManager.queryAllConfig()));
		return SUCCESS;
	}
	public String queryAllAlarmConfig() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("cfgList", monitorCfgManager.queryAllAlarmConfig(metype,app_id+"", obj_id,category_name,category_kind,executor_id,getUserName())));
		return SUCCESS;
	}
	public String queryAllMetricKind() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("metricKinds", monitorCfgManager.queryAllMetricKind()));
		return SUCCESS;
	}
	public String queryAllMetricItem() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("metricItems", monitorCfgManager.queryAllMetricItem(metricKind)));
		return SUCCESS;
	}
	public String queryAllFunName() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs", monitorCfgManager.queryAllFunName(mid)));
		return SUCCESS;
	}
	public String queryAllRole() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs", monitorCfgManager.queryAllRole(triggerId,event_type)));
		return SUCCESS;
	}
	public String reSetAllUser() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs", monitorCfgManager.reSetAllUser(triggerId, userIds)));
		return SUCCESS;
	}
	public String queryAllUserAndRole() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs", monitorCfgManager.queryAllUserAndRole(triggerId,event_type,gid)));
		return SUCCESS;
	}
	public String queryAllGroup() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs", monitorCfgManager.queryAllGroup()));
		return SUCCESS;
	}
	public String queryTriggerInfo() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs", monitorCfgManager.queryTriggerInfo(gid)));
		return SUCCESS;
	}
	public String queryAlertCfgInfo() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs", monitorCfgManager.queryAlertCfgInfo(triggerId, event_type)));
		return SUCCESS;
	}
	public String queryPublicItem() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs", monitorCfgManager.queryPublicItem()));
		return SUCCESS;
	}
	public String queryPrivateItem() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs", monitorCfgManager.queryPrivateItem(metricKind)));
		return SUCCESS;
	}
	public String queryMonitorInfoByAppId() throws Exception{
		Map<String,Object> monitorInfo=monitorCfgManager.queryMonitorInfoByAppId(app_id+"");
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs",monitorInfo ).addParameter("echartsData", monitorInfo.get("echarsData")));
		return SUCCESS;
	}
	public String stopOrStartTrigger() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs", monitorCfgManager.stopOrStartTrigger(triggerIds, option)));
		return SUCCESS;
	}
	public String stopOrStartObjMonitor() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs", monitorCfgManager.stopOrStartObjMonitor(objIds, option)));
		return SUCCESS;
	}
	public String queryMetricByExeId() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs", monitorCfgManager.queryMetricByExeId(executor_id)));
		return SUCCESS;
	}
	public String queryAllObjSimpleInfo() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs", monitorCfgManager.queryAllObjSimpleInfo(cate1, cate2, cate3, delayTime)));
		return SUCCESS;
	}
	public String queryAllLevel1() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs", monitorCfgManager.queryAllLevel1()));
		return SUCCESS;
	}
	public String queryAllLevel2() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs", monitorCfgManager.queryAllLevel2(cate1)));
		return SUCCESS;
	}
	public String queryAllLevel3() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs", monitorCfgManager.queryAllLevel3(cate1,cate2)));
		return SUCCESS;
	}
	public String stopOrStartMess() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs", monitorCfgManager.stopOrStartMess(triggerId, messStatus)));
		return SUCCESS;
	}
	public String queryAllObjsByCate() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs", monitorCfgManager.queryAllObjsByCate(triggerId, app_id, cate1, cate2, cate3)));
		return SUCCESS;
	}
	public String queryTriggerFilterObjs() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs", monitorCfgManager.queryTriggerFilterObjs(triggerId)));
		return SUCCESS;
	}
	public String addFiterToTrigger() throws Exception{
		monitorCfgManager.stopOrStartMess(triggerId, messStatus);
		if(fiter!=null){
		  setStrutsMessage(StrutsMessage.successMessage().addParameter("addFiterToTrigger", monitorCfgManager.addFiterToTrigger(triggerId,fiter)));
		}
		return SUCCESS;
	}
	public String removeFiterToTrigger() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs", monitorCfgManager.removeFiterToTrigger(triggerId)));
		return SUCCESS;
	}
	public String updateMonitorCfg() throws Exception{
		JSONArray triggerList=JSONArray.parseArray(trigger_list);
		if(flag==1){
			System.out.println("app_id"+app_id);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", monitorCfgManager.addMonitorCfg( obj_id,
					obj_type, server_id, type, app_id, alert_name, alert_sound, alert_level, 
					status, vaild_time_flag, 
					triggerList, alert_message, 
					recover_message, resole_advise,tagkvs
					,roleid)));
		}else if(flag==0){
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",monitorCfgManager.updateMonitorCfg(gid, obj_id,
					obj_type, server_id, type, app_id, alert_name, alert_sound, alert_level, 
					status, vaild_time_flag, 
					triggerList, alert_message, 
					recover_message, 
					resole_advise,tagkvs
					,roleid)));
		}else if(flag==2){
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",monitorCfgManager.deleteMonitorCfg(triggerId)));
		}
		return SUCCESS;
		
	}
	
}