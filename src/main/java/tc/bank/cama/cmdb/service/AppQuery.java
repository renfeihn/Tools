package tc.bank.cama.cmdb.service;

import java.util.List;

import tc.bank.cama.cmdb.model.table.extention.CmdbApplication;
import tc.bank.cama.cmdb.model.view.CmdbAppSummary;

/**
 * 应用系统查询接口
 */
public interface AppQuery {

	/**
	 * 查询所有分组下所有系统概要
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbAppSummary> getAppForAllGroups() throws Exception;
	
	/**
	 * 查询所有应用系统概要
	 * @return
	 * @throws Exception
	 */
	List<CmdbAppSummary> getAllApplications() throws Exception;
	
	/**
	 * 查询指定分组下所有系统概要
	 * 
	 * @param groupId
	 * 应用分组ID
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbAppSummary> getAppForGroup(Long groupId) throws Exception;
	
	/**
	 * 查询对象关联的系统明细
	 * 
	 * @param objectId
	 * 对象ID
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbApplication> getObjectRelatedApps(Long objectId) throws Exception;
	
}
