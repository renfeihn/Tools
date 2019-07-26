package tc.bank.asda.logmanagement.bean;

import tc.bank.asda.logmanagement.model.LogManagement.Frequency;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


public class LogManagementBean implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4248228169314670312L;
	/** 一级分类 */
	private String category1;
	/** 二级分类 */
	private String category2;
	/** 三级分类 */
	private String category3;
	/** 服务器IP */
	private String ip;
	/** 应用 */
	private String application;
	/** 归档容量 */
	private Double capacity;
	/** 归档日期 */
	private Date dateTime;
	/**
	 * 统计频次
	 */
	private Frequency frequency = Frequency.day;
	
	private String beginTime;
	
	private String endTime;
	
	private Map<String,Object> params = new HashMap<String,Object>();

	public Map<String, Object> getParams() {
		return params;
	}

	public void setParams(Map<String, Object> params) {
		this.params = params;
	}

	public String getBeginTime() {
		return beginTime;
	}

	public void setBeginTime(String beginTime) {
		this.beginTime = beginTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public Frequency getFrequency() {
		return frequency;
	}

	public void setFrequency(Frequency frequency) {
		this.frequency = frequency;
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

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getApplication() {
		return application;
	}

	public void setApplication(String application) {
		this.application = application;
	}

	public Double getCapacity() {
		return capacity;
	}

	public void setCapacity(Double capacity) {
		this.capacity = capacity;
	}

	public Date getDateTime() {
		return dateTime;
	}

	public void setDateTime(Date dateTime) {
		this.dateTime = dateTime;
	}

}
