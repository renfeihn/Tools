package tc.bank.asda.dataclean.model;

import javax.persistence.Column;

public class LogAchiveHost {

	@Column(name="id")
	private long id;
	
	@Column(name="remote_ip")
	private String remoteIp;
	
	@Column(name="remote_port")
	private String remotePort;
	
	@Column(name="username")
	private String username;
	
	@Column(name="password")
	private String password;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getRemoteIp() {
		return remoteIp;
	}

	public void setRemoteIp(String remoteIp) {
		this.remoteIp = remoteIp;
	}

	public String getRemotePort() {
		return remotePort;
	}

	public void setRemotePort(String remotePort) {
		this.remotePort = remotePort;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
}
