package tc.cama.aweb.bean;

import com.aim.alibaba.fastjson.JSONObject;

/**
 * Oracle基本信息Bean
 */
public class PageOracleBase {

	private int healthValue = 100;

	//SGA(MB)
	private String SGA = "0";
	//共享内存
	private String memShared = "0";
	//当前会话数
	private String curSessionCount = "0";
	//游标数
	private String cursorCount = "0";

	//未关闭事件数
	private Integer unClosedCount;
	//预警数
	private Integer warningCount;
	//告警数
	private Integer alertCount;
	//当日事件总数
	private Integer dayEventCount;

	private JSONObject object;

	public int getHealthValue() {
		return healthValue;
	}

	public void setHealthValue(int healthValue) {
		this.healthValue = healthValue;
	}

	public String getSGA() {
		return SGA;
	}

	public void setSGA(String sGA) {
		SGA = sGA;
	}

	public String getMemShared() {
		return memShared;
	}

	public void setMemShared(String memShared) {
		this.memShared = memShared;
	}

	public String getCurSessionCount() {
		return curSessionCount;
	}

	public void setCurSessionCount(String curSessionCount) {
		this.curSessionCount = curSessionCount;
	}

	public String getCursorCount() {
		return cursorCount;
	}

	public void setCursorCount(String cursorCount) {
		this.cursorCount = cursorCount;
	}

	public Integer getUnClosedCount() {
		return unClosedCount;
	}

	public void setUnClosedCount(Integer unClosedCount) {
		this.unClosedCount = unClosedCount;
	}

	public Integer getWarningCount() {
		return warningCount;
	}

	public void setWarningCount(Integer warningCount) {
		this.warningCount = warningCount;
	}

	public Integer getAlertCount() {
		return alertCount;
	}

	public void setAlertCount(Integer alertCount) {
		this.alertCount = alertCount;
	}

	public Integer getDayEventCount() {
		return dayEventCount;
	}

	public void setDayEventCount(Integer dayEventCount) {
		this.dayEventCount = dayEventCount;
	}

	public JSONObject getObject() {
		return object;
	}

	public void setObject(JSONObject object) {
		this.object = object;
	}



}
