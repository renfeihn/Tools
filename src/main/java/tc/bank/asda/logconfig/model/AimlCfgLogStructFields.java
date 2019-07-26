package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 日志可视化 配置信息表（行表）
 * 
 * @author parry
 * 
 */
@Entity
@Table(name = "aiml_cfg_log_struct_fields")
public class AimlCfgLogStructFields implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7646697112028310854L;

	/**
	 * 日志配置ID
	 */
	@Column(name = "logid")
	private long logId;

	/**
	 * 日志行ID
	 */
	@Column(name = "lineid")
	private long lineId;

	/**
	 * 字段名称
	 */
	@Column(name = "fieldkey")
	private String fieldKey;

	/**
	 * 默认字段名称
	 */
	@Column(name = "defaultkey")
	private String defaultKey;

	/**
	 * 字段描述
	 */
	@Column(name = "fielddesc")
	private String fieldDesc;
	/**
	 * 字段类型
	 */
	@Column(name = "fieldtype")
	private String fieldType;
	
	/**
	 *  字段拆分代码
	 */
	@Column(name = "fieldscript")
	private String fieldScript;
	
	/**
	 * 统计标志 0: 不统计 1:统计，默认0
	 */
	@Column(name = "statisticsflag")
	private String statisticsFlag;

	public long getLogId() {
		return logId;
	}

	public void setLogId(long logId) {
		this.logId = logId;
	}

	public long getLineId() {
		return lineId;
	}

	public void setLineId(long lineId) {
		this.lineId = lineId;
	}

	public String getFieldKey() {
		return fieldKey;
	}

	public void setFieldKey(String fieldKey) {
		this.fieldKey = fieldKey;
	}

	public String getDefaultKey() {
		return defaultKey;
	}

	public void setDefaultKey(String defaultKey) {
		this.defaultKey = defaultKey;
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

	public String getStatisticsFlag() {
		return statisticsFlag;
	}

	public void setStatisticsFlag(String statisticsFlag) {
		this.statisticsFlag = statisticsFlag;
	}

	public String getFieldScript() {
		return fieldScript;
	}

	public void setFieldScript(String fieldScript) {
		this.fieldScript = fieldScript;
	}
	
}
