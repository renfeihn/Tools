package tc.cama.aweb.bean;

import tc.bank.cama.cmdb.model.view.CmdbAppSummary;

public class PageAppSummary {

	/**
	 * 分组下系统概要信息
	 */
	private CmdbAppSummary appSummary;
	
	/**
	 * 用户是否关注该应用
	 */
	private boolean attention;
	
	/**
	 * 应用健康度
	 */
	private int healthDegree;

	public CmdbAppSummary getAppSummary() {
		return appSummary;
	}

	public void setAppSummary(CmdbAppSummary appSummary) {
		this.appSummary = appSummary;
	}

	public boolean isAttention() {
		return attention;
	}

	public void setAttention(boolean attention) {
		this.attention = attention;
	}

	public int getHealthDegree() {
		return healthDegree;
	}

	public void setHealthDegree(int healthDegree) {
		this.healthDegree = healthDegree;
	}

}
