package tc.cama.aweb.bean;
/**
 *应用程序部署 
 * @author zhangkun
 *
 */
public class SoftWareDeployBean {
	/**
	 * 应用程序名称
	 * 
	 */
	private String appName;
	/**
	 * 部署ip
	 */
	private String ip;
	/**
	 * 健康度
	 */
	private String helthRate;
	/**
	 * 应用程序id
	 * 
	 */
	private long objectId;
	/**
	 * 逻辑服务器id
	 */
    private String serverId;
	public String getAppName() {
		return appName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getHelthRate() {
		return helthRate;
	}

	public void setHelthRate(String helthRate) {
		this.helthRate = helthRate;
	}

	public long getObjectId() {
		return objectId;
	}

	public void setObjectId(long objectId) {
		this.objectId = objectId;
	}

	public String getServerId() {
		return serverId;
	}

	public void setServerId(String serverId) {
		this.serverId = serverId;
	}

}