package tc.cama.aweb.ab.service.impl;

import com.aim.alibaba.fastjson.JSONObject;
import tc.bank.cama.cmdb.model.table.extention.CmdbSoftware;
import tc.bank.common.db.IDbService;
import tc.cama.aweb.ab.service.ICmdbSoftware;

public class CmdbSoftwareImpl implements ICmdbSoftware {
	private IDbService dbService;
	
	public IDbService getDbService() {
		return dbService;
	}

	public void setDbService(IDbService dbService) {
		this.dbService = dbService;
	}

	@Override
	public CmdbSoftware getSoftwareByObjectId(Integer objectId) {
		JSONObject whereEx = new JSONObject();
		whereEx.put("objectId", objectId);
		return dbService.queryAsBean(CmdbSoftware.class, whereEx);
	}

	@Override
	public CmdbSoftware getSoftwareByName(String softwareName) {
		JSONObject whereEx = new JSONObject();
		whereEx.put("softwareName", softwareName);
		return dbService.queryAsBean(CmdbSoftware.class, whereEx);
	}
}
