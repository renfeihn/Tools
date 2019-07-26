package tc.bank.asda.logmanagement.bean;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aim_log_manager_del")
public class LogManagerDelBean implements Serializable {
	private static final long serialVersionUID = -2387455332622517137L;
	@Column(name = "host")
	private String host;
	@Column(name = "port")
	private int port;
	@Column(name = "user")
	private String user;
	@Column(name = "password")
	private String password;
	@Column(name = "file_path")
	private String filePath;
	@Column(name = "day_num")
	private int dayNum;
	/**
	 * 创建时间
	 */
	@Column(name = "create_time")
	private String createTime;
	
	/**
	 * 创建时间
	 */
	@Column(name = "update_time")
	private String updateTime;
	
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public int getDayNum() {
		return dayNum;
	}
	public void setDayNum(int dayNum) {
		this.dayNum = dayNum;
	}
	public String getHost() {
		return host;
	}
	public void setHost(String host) {
		this.host = host;
	}
	public int getPort() {
		return port;
	}
	public void setPort(int port) {
		this.port = port;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
