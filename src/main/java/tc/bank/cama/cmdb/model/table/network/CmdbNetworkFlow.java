package tc.bank.cama.cmdb.model.table.network;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * cmdb_network_flow的POJO
 */

@Table(name = "cmdb_network_flow")
public class CmdbNetworkFlow {

	private String localIp;
	private String remoteIp;
	private int remotePort;
	
	/*
	 * setters
	 */

	@Column(name = "src_ip")
	public void setLocalIp(String localIp) {
		this.localIp = localIp;
	}
	
	@Column(name = "des_ip")
	public void setRemoteIp(String remoteIp) {
		this.remoteIp = remoteIp;
	}
	
	@Column(name = "des_port")
	public void setRemotePort(int remotePort) {
		this.remotePort = remotePort;
	}

	/*
	 * getters
	 */

	@Column(name = "src_ip")
	public String getLocalIp() {
		return localIp;
	}

	@Column(name = "des_ip")
	public String getRemoteIp() {
		return remoteIp;
	}

	@Column(name = "des_port")
	public int getRemotePort() {
		return remotePort;
	}
	
}
