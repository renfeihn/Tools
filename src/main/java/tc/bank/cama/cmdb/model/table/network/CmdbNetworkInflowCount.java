package tc.bank.cama.cmdb.model.table.network;

import javax.persistence.Column;

/**
 * 网络IP/端口接入数量
 */
public class CmdbNetworkInflowCount {

	private String ip;
	private int port;

	/**
	 * 相同IP/端口的接入数量
	 */
	private Long count;
	
	/*
	 * setters
	 */

	@Column(name = "ip")
	public void setIp(String ip) {
		this.ip = ip;
	}
	
	@Column(name = "port")
	public void setPort(int port) {
		this.port = port;
	}
	
	@Column(name = "ip_count")
	public void setCount(Long count) {
		this.count = count;
	}
	
	/*
	 * getters
	 */
	
	@Column(name = "ip")
	public String getIp() {
		return ip;
	}
	
	@Column(name = "port")
	public int getPort() {
		return port;
	}
	
	@Column(name = "ip_count")
	public Long getCount() {
		return count;
	}
}
