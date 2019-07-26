package tc.bank.asda.warning.model;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * 字段预警
 * @author parry
 *
 */
@Table(name = "aiml_cfg_log_warning_field")
public class AimlCfgLogWarningField {

	@Column(name= "id")
	private long id;
	
	@Column(name= "name")
	private String name;
	
	@Column(name= "warn_value")
	private String warnValue;

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

	public String getWarnValue() {
		return warnValue;
	}

	public void setWarnValue(String warnValue) {
		this.warnValue = warnValue;
	}
}
