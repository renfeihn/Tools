package tc.cama.aweb.bean;

public class AppOsMem {

	String memUsed;
	String memFree;
	String swapMemUsed;
	String swapMemFree;

	String diskIn;
	String diskOut;
	
	public String getMemUsed() {
		return memUsed;
	}

	public String getMemFree() {
		return memFree;
	}

	public String getSwapMemUsed() {
		return swapMemUsed;
	}

	public String getSwapMemFree() {
		return swapMemFree;
	}

	public void setMemUsed(String memUsed) {
		this.memUsed = memUsed;
	}

	public void setMemFree(String memFree) {
		this.memFree = memFree;
	}

	public void setSwapMemUsed(String swapMemUsed) {
		this.swapMemUsed = swapMemUsed;
	}

	public void setSwapMemFree(String swapMemFree) {
		this.swapMemFree = swapMemFree;
	}

	public String getDiskIn() {
		return diskIn;
	}

	public String getDiskOut() {
		return diskOut;
	}

	public void setDiskIn(String diskIn) {
		this.diskIn = diskIn;
	}

	public void setDiskOut(String diskOut) {
		this.diskOut = diskOut;
	}

	
}
