package tc.cama.aweb.bean;

import java.util.Map;

public class PageScreenAppRate {

	Map<String, String> appRates;
	String otherRate;
	Map<String, String> appTimes;

	public Map<String, String> getAppRates() {
		return appRates;
	}

	public String getOtherRate() {
		return otherRate;
	}

	public Map<String, String> getAppTimes() {
		return appTimes;
	}

	public void setAppRates(Map<String, String> appRates) {
		this.appRates = appRates;
	}

	public void setOtherRate(String otherRate) {
		this.otherRate = otherRate;
	}

	public void setAppTimes(Map<String, String> appTimes) {
		this.appTimes = appTimes;
	}

}
