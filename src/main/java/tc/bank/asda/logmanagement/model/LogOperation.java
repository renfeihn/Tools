package tc.bank.asda.logmanagement.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name ="aiml_log_operation_his")
public class LogOperation implements Serializable{
	
	private static final long serialVersionUID = -4026887824860341263L;
	
	/**
	 * id
	 */
	@Column(name="id")
	private long id;
	
	/**
	 * 操作用户id
	 */
	@Column(name="user_id")
	private long userId;
	
	/**
	 * 操作用户名称
	 */
	@Column(name="username")
	private String userName;
	
	/**
	 * 操作时间
	 */
	@Column(name="operation_time")
	private Date operationTime;
	
	/**
	 * 操作类型 1.日志搜索菜单查看 2.日志原文分析查看 3.日志文件搜索菜单查看 4.日志搜索菜单下载 文本 5.日志搜索菜单下载doc6.sql查询日志下载 7.日志文件搜索菜单下载
	 */
	@Column(name="type")
	private Integer type;
	
	/**
	 * 日志所属应用id
	 */
	@Column(name="appids")
	private String appids;
	
	/**
	 * 日志所属应用
	 */
	@Column(name="appname")
	private String appname;
	
	/**
	 * 日志所属应用栏目1
	 */
	@Column(name="category1")
	private String category1;
	
	/**
	 * 日志所属应用栏目2
	 */
	@Column(name="category2")
	private String category2;
	
	/**
	 * 日志所属应用栏目3
	 */
	@Column(name="category3")
	private String category3;
	
	/**
	 * 操作的文件所在服务器的IP
	 */
	@Column(name="hostip")
	private String hostip;
	
	/**
	 * 操作的文件所在服务器的路径以及文件名
	 */
	@Column(name="file")
	private String file;
	
	/**
	 * 日志在ES的id
	 */
	@Column(name="pid")
	private String pid;
	
	/**
	 * 请求参数
	 */
	@Column(name="param")
	private String param;
	
	public LogOperation() {}


	public LogOperation(long id, long userId, String userName,
			Date operationTime, Integer type, String appids, String appname, String category1,
			String category2, String category3, String hostip, String file,
			String pid, String param) {
		super();
		this.id = id;
		this.userId = userId;
		this.userName = userName;
		this.operationTime = operationTime;
		this.type = type;
		this.appids = appids;
		this.appname = appname;
		this.category1 = category1;
		this.category2 = category2;
		this.category3 = category3;
		this.hostip = hostip;
		this.file = file;
		this.pid = pid;
		this.param = param;
	}


	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Date getOperationTime() {
		return operationTime;
	}
	public void setOperationTime(Date operationTime) {
		this.operationTime = operationTime;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public String getAppids() {
		return appids;
	}
	public void setAppids(String appids) {
		this.appids = appids;
	}
	public String getCategory1() {
		return category1;
	}
	public void setCategory1(String category1) {
		this.category1 = category1;
	}
	public String getCategory2() {
		return category2;
	}
	public void setCategory2(String category2) {
		this.category2 = category2;
	}
	public String getCategory3() {
		return category3;
	}
	public void setCategory3(String category3) {
		this.category3 = category3;
	}
	public String getHostip() {
		return hostip;
	}
	public void setHostip(String hostip) {
		this.hostip = hostip;
	}
	public String getFile() {
		return file;
	}
	public void setFile(String file) {
		this.file = file;
	}
	public String getPid() {
		return pid;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}
	public String getParam() {
		return param;
	}
	public void setParam(String param) {
		this.param = param;
	}
	public String getAppname() {
		return appname;
	}
	public void setAppname(String appname) {
		this.appname = appname;
	}


	@Override
	public String toString() {
		return "LogOperation [id=" + id + ", userId=" + userId + ", userName="
				+ userName + ", operationTime=" + operationTime + ", type="
				+ type + ", appids=" + appids + ", appname=" + appname + ", category1=" + category1
				+ ", category2=" + category2 + ", category3=" + category3
				+ ", hostip=" + hostip + ", file=" + file + ", pid=" + pid
				+ ", param=" + param + "]";
	}



	
	

}
