package tc.cama.aweb.bean;

import tc.bank.cama.cmdb.model.table.CmdbObjectSummary;

public class PageCfgObjectSummary {
	
	private CmdbObjectSummary objectSummary;
	
	private boolean attention;
	
	private int healthDegree;
	/**
	 * 对象类型图片ID
	 */
	private String imgPath;

	public CmdbObjectSummary getObjectSummary() {
		return objectSummary;
	}

	public void setObjectSummary(CmdbObjectSummary objectSummary) {
		this.objectSummary = objectSummary;
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

	public String getImgPath() {
		return imgPath;
	}

	public void setImgPath(String imgPath) {
		this.imgPath = imgPath;
	}
}
