package tc.cama.aweb.bean;


import tc.cama.aweb.esb.model.EsbMonTrans;
import tc.cama.aweb.esb.model.EsbTransError;

/**
 * 流水错误信息top
 */
public class PageEsbTransError {

	EsbMonTrans esbMonTran;
	EsbTransError esbTransError;

	public EsbMonTrans getEsbMonTran() {
		return esbMonTran;
	}

	public EsbTransError getEsbTransError() {
		return esbTransError;
	}

	public void setEsbMonTran(EsbMonTrans esbMonTran) {
		this.esbMonTran = esbMonTran;
	}

	public void setEsbTransError(EsbTransError esbTransError) {
		this.esbTransError = esbTransError;
	}

}
