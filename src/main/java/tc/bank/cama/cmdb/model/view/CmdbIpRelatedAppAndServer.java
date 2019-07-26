package tc.bank.cama.cmdb.model.view;

import java.util.ArrayList;
import java.util.List;

/**
 * IP相关的系统和逻辑服务器信息POJO
 */
public class CmdbIpRelatedAppAndServer {
	
	/** IP地址 */
	private String ipAddr;
	
	/** IP地址关联的系统对象ID列表 */
	private List<Long> appIds = new ArrayList<Long>();
	
	/** IP地址关联的系统对象名称列表 */
	private List<String> appNames = new ArrayList<String>();
	
	/** IP地址关联的逻辑服务器对象ID */
	private Long serverId;
	
	/** IP地址关联的逻辑服务器对象名称 */
	private String serverName;

	/*
	 * setters
	 */

	public void setIpAddr(String ipAddr) {
		this.ipAddr = ipAddr;
	}

	public void addApplicationInfo(Long appId, String appName) {
		this.appIds.add(appId);
		this.appNames.add(appName);
	}

	public void setServerId(Long serverId) {
		this.serverId = serverId;
	}

	public void setServerName(String serverName) {
		this.serverName = serverName;
	}

	/*
	 * getters
	 */

	public String getIpAddr() {
		return ipAddr;
	}

	public List<Long> getAppIds() {
		return appIds;
	}

	public List<String> getAppNames() {
		return appNames;
	}
	
	public Long getServerId() {
		return serverId;
	}
	
	public String getServerName() {
		return serverName;
	}
}
