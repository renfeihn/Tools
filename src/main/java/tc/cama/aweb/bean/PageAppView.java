package tc.cama.aweb.bean;

import java.util.List;

import tc.bank.cama.cmdb.model.view.CmdbAppGroupCount;

/**
 * 应用总览bean
 * @author huangjun
 *
 */
public class PageAppView {
	
	/**
	 * 所有应用的故障事件总数
	 */
	private int errorEventCount;
	
	/**
	 * 所有应用的预警事件总数
	 */
	private int alertEventCount;
	
	/**
	 * 所有应用总数
	 */
	private int allAppCounts;
	
	/**
	 * 应用分组详情
	 */
	private List<CmdbAppGroupCount> appGroupCount;
	
	/**
	 * 所有分组的应用列表
	 */
	private List<PageAppSummary> appList;
	

	public int getErrorEventCount() {
		return errorEventCount;
	}

	public void setErrorEventCount(int errorEventCount) {
		this.errorEventCount = errorEventCount;
	}

	public int getAlertEventCount() {
		return alertEventCount;
	}

	public void setAlertEventCount(int alertEventCount) {
		this.alertEventCount = alertEventCount;
	}

	public int getAllAppCounts() {
		return allAppCounts;
	}

	public void setAllAppCounts(int allAppCounts) {
		this.allAppCounts = allAppCounts;
	}

	public List<CmdbAppGroupCount> getAppGroupCount() {
		return appGroupCount;
	}

	public void setAppGroupCount(List<CmdbAppGroupCount> appGroupCount) {
		this.appGroupCount = appGroupCount;
	}

	public List<PageAppSummary> getAppList() {
		return appList;
	}

	public void setAppList(List<PageAppSummary> appList) {
		this.appList = appList;
	}

}
