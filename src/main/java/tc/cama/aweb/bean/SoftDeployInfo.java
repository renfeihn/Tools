package tc.cama.aweb.bean;

public class SoftDeployInfo {
    /**
     * 应用名字
     */
	private String appName;
	/**
	 * 部署ip
	 */
    private String IP;
    /**
     * 操作系统
     */
    private String osModel;
	public String getAppName() {
		return appName;
	}
	public void setAppName(String appName) {
		this.appName = appName;
	}
	public String getIP() {
		return IP;
	}
	public void setIP(String iP) {
		IP = iP;
	}
	public String getOsModel() {
		return osModel;
	}
	public void setOsModel(String osModel) {
		this.osModel = osModel;
	}
     
}
