package tc.bank.cama.core.bean;

import java.util.List;

import tc.bank.cama.core.module.AimConfigTrigger;

public class AimConfigTriggerPlus {
	private AimConfigTrigger configTrigger;
	private List<String> ip;
	private List<String> appName;
	private String objName;
	private String metricName;
	private String objCate;
	private int childTriggerNum;

	public AimConfigTrigger getConfigTrigger() {
		return configTrigger;
	}

	public void setConfigTrigger(AimConfigTrigger configTrigger) {
		this.configTrigger = configTrigger;
	}

	public List<String> getIp() {
		return ip;
	}

	public void setIp(List<String> ip) {
		this.ip = ip;
	}

	public String getObjName() {
		return objName;
	}

	public void setObjName(String objName) {
		this.objName = objName;
	}

	public String getMetricName() {
		return metricName;
	}

	public void setMetricName(String metricName) {
		this.metricName = metricName;
	}

	public List<String> getAppName() {
		return appName;
	}

	public void setAppName(List<String> appName) {
		this.appName = appName;
	}

	public String getObjCate() {
		return objCate;
	}

	public void setObjCate(String objCate) {
		this.objCate = objCate;
	}

	public int getChildTriggerNum() {
		return childTriggerNum;
	}

	public void setChildTriggerNum(int childTriggerNum) {
		this.childTriggerNum = childTriggerNum;
	}

	

}
