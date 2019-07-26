package tc.cama.aweb.bean;

public class HeapMemBean {
	/**
	 * 已分配大小
	 */
	public String heapTotal;
	/**
	 * 已使用大小
	 */
	public String heapUsed;
	/**
	 * 使用率
	 */
	public String useRate;
	/**
	 * 堆内存名
	 */
	public String heapName;
	public String getHeapTotal() {
		return heapTotal;
	}
	public void setHeapTotal(String heapTotal) {
		this.heapTotal = heapTotal;
	}
	public String getHeapUsed() {
		return heapUsed;
	}
	public void setHeapUsed(String heapUsed) {
		this.heapUsed = heapUsed;
	}
	public String getUseRate() {
		return useRate;
	}
	public void setUseRate(String useRate) {
		this.useRate = useRate;
	}
	public String getHeapName() {
		return heapName;
	}
	public void setHeapName(String heapName) {
		this.heapName = heapName;
	}
	
}
