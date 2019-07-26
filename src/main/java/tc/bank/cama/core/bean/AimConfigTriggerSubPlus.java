package tc.bank.cama.core.bean;

import java.util.List;

import tc.bank.cama.core.module.AimConfigTriggerSub;

public class AimConfigTriggerSubPlus {
	/**
	 * 关联触发器基本信息
	 */
	private AimConfigTriggerSub aimConfigTriggerSub;
	/**
	 * 所属IP
	 */
	private List<String> ip;
	private String objectName;
	private String metricName;
	private List<String> appName;
	private String objectCate;
	
	
	public String getObjectCate() {
		return objectCate;
	}
	public void setObjectCate(String objectCate) {
		this.objectCate = objectCate;
	}
	public List<String> getAppName() {
		return appName;
	}
	public void setAppName(List<String> appName) {
		this.appName = appName;
	}
	public List<String> getIp() {
		return ip;
	}
	public void setIp(List<String> ip) {
		this.ip = ip;
	}
	
	public String getObjectName() {
		return objectName;
	}
	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}
	public String getMetricName() {
		return metricName;
	}
	public void setMetricName(String metricName) {
		this.metricName = metricName;
	}
	public AimConfigTriggerSub getAimConfigTriggerSub() {
		return aimConfigTriggerSub;
	}
	public void setAimConfigTriggerSub(AimConfigTriggerSub aimConfigTriggerSub) {
		this.aimConfigTriggerSub = aimConfigTriggerSub;
	}
	
}
