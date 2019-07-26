package tc.cama.aweb.bean;

public class AppEsbSummary {
  /**
   * 应用系统名称 
   */
	private  String sysName;
	/**
	 * 系统码
	 */
	private String sysCode;
	/**
	 * 交易量
	 */
	private String trance;
	/**
	 * 响应率
	 */
	private String rspRate;
	/**
	 * 成功率
	 */
	private String susRate;
	/**
	 * TPS
	 */
	private String TPS;
	/**
	 * 平均响应时间
	 */
	private String rspTime;
	/**
	 * 时间
	 */
	private String  monTime;
	/**
	 * 
	 * 健康度
	 */
	private int helthDepth;
	/**
	 * appId
	 */
	private Long appId;
	public String getSysName() {
		return sysName;
	}
	public void setSysName(String sysName) {
		this.sysName = sysName;
	}
	
	public String getSysCode() {
		return sysCode;
	}
	public void setSysCode(String sysCode) {
		this.sysCode = sysCode;
	}
	public String getTrance() {
		return trance;
	}
	public void setTrance(String trance) {
		this.trance = trance;
	}
	public String getRspRate() {
		return rspRate;
	}
	public void setRspRate(String rspRate) {
		this.rspRate = rspRate;
	}
	public String getSusRate() {
		return susRate;
	}
	public void setSusRate(String susRate) {
		this.susRate = susRate;
	}
	public String getTPS() {
		return TPS;
	}
	public void setTPS(String tPS) {
		TPS = tPS;
	}
	public String getRspTime() {
		return rspTime;
	}
	public void setRspTime(String rspTime) {
		this.rspTime = rspTime;
	}
	public String getMonTime() {
		return monTime;
	}
	public void setMonTime(String monTime) {
		this.monTime = monTime;
	}
	public int getHelthDepth() {
		return helthDepth;
	}
	public void setHelthDepth(int helthDepth) {
		this.helthDepth = helthDepth;
	}
	public Long getAppId() {
		return appId;
	}
	public void setAppId(Long appId) {
		this.appId = appId;
	}
	
	
}
