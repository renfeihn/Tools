package tc.cama.aweb.bean;

public class QueryManager {
    private String magrName;
    private int helRate;
    private String statu;
    private int indoubtStatusCount;
    private int queDepthTooHigh;
    private int portStatusExcCount;
    private int diedQueueCount;
    private int connCount;
    private String ip;
    private String appName;
    private long objectId;
    
	public long getObjectId() {
		return objectId;
	}
	public void setObjectId(long objectId) {
		this.objectId = objectId;
	}
	public String getMagrName() {
		return magrName;
	}
	public void setMagrName(String magrName) {
		this.magrName = magrName;
	}
	public int getHelRate() {
		return helRate;
	}
	public void setHelRate(int helRate) {
		this.helRate = helRate;
	}
	public String getStatu() {
		return statu;
	}
	public void setStatu(String statu) {
		this.statu = statu;
	}
	public int getIndoubtStatusCount() {
		return indoubtStatusCount;
	}
	public void setIndoubtStatusCount(int indoubtStatusCount) {
		this.indoubtStatusCount = indoubtStatusCount;
	}
	public int getQueDepthTooHigh() {
		return queDepthTooHigh;
	}
	public void setQueDepthTooHigh(int queDepthTooHigh) {
		this.queDepthTooHigh = queDepthTooHigh;
	}
	public int getPortStatusExcCount() {
		return portStatusExcCount;
	}
	public void setPortStatusExcCount(int portStatusExcCount) {
		this.portStatusExcCount = portStatusExcCount;
	}
	public int getDiedQueueCount() {
		return diedQueueCount;
	}
	public void setDiedQueueCount(int diedQueueCount) {
		this.diedQueueCount = diedQueueCount;
	}
	public int getConnCount() {
		return connCount;
	}
	public void setConnCount(int connCount) {
		this.connCount = connCount;
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
