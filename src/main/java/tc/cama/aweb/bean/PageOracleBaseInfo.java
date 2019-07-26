package tc.cama.aweb.bean;

public class PageOracleBaseInfo {
	//健康度
	private int healthValue = 100;
	
	/**实例汇总
	 * 
	 */
	//端口状态
	private String protStatus;
	//当前进程数
	private Integer processCount;
	//RAC节点状态
	private String racStatus;
	//表空间空闲比率
	private String tableSpaceFreeRate;
	//SGA空闲比率
	private String sgaFreeRate;
	//日志占用磁盘率
	private String logUseDiskRate;
	
	/**应用汇总
	 * 
	 */
	//超长sql数
	private Integer longSqlCount;
	//超长事物数
	private Integer longTransCount;
	//长时间等待数
	private Integer longTimeWaitCount;
	//长时间作业数
	private Integer longTimeRunCount;
	//Cursors使用率
	private String cursorsUseRate;
	//SEQ使用率
	private String seqUseRate;
	/**
	 *事件统计
	 */
	//未关闭事件数
	private Integer unClosedCount;
	//预警数
	private Integer warningCount;
	//告警数
	private Integer alertCount;
	//当日事件总数
	private Integer dayEventCount;
	
	public int getHealthValue() {
		return healthValue;
	}
	public void setHealthValue(int healthValue) {
		this.healthValue = healthValue;
	}
	public String getProtStatus() {
		return protStatus;
	}
	public void setProtStatus(String protStatus) {
		this.protStatus = protStatus;
	}
	public Integer getProcessCount() {
		return processCount;
	}
	public void setProcessCount(Integer processCount) {
		this.processCount = processCount;
	}
	public String getRacStatus() {
		return racStatus;
	}
	public void setRacStatus(String racStatus) {
		this.racStatus = racStatus;
	}
	public String getTableSpaceFreeRate() {
		return tableSpaceFreeRate;
	}
	public void setTableSpaceFreeRate(String tableSpaceFreeRate) {
		this.tableSpaceFreeRate = tableSpaceFreeRate;
	}
	public String getSgaFreeRate() {
		return sgaFreeRate;
	}
	public void setSgaFreeRate(String sgaFreeRate) {
		this.sgaFreeRate = sgaFreeRate;
	}
	public String getLogUseDiskRate() {
		return logUseDiskRate;
	}
	public void setLogUseDiskRate(String logUseDiskRate) {
		this.logUseDiskRate = logUseDiskRate;
	}
	public Integer getLongSqlCount() {
		return longSqlCount;
	}
	public void setLongSqlCount(Integer longSqlCount) {
		this.longSqlCount = longSqlCount;
	}
	public Integer getLongTransCount() {
		return longTransCount;
	}
	public void setLongTransCount(Integer longTransCount) {
		this.longTransCount = longTransCount;
	}
	public Integer getLongTimeWaitCount() {
		return longTimeWaitCount;
	}
	public void setLongTimeWaitCount(Integer longTimeWaitCount) {
		this.longTimeWaitCount = longTimeWaitCount;
	}
	public Integer getLongTimeRunCount() {
		return longTimeRunCount;
	}
	public void setLongTimeRunCount(Integer longTimeRunCount) {
		this.longTimeRunCount = longTimeRunCount;
	}
	public String getCursorsUseRate() {
		return cursorsUseRate;
	}
	public void setCursorsUseRate(String cursorsUseRate) {
		this.cursorsUseRate = cursorsUseRate;
	}
	public String getSeqUseRate() {
		return seqUseRate;
	}
	public void setSeqUseRate(String seqUseRate) {
		this.seqUseRate = seqUseRate;
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
}
