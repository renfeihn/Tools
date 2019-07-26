package tc.bank.asda.logstatis.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Table;

@Table(name = "aiml_mon_input_statistics_his")
public class AimlMonInputStatisticsHis implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1219395807297633273L;
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
	 * 记录时间
	 */
	@Column(name = "recordtime")
	private Date recordtime;
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
	 * 事件触发标识 0-否  1-是
	 */
	@Column(name = "eventflag")
	private String eventflag;
	
	/**
	 * 事件级别 0-警告 1-预警 2-告警
	 */
	@Column(name = "eventlevel")
	private String eventlevel;
	
	public String getEventflag() {
		return eventflag;
	}

	public void setEventflag(String eventflag) {
		this.eventflag = eventflag;
	}

	public String getEventlevel() {
		return eventlevel;
	}

	public void setEventlevel(String eventlevel) {
		this.eventlevel = eventlevel;
	}

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
	 * @return 记录时间
	 */
	public Date getRecordtime() {
		return this.recordtime;
	}

	/**
	 * @param recordtime
	 *            记录时间
	 */
	public void setRecordtime(Date recordtime) {
		this.recordtime = recordtime;
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
