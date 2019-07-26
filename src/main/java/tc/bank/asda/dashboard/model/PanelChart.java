package tc.bank.asda.dashboard.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="aiml_panel_chart")
public class PanelChart implements Serializable{
	/**
	 * 仪表盘组件ID
	 */
	@Column(name="id")
	private long id;
	/**
	 * 仪表盘组件名称
	 */
	@Column(name="name")
	private String name;
	/**
	 * 仪表盘组件类型
	 */
	@Column(name="type")
	private String type;
	/**
	 * 仪表盘组件配置
	 */
	@Column(name="config")
	private String config;
	/**
	 * 仪表盘组件截图
	 */
	@Column(name="pic")
	private String pic;
	/**
	 * 关联的仪表盘组件ID
	 */
	@Column(name="panel_id")
	private long panelId;
	/**
	 * 创建时间
	 */
	@Column(name="create_time")
	private Date createTime;
	/**
	 * 修改时间
	 */
	@Column(name="modify_time")
	private Date modifyTime;
	
	public PanelChart() {
		super();
	}

	public PanelChart(long id, String name, String type, String config,
			String pic, long panelId, Date createTime, Date modifyTime) {
		super();
		this.id = id;
		this.name = name;
		this.type = type;
		this.config = config;
		this.pic = pic;
		this.panelId = panelId;
		this.createTime = createTime;
		this.modifyTime = modifyTime;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getConfig() {
		return config;
	}

	public void setConfig(String config) {
		this.config = config;
	}

	public String getPic() {
		return pic;
	}

	public void setPic(String pic) {
		this.pic = pic;
	}

	public long getPanelId() {
		return panelId;
	}

	public void setPanelId(long panelId) {
		this.panelId = panelId;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getModifyTime() {
		return modifyTime;
	}

	public void setModifyTime(Date modifyTime) {
		this.modifyTime = modifyTime;
	}

	@Override
	public String toString() {
		return "PanelChart [id=" + id + ", name=" + name + ", type=" + type
				+ ", panelId=" + panelId + ", createTime=" + createTime
				+ ", modifyTime=" + modifyTime + "]";
	}
	
}
