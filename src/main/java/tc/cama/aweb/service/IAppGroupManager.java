package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;

import tc.bank.cama.cmdb.model.view.CmdbAppGroupCount;
import tc.bank.cama.cmdb.model.view.CmdbAppSummary;
import tc.cama.aweb.model.CmdbAppGroupDetail;

public interface IAppGroupManager {
	public List<CmdbAppGroupCount> getAppgroupInfo() throws Exception;
	
	public List<CmdbAppSummary> getAppsByGroup(long groupId) throws Exception;
	
	public Map<String,String> getAppNoGroup() throws Exception;
	
	public Map<String,String> getAllApp();
	
	public int removeAppFromGroup(long appId);
	
	public int addApptoGroup(CmdbAppGroupDetail cmdbAppGroupDetail);
}
		