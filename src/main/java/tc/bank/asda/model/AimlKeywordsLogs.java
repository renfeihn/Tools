package tc.bank.asda.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;

@Entity
@Table(name = "aiml_keywords_logs")
public class AimlKeywordsLogs implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 9164443257532699986L;
	/**
	 * 记录时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "record_time")
	private Date recordTime;
	/**
	 * 应用系统编号
	 */
	@Column(name = "app")
	private String app;
	/**
	 * 日志日期
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "logdate")
	private Date logdate;
	/**
	 * 日志流水
	 */
	@Column(name = "nserialno")
	private String nserialno;
	/**
	 * 主机
	 */
	@Column(name = "hostname")
	private String hostname;
	/**
	 * 日志文件
	 */
	@Column(name = "logfile")
	private String logfile;
	/**
	 * 日志关键字
	 */
	@Column(name = "keyword")
	private String keyword;
	/**
	 * 日志
	 */
	@Column(name = "body")
	private String body;

	/**
	 * @return 记录时间
	 */
	public Date getRecordTime() {
		return this.recordTime;
	}

	/**
	 * @param recordTime
	 *            记录时间
	 */
	@Column(name = "record_time")
	public void setRecordTime(Date recordTime) {
		this.recordTime = recordTime;
	}

	/**
	 * @return 应用系统编号
	 */
	public String getApp() {
		return this.app;
	}

	/**
	 * @param app
	 *            应用系统编号
	 */
	@Column(name = "app")
	public void setApp(String app) {
		this.app = app;
	}

	/**
	 * @return 日志日期
	 */
	public Date getLogdate() {
		return this.logdate;
	}

	/**
	 * @param logdate
	 *            日志日期
	 */
	@Column(name = "logdate")
	public void setLogdate(Date logdate) {
		this.logdate = logdate;
	}

	/**
	 * @return 日志流水
	 */
	public String getNserialno() {
		return this.nserialno;
	}

	/**
	 * @param nserialno
	 *            日志流水
	 */
	@Column(name = "nserialno")
	public void setNserialno(String nserialno) {
		this.nserialno = nserialno;
	}

	/**
	 * @return 主机
	 */
	public String getHostname() {
		return this.hostname;
	}

	/**
	 * @param hostname
	 *            主机
	 */
	@Column(name = "hostname")
	public void setHostname(String hostname) {
		this.hostname = hostname;
	}

	/**
	 * @return 日志文件
	 */
	public String getLogfile() {
		return this.logfile;
	}

	/**
	 * @param logfile
	 *            日志文件
	 */
	@Column(name = "logfile")
	public void setLogfile(String logfile) {
		this.logfile = logfile;
	}

	/**
	 * @return 日志关键字
	 */
	public String getKeyword() {
		return this.keyword;
	}

	/**
	 * @param keyword
	 *            日志关键字
	 */
	@Column(name = "keyword")
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	/**
	 * @return 日志
	 */
	public String getBody() {
		return this.body;
	}

	/**
	 * @param body
	 *            日志
	 */
	@Column(name = "body")
	public void setBody(String body) {
		this.body = body;
	}

}