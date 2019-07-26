package tc.bank.asda.dashboard.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name ="aiml_cfg_log_dash_board")
public class DashBoard {
	
	/**
	 * 仪表盘主键
	 */
	@Column(name = "id")
	private long id;
	
	/**
	 * 仪表盘名称
	 */
	@Column(name = "name")
	private String name;
	
	/**
	 * 查询语句
	 */
	@Column(name = "search")
	private String search;
	
	/**
	 * 查询条件
	 */
	@Column(name = "must_value")
	private String mustValue;
	
	/**
	 * 统计类型JSON
	 */
	@Column(name = "statistics")
	private String statistics;
	
	/**
	 * 统计图片
	 */
	@Column(name = "image")
	private String image;
	
	/**
	 * 开始时间
	 */
	@Column(name = "start_time")
	private Date startTime;
	
	/**
	 * 结束时间
	 */
	@Column(name = "end_time")
	private Date endTime;
	/**
	 * 
	 * 时间保存类型 0:自动匹配 1:固定值
	 */
	@Column(name = "time_type")
	private String timeType;
	/**
	 * 
	 * 图标类型 1 折线图 2柱状图 3 饼图
	 */
	@Column(name = "echarts_type")
	private int echartsType;
	/**
	 * 
	 * 时间间隔 单位s
	 */
	@Column(name = "interval_time")
	private long intervalTime;
	/**
	 * SQL语句
	 */
	@Column(name ="sql_phrases")
	private String sqlPhrases;
	
	/**
	 * 统计数据来源 0-统计 1-SPL统计
	 */
	@Column(name = "statistics_type")
	private int statisticsType;
	
	/**
	 * 选择字段
	 */
	@Column(name = "field_name")
	private String fieldName;
	
	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public String getStatistics() {
		return statistics;
	}

	public void setStatistics(String statistics) {
		this.statistics = statistics;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getTimeType() {
		return timeType;
	}

	public void setTimeType(String timeType) {
		this.timeType = timeType;
	}

	public long getIntervalTime() {
		return intervalTime;
	}

	public void setIntervalTime(long intervalTime) {
		this.intervalTime = intervalTime;
	}

	public String getSqlPhrases() {
		return sqlPhrases;
	}

	public void setSqlPhrases(String sqlPhrases) {
		this.sqlPhrases = sqlPhrases;
	}

	public int getEchartsType() {
		return echartsType;
	}

	public void setEchartsType(int echartsType) {
		this.echartsType = echartsType;
	}

	public int getStatisticsType() {
		return statisticsType;
	}

	public void setStatisticsType(int statisticsType) {
		this.statisticsType = statisticsType;
	}
}
