package tc.cama.aweb.bean;

import java.util.List;
import java.util.Map;

public class AppAPM {
	/**
	 * 系统总数
	 */
    private String appCount;
    /**
     * 交易总量
     */
    private String dayTotal;
    /**
     * 昨日同比
     */
    private String compBeforDay;
    /**
     * 响应时间
     * 5分钟同比
     */
    private List<String> rspTime;
    /**
     * 响应率
     * 5分钟同比
     */
    private List<String> rspRate;
    /**
     * TPS
     * 5分钟同比
     */
    private List<String> TPS;
    /**
     * 成功率
     * 5分钟同比
     */
    private List<String> susRate;
    /**
     * echartsData图
     */
     Map<String,List<String>> echartsData;
	public String getAppCount() {
		return appCount;
	}
	public void setAppCount(String appCount) {
		this.appCount = appCount;
	}
	public String getDayTotal() {
		return dayTotal;
	}
	public void setDayTotal(String dayTotal) {
		this.dayTotal = dayTotal;
	}
	public String getCompBeforDay() {
		return compBeforDay;
	}
	public void setCompBeforDay(String compBeforDay) {
		this.compBeforDay = compBeforDay;
	}
	public List<String> getRspTime() {
		return rspTime;
	}
	public void setRspTime(List<String> rspTime) {
		this.rspTime = rspTime;
	}
	public List<String> getRspRate() {
		return rspRate;
	}
	public void setRspRate(List<String> rspRate) {
		this.rspRate = rspRate;
	}
	public List<String> getTPS() {
		return TPS;
	}
	public void setTPS(List<String> tPS) {
		TPS = tPS;
	}
	public List<String> getSusRate() {
		return susRate;
	}
	public void setSusRate(List<String> susRate) {
		this.susRate = susRate;
	}
	public Map<String, List<String>> getEchartsData() {
		return echartsData;
	}
	public void setEchartsData(Map<String, List<String>> echartsData) {
		this.echartsData = echartsData;
	}
     
    
}
