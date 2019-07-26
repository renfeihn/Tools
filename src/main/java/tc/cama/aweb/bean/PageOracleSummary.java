package tc.cama.aweb.bean;

import java.util.List;


/**
 * Oracle汇总信息Bean
 */

public class PageOracleSummary {
	
	/**
     * 实例状态统计
     */
	private int instanceCount;
	
	/**
	 * 非健康实例
	 */
	private int unHealthInstances;
	
	/**
	 * 健康实例
	 */
	private int healthInstances;
	
	/**
	 * 死锁数
	 */
	private int deadLockCount;
	 
	/**
	 * 失效对象 
	 */
	 private int failureObject;
	 
	 /**
	  * 超长语句 
	  */
	 private int longSentence;
	 
	 /**
	  * 超长事物
	  */
	 private int longWork; 
	
	/**
	 * 事件统计
	 */
	private AppEventView event;
	
	/**
	 * Oracle实例状态列表
	 */
	private List<OracleInstance> oracleInstanceList;

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

	public int getDeadLockCount() {
		return deadLockCount;
	}

	public void setDeadLockCount(int deadLockCount) {
		this.deadLockCount = deadLockCount;
	}

	public int getFailureObject() {
		return failureObject;
	}

	public void setFailureObject(int failureObject) {
		this.failureObject = failureObject;
	}

	public int getLongSentence() {
		return longSentence;
	}

	public void setLongSentence(int longSentence) {
		this.longSentence = longSentence;
	}

	public int getLongWork() {
		return longWork;
	}

	public void setLongWork(int longWork) {
		this.longWork = longWork;
	}

	public AppEventView getEvent() {
		return event;
	}

	public void setEvent(AppEventView event) {
		this.event = event;
	}

	public List<OracleInstance> getOracleInstanceList() {
		return oracleInstanceList;
	}

	public void setOracleInstanceList(List<OracleInstance> oracleInstanceList) {
		this.oracleInstanceList = oracleInstanceList;
	}
}
