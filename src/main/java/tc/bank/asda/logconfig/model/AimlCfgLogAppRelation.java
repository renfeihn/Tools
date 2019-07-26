package tc.bank.asda.logconfig.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * 应用解析规则关联表
 * 
 * @author parry
 * 
 */
@Table(name = "aiml_cfg_log_app_relation")
public class AimlCfgLogAppRelation implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 4943431641115676895L;
	/**
	 * 主键
	 */
	@Column(name = "id")
	private long id;
	/**
	 * 日志解析规则ID
	 */
	@Column(name = "log_id")
	private long logId;
	/**
	 * 应用id
	 */
	@Column(name = "app_id")
	private long appId;
	/**
	 * 应用服务器id
	 */
	@Column(name = "object_id")
	private long objectId;
	/**
	 * 关系创建时间
	 */
	@Column(name = "create_time")
	private Date createTime;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getLogId() {
		return logId;
	}
	public void setLogId(long logId) {
		this.logId = logId;
	}
	public long getAppId() {
		return appId;
	}
	public void setAppId(long appId) {
		this.appId = appId;
	}
	public long getObjectId() {
		return objectId;
	}
	public void setObjectId(long objectId) {
		this.objectId = objectId;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
}
