package tc.bank.cama.cmdb.model.table;

import javax.persistence.Column;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;

/**
 * CMDB_Object_Summary的POJO
 */

@Table(name = "cmdb_object_summary")
public class CmdbObjectSummary {

	/** 对象ID　*/
	private Long objectId;
	
	/** 对象名称　*/
	private String objectName;
	
	/** 分类ID　*/
	private Long categoryId;
	
	/** 一级分类名称　*/
	@JSONField(name = "l1CateName")
	private String levelOneName;
	
	/** 二级分类　*/
	@JSONField(name = "l2CateName")
	private String levelTwoName;
	
	/** 三级分类　*/
	@JSONField(name = "l3CateName")
	private String levelThreeName;

	/** 对象状态　*/
	private String objectStatusName;
	
	/** 对象监控状态　*/
	private boolean monitorStatus;

	/*
	 * setters
	 */
	
	@Column(name = "object_id")
	public void setObjectId(Long objectId) {
		this.objectId = objectId;
	}

	@Column(name = "object_name")
	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}

	@Column(name = "cate_id")
	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	@Column(name = "l1_cate_name")
	public void setLevelOneName(String levelOneName) {
		this.levelOneName = levelOneName;
	}

	@Column(name = "l2_cate_name")
	public void setLevelTwoName(String levelTwoName) {
		this.levelTwoName = levelTwoName;
	}

	@Column(name = "l3_cate_name")
	public void setLevelThreeName(String levelThreeName) {
		this.levelThreeName = levelThreeName;
	}

	@Column(name = "object_status_name")
	public void setObjectStatusName(String objectStatusName) {
		this.objectStatusName = objectStatusName;
	}

	@Column(name = "monitor_status")
	public void setMonitorStatus(boolean monitorStatus) {
		this.monitorStatus = monitorStatus;
	}

	@Column(name = "object_id", unique = true)
	public Long getObjectId() {
		return objectId;
	}

	@Column(name = "object_name")
	public String getObjectName() {
		return objectName;
	}

	@Column(name = "cate_id")
	public Long getCategoryId() {
		return categoryId;
	}

	@Column(name = "l1_cate_name")
	public String getLevelOneName() {
		return levelOneName;
	}

	@Column(name = "l2_cate_name")
	public String getLevelTwoName() {
		return levelTwoName;
	}

	@Column(name = "l3_cate_name")
	public String getLevelThreeName() {
		return levelThreeName;
	}

	@Column(name = "object_status_name")
	public String getObjectStatusName() {
		return objectStatusName;
	}

	@Column(name = "monitor_status")
	public boolean getMonitorStatus() {
		return monitorStatus;
	}
	
}
