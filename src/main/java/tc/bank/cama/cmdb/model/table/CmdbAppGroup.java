package tc.bank.cama.cmdb.model.table;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * CMDB_App_Group的POJO对象
 */

@Table(name = "cmdb_app_group")
public class CmdbAppGroup {

	/**
	 * 分组ID
	 */
	private Long groupId;
	
	/**
	 * 分组名称
	 */
	private String groupName;
	
	/*
	 * setters
	 */
	
	@Column(name = "group_id")
	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}
	
	@Column(name = "group_name")
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	
	/*
	 * getters
	 */
	
	@Column(name = "group_id", unique = true)
	public Long getGroupId() {
		return groupId;
	}
	
	@Column(name = "group_name")
	public String getGroupName() {
		return groupName;
	}
}
