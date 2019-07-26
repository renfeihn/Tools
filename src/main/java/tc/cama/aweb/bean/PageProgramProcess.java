package tc.cama.aweb.bean;

public class PageProgramProcess {

	// 进程对象
	String cpuRate=" ";
	String memRate=" ";
	int portCount;
    String procename=" ";
    String proceno=" ";
    String procestate=" ";
    String user= " ";
   
	public String getCpuRate() {
		return cpuRate;
	}

	public String getMemRate() {
		return memRate;
	}

	public Integer getPortCount() {
		return portCount;
	}

	public void setCpuRate(String cpuRate) {
		this.cpuRate = cpuRate;
	}

	public void setMemRate(String memRate) {
		this.memRate = memRate;
	}

	public void setPortCount(Integer portCount) {
		this.portCount = portCount;
	}

	public String getProcename() {
		return procename;
	}

	public void setProcename(String procename) {
		this.procename = procename;
	}

	public String getProceno() {
		return proceno;
	}

	public void setProceno(String proceno) {
		this.proceno = proceno;
	}

	public String getProcestate() {
		return procestate;
	}

	public void setProcestate(String procestate) {
		this.procestate = procestate;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public void setPortCount(int portCount) {
		this.portCount = portCount;
	}

	


}
