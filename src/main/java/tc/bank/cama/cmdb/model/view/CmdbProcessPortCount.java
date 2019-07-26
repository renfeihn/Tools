package tc.bank.cama.cmdb.model.view;

import tc.bank.cama.cmdb.model.table.extention.CmdbProcess;

public class CmdbProcessPortCount extends CmdbProcess {

	private Long portCount = 0L;
	
	public void setPortCount(Long portCount) {
		this.portCount = portCount;
	}

	public Long getPortCount() {
		return portCount;
	}
	
}
