package tc.bank.asda.dashboard.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_cfg_log_dash_board_group")
public class DashBoardGroup {

	/**
	 * 仪表盘组ID
	 */
	@Column(name = "group_id")
	private long groupId;
	/**
	 * 仪表盘组名称
	 */
	@Column(name = "group_name")
	private String groupName;

	/**
	 * 仪表盘组名称
	 */
	@Column(name = "remark")
	private String remark;
	/**
	 * 是否是首页 1是; 0:否
	 */
	@Column(name ="is_index")
	private int isIndex;

	public long getGroupId() {
		return groupId;
	}

	public void setGroupId(long groupId) {
		this.groupId = groupId;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public int getIsIndex() {
		return isIndex;
	}

	public void setIsIndex(int isIndex) {
		this.isIndex = isIndex;
	}
}
