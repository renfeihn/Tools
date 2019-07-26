package tc.bank.asda.dashboard.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_cfg_log_dash_board_relation")
public class DashBoardRelation {

	/**
	 * 仪表盘主键
	 */
	@Column(name = "board_id")
	private long boardId;
	/**
	 * 仪表盘分组主键
	 */
	@Column(name = "group_id")
	private long groupId;
	/**
	 * 宽度
	 */
	@Column(name = "width")
	private String width;
	/**
	 * 高度
	 */
	@Column(name = "height")
	private String height;
	/**
	 * x坐标
	 */
	@Column(name = "x")
	private String x;
	/**
	 * y坐标
	 */
	@Column(name = "y")
	private String y;

	public long getBoardId() {
		return boardId;
	}

	public void setBoardId(long boardId) {
		this.boardId = boardId;
	}

	public long getGroupId() {
		return groupId;
	}

	public void setGroupId(long groupId) {
		this.groupId = groupId;
	}

	public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	public String getX() {
		return x;
	}

	public void setX(String x) {
		this.x = x;
	}

	public String getY() {
		return y;
	}

	public void setY(String y) {
		this.y = y;
	}
}
