package tc.cama.aweb.bean;

public class PageWasDetailBaseInfo {

	
	/**
	 * 健康度
	 */
	private int healthy;
	
	/**
	 * 重点指标
	 */
	//线程利用率
	private int threadBusy;
	//jdbc池使用率
	private double jdbcPool;
	//请求总数
	private int reqNum;
	public int getReqNum() {
		return reqNum;
	}
	public void setReqNum(int reqNum) {
		this.reqNum = reqNum;
	}
	//平均请求响应时间
	private double avgRspTime;
	
	
	/**
	 * 基本信息
	 */
	//服务器端口状态
	private int serStatus;
	//部署应用数
	private int appNum;
	//当前会话数
	private int liveCount;
	public int getLiveCount() {
		return liveCount;
	}
	public void setLiveCount(int liveCount) {
		this.liveCount = liveCount;
	}
	//Servlet错误数
	private int servletErr;
	
	/**
	 * 事件汇总
	 */
	//未解除事件
	private Integer unClosedCount;
	//预警事件
	private Integer warningCount;
	//告警事件
	private Integer alertCount;
	//当日事件总数
	private Integer dayEventCount;
	
	
	public int getHealthy() {
		return healthy;
	}
	public void setHealthy(int healthy) {
		this.healthy = healthy;
	}
	public int getThreadBusy() {
		return threadBusy;
	}
	public void setThreadBusy(int threadBusy) {
		this.threadBusy = threadBusy;
	}
	public double getJdbcPool() {
		return jdbcPool;
	}
	public void setJdbcPool(double jdbcPool) {
		this.jdbcPool = jdbcPool;
	}
	public double getAvgRspTime() {
		return avgRspTime;
	}
	public void setAvgRspTime(double avgRspTime) {
		this.avgRspTime = avgRspTime;
	}
	public int getSerStatus() {
		return serStatus;
	}
	public void setSerStatus(int serStatus) {
		this.serStatus = serStatus;
	}

	
	public int getAppNum() {
		return appNum;
	}
	public void setAppNum(int appNum) {
		this.appNum = appNum;
	}
	
	public int getServletErr() {
		return servletErr;
	}
	public void setServletErr(int servletErr) {
		this.servletErr = servletErr;
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
