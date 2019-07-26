package tc.cama.aweb.ab.service;

import tc.bank.cama.cmdb.model.table.extention.CmdbSoftware;

public interface ICmdbSoftware {
	public CmdbSoftware getSoftwareByObjectId(Integer objectId);
	public CmdbSoftware getSoftwareByName(String softwareName);
	
}
