package tc.cama.aweb.bean;

import tc.bank.cama.core.bean.EventBo;
import tc.bank.common.core.Page;

public class SoftwareEvent {
	/**
	 * 事件列表
	 */
	private Page<EventBo> events;
	/**
	 * 故障数
	 */
	private Integer alarmCount;
	/**
	 * 告警数
	 */
	private Integer warinCount;
	/**
	 * 监控对象名
	 */
	private String objName;

	public Page<EventBo> getEvents() {
		return events;
	}

	public void setEvents(Page<EventBo> events) {
		this.events = events;
	}

	public Integer getAlarmCount() {
		return alarmCount;
	}

	public void setAlarmCount(Integer alarmCount) {
		this.alarmCount = alarmCount;
	}

	public Integer getWarinCount() {
		return warinCount;
	}

	public void setWarinCount(Integer warinCount) {
		this.warinCount = warinCount;
	}

	public String getObjName() {
		return objName;
	}

	public void setObjName(String objName) {
		this.objName = objName;
	}

}
