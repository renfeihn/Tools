package tc.cama.aweb.bean;

import tc.bank.cama.cmdb.model.table.extention.CmdbLogicalServer;

public class PageAppServerSummary {

	/**
	 * 逻辑服务器对象
	 */
	private CmdbLogicalServer logicalServer;
	
	/**
	 * 告警事件数
	 */
	private int errorEventCount;
	
	/**
	 * 预警事件数
	 */
	private int alertEventCount;

	public CmdbLogicalServer getLogicalServer() {
		return logicalServer;
	}

	public int getErrorEventCount() {
		return errorEventCount;
	}

	public int getAlertEventCount() {
		return alertEventCount;
	}

	public void setLogicalServer(CmdbLogicalServer logicalServer) {
		this.logicalServer = logicalServer;
	}

	public void setErrorEventCount(int errorEventCount) {
		this.errorEventCount = errorEventCount;
	}

	public void setAlertEventCount(int alertEventCount) {
		this.alertEventCount = alertEventCount;
	}
}
