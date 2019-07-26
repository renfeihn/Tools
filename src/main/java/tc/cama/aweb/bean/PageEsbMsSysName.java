package tc.cama.aweb.bean;

import java.util.List;

import tc.cama.aweb.esb.model.EsbMonMS;
import tc.cama.aweb.esb.model.EsbSystem;
import tc.cama.aweb.esb.model.EsbTransError;

public class PageEsbMsSysName {

	private EsbMonMS esbMonMS;
	
	private String SysName;

	private List<EsbTransError> esbTransErrors;
	
	private List<EsbSystem> sysNameList;
	
	
	public List<EsbTransError> getEsbTransErrors() {
		return esbTransErrors;
	}

	public List<EsbSystem> getSysNameList() {
		return sysNameList;
	}

	public void setEsbTransErrors(List<EsbTransError> esbTransErrors) {
		this.esbTransErrors = esbTransErrors;
	}

	public void setSysNameList(List<EsbSystem> sysNameList) {
		this.sysNameList = sysNameList;
	}

	public EsbMonMS getEsbMonMS() {
		return esbMonMS;
	}

	public String getSysName() {
		return SysName;
	}

	public void setEsbMonMS(EsbMonMS esbMonMS) {
		this.esbMonMS = esbMonMS;
	}

	public void setSysName(String sysName) {
		SysName = sysName;
	}
}
