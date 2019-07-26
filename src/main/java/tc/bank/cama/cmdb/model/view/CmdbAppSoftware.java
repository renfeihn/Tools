package tc.bank.cama.cmdb.model.view;

import javax.persistence.Column;

import tc.bank.cama.cmdb.model.table.extention.CmdbSoftware;

/**
 * 应用程序(包含系统属性)
 */
public class CmdbAppSoftware extends CmdbSoftware {

	private Long applicationId;
	private String applicationName;
	
	/*
	 * setters
	 */

	@Column(name = "app_id")
	public void setApplicationId(Long applicationId) {
		this.applicationId = applicationId;
	}
	
	@Column(name = "app_name")
	public void setApplicationName(String applicationName) {
		this.applicationName = applicationName;
	}

	/*
	 * getters
	 */
	
	public Long getApplicationId() {
		return applicationId;
	}

	public String getApplicationName() {
		return applicationName;
	}
	
	
}
