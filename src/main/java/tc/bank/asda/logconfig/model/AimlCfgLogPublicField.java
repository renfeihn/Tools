package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
/**
 * 公共结构化表
 * 
 * @author parry
 * 
 */
@Entity
@Table(name = "aiml_cfg_log_public_field")
public class AimlCfgLogPublicField implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7390117036578285929L;
	/**
	 * 日志配置ID
	 */
	@Column(name = "logid")
	private long logId;
	/**
	 * 字段名称
	 */
	@Column(name = "fieldkey")
	private String fieldKey;
	/**
	 * 字段描述
	 */
	@Column(name = "fieldname")
	private String fieldName;
	/**
	 * 数据来源,1-目录 2-行内容
	 */
	@Column(name = "datasource")
	private String dataSource;
	/**
	 * 匹配regex
	 */
	@Column(name = "fieldregex")
	private String fieldRegex;
	/**
	 * 默认匹配regex
	 */
	@Column(name = "fieldDefault")
	private String fieldDefault;
	
	/**
	 * 格式
	 */
	@Column(name = "format")
	private String format;
	
	/**
	 * 成功失败标志
	 */
	@Column(name = "remark1")
	private String remark1;
	
	

	public String getRemark1() {
		return remark1;
	}

	public void setRemark1(String remark1) {
		this.remark1 = remark1;
	}

	public long getLogId() {
		return logId;
	}

	public void setLogId(long logId) {
		this.logId = logId;
	}

	public String getFieldKey() {
		return fieldKey;
	}

	public void setFieldKey(String fieldKey) {
		this.fieldKey = fieldKey;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getDataSource() {
		return dataSource;
	}

	public void setDataSource(String dataSource) {
		this.dataSource = dataSource;
	}

	public String getFieldRegex() {
		return fieldRegex;
	}

	public void setFieldRegex(String fieldRegex) {
		this.fieldRegex = fieldRegex;
	}

	public String getFieldDefault() {
		return fieldDefault;
	}

	public void setFieldDefault(String fieldDefault) {
		this.fieldDefault = fieldDefault;
	}

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}
}
