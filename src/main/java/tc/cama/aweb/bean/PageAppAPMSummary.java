package tc.cama.aweb.bean;

import java.util.List;
import java.util.Map;

@SuppressWarnings("rawtypes")
public class PageAppAPMSummary {

	private Map yesAPMTotal;

	private Map todayAPMTotal;
	
	//排序后的对象集合
	private List<String> sortedMonitors; 


	/**
	 * APM应用总数统计
	 */
	private long apmCount;

	private Map SysName;

	private Map tradeCountChanged;

	private Map rspPercentChanged;

	private Map sucPercentChanged;

	private Map tpsChanged;

	private Map rspTimeAvgChanged;
	
	private Map appHealthy;

	public Map getAppHealthy() {
		return appHealthy;
	}

	public void setAppHealthy(Map appHealthy) {
		this.appHealthy = appHealthy;
	}

	public Map getSysName() {
		return SysName;
	}

	public Map getTradeCountChanged() {
		return tradeCountChanged;
	}

	public Map getRspPercentChanged() {
		return rspPercentChanged;
	}

	public Map getSucPercentChanged() {
		return sucPercentChanged;
	}

	public Map getTpsChanged() {
		return tpsChanged;
	}

	public Map getRspTimeAvgChanged() {
		return rspTimeAvgChanged;
	}

	public void setSysName(Map sysName) {
		SysName = sysName;
	}

	public void setTradeCountChanged(Map tradeCountChanged) {
		this.tradeCountChanged = tradeCountChanged;
	}

	public void setRspPercentChanged(Map rspPercentChanged) {
		this.rspPercentChanged = rspPercentChanged;
	}

	public void setSucPercentChanged(Map sucPercentChanged) {
		this.sucPercentChanged = sucPercentChanged;
	}

	public void setTpsChanged(Map tpsChanged) {
		this.tpsChanged = tpsChanged;
	}

	public void setRspTimeAvgChanged(Map rspTimeAvgChanged) {
		this.rspTimeAvgChanged = rspTimeAvgChanged;
	}

	public long getApmCount() {
		return apmCount;
	}

	public void setApmCount(long apmCount) {
		this.apmCount = apmCount;
	}

	public Map getYesAPMTotal() {
		return yesAPMTotal;
	}

	public Map getTodayAPMTotal() {
		return todayAPMTotal;
	}

	public void setYesAPMTotal(Map yesAPMTotal) {
		this.yesAPMTotal = yesAPMTotal;
	}

	public void setTodayAPMTotal(Map todayAPMTotal) {
		this.todayAPMTotal = todayAPMTotal;
	}

	public List<String> getSortedMonitors() {
		return sortedMonitors;
	}

	public void setSortedMonitors(List<String> sortedMonitors) {
		this.sortedMonitors = sortedMonitors;
	}

	

}
