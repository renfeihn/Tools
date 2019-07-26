package cn.com.agree.aweb.sdk;

public abstract class AimConnectorSupport {

	private String agentType;

	private String agentName = null;
	private String defaultTo = "afacsl";
	private int ioThreads = 1;
	private int timeoutMills = 20000;
	private String urls;

	private String registerMc;
	private String registerTc;
	private String unregisterMc;
	private String unregisterTc;

	public String getAgentType() {
		return agentType;
	}

	public void setAgentType(String agentType) {
		this.agentType = agentType;
	}

	public String getAgentName() {
		return agentName;
	}

	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}

	public String getDefaultTo() {
		return defaultTo;
	}

	public void setDefaultTo(String defaultTo) {
		this.defaultTo = defaultTo;
	}

	public int getIoThreads() {
		return ioThreads;
	}

	public void setIoThreads(int ioThreads) {
		this.ioThreads = ioThreads;
	}

	public int getTimeoutMills() {
		return timeoutMills;
	}

	public void setTimeoutMills(int timeoutMills) {
		this.timeoutMills = timeoutMills;
	}

	public String getUrls() {
		return urls;
	}

	public void setUrls(String urls) {
		this.urls = urls;
	}

	public String getRegisterMc() {
		return registerMc;
	}

	public void setRegisterMc(String registerMc) {
		this.registerMc = registerMc;
	}

	public String getRegisterTc() {
		return registerTc;
	}

	public void setRegisterTc(String registerTc) {
		this.registerTc = registerTc;
	}

	public String getUnregisterMc() {
		return unregisterMc;
	}

	public void setUnregisterMc(String unregisterMc) {
		this.unregisterMc = unregisterMc;
	}

	public String getUnregisterTc() {
		return unregisterTc;
	}

	public void setUnregisterTc(String unregisterTc) {
		this.unregisterTc = unregisterTc;
	}

}
