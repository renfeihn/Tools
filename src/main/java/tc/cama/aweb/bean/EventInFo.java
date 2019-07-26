package tc.cama.aweb.bean;

import java.util.List;

public class EventInFo {
	// 事件预警配置数
	private int eventAlertCfg;
	// 事件告警数
	private int eventAlertCount;
	// 事件预警数
	private int eventPreAlertCount;
	// 事件未处理数
	private int noDoEventCount;
	// 事件已处理数
	private int doEventCount;
	//触发器信息列表
    private List<TriggerInfo> triggersInfo;
	public int getEventAlertCfg() {
		return eventAlertCfg;
	}

	public void setEventAlertCfg(int eventAlertCfg) {
		this.eventAlertCfg = eventAlertCfg;
	}

	public int getEventAlertCount() {
		return eventAlertCount;
	}

	public void setEventAlertCount(int eventAlertCount) {
		this.eventAlertCount = eventAlertCount;
	}

	public int getEventPreAlertCount() {
		return eventPreAlertCount;
	}

	public void setEventPreAlertCount(int eventPreAlertCount) {
		this.eventPreAlertCount = eventPreAlertCount;
	}

	public int getNoDoEventCount() {
		return noDoEventCount;
	}

	public void setNoDoEventCount(int noDoEventCount) {
		this.noDoEventCount = noDoEventCount;
	}

	public int getDoEventCount() {
		return doEventCount;
	}

	public void setDoEventCount(int doEventCount) {
		this.doEventCount = doEventCount;
	}

	public List<TriggerInfo> getTriggersInfo() {
		return triggersInfo;
	}

	public void setTriggersInfo(List<TriggerInfo> triggersInfo) {
		this.triggersInfo = triggersInfo;
	}



}
