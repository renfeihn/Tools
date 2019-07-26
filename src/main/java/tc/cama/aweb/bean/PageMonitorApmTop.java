package tc.cama.aweb.bean;

public class PageMonitorApmTop {
	
	String appName;
	String todayApmValue;
	String yedyApmValue;
	String todayToYedyRate;
	String fiveApmRate;

	public String getAppName() {
		return appName;
	}

	public String getTodayApmValue() {
		return todayApmValue;
	}

	public String getYedyApmValue() {
		return yedyApmValue;
	}

	public String getTodayToYedyRate() {
		return todayToYedyRate;
	}

	public String getFiveApmRate() {
		return fiveApmRate;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	public void setTodayApmValue(String todayApmValue) {
		this.todayApmValue = todayApmValue;
	}

	public void setYedyApmValue(String yedyApmValue) {
		this.yedyApmValue = yedyApmValue;
	}

	public void setTodayToYedyRate(String todayToYedyRate) {
		this.todayToYedyRate = todayToYedyRate;
	}

	public void setFiveApmRate(String fiveApmRate) {
		this.fiveApmRate = fiveApmRate;
	}

}
