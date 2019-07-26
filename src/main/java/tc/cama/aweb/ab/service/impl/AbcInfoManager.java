package tc.cama.aweb.ab.service.impl;

import java.util.List;


import com.aim.alibaba.fastjson.JSONObject;

import tc.bank.common.db.IDbService;
import tc.cama.aweb.ab.model.AimAbcListCur;
import tc.cama.aweb.ab.service.IAbcInfoManager;

public class AbcInfoManager implements IAbcInfoManager {

	private IDbService dbService;

	public IDbService getDbService() {
		return dbService;
	}

	public void setDbService(IDbService dbService) {
		this.dbService = dbService;
	}

	@Override
	public List<AimAbcListCur> getAbcListByOId(Integer mobjId,String oid) {
		JSONObject whereEx = new JSONObject();
		whereEx.put("mobjId", mobjId);
		whereEx.put("oid", oid);
		return dbService.queryAsBeanList(AimAbcListCur.class, whereEx);
	}
	
	@Override
	public List<AimAbcListCur> getAbcList() {
		JSONObject whereEx = new JSONObject();
		return dbService.queryAsBeanList(AimAbcListCur.class, whereEx);
	}
	
	@Override
	public List<AimAbcListCur> getAbcListByMobjId(Integer mobjId) {
		JSONObject whereEx = new JSONObject();
		whereEx.put("mobjId", mobjId);
		return dbService.queryAsBeanList(AimAbcListCur.class, whereEx);
	}

	@Override
	public Integer getCountTellerno() {
		JSONObject whereEx = new JSONObject();
		whereEx.put("tellerno", "(NOT NULL)");
		return dbService.count(AimAbcListCur.class, whereEx);
	}
	
	@Override
	public Integer getCountAbcIp() {
		JSONObject whereEx = new JSONObject();
		return dbService.count(AimAbcListCur.class, whereEx);
	}

}
