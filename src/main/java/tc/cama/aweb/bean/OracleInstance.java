package tc.cama.aweb.bean;

public class OracleInstance {
	
	/**
	 * 对象ID
	 */
	private Long objectId;
	
	/**
	 * 数据库实例名称
	 * 
	 */
	private String instanceName;
	
	/**
	 * 健康度
	 */
	private int healthValue;
	
	/**
	 * 死锁数
	 */
	private String lockNum;
	
	/**
	 * 失效对象
	 */
	private String loseEfficacyObject;
	
	/**
	 * 超长语句
	 */
	private String sqlTimeLong;
	
	/**
	 * 超长事物
	 */
	private String longTimeRunningTask;
	
	/**
	 * SGA命中率
	 */
	private String dictShoot;
	
	/**
	 * 连接数
	 */
	private String sessionCount;
	
	
	/**
	 * CPU使用率
	 */
	private String usageRateCPU;
	
	/**
	 * 内存使用率
	 */
	private String usageRateMemory;
	
	/**
	 * 所属IP
	 */
	private String ip;
	
	/**
	 * 所属应用
	 */
	private String appName;
	
	public Long getObjectId() {
		return objectId;
	}

	public void setObjectId(Long objectId) {
		this.objectId = objectId;
	}

	public String getInstanceName() {
		return instanceName;
	}

	public void setInstanceName(String instanceName) {
		this.instanceName = instanceName;
	}

	public int getHealthValue() {
		return healthValue;
	}

	public void setHealthValue(int healthValue) {
		this.healthValue = healthValue;
	}

	public String getLockNum() {
		return lockNum;
	}

	public void setLockNum(String lockNum) {
		this.lockNum = lockNum;
	}

	public String getLoseEfficacyObject() {
		return loseEfficacyObject;
	}

	public void setLoseEfficacyObject(String loseEfficacyObject) {
		this.loseEfficacyObject = loseEfficacyObject;
	}

	public String getSqlTimeLong() {
		return sqlTimeLong;
	}

	public void setSqlTimeLong(String sqlTimeLong) {
		this.sqlTimeLong = sqlTimeLong;
	}

	public String getLongTimeRunningTask() {
		return longTimeRunningTask;
	}

	public void setLongTimeRunningTask(String longTimeRunningTask) {
		this.longTimeRunningTask = longTimeRunningTask;
	}

	public String getDictShoot() {
		return dictShoot;
	}

	public void setDictShoot(String dictShoot) {
		this.dictShoot = dictShoot;
	}

	public String getSessionCount() {
		return sessionCount;
	}

	public void setSessionCount(String sessionCount) {
		this.sessionCount = sessionCount;
	}

	public String getUsageRateCPU() {
		return usageRateCPU;
	}

	public void setUsageRateCPU(String usageRateCPU) {
		this.usageRateCPU = usageRateCPU;
	}

	public String getUsageRateMemory() {
		return usageRateMemory;
	}

	public void setUsageRateMemory(String usageRateMemory) {
		this.usageRateMemory = usageRateMemory;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getAppName() {
		return appName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

}
