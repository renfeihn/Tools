package tc.cama.aweb.service;

import java.util.List;

import tc.bank.cama.cmdb.model.table.CmdbObjectCategory;
import tc.bank.cama.cmdb.model.table.extention.CmdbApplication;
import tc.cama.aweb.bean.EventInFo;
import tc.cama.aweb.bean.PageCfgObjectSummary;
import tc.cama.aweb.bean.PageCfgSoftDeploy;

/**
 * 应用配置总览 
 * @author zhangkun
 *
 */
public interface IAppConfigOverview {
	/**
	 * 查询全部三级分类
	 * @return
	 * @throws Exception
	 */
	List<CmdbObjectCategory> getAllCategories() throws Exception;
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
	List<PageCfgObjectSummary> getFirstCategoryObjects(Long appId, String l1CateName,String username) throws Exception;
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
	List<PageCfgObjectSummary> getSecondCategoryObjects(Long appId, String l1CateName, String l2CateName,String username) throws Exception;

	/**
	 * 查询三级分类下所有对象概要
	 * @param appId
	 *  系统ID
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
	
	List<PageCfgObjectSummary> getThirdCategoryObjects(Long appId,String l1CateName, String l2CateName, String l3CateName,String username) throws Exception;
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
	/**
	 * 查询逻辑服务器关联的系统明细
	 * 
	 * @param objectId
	 * 对象ID
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbApplication> getLogicServerRelatedApps(Long objectId) throws Exception;
	/**
	 * 查询逻辑服务器关联软件的二级分类和数量
	 * 
	 * @param serverId
	 * 逻辑服务器对象ID
	 * 
	 * @return
	 * @throws Exception
	 */
	public PageCfgSoftDeploy getSoftwareDeploy(Long logicServerId) throws Exception;
	/**
	 * 获取单个对象的进程数和端口数
	 * @param logicServerId
	 * @return
	 */
	public List<Long>getPortPross(Long logicServerId) throws Exception;
	 /**
	  * 获取对象的事件信息和触发器信息
	  * @param logicServerId
	  * @return
	  */
	public EventInFo getAppCfgEventByObjectId (Long objectId) throws Exception;
	
}
