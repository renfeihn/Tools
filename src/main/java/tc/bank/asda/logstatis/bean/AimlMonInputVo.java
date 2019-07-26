package tc.bank.asda.logstatis.bean;

import java.util.Date;
import java.util.List;
import java.util.Map;

public class AimlMonInputVo {

	/**
	 * 统计类型 1-主机 2-应用 3-数据源
	 */
	private String statisticstype;
	/**
	 * 对应关键字
	 */
	private String keyid;
	/**
	 * 对应关键字名称
	 */
	private String keyname;
	/**
	 * 日志总量 单位kb
	 */
	private long datasize;
	
	/**
	 * 事件触发标识 0-否  1-是
	 */
	private String eventflag;
	
	/**
	 * 时间和流量采集速率的对应值
	 */
	private List<Map<Date,String>> timeIPS;
	
	public String getStatisticstype() {
		return statisticstype;
	}
	public void setStatisticstype(String statisticstype) {
		this.statisticstype = statisticstype;
	}
	public String getKeyid() {
		return keyid;
	}
	public void setKeyid(String keyid) {
		this.keyid = keyid;
	}
	public String getKeyname() {
		return keyname;
	}
	public void setKeyname(String keyname) {
		this.keyname = keyname;
	}
	public long getDatasize() {
		return datasize;
	}
	public void setDatasize(long datasize) {
		this.datasize = datasize;
	}
	public String getEventflag() {
		return eventflag;
	}
	public void setEventflag(String eventflag) {
		this.eventflag = eventflag;
	}
	public List<Map<Date, String>> getTimeIPS() {
		return timeIPS;
	}
	public void setTimeIPS(List<Map<Date, String>> timeIPS) {
		this.timeIPS = timeIPS;
	}
	
}
