package tc.bank.asda.logmanagement.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_logmanage_file")
public class LogManageFile {

	/**
	 * 主键ID
	 */
	@Column(name = "id")
	private String id;

	/**
	 * 对象ID
	 */
	@Column(name = "object_id")
	private long objectId;

	/**
	 * 执行时间
	 */
	@Column(name = "exec_time")
	private String execTime;

	/**
	 * 保留时常，单位:天
	 */
	@Column(name = "retention")
	private int retention;

	/**
	 * 归档策略
	 */
	@Column(name = "strategy")
	private long strategy;

	/**
	 * 日志源文件路径
	 */
	@Column(name = "file_path")
	private String filePath;

	/**
	 * 日志文件名后缀类型(文件后缀，匹配方式）
	 */
	@Column(name = "file_suffix")
	private String fileSuffix;

	/**
	 * 递归深度
	 */
	@Column(name = "file_depth")
	private int fileDepth;

	/**
	 * 备份文件前缀
	 */
	@Column(name = "back_file_prefix")
	private String backFilePrefix;

	/**
	 * 业务文件清理命令ID
	 */
	@Column(name = "commond_id")
	private long commondId;

	/**
	 * 业务文件清理命令执行ID
	 */
	@Column(name = "execute_id")
	private long executeId;
	/**
	 * 0-清理，1-不清理
	 */
	@Column(name = "is_clear")
	private long isClear;

	/**
	 * 备份目录
	 */
	@Column(name = "bak_dir")
	private String bakDir;

	/**
	 * 对象名称
	 */
	@Column(name = "object_name")
	private String objectName;

	/**
	 * 应用ID
	 */
	@Column(name = "app_id")
	private long appId;

	/**
	 * 应用名称
	 */
	@Column(name = "app_name")
	private String appName;


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public long getObjectId() {
		return objectId;
	}

	public void setObjectId(long objectId) {
		this.objectId = objectId;
	}

	public String getExecTime() {
		return execTime;
	}

	public void setExecTime(String execTime) {
		this.execTime = execTime;
	}

	public long getStrategy() {
		return strategy;
	}

	public void setStrategy(long strategy) {
		this.strategy = strategy;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getFileSuffix() {
		return fileSuffix;
	}

	public void setFileSuffix(String fileSuffix) {
		this.fileSuffix = fileSuffix;
	}

	public int getFileDepth() {
		return fileDepth;
	}

	public void setFileDepth(int fileDepth) {
		this.fileDepth = fileDepth;
	}

	public long getCommondId() {
		return commondId;
	}

	public void setCommondId(long commondId) {
		this.commondId = commondId;
	}

	public long getExecuteId() {
		return executeId;
	}

	public void setExecuteId(long executeId) {
		this.executeId = executeId;
	}

	public int getRetention() {
		return retention;
	}

	public void setRetention(int retention) {
		this.retention = retention;
	}

	public String getBackFilePrefix() {
		return backFilePrefix;
	}

	public void setBackFilePrefix(String backFilePrefix) {
		this.backFilePrefix = backFilePrefix;
	}

	public long getIsClear() {
		return isClear;
	}

	public void setIsClear(long isClear) {
		this.isClear = isClear;
	}

	public String getBakDir() {
		return bakDir;
	}

	public void setBakDir(String bakDir) {
		this.bakDir = bakDir;
	}

	public String getObjectName() {
		return objectName;
	}

	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}

	public long getAppId() {
		return appId;
	}

	public void setAppId(long appId) {
		this.appId = appId;
	}

	public String getAppName() {
		return appName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

}
