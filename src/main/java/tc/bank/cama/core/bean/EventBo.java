package tc.bank.cama.core.bean;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.aim.alibaba.fastjson.annotation.JSONField;

/**
 * 
 * 应用系统ID、服务器ID、对象ID、分类1、分类2、分类3、 <br />
 * 事件ID、开始时间、结束时间、事件类型、事件级别、 <br />
 * 事件状态、关闭状态、工单状态、触发器、指标
 * 
 * @author zero
 * 
 */
public class EventBo implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8232788052371525502L;
	/**
	 * 应用系统
	 */
	private List<Integer> appIds;
	/**
	 * 应用系统名称
	 */
	private List<String> appNames;
	/**
	 * 服务器ID
	 */
	private int serverId;

	/**
	 * 服务器名称
	 */
	private String serverName;

	/**
	 * 服务器IP
	 */
	private List<String> serverIp;

	/**
	 * 对象ID
	 */
	private int objId;

	/**
	 * 对象名称
	 */
	private String objName;

	/**
	 * 对象分类ID
	 */
	private int objCateId;
	/**
	 * 对象分类1
	 */
	private String objCate1;
	/**
	 * 对象分类2
	 */
	private String objCate2;
	/**
	 * 对象分类3
	 */
	private String objCate3;

	/**
	 * 事件ID
	 */
	private int eventId;
	/**
	 * 开始时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	private Date eventStart;
	/**
	 * 结束时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	private Date eventEnd;
	/**
	 * 持续时间
	 */
	private String eventDuration;
	
	/**
	 * 事件来源
	 */
	private String eventSource;
	
	/**
	 * 事件类型
	 */
	private int eventType;
	/**
	 * 事件级别
	 */
	private int eventLevel;
	/**
	 * 事件状态
	 */
	private int eventStatus;
	/**
	 * 是否关闭
	 */
	private int eventClosed;
	/**
	 * 工单状态
	 */
	private String itilStatus;

	/**
	 * 处理状态
	 */
	private String dealStatus;

	/**
	 * 触发器ID
	 */
	private int triggerId;
	/**
	 * 指标ID
	 */
	private int metricId;

	/**
	 * 指标名称
	 */
	private String metricName;

	/**
	 * 指标标签
	 */
	private String metricTag;

	/**
	 * 发生次数
	 */
	private int tally;

	/**
	 * 事件摘要
	 */
	private String eventTitle;

	/**
	 * 事件描述
	 */
	private String eventDesc;

	/**
	 * 处理人
	 */
	private String dealUser;
	
	/**
	 * 升级原因
	 */
	
	private String upgradeReason;
	
	/**
	 * 等级
	 */
	private int grade;
	/**
	 *处理备注 
	 */
	private String dealMsg;
	

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}

	public String getUpgradeReason() {
		return upgradeReason;
	}

	public void setUpgradeReason(String upgradeReason) {
		this.upgradeReason = upgradeReason;
	}

	public List<Integer> getAppIds() {
		return appIds;
	}

	public void setAppIds(List<Integer> appIds) {
		this.appIds = appIds;
	}

	public List<String> getAppNames() {
		return appNames;
	}

	public void setAppNames(List<String> appNames) {
		this.appNames = appNames;
	}

	public int getServerId() {
		return serverId;
	}

	public void setServerId(int serverId) {
		this.serverId = serverId;
	}

	public String getServerName() {
		return serverName;
	}

	public void setServerName(String serverName) {
		this.serverName = serverName;
	}

	public List<String> getServerIp() {
		return serverIp;
	}

	public void setServerIp(List<String> serverIp) {
		this.serverIp = serverIp;
	}

	public int getObjId() {
		return objId;
	}

	public void setObjId(int objId) {
		this.objId = objId;
	}

	public String getObjName() {
		return objName;
	}

	public void setObjName(String objName) {
		this.objName = objName;
	}

	public int getObjCateId() {
		return objCateId;
	}

	public void setObjCateId(int objCateId) {
		this.objCateId = objCateId;
	}

	public String getObjCate1() {
		return objCate1;
	}

	public void setObjCate1(String objCate1) {
		this.objCate1 = objCate1;
	}

	public String getObjCate2() {
		return objCate2;
	}

	public void setObjCate2(String objCate2) {
		this.objCate2 = objCate2;
	}

	public String getObjCate3() {
		return objCate3;
	}

	public void setObjCate3(String objCate3) {
		this.objCate3 = objCate3;
	}

	public int getEventId() {
		return eventId;
	}

	public void setEventId(int eventId) {
		this.eventId = eventId;
	}

	public Date getEventStart() {
		return eventStart;
	}

	public void setEventStart(Date eventStart) {
		this.eventStart = eventStart;
	}

	public Date getEventEnd() {
		return eventEnd;
	}

	public void setEventEnd(Date eventEnd) {
		this.eventEnd = eventEnd;
	}

	public String getEventDuration() {
		return eventDuration;
	}

	public void setEventDuration(String eventDuration) {
		this.eventDuration = eventDuration;
	}

	public int getEventType() {
		return eventType;
	}

	public void setEventType(int eventType) {
		this.eventType = eventType;
	}

	public int getEventLevel() {
		return eventLevel;
	}

	public void setEventLevel(int eventLevel) {
		this.eventLevel = eventLevel;
	}

	public int getEventStatus() {
		return eventStatus;
	}

	public void setEventStatus(int eventStatus) {
		this.eventStatus = eventStatus;
	}

	public int getEventClosed() {
		return eventClosed;
	}

	public void setEventClosed(int eventClosed) {
		this.eventClosed = eventClosed;
	}

	public String getItilStatus() {
		return itilStatus;
	}

	public void setItilStatus(String itilStatus) {
		this.itilStatus = itilStatus;
	}

	public String getDealStatus() {
		return dealStatus;
	}

	public void setDealStatus(String dealStatus) {
		this.dealStatus = dealStatus;
	}

	public int getTriggerId() {
		return triggerId;
	}

	public void setTriggerId(int triggerId) {
		this.triggerId = triggerId;
	}

	public int getMetricId() {
		return metricId;
	}

	public void setMetricId(int metricId) {
		this.metricId = metricId;
	}

	public String getMetricName() {
		return metricName;
	}

	public void setMetricName(String metricName) {
		this.metricName = metricName;
	}

	public String getMetricTag() {
		return metricTag;
	}

	public void setMetricTag(String metricTag) {
		this.metricTag = metricTag;
	}

	public int getTally() {
		return tally;
	}

	public void setTally(int tally) {
		this.tally = tally;
	}

	public String getEventTitle() {
		return eventTitle;
	}

	public void setEventTitle(String eventTitle) {
		this.eventTitle = eventTitle;
	}

	public String getEventDesc() {
		return eventDesc;
	}

	public void setEventDesc(String eventDesc) {
		this.eventDesc = eventDesc;
	}

	public String getDealUser() {
		return dealUser;
	}

	public void setDealUser(String dealUser) {
		this.dealUser = dealUser;
	}

	public String getEventSource() {
		return eventSource;
	}

	public void setEventSource(String eventSource) {
		this.eventSource = eventSource;
	}

	public String getDealMsg() {
		return dealMsg;
	}

	public void setDealMsg(String dealMsg) {
		this.dealMsg = dealMsg;
	}

	@Override
	public String toString() {
		return "EventBo [appIds=" + appIds + ", appNames=" + appNames
				+ "objName]"+objName;
	}

}
