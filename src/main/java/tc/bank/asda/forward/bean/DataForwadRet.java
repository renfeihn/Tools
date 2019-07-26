package tc.bank.asda.forward.bean;

import java.io.Serializable;

import tc.bank.asda.forward.model.DataForward;

public class DataForwadRet extends DataForward implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7395056208259988968L;

	private String forwardTo;

	public String getForwardTo() {
		return forwardTo;
	}

	public void setForwardTo(String forwardTo) {
		this.forwardTo = forwardTo;
	}
	
}
