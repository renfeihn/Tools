package tc.bank.asda.logconfig.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Table;

@Table(name = "aiml_cfg_log_source_event")
public class AimlCfgLogSourceEvent implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 日志源IDWWW
	 */
	@Column(name = "sourceid")
	private long sourceid;
	/**
	 * 日志事件关键字
	 */
	@Column(name = "eventkeyword")
	private String eventkeyword;
	/**
	 * 事件级别 0-警告 1-预警 2-告警
	 */
	@Column(name = "eventlevel")
	private String eventlevel;

	/**
	 * @return 日志源ID
	 */
	public long getSourceid() {
		return this.sourceid;
	}

	/**
	 * @param sourceid
	 *            日志源ID
	 */
	public void setSourceid(long sourceid) {
		this.sourceid = sourceid;
	}

	/**
	 * @return 日志事件关键字
	 */
	public String getEventkeyword() {
		return this.eventkeyword;
	}

	/**
	 * @param eventkeyword
	 *            日志事件关键字
	 */
	public void setEventkeyword(String eventkeyword) {
		this.eventkeyword = eventkeyword;
	}

	/**
	 * @return 事件级别 0-警告 1-预警 2-告警
	 */
	public String getEventlevel() {
		return this.eventlevel;
	}

	/**
	 * @param eventlevel
	 *            事件级别 0-警告 1-预警 2-告警
	 */
	public void setEventlevel(String eventlevel) {
		this.eventlevel = eventlevel;
	}

}
