package tc.bank.asda.logmanagement.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_logmanage_db")
public class LogManageDB {

	/**
	 * 主键ID
	 */
	@Column(name = "id")
	private String id;

	/**
	 * 应用ID
	 */
	@Column(name = "app_id")
	private long appId;

	/**
	 * 对象ID
	 */
	@Column(name = "object_id")
	private long objectId;

	/**
	 * 保留时常，单位:天
	 */
	@Column(name = "retention")
	private int retention;

	/**
	 * 执行时间
	 */
	@Column(name = "exec_time")
	private String execTime;

	/**
	 * 归档策略
	 */
	@Column(name = "strategy")
	private long strategy;

	@Column(name = "back_file_prefix")
	private String backFilePrefix;

	@Column(name = "is_clear")
	private int isClear;

	@Column(name = "bak_dir")
	private String bakDir;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public long getAppId() {
		return appId;
	}

	public void setAppId(long appId) {
		this.appId = appId;
	}

	public long getObjectId() {
		return objectId;
	}

	public void setObjectId(long objectId) {
		this.objectId = objectId;
	}

	public int getRetention() {
		return retention;
	}

	public void setRetention(int retention) {
		this.retention = retention;
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

	public String getBackFilePrefix() {
		return backFilePrefix;
	}

	public void setBackFilePrefix(String backFilePrefix) {
		this.backFilePrefix = backFilePrefix;
	}

	public int getIsClear() {
		return isClear;
	}

	public void setIsClear(int isClear) {
		this.isClear = isClear;
	}

	public String getBakDir() {
		return bakDir;
	}

	public void setBakDir(String bakDir) {
		this.bakDir = bakDir;
	}

}
