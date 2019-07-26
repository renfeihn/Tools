package tc.bank.asda.sqlmarket.model;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * 日志sql市场分组表
 * @author lfj
 *
 */
@Table(name = "aiml_sqlmarket_group")
public class AimlSqlMarketGroup {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7022608863594150065L;

	/**
	 * 分组id
	 */
	@Column(name = "group_id")
	private long groupId;
	/**
	 * 分组名称
	 */
	@Column(name = "group_name")
	private String groupName;

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

}
