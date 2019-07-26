package tc.cama.aweb.bean;

import com.aim.alibaba.fastjson.JSONObject;

public class AppEventView {

	// 未解除事件总数
	private int undealingCount;
	// 应用系统预警数
	private int warningCount;
	// 应用系统告警数
	private int alarmCount;
	// 当日事件总数
	private int todayEvent;
	//长时间未解除
	private int dealingLongtime;
	//长时间未受理
	private int dealLongtime;
	//已受理
	private int dealt;
	//转工单事件
	private int itilEvent;
	// 事件echarts(预警，告警)
	private JSONObject echartsData;

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

	public JSONObject getEchartsData() {
		return echartsData;
	}

	public void setEchartsData(JSONObject echartsData) {
		this.echartsData = echartsData;
	}

	public int getDealingLongtime() {
		return dealingLongtime;
	}

	public void setDealingLongtime(int dealingLongtime) {
		this.dealingLongtime = dealingLongtime;
	}

	public int getDealLongtime() {
		return dealLongtime;
	}

	public void setDealLongtime(int dealLongtime) {
		this.dealLongtime = dealLongtime;
	}

	public int getDealt() {
		return dealt;
	}

	public void setDealt(int dealt) {
		this.dealt = dealt;
	}
	
	public int getItilEvent() {
		return itilEvent;
	}

	public void setItilEvent(int itilEvent) {
		this.itilEvent = itilEvent;
	}
	
	@Override
	public String toString() {
		return "AppEventView [undealingCount=" + undealingCount
				+ ", warningCount=" + warningCount + ", alarmCount="
				+ alarmCount + ", todayEvent=" + todayEvent + ", echartsData="
				+ echartsData + "]";
	}
	
}
