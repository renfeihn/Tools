package tc.cama.aweb.bean;

public class PageProgramBase {
	private int healthValue = 100;

	private String totalRunTime = "0";
	private String cpuUsed = "0%";
	private String memUsed = "0%";

	private Integer processCount=0;	//进程数
	private Integer portCount=0;	//端口数
	private String jvm="0%";	//jvm%
	
	private Integer unClosedCount;	//未解决事件总数
	private Integer warningCount;   //预警
	private Integer alertCount;     //告警
	private Integer dayEventCount;  //当日事件总数
	private Object application;//所属应用系统（）
	private Object object;

	public int getHealthValue() {
		return healthValue;
	}

	public String getTotalRunTime() {
		return totalRunTime;
	}

	public String getCpuUsed() {
		return cpuUsed;
	}

	public String getMemUsed() {
		return memUsed;
	}

	public Integer getProcessCount() {
		return processCount;
	}

	public Integer getPortCount() {
		return portCount;
	}

	public String getJvm() {
		return jvm;
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

	public void setTotalRunTime(String totalRunTime) {
		this.totalRunTime = totalRunTime;
	}

	public void setCpuUsed(String cpuUsed) {
		this.cpuUsed = cpuUsed;
	}

	public void setMemUsed(String memUsed) {
		this.memUsed = memUsed;
	}

	public void setProcessCount(Integer processCount) {
		this.processCount = processCount;
	}

	public void setPortCount(Integer portCount) {
		this.portCount = portCount;
	}

	public void setJvm(String jvm) {
		this.jvm = jvm;
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

	public Object getApplication() {
		return application;
	}

	public void setApplication(Object application) {
		this.application = application;
	}

	
	
	
}
