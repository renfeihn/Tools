package tc.bank.asda.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;

@Entity
@Table(name = "aiml_keywords_config")
public class AimlKeywordsConfig implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -2903119031432078836L;
	/**
	 * ID
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "AIMCONFIG")
	@Column(name = "id")
	private Integer id;
	/**
	 * 应用系统编号
	 */
	@Column(name = "app_code")
	private String appCode;
	/**
	 * 是否启用
	 */
	@Column(name = "enabled")
	private Integer enabled;
	/**
	 * 关键字配置
	 */
	@Column(name = "keywords_config")
	private String keywordsConfig;
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

	/**
	 * @return 应用系统编号
	 */
	public String getAppCode() {
		return this.appCode;
	}

	/**
	 * @param appCode
	 *            应用系统编号
	 */
	@Column(name = "app_code")
	public void setAppCode(String appCode) {
		this.appCode = appCode;
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
	 * @return 关键字配置
	 */
	public String getKeywordsConfig() {
		return this.keywordsConfig;
	}

	/**
	 * @param keywordsConfig
	 *            关键字配置
	 */
	@Column(name = "keywords_config")
	public void setKeywordsConfig(String keywordsConfig) {
		this.keywordsConfig = keywordsConfig;
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

}