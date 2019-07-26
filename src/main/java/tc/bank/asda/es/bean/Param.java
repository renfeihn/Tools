package tc.bank.asda.es.bean;

import java.util.List;
import java.util.Map;

public class Param {

	/**
	 * 唯一ID
	 */
	private String id;
	
	/**
	 * 查询类型
	 */
	private String queryType;
	
	/**
	 * 必须的字段
	 */
	private Map<String,List<Object>> mustValues;
	/**
	 * 短语查询
	 */
	private Map<String,String> phraseValues;
	
	/**
	 * 从多少行开始查询
	 */
	private int from;
	
	/**
	 * 分页查询每页大小,默认为10条
	 */
	private int size = 10;
	
	/**
	 * 操作用户
	 */
	private Integer userId;

	/**
	 * 开始时间
	 */
	private String startTime;
	/**
	 * 结束时间
	 */
	private String endTime;
	/**
	 * 应用列表
	 */
	private List<String> appIds;
	
	private List<String> sort;
	
	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getQueryType() {
		return queryType;
	}

	public void setQueryType(String queryType) {
		this.queryType = queryType;
	}

	public int getFrom() {
		return from;
	}

	public void setFrom(int from) {
		this.from = from;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public Map<String, List<Object>> getMustValues() {
		return mustValues;
	}

	public void setMustValues(Map<String, List<Object>> mustValues) {
		this.mustValues = mustValues;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public Map<String, String> getPhraseValues() {
		return phraseValues;
	}

	public void setPhraseValues(Map<String, String> phraseValues) {
		this.phraseValues = phraseValues;
	}

	public List<String> getAppIds() {
		return appIds;
	}

	public void setAppIds(List<String> appIds) {
		this.appIds = appIds;
	}

	public List<String> getSort() {
		return sort;
	}

	public void setSort(List<String> sort) {
		this.sort = sort;
	}
	
}
