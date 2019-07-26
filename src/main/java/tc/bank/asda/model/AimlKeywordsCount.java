package tc.bank.asda.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;

@Entity
@Table(name = "aiml_keywords_logs")
public class AimlKeywordsCount implements Serializable {

	private static final long serialVersionUID = -4785028052363349392L;

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
	 * 出现次数
	 */
	@Column(name = "counts")
	private int counts;

	/**
	 * 最后发生时间
	 */
	@Column(name = "lastDate")
	@JSONField(format = "yyyy-MM-dd HH:mm:ss.SSS")
	private Date lastDate;

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
	 * @return 出现次数
	 */
	public int getCounts() {
		return counts;
	}

	/**
	 * @param counts
	 *            出现次数
	 */
	@Column(name = "counts")
	public void setCounts(int counts) {
		this.counts = counts;
	}

	/**
	 * @return 最后发生时间
	 */
	public Date getLastDate() {
		return lastDate;
	}

	/**
	 * @param lastDate
	 *            最后发生时间
	 */
	@Column(name = "lastDate")
	public void setLastDate(Date lastDate) {
		this.lastDate = lastDate;
	}

}
