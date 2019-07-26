package tc.bank.cama.cmdb.model.view;

import java.util.Map;

import javax.persistence.Column;

import tc.bank.cama.cmdb.model.table.BaseColumnLabel;
import tc.bank.cama.cmdb.model.table.ColumnLabel;

/**
 * 分组下系统概要信息(联表查询记录)
 */
public class CmdbAppSummary implements ColumnLabel {

	private final ColumnLabel columnLabel;
	
	@Label("分组ID")
	private Long groupId;
	
	@Label("分组名称")
	private String groupName;
	
	@Label("系统对象ID")
	private Long objectId;
	
	@Label("系统名称")
	private String appName;
	
	@Label("分类ID")
	private Long categoryId;
	
	@Label("一级分类名称")
	private String l1CateName;
	
	@Label("二级分类名称")
	private String l2CateName;
	
	@Label("三级分类名称")
	private String l3CateName;

	public CmdbAppSummary() {
		this.columnLabel = new BaseColumnLabel(this.getClass());
	}
	
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

	@Column(name = "object_id")
	public void setObjectId(Long objectId) {
		this.objectId = objectId;
	}

	@Column(name = "object_name")
	public void setAppName(String appName) {
		this.appName = appName;
	}

	@Column(name = "cate_id")
	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	@Column(name = "l1_cate_name")
	public void setL1CateName(String l1CateName) {
		this.l1CateName = l1CateName;
	}

	@Column(name = "l2_cate_name")
	public void setL2CateName(String l2CateName) {
		this.l2CateName = l2CateName;
	}

	@Column(name = "l3_cate_name")
	public void setL3CateName(String l3CateName) {
		this.l3CateName = l3CateName;
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

	public Long getObjectId() {
		return objectId;
	}

	public String getAppName() {
		return appName;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public String getL1CateName() {
		return l1CateName;
	}

	public String getL2CateName() {
		return l2CateName;
	}

	public String getL3CateName() {
		return l3CateName;
	}

	@Override
	public Map<String, String> getFieldLabels() {
		return this.columnLabel.getFieldLabels();
	}
	
	@Override
	public boolean equals(Object arg0) {
		return (((CmdbAppSummary)arg0).getObjectId().equals(this.objectId));
	}
	
	@Override
	public int hashCode() {
		return Integer.parseInt(this.objectId+"");
	}
}
