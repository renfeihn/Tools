package tc.cama.aweb.bean;

import tc.bank.cama.cmdb.model.table.extention.CmdbLogicalServer;

public class PageAppHardwareServer {

	/**
	 * 逻辑服务器
	 */
	private CmdbLogicalServer logicServer;
	
	/**
	 * 逻辑服务器事件数
	 */
	private int eventCounts;

	/**
	 * 数据库数
	 */
	private int dbCounts;

	/**
	 * 应用程序数
	 */
	private int appCounts;
	
	/**
	 * 中间件数
	 */
	private int middleWareCounts;
	
	/**
	 * 操作系统数
	 */
	private int osCounts;
	
	/**
	 * cpu使用率
	 */
	private String cpuUsage;
	
	/**
	 * 内存使用率
	 */
	private String memUsage;
	
	/**
	 * 应用健康度
	 */
	private int healthDegree;
	
	public CmdbLogicalServer getLogicServer() {
		return logicServer;
	}

	public void setLogicServer(CmdbLogicalServer logicServer) {
		this.logicServer = logicServer;
	}

	public int getEventCounts() {
		return eventCounts;
	}

	public void setEventCounts(int eventCounts) {
		this.eventCounts = eventCounts;
	}

	public int getDbCounts() {
		return dbCounts;
	}

	public void setDbCounts(int dbCounts) {
		this.dbCounts = dbCounts;
	}

	public int getAppCounts() {
		return appCounts;
	}

	public void setAppCounts(int appCounts) {
		this.appCounts = appCounts;
	}

	public int getMiddleWareCounts() {
		return middleWareCounts;
	}

	public void setMiddleWareCounts(int middleWareCounts) {
		this.middleWareCounts = middleWareCounts;
	}

	public int getOsCounts() {
		return osCounts;
	}

	public void setOsCounts(int osCounts) {
		this.osCounts = osCounts;
	}

	public String getCpuUsage() {
		return cpuUsage;
	}

	public void setCpuUsage(String cpuUsage) {
		this.cpuUsage = cpuUsage;
	}

	public String getMemUsage() {
		return memUsage;
	}

	public void setMemUsage(String memUsage) {
		this.memUsage = memUsage;
	}

	public int getHealthDegree() {
		return healthDegree;
	}

	public void setHealthDegree(int healthDegree) {
		this.healthDegree = healthDegree;
	}
	
}
