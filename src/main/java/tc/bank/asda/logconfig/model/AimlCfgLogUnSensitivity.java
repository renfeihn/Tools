package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 日志配置脱敏配置信息表
 * 
 * @author parry
 * 
 */
@Entity
@Table(name = "aiml_cfg_log_unsensitivity")
public class AimlCfgLogUnSensitivity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3464462730074472321L;
	/**
	 * 脱敏ID
	 */
	@Column(name = "id")
	private long id;
	/**
	 * 脱敏描述
	 */
	@Column(name = "description")
	private String description;
	/**
	 * 脱敏规则RegEx
	 */
	@Column(name = "regex")
	private String regex;
	/**
	 * 脱敏规则RegEx
	 */
	@Column(name = "replaced")
	private String replaced;
	
	/**
	 * 角色ID
	 */
	@Column(name = "rids")
	private String rids;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getRegex() {
		return regex;
	}

	public void setRegex(String regex) {
		this.regex = regex;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getReplaced() {
		return replaced;
	}

	public void setReplaced(String replaced) {
		this.replaced = replaced;
	}

	public String getRids() {
		return rids;
	}

	public void setRids(String rids) {
		this.rids = rids;
	}

}
