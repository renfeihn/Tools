package tc.bank.cama.cmdb.service;

import java.util.List;

import tc.bank.cama.cmdb.model.table.CmdbAppGroup;
import tc.bank.cama.cmdb.model.view.CmdbAppGroupCount;

/**
 * 系统分组查询接口
 */
public interface AppGroupQuery {

	/**
	 * 查询所有应用分组
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbAppGroup> getAllAppGroups() throws Exception;
	
	/**
	 * 查询所有分组包含的系统总数
	 * 
	 * @return
	 * @throws Exception
	 */
	Long getTotalAppCount() throws Exception;
	
	/**
	 * 查询指定分组下包含的系统总数
	 * 
	 * @param groupId
	 * 分组ID
	 * 
	 * @return
	 * @throws Exception
	 */
	Long getAppCountForGroup(Long groupId) throws Exception;

	/**
	 * 按分组统计其下的系统数量
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbAppGroupCount> getAppCountByGroup() throws Exception;
}
