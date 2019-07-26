package tc.cama.aweb.bean;

import java.util.List;
import java.util.Map;

/**
 * 应用性能，性能分析
 * 
 * @author zhangkun
 *
 */
public class AppPerformAnsBean {
	/**
	 * 应用id
	 */
	private Long appId;
	/**
	 * 实时TPS
	 */
	private String curTPS;
	/**
	 * tps五分钟同比
	 */
	private String fiveTPS="0";
	/**
	 * 相应率五分钟同比
	 */
	private String fiveRspRate="0";
	/**
	 * 相应时间五分钟同比
	 */
	private String fiveRspTime="0";
	/**
	 * 成功率五分钟同比
	 */
	private String fiveSussRate="0";

	/**
	 * 响应率
	 */
	private String rspRate;
	/**
	 * 成功率
	 *
	 */
	private String sussRate;
	/**
	 * 响应时间(mills)
	 */
	private String rspTime;
	/**
	 * 空闲时间
	 */
	private String freeTime;
	/**
	 * 交易总笔数
	 */
	private double totalTrans;
	/**
	 * 昨日同比
	 */
	private Map<String,List<String>> echartsData;
	
	private String cmpBeforeDay;
	/**
	 * 系统异常笔数
	 */
	private double sysExcepTrans;
	public Long getAppId() {
		return appId;
	}
	public void setAppId(Long appId) {
		this.appId = appId;
	}
	public String getRspRate() {
		return rspRate;
	}
	public void setRspRate(String rspRate) {
		this.rspRate = rspRate;
	}
	public String getSussRate() {
		return sussRate;
	}
	public void setSussRate(String sussRate) {
		this.sussRate = sussRate;
	}
	public String getRspTime() {
		return rspTime;
	}
	public void setRspTime(String rspTime) {
		this.rspTime = rspTime;
	}
	public String getFreeTime() {
		return freeTime;
	}
	public void setFreeTime(String freeTime) {
		this.freeTime = freeTime;
	}
	public double getTotalTrans() {
		return totalTrans;
	}
	public void setTotalTrans(double totalTrans) {
		this.totalTrans = totalTrans;
	}
	public String getCmpBeforeDay() {
		return cmpBeforeDay;
	}
	public void setCmpBeforeDay(String cmpBeforeDay) {
		this.cmpBeforeDay = cmpBeforeDay;
	}
	public double getSysExcepTrans() {
		return sysExcepTrans;
	}
	public void setSysExcepTrans(double sysExcepTrans) {
		this.sysExcepTrans = sysExcepTrans;
	}
	public String getCurTPS() {
		return curTPS;
	}
	public void setCurTPS(String curTPS) {
		this.curTPS = curTPS;
	}
	public Map<String, List<String>> getEchartsData() {
		return echartsData;
	}
	public void setEchartsData(Map<String, List<String>> echartsData) {
		this.echartsData = echartsData;
	}
	public String getFiveTPS() {
		return fiveTPS;
	}
	public void setFiveTPS(String fiveTPS) {
		this.fiveTPS = fiveTPS;
	}
	public String getFiveRspRate() {
		return fiveRspRate;
	}
	public void setFiveRspRate(String fiveRspRate) {
		this.fiveRspRate = fiveRspRate;
	}
	public String getFiveRspTime() {
		return fiveRspTime;
	}
	public void setFiveRspTime(String fiveRspTime) {
		this.fiveRspTime = fiveRspTime;
	}
	public String getFiveSussRate() {
		return fiveSussRate;
	}
	public void setFiveSussRate(String fiveSussRate) {
		this.fiveSussRate = fiveSussRate;
	}
	

}
