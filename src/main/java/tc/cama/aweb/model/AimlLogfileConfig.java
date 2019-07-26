package tc.cama.aweb.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;
@Entity
@Table(name = "aiml_logfile_config")
public class AimlLogfileConfig implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3210887665815005165L;

	/**
	 * ID
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "AIMCONFIG")
	@Column(name = "id")
	private Integer id;
	/**
	 * 应用系统ID
	 */
	@Column(name = "app_id")
	private String appId;
	/**
	 * 服务器ID
	 */
	@Column(name = "server_id")
	private String serverId;
	/**
	 * 服务器名称
	 */
	private String serverName;
	/**
	 * 文件类型 
	 * 1-异常/错误日志文件 
	 * 2-CORE文件
	 * 3-日志文件 
	 * 4-其他
	 */
	@Column(name = "filetype")
	private String fileType;
	/**
	 * 文件
	 */
	@Column(name = "pattern")
	private String pattern;
	/**
	 * 文件描述
	 */
	@Column(name = "patterndesc")
	private String patternDesc;
	/**
	 * 是否启用
	 */
	@Column(name = "enabled")
	private Integer enabled;
	/**
	 * 创建时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "created")
	private Date created;
	/**
	 * 更新时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "modified")
	private Date modified;

	/**
	 * @return ID
	 */
	public Integer getId() {
		return this.id;
	}

	/**
	 * @param id
	 *            ID
	 */
	@Column(name = "id")
	public void setId(Integer id) {
		this.id = id;
	}

	
	public String getAppId() {
		return appId;
	}
	@Column(name = "app_id")
	public void setAppId(String appId) {
		this.appId = appId;
	}

	public String getServerId() {
		return serverId;
	}
	@Column(name = "server_id")
	public void setServerId(String serverId) {
		this.serverId = serverId;
	}

	

	/**
	 * @return 文件名
	 */
	public String getPattern() {
		return this.pattern;
	}

	/**
	 * @param pattern
	 *            文件名
	 */
	@Column(name = "pattern")
	public void setPattern(String pattern) {
		this.pattern = pattern;
	}

	

	public String getFileType() {
		return fileType;
	}
	@Column(name = "filetype")
	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	

	public String getPatternDesc() {
		return patternDesc;
	}
	@Column(name = "patterndesc")
	public void setPatternDesc(String patternDesc) {
		this.patternDesc = patternDesc;
	}

	/**
	 * @return 是否启用
	 */
	public Integer getEnabled() {
		return this.enabled;
	}

	/**
	 * @param enabled
	 *            是否启用
	 */
	@Column(name = "enabled")
	public void setEnabled(Integer enabled) {
		this.enabled = enabled;
	}

	/**
	 * @return 创建时间
	 */
	public Date getCreated() {
		return this.created;
	}

	/**
	 * @param created
	 *            创建时间
	 */
	@Column(name = "created")
	public void setCreated(Date created) {
		this.created = created;
	}

	/**
	 * @return 更新时间
	 */
	public Date getModified() {
		return this.modified;
	}

	/**
	 * @param modified
	 *            更新时间
	 */
	@Column(name = "modified")
	public void setModified(Date modified) {
		this.modified = modified;
	}

	public String getServerName() {
		return serverName;
	}

	public void setServerName(String serverName) {
		this.serverName = serverName;
	}
	
}
