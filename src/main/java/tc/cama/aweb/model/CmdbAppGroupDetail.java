package tc.cama.aweb.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * CMDB_App_Group_Detail的POJO对象
 */
@Entity
@Table(name = "cmdb_app_group_detail")
public class CmdbAppGroupDetail implements Serializable  {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;


	/**
	 * ID
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "AIMCONFIG")
	@Column(name = "record_id")
	private Integer recordId;

	
	@Column(name = "group_id")
	private Long groupId;
	
	@Column(name = "object_id")
	private Long objectId;
	
	/*
	 * setters
	 */
	public void setRecordId(Integer recordId) {
		this.recordId = recordId;
	}
	
	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}
	
	public void setObjectId(long objectId) {
		this.objectId = objectId;
	}
	
	/*
	 * getters
	 */
	
	@Column(name = "record_id")
	public Integer getRecordId() {
		return recordId;
	}
	
	@Column(name = "group_id")
	public long getGroupId() {
		return groupId;
	}
	
	@Column(name = "object_id")
	public long getObjectId() {
		return objectId;
	}

	
}
