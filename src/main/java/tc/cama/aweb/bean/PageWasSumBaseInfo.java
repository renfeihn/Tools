package tc.cama.aweb.bean;

public class PageWasSumBaseInfo {
	/**
	 * WAS统计
	 */
	//WAS总数
	private int wasNum;
	//应用系统数：总数，running数，stop数，deploy数
	private int appNum;
	private int appRunning;
	private int appStop;
	private int appDeploy;
	
	/**
	 * 关键KPI总统计
	 */
	//请求响应时间过高数
	private int rspTimeHigh;
	//线程繁忙过高数
	private int threadUseHigh;
	//JDBC使用率过高数
	private int jdbcUseHigh;
	
	
	
	public int getWasNum() {
		return wasNum;
	}
	public void setWasNum(int wasNum) {
		this.wasNum = wasNum;
	}
	public int getAppNum() {
		return appNum;
	}
	public void setAppNum(int appNum) {
		this.appNum = appNum;
	}
	public int getAppRunning() {
		return appRunning;
	}
	public void setAppRunning(int appRunning) {
		this.appRunning = appRunning;
	}
	public int getAppStop() {
		return appStop;
	}
	public void setAppStop(int appStop) {
		this.appStop = appStop;
	}
	public int getAppDeploy() {
		return appDeploy;
	}
	public void setAppDeploy(int appDeploy) {
		this.appDeploy = appDeploy;
	}
	public int getRspTimeHigh() {
		return rspTimeHigh;
	}
	public void setRspTimeHigh(int rspTimeHigh) {
		this.rspTimeHigh = rspTimeHigh;
	}
	public int getThreadUseHigh() {
		return threadUseHigh;
	}
	public void setThreadUseHigh(int threadUseHigh) {
		this.threadUseHigh = threadUseHigh;
	}
	public int getJdbcUseHigh() {
		return jdbcUseHigh;
	}
	public void setJdbcUseHigh(int jdbcUseHigh) {
		this.jdbcUseHigh = jdbcUseHigh;
	}
	
	
}
