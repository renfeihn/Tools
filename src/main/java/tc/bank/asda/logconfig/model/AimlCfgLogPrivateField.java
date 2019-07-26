package tc.bank.asda.logconfig.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 个性结构化表
 * 
 * @author parry
 * 
 */
@Entity
@Table(name = "aiml_cfg_log_private_fields")
public class AimlCfgLogPrivateField implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3303599323738665202L;

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
	 * 拆分描述
	 */
	@Column(name = "structdes")
	private String structDes;
	/**
	 * 行匹配表达式
	 */
	@Column(name = "lineregex")
	private String lineRegex;
	/**
	 * 数据匹配表达式
	 */
	@Column(name = "dataregex")
	private String dataRegex;
	/**
	 * 0-正则表达式 1-可视结构化 2-Python结构化 3-Java结构化
	 */
	@Column(name = "splitflag")
	private String splitFlag;
	/**
	 * 拆分脚本
	 */
	@Column(name = "splitscript")
	private String splitScript;
	
	private String filedsString;
	
	private List<AimlCfgLogSplitField> splitFields;

	public long getLogId() {
		return logId;
	}

	public void setLogId(long logId) {
		this.logId = logId;
	}

	public long getStructId() {
		return structId;
	}

	public void setStructId(long structId) {
		this.structId = structId;
	}

	public String getStructDes() {
		return structDes;
	}

	public void setStructDes(String structDes) {
		this.structDes = structDes;
	}

	public String getLineRegex() {
		return lineRegex;
	}

	public void setLineRegex(String lineRegex) {
		this.lineRegex = lineRegex;
	}

	public String getDataRegex() {
		return dataRegex;
	}

	public void setDataRegex(String dataRegex) {
		this.dataRegex = dataRegex;
	}

	public String getSplitFlag() {
		return splitFlag;
	}

	public void setSplitFlag(String splitFlag) {
		this.splitFlag = splitFlag;
	}

	public String getSplitScript() {
		return splitScript;
	}

	public void setSplitScript(String splitScript) {
		this.splitScript = splitScript;
	}

	public String getFiledsString() {
		return filedsString;
	}

	public void setFiledsString(String filedsString) {
		this.filedsString = filedsString;
	}

	public List<AimlCfgLogSplitField> getSplitFields() {
		return splitFields;
	}

	public void setSplitFields(List<AimlCfgLogSplitField> splitFields) {
		this.splitFields = splitFields;
	}
}
