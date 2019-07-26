package tc.bank.asda.logconfig.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;


/**
 * 私有字段表
 * 
 * @author parry
 * 
 */
@Entity
@Table(name = "aiml_cfg_log_split_field_v1")
public class AimlCfgLogSplitFieldV1 implements Serializable {

	private static final long serialVersionUID = -2683729326011683846L;

	/**
	 * 日志源id
	 */

	@Column(name = "sourceId")
	private Long sourceId;

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
	 * 字段拆分代码
	 */
	@Column(name = "fieldscript")
	private String fieldScript;

	/**
	 * 0-正则表达式 1-可视结构化 2-Python结构化 3-Java结构化
	 */
	@Column(name = "splitflag")
	private String splitFlag;

	/**
	 *  拆分方法ID
	 */
	@Column(name = "split_method")
	private long splitMethod;
	
	public long getSplitMethod() {
		return splitMethod;
	}

	public void setSplitMethod(long splitMethod) {
		this.splitMethod = splitMethod;
	}

	public Long getSourceId() {
		return sourceId;
	}

	public void setSourceId(Long sourceId) {
		this.sourceId = sourceId;
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

	public String getSplitFlag() {
		return splitFlag;
	}

	public void setSplitFlag(String splitFlag) {
		this.splitFlag = splitFlag;
	}

}
