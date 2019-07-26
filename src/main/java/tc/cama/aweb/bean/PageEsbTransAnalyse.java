package tc.cama.aweb.bean;

import java.util.List;
import java.util.Map;

import tc.cama.aweb.esb.model.EsbMonMS;

/**
 * 应用性能-流水分析-性能分析Bean
 */
public class PageEsbTransAnalyse {

	// List<EsbMonMS> esbMonMSs;
	Map<String, List<String>> echarSysErrNum;
	Map<String, List<String>> echarBussErrNum;

	EsbMonMS esbMonMS;
	private Double currTotnum;
	private String currTotnumFailRate;
	private String currTotnumSuccRate;

	private Double currSysErrNum;
	private String currSysFailRate;
	private String sysFailRateToYedy;

	private Double currBussErrNum;
	private String currBussFailRate;
	private String bussFailRateToYedy;

	public Map<String, List<String>> getEcharSysErrNum() {
		return echarSysErrNum;
	}

	public Map<String, List<String>> getEcharBussErrNum() {
		return echarBussErrNum;
	}

	public EsbMonMS getEsbMonMS() {
		return esbMonMS;
	}

	public Double getCurrTotnum() {
		return currTotnum;
	}

	public String getCurrTotnumFailRate() {
		return currTotnumFailRate;
	}

	public String getCurrTotnumSuccRate() {
		return currTotnumSuccRate;
	}

	public Double getCurrSysErrNum() {
		return currSysErrNum;
	}

	public String getCurrSysFailRate() {
		return currSysFailRate;
	}

	public String getSysFailRateToYedy() {
		return sysFailRateToYedy;
	}

	public Double getCurrBussErrNum() {
		return currBussErrNum;
	}

	public String getCurrBussFailRate() {
		return currBussFailRate;
	}

	public String getBussFailRateToYedy() {
		return bussFailRateToYedy;
	}

	public void setEcharSysErrNum(Map<String, List<String>> echarSysErrNum) {
		this.echarSysErrNum = echarSysErrNum;
	}

	public void setEcharBussErrNum(Map<String, List<String>> echarBussErrNum) {
		this.echarBussErrNum = echarBussErrNum;
	}

	public void setEsbMonMS(EsbMonMS esbMonMS) {
		this.esbMonMS = esbMonMS;
	}

	public void setCurrTotnum(Double currTotnum) {
		this.currTotnum = currTotnum;
	}

	public void setCurrTotnumFailRate(String currTotnumFailRate) {
		this.currTotnumFailRate = currTotnumFailRate;
	}

	public void setCurrTotnumSuccRate(String currTotnumSuccRate) {
		this.currTotnumSuccRate = currTotnumSuccRate;
	}

	public void setCurrSysErrNum(Double currSysErrNum) {
		this.currSysErrNum = currSysErrNum;
	}

	public void setCurrSysFailRate(String currSysFailRate) {
		this.currSysFailRate = currSysFailRate;
	}

	public void setSysFailRateToYedy(String sysFailRateToYedy) {
		this.sysFailRateToYedy = sysFailRateToYedy;
	}

	public void setCurrBussErrNum(Double currBussErrNum) {
		this.currBussErrNum = currBussErrNum;
	}

	public void setCurrBussFailRate(String currBussFailRate) {
		this.currBussFailRate = currBussFailRate;
	}

	public void setBussFailRateToYedy(String bussFailRateToYedy) {
		this.bussFailRateToYedy = bussFailRateToYedy;
	}

}
