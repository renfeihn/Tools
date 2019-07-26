package tc.bank.cama.cmdb.model.view;

import javax.persistence.Column;

/**
 * 分组下包含的系统总数
 */
public class CmdbAppGroupCount {

	/**
	 * 系统分组ID
	 */
	private Long groupId;
	
	/**
	 * 分组名称
	 */
	private String groupName;
	
	/**
	 * 系统数量
	 */
	private Long count;

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

	@Column(name = "row_count")
	public void setCount(Long count) {
		this.count = count;
	}

	/*
	 * getters
	 */
	
	public Long getGroupId() {
		return groupId;
	}

	public String getGroupName() {
		return groupName;
	}

	public Long getCount() {
		return count;
	}
	
}
