package tc.cama.aweb.ab.model;

import javax.persistence.Column;

public class AbServerLoad {
	/**
	 * 挂载数
	 */

	private Integer oIdCount;
	/**
	 * agent名字
	 */
	private String serAgentName;
	/**
	 * 采集时间
	 */
	private String serAgentTime;

	@Column(name = "counter")
	public Integer getoIdCount() {
		return oIdCount;
	}

	@Column(name = "counter")
	public void setoIdCount(Integer oIdCount) {
		this.oIdCount = oIdCount;
	}

	@Column(name = "srvAgentname")
	public String getSerAgentName() {
		return serAgentName;
	}

	@Column(name = "srvAgentname")
	public void setSerAgentName(String serAgentName) {
		this.serAgentName = serAgentName;
	}

	@Column(name = "sevServertime")
	public String getSerAgentTime() {
		return serAgentTime;
	}

	@Column(name = "sevServertime")
	public void setSerAgentTime(String serAgentTime) {
		this.serAgentTime = serAgentTime;
	}

}