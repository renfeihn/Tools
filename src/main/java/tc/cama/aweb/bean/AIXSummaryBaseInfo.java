package tc.cama.aweb.bean;

import java.util.List;


public class AIXSummaryBaseInfo {
	/**
     * 实例状态统计
     */
	private int instanceCount = 0;
	
	/**
	 * 非健康实例
	 */
	private int unHealthInstances = 0;
	
	/**
	 * 健康实例
	 */
	private int healthInstances = 0;
	
	/**
	 * 事件统计
	 */
	private AppEventView event;
	
	
	/**
	 * 关键KPI汇总统计
	 */
	//CPU占有率大于60%的个数
	private int cpuCount = 0;
	//内存使用率大于60%的个数
	private int memCount = 0;
	//磁盘
	private int diskCount = 0;
	//网络
	private int netCount = 0; 
	
	/**
	 * 操作系统实例集合
	 */
	private List<OSInstance> osInstance;

	public int getInstanceCount() {
		return instanceCount;
	}

	public void setInstanceCount(int instanceCount) {
		this.instanceCount = instanceCount;
	}

	public int getUnHealthInstances() {
		return unHealthInstances;
	}

	public void setUnHealthInstances(int unHealthInstances) {
		this.unHealthInstances = unHealthInstances;
	}

	public int getHealthInstances() {
		return healthInstances;
	}

	public void setHealthInstances(int healthInstances) {
		this.healthInstances = healthInstances;
	}

	
	

	

	public AppEventView getEvent() {
		return event;
	}

	public void setEvent(AppEventView event) {
		this.event = event;
	}

	

	public int getCpuCount() {
		return cpuCount;
	}

	public void setCpuCount(int cpuCount) {
		this.cpuCount = cpuCount;
	}

	public int getMemCount() {
		return memCount;
	}

	public void setMemCount(int memCount) {
		this.memCount = memCount;
	}

	public int getDiskCount() {
		return diskCount;
	}

	public void setDiskCount(int diskCount) {
		this.diskCount = diskCount;
	}

	public int getNetCount() {
		return netCount;
	}

	public void setNetCount(int netCount) {
		this.netCount = netCount;
	}

	public List<OSInstance> getOsInstance() {
		return osInstance;
	}

	public void setOsInstance(List<OSInstance> osInstance) {
		this.osInstance = osInstance;
	}

	

	
	
	
}
