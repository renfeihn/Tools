package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_cfg_log_source_http")
public class AimlCfgLogSourceHttp extends AimlCfgLogSourceBasic implements
		Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 日志配置ID
	 */
	@Column(name = "sourceid")
	private long sourceId;
	/**
	 * ips  ip地址列表,逗号分隔
	 */
	@Column(name = "ips")
	private String ips;
	/**
	 * logcoding
	 */
	@Column(name = "logcoding")
	private String logcoding;
	/**
	 * levels 接收级别;格式-00000000到11111111 1代表选中,从左到右为severity从0到7
	 */
	@Column(name = "levels")
	private String levels;
	public long getSourceId() {
		return sourceId;
	}
	public void setSourceId(long sourceId) {
		this.sourceId = sourceId;
	}
	public String getIps() {
		return ips;
	}
	public void setIps(String ips) {
		this.ips = ips;
	}
	public String getLogcoding() {
		return logcoding;
	}
	public void setLogcoding(String logcoding) {
		this.logcoding = logcoding;
	}
	public String getLevels() {
		return levels;
	}
	public void setLevels(String levels) {
		this.levels = levels;
	}
	@Override
	public String toString() {
		return "AimlCfgLogSourceSyslog [sourceId=" + sourceId + ", ips=" + ips
				+ ", logcoding=" + logcoding + ", levels=" + levels + "]";
	}
	  
}
