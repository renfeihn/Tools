package tc.cama.aweb.bean;

/**
 * 操作系统基本信息Bean
 */
public class PageOsBase {

	private int healthValue = 100;

	private String cpuUsed = "0%";
	private String memUsed = "0%";
	private String diskUsed = "0%";
	private String netUsed = "0kbps";
	private String virtualMemUsed="0%";

	private Integer unClosedCount;
	private Integer warningCount;
	private Integer alertCount;
	private Integer dayEventCount;

	private Object object;

	public int getHealthValue() {
		return healthValue;
	}

	public String getCpuUsed() {
		return cpuUsed;
	}

	public String getMemUsed() {
		return memUsed;
	}

	public String getDiskUsed() {
		return diskUsed;
	}

	public String getNetUsed() {
		return netUsed;
	}

	public Integer getUnClosedCount() {
		return unClosedCount;
	}

	public Integer getWarningCount() {
		return warningCount;
	}

	public Integer getAlertCount() {
		return alertCount;
	}

	public Integer getDayEventCount() {
		return dayEventCount;
	}

	public Object getObject() {
		return object;
	}

	public void setHealthValue(int healthValue) {
		this.healthValue = healthValue;
	}

	public void setCpuUsed(String cpuUsed) {
		this.cpuUsed = cpuUsed;
	}

	public void setMemUsed(String memUsed) {
		this.memUsed = memUsed;
	}

	public void setDiskUsed(String diskUsed) {
		this.diskUsed = diskUsed;
	}

	public void setNetUsed(String netUsed) {
		this.netUsed = netUsed;
	}

	public void setUnClosedCount(Integer unClosedCount) {
		this.unClosedCount = unClosedCount;
	}

	public void setWarningCount(Integer warningCount) {
		this.warningCount = warningCount;
	}

	public void setAlertCount(Integer alertCount) {
		this.alertCount = alertCount;
	}

	public void setDayEventCount(Integer dayEventCount) {
		this.dayEventCount = dayEventCount;
	}

	public void setObject(Object object) {
		this.object = object;
	}

	
	public String getVirtualMemUsed() {
		return virtualMemUsed;
	}

	public void setVirtualMemUsed(String virtualMemUsed) {
		this.virtualMemUsed = virtualMemUsed;
	}

	@Override
	public String toString() {
		return "PageOsBase [healthValue=" + healthValue + ", cpuUsed="
				+ cpuUsed + ", memUsed=" + memUsed + ", diskUsed=" + diskUsed
				+ ", netUsed=" + netUsed + ", virtualMemUsed=" + virtualMemUsed
				+ ", unClosedCount=" + unClosedCount + ", warningCount="
				+ warningCount + ", alertCount=" + alertCount
				+ ", dayEventCount=" + dayEventCount + ", object=" + object
				+ "]";
	}

	

}
