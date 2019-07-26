package tc.cama.aweb.bean;

import java.util.Date;

public class AimlAbnormal {
	
	/**
	 * 日志路径
	 */
	private String path;
	
	/**
	 * 日志大小
	 */
	private Long size;
	
	/**
	 * 最后修改时间
	 */
	private Date lastDate;
	
	/**
	 * 服务器
	 */
	private String serverName;
	
	

	/**
	 * 服务器ip
	 */
	
	private String serverIp;
	
	/**
	 * 流水号
	 */
	private String serialno;
	
	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public Long getSize() {
		return size;
	}

	public void setSize(Long size) {
		this.size = size;
	}

	public Date getLastDate() {
		return lastDate;
	}

	public void setLastDate(Date lastDate) {
		this.lastDate = lastDate;
	}

	public String getServerName() {
		return serverName;
	}

	public void setServerName(String serverName) {
		this.serverName = serverName;
	}

	public String getSerialno() {
		return serialno;
	}

	public void setSerialno(String serialno) {
		this.serialno = serialno;
	}

	public String getServerIp() {
		return serverIp;
	}

	public void setServerIp(String serverIp) {
		this.serverIp = serverIp;
	}
    
	
}
