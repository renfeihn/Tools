package tc.cama.aweb.bean;

import java.util.List;
import java.util.Map;


/**
 * esb对象详情信息
 */
public class PageEsbMonitor {


	private Double dayTotnum;
	private String dayTotnumToYedy;

	private String daySysRate;
	private String daySysRateToYedy;

	private String dayBussRate;
	private String dayBussRateToYedy;

	private String dayTps;
	private String dayTpsToYedy;

	private String dayTransAvgtime;
	private String dayTransAvgtimeToYedy;
	
	public Double getDayTotnum() {
		return dayTotnum;
	}

	public void setDayTotnum(Double dayTotnum) {
		this.dayTotnum = dayTotnum;
	}

	public String getDayTotnumToYedy() {
		return dayTotnumToYedy;
	}

	public void setDayTotnumToYedy(String dayTotnumToYedy) {
		this.dayTotnumToYedy = dayTotnumToYedy;
	}

	public String getDaySysRate() {
		return daySysRate;
	}

	public void setDaySysRate(String daySysRate) {
		this.daySysRate = daySysRate;
	}

	public String getDaySysRateToYedy() {
		return daySysRateToYedy;
	}

	public void setDaySysRateToYedy(String daySysRateToYedy) {
		this.daySysRateToYedy = daySysRateToYedy;
	}

	public String getDayBussRate() {
		return dayBussRate;
	}

	public void setDayBussRate(String dayBussRate) {
		this.dayBussRate = dayBussRate;
	}

	public String getDayBussRateToYedy() {
		return dayBussRateToYedy;
	}

	public void setDayBussRateToYedy(String dayBussRateToYedy) {
		this.dayBussRateToYedy = dayBussRateToYedy;
	}

	public String getDayTps() {
		return dayTps;
	}

	public void setDayTps(String dayTps) {
		this.dayTps = dayTps;
	}

	public String getDayTpsToYedy() {
		return dayTpsToYedy;
	}

	public void setDayTpsToYedy(String dayTpsToYedy) {
		this.dayTpsToYedy = dayTpsToYedy;
	}

	public String getDayTransAvgtime() {
		return dayTransAvgtime;
	}

	public void setDayTransAvgtime(String dayTransAvgtime) {
		this.dayTransAvgtime = dayTransAvgtime;
	}

	public String getDayTransAvgtimeToYedy() {
		return dayTransAvgtimeToYedy;
	}

	public void setDayTransAvgtimeToYedy(String dayTransAvgtimeToYedy) {
		this.dayTransAvgtimeToYedy = dayTransAvgtimeToYedy;
	}

	@Override
	public String toString() {
		return "PageEsbMonitor [dayTotnum=" + dayTotnum + ", dayTotnumToYedy="
				+ dayTotnumToYedy + ", daySysRate=" + daySysRate
				+ ", daySysRateToYedy=" + daySysRateToYedy + ", dayBussRate="
				+ dayBussRate + ", dayBussRateToYedy=" + dayBussRateToYedy
				+ ", dayTps=" + dayTps + ", dayTpsToYedy=" + dayTpsToYedy
				+ ", dayTransAvgtime=" + dayTransAvgtime
				+ ", dayTransAvgtimeToYedy=" + dayTransAvgtimeToYedy + "]";
	}

}
