package tc.cama.aweb.bean;


import tc.bank.cama.core.bean.MetricVO;

public class OSInstance {
	
	
	// 对象ID
	private Long objectId;
	//操作系统实例名称
	private String instanceName;
	//版本号
	private String version;
	//健康度
	private int healthValue;
	//SWAP使用率
	private MetricVO swap;
	//CPU使用率
	private MetricVO cpu;
	//内存使用率
	private MetricVO mem;
	//磁盘使用信息 - 每秒I/O请求数
	private MetricVO disk;
	// 磁盘使用信息 - 磁盘利用率
	private MetricVO diskUseRate;
	//网络IO
	private MetricVO net;
	//所属IP
	private String ip;
	//所属应用
	private String appName;
	
	
	
	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

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

	public MetricVO getSwap() {
		
		return swap;
	}

	public void setSwap(MetricVO swap) {
		this.swap = swap;
	}

	public MetricVO getCpu() {
		return cpu;
	}

	public void setCpu(MetricVO cpu) {
		this.cpu = cpu;
	}

	public MetricVO getMem() {
		return mem;
	}

	public void setMem(MetricVO mem) {
		this.mem = mem;
	}

	public MetricVO getDisk() {
		return disk;
	}

	public void setDisk(MetricVO disk) {
		this.disk = disk;
	}

	public MetricVO getNet() {
		return net;
	}

	public void setNet(MetricVO net) {
		this.net = net;
	}

	public MetricVO getDiskUseRate() {
		return diskUseRate;
	}

	public void setDiskUseRate(MetricVO diskUseRate) {
		this.diskUseRate = diskUseRate;
	}

	
}
