package tc.bank.asda.logtrace.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_cfg_trankeys")
public class LogTranKeys implements Serializable{
	private static final long serialVersionUID = -3006615607564837860L;
	
	@Column(name = "app_id")
	private String appId;
	@Column(name = "id")
	private int id;
	@Column(name = "host_ip")
	private String hostIp;
	@Column(name = "log_file")
	private String logFile;
	@Column(name = "tran_keys")
	private String tranKeys;
	@Column(name = "tran_desc")
	private String tranDesc;
	@Column(name = "source")
	private int source;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getAppId() {
		return appId;
	}
	public void setAppId(String appId) {
		this.appId = appId;
	}
	public String getHostIp() {
		return hostIp;
	}
	public void setHostIp(String hostIp) {
		this.hostIp = hostIp;
	}
	public String getLogFile() {
		return logFile;
	}
	public void setLogFile(String logFile) {
		this.logFile = logFile;
	}
	public String getTranKeys() {
		return tranKeys;
	}
	public void setTranKeys(String tranKeys) {
		this.tranKeys = tranKeys;
	}
	public String getTranDesc() {
		return tranDesc;
	}
	public void setTranDesc(String tranDesc) {
		this.tranDesc = tranDesc;
	}
	public int getSource() {
		return source;
	}
	public void setSource(int source) {
		this.source = source;
	}
	
}
