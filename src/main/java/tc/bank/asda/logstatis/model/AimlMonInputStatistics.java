package tc.bank.asda.logstatis.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Table;

@Table(name = "aiml_mon_input_statistics")
public class AimlMonInputStatistics implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 7022608863594150065L;
	/**
	 * 统计类型 1-主机 2-应用 3-数据源
	 */
	@Column(name = "statisticstype")
	private String statisticstype;
	/**
	 * 对应关键字
	 */
	@Column(name = "keyid")
	private String keyid;
	/**
	 * 对应关键字名称
	 */
	@Column(name = "keyname")
	private String keyname;
	/**
	 * 统计日期
	 */
	@Column(name = "recordate")
	private String recordate;
	/**
	 * 日志总量 单位kb
	 */
	@Column(name = "datasize")
	private long datasize;
	/**
	 * 日志采集速率 单位kb/s
	 */
	@Column(name = "dataips")
	private String dataips;

	/**
	 * @return 统计类型 1-主机 2-应用 3-数据源
	 */
	public String getStatisticstype() {
		return this.statisticstype;
	}

	/**
	 * @param statisticstype
	 *            统计类型 1-主机 2-应用 3-数据源
	 */
	public void setStatisticstype(String statisticstype) {
		this.statisticstype = statisticstype;
	}

	/**
	 * @return 对应关键字
	 */
	public String getKeyid() {
		return this.keyid;
	}

	/**
	 * @param keyid
	 *            对应关键字
	 */
	public void setKeyid(String keyid) {
		this.keyid = keyid;
	}

	/**
	 * @return 对应关键字名称
	 */
	public String getKeyname() {
		return this.keyname;
	}

	/**
	 * @param keyname
	 *            对应关键字名称
	 */
	public void setKeyname(String keyname) {
		this.keyname = keyname;
	}

	/**
	 * @return 统计日期
	 */
	public String getRecordate() {
		return this.recordate;
	}

	/**
	 * @param recordate
	 *            统计日期
	 */
	public void setRecordate(String recordate) {
		this.recordate = recordate;
	}

	/**
	 * @return 日志总量 单位kb
	 */
	public long getDatasize() {
		return this.datasize;
	}

	/**
	 * @param datasize
	 *            日志总量 单位kb
	 */
	public void setDatasize(long datasize) {
		this.datasize = datasize;
	}

	/**
	 * @return 日志采集速率 单位kb/s
	 */
	public String getDataips() {
		return this.dataips;
	}

	/**
	 * @param dataips
	 *            日志采集速率 单位kb/s
	 */
	public void setDataips(String dataips) {
		this.dataips = dataips;
	}

}
