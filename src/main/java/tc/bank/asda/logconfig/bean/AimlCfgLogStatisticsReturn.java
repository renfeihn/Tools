package tc.bank.asda.logconfig.bean;

import java.io.Serializable;
import java.util.List;

public class AimlCfgLogStatisticsReturn implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -1059846683192542333L;

	private int typeCount;
	
	private int logCount;
	
	private int logRunCount;
	
	private int logStopCount;
	
	private List<String> logTypes;

	public int getTypeCount() {
		return typeCount;
	}

	public void setTypeCount(int typeCount) {
		this.typeCount = typeCount;
	}

	public int getLogCount() {
		return logCount;
	}

	public void setLogCount(int logCount) {
		this.logCount = logCount;
	}

	public int getLogRunCount() {
		return logRunCount;
	}

	public void setLogRunCount(int logRunCount) {
		this.logRunCount = logRunCount;
	}

	public int getLogStopCount() {
		return logStopCount;
	}

	public void setLogStopCount(int logStopCount) {
		this.logStopCount = logStopCount;
	}

	public List<String> getLogTypes() {
		return logTypes;
	}

	public void setLogTypes(List<String> logTypes) {
		this.logTypes = logTypes;
	}
	
}
