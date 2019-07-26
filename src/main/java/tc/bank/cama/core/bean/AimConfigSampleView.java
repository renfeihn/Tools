package tc.bank.cama.core.bean;

import java.util.List;

import tc.bank.cama.core.module.AimConfigSample;

public class AimConfigSampleView {
	private AimConfigSample aimConfigSample;
	private List<String> ip;
	private String objectName;
	private List<String> appName;
	private Integer objectCateId;
	private String metricName;
	
	public String getMetricName() {
		return metricName;
	}
	public void setMetricName(String metricName) {
		this.metricName = metricName;
	}
	public AimConfigSample getAimConfigSample() {
		return aimConfigSample;
	}
	public void setAimConfigSample(AimConfigSample aimConfigSample) {
		this.aimConfigSample = aimConfigSample;
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
	public List<String> getAppName() {
		return appName;
	}
	public void setAppName(List<String> appName) {
		this.appName = appName;
	}
	public Integer getObjectCateId() {
		return objectCateId;
	}
	public void setObjectCateId(Integer objectCateId) {
		this.objectCateId = objectCateId;
	}
}
