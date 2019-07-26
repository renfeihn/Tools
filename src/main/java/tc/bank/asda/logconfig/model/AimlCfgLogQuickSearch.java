package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 快速搜索
 * @author parry
 *
 */
@Entity
@Table(name = "aiml_cfg_log_quick_search")
public class AimlCfgLogQuickSearch implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -6225484241971823734L;

	/**
	 * 主键ID
	 */
	@Column(name = "id")
	private long id;
	
	/**
	 * 搜索名称
	 */
	@Column(name = "search_name")
	private String searchName; 
	/**
	 * 创建用户ID
	 */
	@Column(name = "create_user")
	private Integer createUser; 
	
	/**
	 * 查询条件
	 */
	@Column(name = "search_condition")
	private String searchCondition; 

	/**
	 * 时间保存类型 0:自动匹配 1:固定值
	 */
	@Column(name = "time_type")
	private String timeType; 
	/**
	 * 时间间隔 单位s
	 */
	@Column(name = "interval_time")
	private long intervalTime; 
	/**
	 * 开始时间
	 */
	@Column(name = "start_time")
	private long startTime; 
	/**
	 * 结束时间
	 */
	@Column(name = "end_time")
	private long endTime; 
	
	/**
	 * 1 可访问日志 2 应用系统 3 资产系统
	 */
	@Column(name = "log_type")
	private String logType; 
	
	/**
	 * 使用次数
	 */
	@Column(name = "used_times")
	private int usedTimes; 
	
	/**
	 * 三级分类 JSON 
	 */
	@Column(name = "category")
	private String category; 
	
	/**
	 * 最后使用时间
	 */
	@Column(name = "last_used_time")
	private long lastUsedTime;
	/**
	 * 创建时间
	 */
	@Column(name = "create_time")
	private long createTime;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getSearchName() {
		return searchName;
	}

	public void setSearchName(String searchName) {
		this.searchName = searchName;
	}

	public String getTimeType() {
		return timeType;
	}

	public void setTimeType(String timeType) {
		this.timeType = timeType;
	}

	public long getStartTime() {
		return startTime;
	}

	public void setStartTime(long startTime) {
		this.startTime = startTime;
	}

	public long getEndTime() {
		return endTime;
	}

	public void setEndTime(long endTime) {
		this.endTime = endTime;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Integer getCreateUser() {
		return createUser;
	}

	public void setCreateUser(Integer createUser) {
		this.createUser = createUser;
	}

	public String getLogType() {
		return logType;
	}

	public void setLogType(String logType) {
		this.logType = logType;
	}

	public String getSearchCondition() {
		return searchCondition;
	}

	public void setSearchCondition(String searchCondition) {
		this.searchCondition = searchCondition;
	}

	public long getIntervalTime() {
		return intervalTime;
	}

	public void setIntervalTime(long intervalTime) {
		this.intervalTime = intervalTime;
	}

	public int getUsedTimes() {
		return usedTimes;
	}

	public void setUsedTimes(int usedTimes) {
		this.usedTimes = usedTimes;
	}

	public long getLastUsedTime() {
		return lastUsedTime;
	}

	public void setLastUsedTime(long lastUsedTime) {
		this.lastUsedTime = lastUsedTime;
	}

	public long getCreateTime() {
		return createTime;
	}

	public void setCreateTime(long createTime) {
		this.createTime = createTime;
	} 
}
