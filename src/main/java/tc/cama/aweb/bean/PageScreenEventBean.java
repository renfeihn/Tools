package tc.cama.aweb.bean;


public class PageScreenEventBean {
	
	/**cmdb对象 Id*/
	private Integer categoryId;
	
	/**cmdb对象名称*/
	private String categoryName;
	/**
	 * 健康度
	 */
	private int healthyValue;

	/**cmdb监控资源数 */
	private long cmdbMonitorCount;
	
	/**cmdb故障资源数 */
	private long cmdbMonitorBreakCount;
	
	/**eventType事件数 */
	private long eventCount;

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public int getHealthyValue() {
		return healthyValue;
	}

	public void setHealthyValue(int healthyValue) {
		this.healthyValue = healthyValue;
	}

	public long getCmdbMonitorCount() {
		return cmdbMonitorCount;
	}

	public void setCmdbMonitorCount(long cmdbMonitorCount) {
		this.cmdbMonitorCount = cmdbMonitorCount;
	}

	public long getCmdbMonitorBreakCount() {
		return cmdbMonitorBreakCount;
	}

	public void setCmdbMonitorBreakCount(long cmdbMonitorBreakCount) {
		this.cmdbMonitorBreakCount = cmdbMonitorBreakCount;
	}

	public long getEventCount() {
		return eventCount;
	}

	public void setEventCount(long eventCount) {
		this.eventCount = eventCount;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	
	
}

