package tc.cama.aweb.service.impl;

import java.util.ArrayList;
import java.util.List;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aim4.core.convert.ConvertUtils;
import tc.bank.common.db.IDbService;
import tc.cama.aweb.esb.model.EsbShowSystem;
import tc.cama.aweb.service.IScreenImpAppsConfig;

public class ScreenImpAppsConfigImpl implements IScreenImpAppsConfig{
	private IDbService dbService;
	
	public IDbService getDbService() {
		return dbService;
	}

	public void setDbService(IDbService dbService) {
		this.dbService = dbService;
	}

	@Override
	public List<EsbShowSystem> getImpAppsList() {
		List<EsbShowSystem> impAppsList = dbService.queryAsBeanList(EsbShowSystem.class, null);
		if(impAppsList==null){
			impAppsList = new ArrayList<EsbShowSystem>();
		}
		return impAppsList;
	}

	@Override
	public EsbShowSystem getImpApp(String sysCode) {
		JSONObject whereEx = new JSONObject();
		whereEx.put("sysCode", sysCode);
		EsbShowSystem impApps = dbService.queryAsBean(EsbShowSystem.class, whereEx);
		if(impApps==null){
			impApps = new EsbShowSystem();
		}
		return impApps;
	}

	@Override
	public String insertImpApp(EsbShowSystem impApp) {
		 int flag = dbService.save(impApp);
		if(flag==0){
			return "新增失败！";
		}else{
			
			return "新增成功！";
		}
	}

	@Override
	public String updateImpApp(EsbShowSystem impApp,String sysCode) {
		int flag = 0;
		JSONObject whereEx = new JSONObject();
		whereEx.put("sysCode", sysCode);
		JSONObject updateData = ConvertUtils.convert(impApp, JSONObject.class);
		if(null!=getImpApp(sysCode)){
			flag = dbService.updateWithDict(EsbShowSystem.class, updateData, whereEx);
		}
		 if(flag==0){
				return "修改失败！";
			}else{
				
				return "修改成功！";
			}
	}

	@Override
	public String deleteImpApp(String sysCode) {
		JSONObject whereEx = new JSONObject();
		whereEx.put("sysCode", sysCode);
		int flag = dbService.deleteWithDict(EsbShowSystem.class, whereEx);
		if(flag==0){
			return "删除失败！";
		}else{
			
			return "删除成功！";
		}
	}
	
}
