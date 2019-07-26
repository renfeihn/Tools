package tc.cama.aweb.bean;

import tc.cama.aweb.esb.model.EsbMonMS;

public class PageAppAPM {

	private EsbMonMS esbMonMs;
	
	private String sysName;
	
	private String tradeCountChanged;
	
	private String rspPercentChanged;
	
	private String sucPercentChanged;
	
	private String tpsChanged;
	
	private String rspTimeAvgChanged;
	
	
	/**
	 * getters
	 * @return
	 */
	public EsbMonMS getEsbMonMs() {
		return esbMonMs;
	}
	
	public String getSysName() {
		return sysName;
	}
	
	
	public String getTradeCountChanged() {
		return tradeCountChanged;
	}

	public String getRspPercentChanged() {
		return rspPercentChanged;
	}

	public String getSucPercentChanged() {
		return sucPercentChanged;
	}

	public String getTpsChanged() {
		return tpsChanged;
	}

	public String getRspTimeAvgChanged() {
		return rspTimeAvgChanged;
	}

	
	
	/**
	 * setters
	 * @param tradeCountChanged
	 */
	public void setTradeCountChanged(String tradeCountChanged) {
		this.tradeCountChanged = tradeCountChanged;
	}

	public void setRspPercentChanged(String rspPercentChanged) {
		this.rspPercentChanged = rspPercentChanged;
	}

	public void setSucPercentChanged(String sucPercentChanged) {
		this.sucPercentChanged = sucPercentChanged;
	}

	public void setTpsChanged(String tpsChanged) {
		this.tpsChanged = tpsChanged;
	}

	public void setRspTimeAvgChanged(String rspTimeAvgChanged) {
		this.rspTimeAvgChanged = rspTimeAvgChanged;
	}

	public void setSysName(String sysName) {
		this.sysName = sysName;
	}

	public void setEsbMonMs(EsbMonMS esbMonMs) {
		this.esbMonMs = esbMonMs;
	}


}
