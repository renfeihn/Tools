package tc.bank.asda.warning.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 日志预警
 * 
 * @author parry
 * 
 */
@Entity
@Table(name = "aiml_cfg_log_warning")
public class AimlCfgLogWarning implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1895033136471711327L;
	/**
	 * 主键ID
	 */
	@Column(name = "id")
	private long id;
	/**
	 * 用户ID
	 */
	@Column(name = "user_id")
	private int userId;
	/**
	 * 预警主题
	 */
	@Column(name = "name")
	private String name;
	/**
	 * 搜索语句
	 */
	@Column(name = "search")
	private String search;
	/**
	 * 查询必须条件，JSON格式
	 */
	@Column(name = "must_value")
	private String mustValue;

	/**
	 * 是否开启：1开始/2关闭
	 */
	@Column(name = "is_open")
	private int isOpen;

	/**
	 * 类型：1 计划/2 实时
	 */
	@Column(name = "plan_type")
	private int planType;
	/**
	 * 定时器执行类型 1:hour/2:day/3:week/4:month
	 */
	@Column(name = "schedule_type")
	private int scheduleType;
	/**
	 * 时间间隔 00,00,00格式
	 */
	@Column(name = "interval_time")
	private String intervalTime;
	/**
	 * 比较符号 >/</>=/<=
	 */
	@Column(name = "compare")
	private String compare;
	/**
	 * 触发条件 1结果数：2主机数；3应用数；4日志源数；5自定义
	 */
	@Column(name = "conditions")
	private int conditions;
	/**
	 * 自定义表达式
	 */
	@Column(name = "customize")
	private String customize;
	/**
	 * 结果数
	 */
	@Column(name = "result")
	private int result;
	/**
	 * 报警类型 1:邮件 2:短信
	 */
	@Column(name = "warn_type")
	private int warnType;

	/**
	 * 事件等级
	 */
	@Column(name = "level")
	private int level;
	/**
	 * 报警事件描述模板
	 */
	@Column(name = "event_model")
	private String eventModel;
	
	/**
	 * 时间间隔 1-当天  2-本周   3-本月   4-今年  5-1小时  6-12小时  7-1天   8-1周   9-半月   10-1月   11-3月   12-全部时间 13-1分钟
	 */
	@Column(name = "timeInterval")
	private int timeInterval;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSearch() {
		return search;
	}

	public void setSearch(String search) {
		this.search = search;
	}

	public String getMustValue() {
		return mustValue;
	}

	public void setMustValue(String mustValue) {
		this.mustValue = mustValue;
	}

	public int getIsOpen() {
		return isOpen;
	}

	public void setIsOpen(int isOpen) {
		this.isOpen = isOpen;
	}

	public int getPlanType() {
		return planType;
	}

	public void setPlanType(int planType) {
		this.planType = planType;
	}

	public int getScheduleType() {
		return scheduleType;
	}

	public void setScheduleType(int scheduleType) {
		this.scheduleType = scheduleType;
	}

	public String getIntervalTime() {
		return intervalTime;
	}

	public void setIntervalTime(String intervalTime) {
		this.intervalTime = intervalTime;
	}

	public String getCompare() {
		return compare;
	}

	public void setCompare(String compare) {
		this.compare = compare;
	}

	public int getConditions() {
		return conditions;
	}

	public void setConditions(int conditions) {
		this.conditions = conditions;
	}

	public int getWarnType() {
		return warnType;
	}

	public void setWarnType(int warnType) {
		this.warnType = warnType;
	}

	public int getResult() {
		return result;
	}

	public void setResult(int result) {
		this.result = result;
	}

	public String getCustomize() {
		return customize;
	}

	public void setCustomize(String customize) {
		this.customize = customize;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public String getEventModel() {
		return eventModel;
	}

	public void setEventModel(String eventModel) {
		this.eventModel = eventModel;
	}
	
	public int getTimeInterval() {
		return timeInterval;
	}

	public void setTimeInterval(int timeInterval) {
		this.timeInterval = timeInterval;
	}
}
