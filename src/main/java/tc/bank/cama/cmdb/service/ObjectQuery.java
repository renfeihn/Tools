package tc.bank.cama.cmdb.service;

import java.util.List;
import java.util.Map;

import tc.bank.cama.cmdb.model.table.CmdbObjectSummary;

/**
 * CMDB对象查询接口
 */
public interface ObjectQuery {

	/**
	 * 查询对象自身的明细
	 * 
	 * @param objectId
	 * 对象ID
	 * 
	 * @return
	 * @throws Exception
	 */
	Object getObjectDetail(Long objectId) throws Exception;
	
	/**
	 * 根据对象ID, 获取对象的概要信息
	 * 
	 * @param objectId
	 * 对象ID
	 * 
	 * @return
	 * @throws Exception
	 */
	CmdbObjectSummary getObjectSummaryById(Long objectId) throws Exception;
	
	/**
	 * 查询CMDB对象对应的CI-ID
	 * 
	 * @param objectId
	 * 对象ID
	 * 
	 * @return
	 * @throws Exception
	 */
	String getObjectCIId(Long objectId) throws Exception;
	
	/**
	 * 查询一级分类下所有对象概要
	 * 
	 * @param l1CateName
	 * 一级分类名称
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbObjectSummary> getFirstCategoryObjects(String l1CateName) throws Exception;
	
	/**
	 * 查询指定系统一级分类下所有对象概要
	 * 
	 * @param appId
	 * 系统ID
	 * @param l1CateName
	 * 一级分类名称
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbObjectSummary> getFirstCategoryObjects(Long appId, String l1CateName) throws Exception;

	/**
	 * 一级分类下的对象数量
	 * 
	 * @param l1CateName
	 * 一级分类名称
	 * 
	 * @return
	 * @throws Exception
	 */
	int getFirstCategoryObjectCount(String l1CateName) throws Exception;
	
	/**
	 * 指定系统下一级分类的对象数量
	 * 
	 * @param appId
	 * 系统对象ID
	 * @param l1CateName
	 * 一级分类名称
	 * 
	 * @return
	 * @throws Exception
	 */
	int getFirstCategoryObjectCount(Long appId, String l1CateName) throws Exception;
	
	/**
	 * 查询二级分类下所有对象概要
	 * 
	 * @param l1CateName
	 * 一级分类名称
	 * @param l2CateName
	 * 二级分类名称
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbObjectSummary> getSecondCategoryObjects(String l1CateName, String l2CateName) throws Exception;
	
	/**
	 * 查询指定系统二级分类下所有对象概要
	 * 
	 * @param appId
	 * 系统ID
	 * @param l1CateName
	 * 一级分类名称
	 * @param l2CateName
	 * 二级分类名称
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbObjectSummary> getSecondCategoryObjects(Long appId, String l1CateName, String l2CateName) throws Exception;
	
	/**
	 * 二级分类下的对象数量
	 * 
	 * @param l1CateName
	 * 一级分类名称
	 * @param l2CateName
	 * 二级分类名称
	 * 
	 * @return
	 * @throws Exception
	 */
	int getSecondCategoryObjectCount(String l1CateName, String l2CateName) throws Exception;

	/**
	 * 指定系统下二级分类的对象数量
	 * 
	 * @param appId
	 * 系统对象ID
	 * @param l1CateName
	 * 一级分类名称
	 * @param l2CateName
	 * 二级分类名称
	 * 
	 * @return
	 * @throws Exception
	 */
	int getSecondCategoryObjectCount(Long appId, String l1CateName, String l2CateName) throws Exception;
	
	/**
	 * 查询三级分类下所有对象概要
	 * 
	 * @param l1CateName
	 * 一级分类名称
	 * @param l2CateName
	 * 二级分类名称
	 * @param l3CateName
	 * 三级分类名称
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbObjectSummary> getThirdCategoryObjects(String l1CateName, String l2CateName, String l3CateName) throws Exception;
	
	/**
	 * 查询指定系统三级分类下所有对象概要
	 * 
	 * @param appId
	 * 系统ID
	 * @param l1CateName
	 * 一级分类名称
	 * @param l2CateName
	 * 二级分类名称
	 * @param l3CateName
	 * 三级分类名称
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbObjectSummary> getThirdCategoryObjects(Long appId, String l1CateName, String l2CateName, String l3CateName) throws Exception;
	
	/**
	 * 三级分类下的对象数量
	 * 
	 * @param l1CateName
	 * 一级分类名称
	 * @param l2CateName
	 * 二级分类名称
	 * @param l3CateName
	 * 三级分类名称
	 * 
	 * @return
	 * @throws Exception
	 */
	int getThirdCategoryObjectCount(String l1CateName, String l2CateName, String l3CateName) throws Exception;
	
	/**
	 * 指定系统下三级分类的对象数量
	 * 
	 * @param appId
	 * 系统对象ID
	 * @param l1CateName
	 * 一级分类名称
	 * @param l2CateName
	 * 二级分类名称
	 * @param l3CateName
	 * 三级分类名称
	 * 
	 * @return
	 * @throws Exception
	 */
	int getThirdCategoryObjectCount(Long appId, String l1CateName, String l2CateName, String l3CateName) throws Exception;
	
	/**
	 * 获取指定三级分类ID下, 受监控的对象数量
	 * 
	 * @param categoryId
	 * 对象的分类ID
	 * 
	 * @return
	 * @throws Exception 
	 */
	Long getMonitorObjectCount(CmdbConstants.Category category) throws Exception;
	
	/**
	 * 获取指定多个三级分类ID下, 受监控的对象数量
	 * 
	 * @param categoryIds
	 * 对象的分类ID
	 * 
	 * @return
	 * @throws Exception
	 */
	Map<Integer, Long> getMonitorObjectCount(List<CmdbConstants.Category> categories) throws Exception;
	
	/**
	 * 获取指定系统/某个三级分类ID下, 受监控的对象数量
	 * 
	 * @param appObjectId
	 * 系统CMDB对象ID
	 * 
	 * @param category
	 * 对象的分类ID
	 * 
	 * @return
	 * @throws Exception 
	 */
	Long getMonitorObjectCount(Long appObjectId, CmdbConstants.Category category) throws Exception;
	
	/**
	 * 获取指定系统/多个三级分类ID下, 受监控的对象数量
	 * 
	 * @param appObjectId
	 * 系统CMDB对象ID
	 * 
	 * @param categories
	 * 对象的分类ID
	 * 
	 * @return
	 * @throws Exception
	 */
	Map<Integer, Long> getMonitorObjectCount(Long appObjectId, List<CmdbConstants.Category> categories)
			throws Exception;
}
