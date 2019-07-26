package tc.bank.asda.dashboard.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name ="aiml_panel")
public class Panel implements Serializable{
	
	private static final long serialVersionUID = 6183374547326294992L;
	/**
	 * 仪表盘id
	 */
	@Column(name="id")
	private long id;
	/**
	 * 仪表盘名称
	 */
	@Column(name="name")
	private String name;
	/**
	 * 仪表盘状态	1 自己创建 0 别人分享
	 */
	@Column(name="status")
	private Integer status;
	/**
	 * 关联资源ID
	 */
	@Column(name="object_id")
	private long objectId;
	/**
	 * 所属用户ID
	 */
	@Column(name="user_id")
	private long userId;
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
	
	/**
	 * 应用系统id集合，用“,”间隔
	 */
	private String sourceIds;
	
	private List<PanelChart> panList;
	
	public List<PanelChart> getPanList() {
		return panList;
	}
	public void setPanList(List<PanelChart> panList) {
		this.panList = panList;
	}
	
	public Panel() {
		super();
	}
	public Panel(long id, String name, Integer status, long objectId,
			long userId, Date createTime, Date modifyTime) {
		super();
		this.id = id;
		this.name = name;
		this.status = status;
		this.objectId = objectId;
		this.userId = userId;
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
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public long getObjectId() {
		return objectId;
	}
	public void setObjectId(long objectId) {
		this.objectId = objectId;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
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
	public String getSourceIds() {
		return sourceIds;
	}
	public void setSourceIds(String sourceIds) {
		this.sourceIds = sourceIds;
	}
	@Override
	public String toString() {
		return "Panel [id=" + id + ", name=" + name + ", status=" + status
				+ ", objectId=" + objectId + ", userId=" + userId
				+ ", createTime=" + createTime + ", modifyTime=" + modifyTime
				+ "]";
	}
	
	
	
}
