package tc.cama.aweb.esb.model;

public class EsbMonTransService {

	private EsbMonTrans esbMonTrans;
	private EsbService esbService;

	public EsbMonTrans getEsbMonTrans() {
		return esbMonTrans;
	}

	public EsbService getEsbService() {
		return esbService;
	}

	public void setEsbMonTrans(EsbMonTrans esbMonTrans) {
		this.esbMonTrans = esbMonTrans;
	}

	public void setEsbService(EsbService esbService) {
		this.esbService = esbService;
	}

	@Override
	public String toString() {
		return "EsbMonTransService [esbMonTrans=" + esbMonTrans + ", esbService=" + esbService + "]";
	}

	
}
