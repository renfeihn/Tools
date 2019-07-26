package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 日志可视化配置信息表（行表）
 * 
 * @author parry
 * 
 */
@Entity
@Table(name = "aiml_cfg_log_struct_line")
public class AimlCfgLogStructLine implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1124237208709906833L;

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
	 * 行描述
	 */
	@Column(name = "linedesc")
	private String lineDesc;

	/**
	 * 行匹配Regx
	 */
	@Column(name = "lineregx")
	private String lineRegx;

	/**
	 * 数据起始Regx
	 */
	@Column(name = "datastartregx")
	private String dataStartRegx;
	/**
	 * 数据结束Regx
	 */
	@Column(name = "dataendregx")
	private String dataEndRegx;

	/**
	 * 数据拆分方 式 1-可视化拆分 2-Python脚本拆分 3-Java脚本拆分
	 */
	@Column(name = "splitflag")
	private String splitFlag;
	/**
	 * 数据拆分
	 */
	@Column(name = "splitscript")
	private String splitScript;
	
	/**
	 * 字段JSON
	 */
	private String fields;
	
	/**
	 * 结构化字段数
	 */
	private int fieldCount;

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

	public String getLineDesc() {
		return lineDesc;
	}

	public void setLineDesc(String lineDesc) {
		this.lineDesc = lineDesc;
	}

	public String getLineRegx() {
		return lineRegx;
	}

	public void setLineRegx(String lineRegx) {
		this.lineRegx = lineRegx;
	}

	public String getDataStartRegx() {
		return dataStartRegx;
	}

	public void setDataStartRegx(String dataStartRegx) {
		this.dataStartRegx = dataStartRegx;
	}

	public String getDataEndRegx() {
		return dataEndRegx;
	}

	public void setDataEndRegx(String dataEndRegx) {
		this.dataEndRegx = dataEndRegx;
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

	public String getFields() {
		return fields;
	}

	public void setFields(String fields) {
		this.fields = fields;
	}

	public int getFieldCount() {
		return fieldCount;
	}

	public void setFieldCount(int fieldCount) {
		this.fieldCount = fieldCount;
	}
	
}
