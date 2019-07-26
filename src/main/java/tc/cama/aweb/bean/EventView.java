package tc.cama.aweb.bean;

import com.aim.alibaba.fastjson.JSONObject;

public class EventView {

	// 未解除事件总数
	private int undealingCount;
	// 应用系统预警数
	private int warningCount;
	// 应用系统告警数
	private int alarmCount;
	// 当日事件总数
	private int todayEvent;

	public int getUndealingCount() {
		return undealingCount;
	}

	public int getWarningCount() {
		return warningCount;
	}

	public int getAlarmCount() {
		return alarmCount;
	}

	public int getTodayEvent() {
		return todayEvent;
	}

	public void setUndealingCount(int undealingCount) {
		this.undealingCount = undealingCount;
	}

	public void setWarningCount(int warningCount) {
		this.warningCount = warningCount;
	}

	public void setAlarmCount(int alarmCount) {
		this.alarmCount = alarmCount;
	}

	public void setTodayEvent(int todayEvent) {
		this.todayEvent = todayEvent;
	}


}
