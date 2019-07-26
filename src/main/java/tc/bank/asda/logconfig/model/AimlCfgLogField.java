package tc.bank.asda.logconfig.model;

import javax.persistence.Column;
import javax.persistence.Table;
/**
 * 日志拆分字段字典
 * @author parry
 *
 */
@Table(name = "aiml_cfg_log_field_dictionary")
public class AimlCfgLogField {

	/**
	 * 主键ID
	 */
	@Column(name = "id")
	private long id;
	
	/**
	 * 字段名
	 */
	@Column(name = "field_name")
	private String fieldName;
	
	/**
	 * 字段描述
	 */
	@Column(name = "field_desc")
	private String fieldDesc;
	
	/**
	 * 字段类型
	 */
	@Column(name = "field_type")
	private String fieldType;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getFieldDesc() {
		return fieldDesc;
	}

	public void setFieldDesc(String fieldDesc) {
		this.fieldDesc = fieldDesc;
	}

	public String getFieldType() {
		return fieldType;
	}

	public void setFieldType(String fieldType) {
		this.fieldType = fieldType;
	}
	
}
