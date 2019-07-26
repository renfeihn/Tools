package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 日志可视化配置信息表（总表）
 * @author parry
 * 
 */
@Entity
@Table(name = "aiml_cfg_log_struct")
public class AimlCfgLogStruct implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 6405189959928108139L;

	/**
	 * 日志配置ID
	 */
	@Column(name = "logid")
	private long logId;

	/**
	 * 日志样例/模板',
	 */
	@Column(name = "logexample")
	private String logExample;
	/**
	 * 0-自动获取 1-拆分获取',
	 */
	@Column(name = "datetimeflag")
	private String dateTimeFlag;
	/**
	 * 日期时间表达式',
	 */
	@Column(name = "datetimeexpr")
	private String dateTimeExpr;
	/**
	 * 日期时间格式',
	 */
	@Column(name = "datetimeformat")
	private String dateTimeFormat;

	public long getLogId() {
		return logId;
	}

	public void setLogId(long logId) {
		this.logId = logId;
	}

	public String getLogExample() {
		return logExample;
	}

	public void setLogExample(String logExample) {
		this.logExample = logExample;
	}

	public String getDateTimeFlag() {
		return dateTimeFlag;
	}

	public void setDateTimeFlag(String dateTimeFlag) {
		this.dateTimeFlag = dateTimeFlag;
	}

	public String getDateTimeExpr() {
		return dateTimeExpr;
	}

	public void setDateTimeExpr(String dateTimeExpr) {
		this.dateTimeExpr = dateTimeExpr;
	}

	public String getDateTimeFormat() {
		return dateTimeFormat;
	}

	public void setDateTimeFormat(String dateTimeFormat) {
		this.dateTimeFormat = dateTimeFormat;
	}
}
