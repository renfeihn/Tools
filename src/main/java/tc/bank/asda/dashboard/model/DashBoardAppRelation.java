package tc.bank.asda.dashboard.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_cfg_app_dash_board_relation")
public class DashBoardAppRelation {

	/**
	 * 仪表盘组ID
	 */
	@Column(name = "id")
	private long id;
	/**
	 * 应用系统主键
	 */
	@Column(name = "source_id")
	private long sourceId;
	/**
	 * 用户主键
	 */
	@Column(name = "user_id")
	private long userId;
	/**
	 * 仪表盘主键
	 */
	@Column(name = "panel_id")
	private long panelId;
	/**
	 * 仪表盘名称
	 */
	@Column(name = "app_borad_name")
	private String appBoradName;
	
	Panel panel;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getPanelId() {
		return panelId;
	}
	public void setPanelId(long panelId) {
		this.panelId = panelId;
	}
	public String getAppBoradName() {
		return appBoradName;
	}
	public void setAppBoradName(String appBoradName) {
		this.appBoradName = appBoradName;
	}
	public long getSourceId() {
		return sourceId;
	}
	public void setSourceId(long sourceId) {
		this.sourceId = sourceId;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public Panel getPanel() {
		return panel;
	}
	public void setPanel(Panel panel) {
		this.panel = panel;
	}
}
