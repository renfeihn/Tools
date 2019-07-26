package tc.bank.asda.forward.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_data_forward")
public class DataForward {

	/**
	 * 主键ID
	 */
	@Column(name = "id")
	private long id;
	/**
	 * 数据描述
	 */
	@Column(name = "data_desc")
	private String dataDesc;
	/**
	 * 数据检索条件
	 */
	@Column(name = "search")
	private String search;
	/**
	 * 时间范围 0 所有时间 1条件选定时间 2条件选定开始时间 3 条件选定结束时间
	 */
	@Column(name = "time_type")
	private int timeType;
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
	 * 日志分类
	 */
	@Column(name = "cate")
	private String cate;
	/**
	 * 日志源ID
	 */
	@Column(name = "sources")
	private String sources;
	/**
	 * 是否包含结构化字段 0 是 1否
	 */
	@Column(name = "include_struct")
	private int includeStruct;
	/**
	 * 待转发数据量
	 */
	@Column(name = "forward_size")
	private double forwardSize;
	/**
	 * 转发方式1 kafka消息队列
	 */
	@Column(name = "forward_type")
	private int forwardType;
	/**
	 * 转发状态，1转发中  2 转发完成
	 */
	@Column(name = "forward_status")
	private int forwardStatus;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDataDesc() {
		return dataDesc;
	}

	public void setDataDesc(String dataDesc) {
		this.dataDesc = dataDesc;
	}

	public String getSearch() {
		return search;
	}

	public void setSearch(String search) {
		this.search = search;
	}

	public int getTimeType() {
		return timeType;
	}

	public void setTimeType(int timeType) {
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

	public int getIncludeStruct() {
		return includeStruct;
	}

	public void setIncludeStruct(int includeStruct) {
		this.includeStruct = includeStruct;
	}

	public double getForwardSize() {
		return forwardSize;
	}

	public void setForwardSize(double forwardSize) {
		this.forwardSize = forwardSize;
	}

	public int getForwardType() {
		return forwardType;
	}

	public void setForwardType(int forwardType) {
		this.forwardType = forwardType;
	}

	public String getSources() {
		return sources;
	}

	public void setSources(String sources) {
		this.sources = sources;
	}

	public String getCate() {
		return cate;
	}

	public void setCate(String cate) {
		this.cate = cate;
	}

	public int getForwardStatus() {
		return forwardStatus;
	}

	public void setForwardStatus(int forwardStatus) {
		this.forwardStatus = forwardStatus;
	}
}
