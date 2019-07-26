package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 拆分字段信息表
 * 
 * @author parry
 * 
 */
@Entity
@Table(name = "aiml_cfg_log_split_field")
public class AimlCfgLogSplitField implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1037132961330960841L;

	/**
	 * 日志配置ID
	 */
	@Column(name = "logid")
	private long logId;

	/**
	 * 拆分ID
	 */
	@Column(name = "structid")
	private long structId;

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
	 * 是否是日志关联字段 0:否 1:是
	 */
	@Column(name = "is_link")
	private int isLink;

	/**
	 * 拆分方式的参数
	 */
	@Column(name = "split_param")
	private String splitParam;
	
	/**
	 *  拆分方法ID
	 */
	@Column(name = "split_method")
	private long splitMethod;
	
	/**
	 *  字段校验, 字段校验 1 包含校验 2 比较校验
	 */
	@Column(name = "field_check")
	private String fieldCheck;
	
	/**
	 *  字段校验,比较值，存在的值或比较表达式（多条件分号分割）
	 */
	@Column(name = "check_value")
	private String checkValue;
	
	/**
	 *  字段预警,时间范围  1-小时  2-天  3-周
	 */
	@Column(name = "timeInterval")
	private int timeInterval;
	
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

	public String getFieldScript() {
		return fieldScript;
	}

	public void setFieldScript(String fieldScript) {
		this.fieldScript = fieldScript;
	}

	public long getStructId() {
		return structId;
	}

	public void setStructId(long structId) {
		this.structId = structId;
	}

	public int getIsLink() {
		return isLink;
	}

	public void setIsLink(int isLink) {
		this.isLink = isLink;
	}

	public String getSplitParam() {
		return splitParam;
	}

	public void setSplitParam(String splitParam) {
		this.splitParam = splitParam;
	}

	public long getSplitMethod() {
		return splitMethod;
	}

	public void setSplitMethod(long splitMethod) {
		this.splitMethod = splitMethod;
	}

	public String getFieldCheck() {
		return fieldCheck;
	}

	public void setFieldCheck(String fieldCheck) {
		this.fieldCheck = fieldCheck;
	}

	public String getCheckValue() {
		return checkValue;
	}

	public void setCheckValue(String checkValue) {
		this.checkValue = checkValue;
	}
	
	public int getTimeInterval() {
		return timeInterval;
	}

	public void setTimeInterval(int timeInterval) {
		this.timeInterval = timeInterval;
	}

}
