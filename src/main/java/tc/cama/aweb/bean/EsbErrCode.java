package tc.cama.aweb.bean;

import tc.cama.aweb.esb.model.EsbTransError;

public class EsbErrCode {
	/**
	 * 错误码对象
	 */
	private EsbTransError esbTransError;
	/**
	 * 系统名称
	 */
	private String sysName;
	public EsbTransError getEsbTransError() {
		return esbTransError;
	}
	public void setEsbTransError(EsbTransError esbTransError) {
		this.esbTransError = esbTransError;
	}
	public String getSysName() {
		return sysName;
	}
	public void setSysName(String sysName) {
		this.sysName = sysName;
	}
	
}
