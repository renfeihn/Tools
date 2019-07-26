package tc.bank.cama.cmdb.service;

import java.util.List;
import java.util.Map;

import tc.bank.cama.cmdb.model.table.extention.CmdbProcessPort;
import tc.bank.cama.cmdb.model.view.CmdbAppSoftware;
import tc.bank.cama.cmdb.model.view.CmdbObjectCategoryCount;
import tc.bank.cama.cmdb.model.view.CmdbProcessAppSoftware;
import tc.bank.cama.cmdb.model.view.CmdbProcessPortCount;
import tc.bank.cama.cmdb.model.view.CmdbProcessPortDetail;

/**
 * 软件查询接口
 */
public interface SoftwareQuery {
	
	/**
	 * 查询指定逻辑服务器关联的软件明细
	 * 
	 * @param serverId
	 * 逻辑服务器对象ID
	 * 
	 * @return
	 * @throws Exception
	 */
	List<Object> getServerRelatedSoftwares(Long serverId) throws Exception;
	
	/**
	 * 查询指定系统关联的软件明细
	 * 
	 * @param appId
	 * 系统对象ID
	 * 
	 * @return
	 * @throws Exception
	 */
	List<Object> getAppRelatedSoftwares(Long appId) throws Exception;

	/**
	 * 查询指定软件的进程和端口明细
	 * 
	 * @param softwareId
	 * 软件对象ID
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbProcessPortDetail> getSoftwareProcessAndPort(Long softwareId) throws Exception;
	
	
	/**
	 * 查询指定软件的进程和端口数
	 * 
	 * @param softwareId
	 * 软件对象ID
	 * 
	 * @return
	 * <li>第一个元素是进程数量
	 * <li>第二个元素是进程端口数量
	 * 
	 * @throws Exception
	 */
	List<Long> getSoftwareProcessAndPortCount(Long softwareId) throws Exception;
	
	/**
	 * 查询逻辑服务器关联软件的二级分类和数量
	 * 
	 * @param serverId
	 * 逻辑服务器对象ID
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbObjectCategoryCount> getSecondCategorySoftwareCount(Long serverId) throws Exception;
	
	/**
	 * 查询逻辑服务器关联软件的三级分类和数量
	 * 
	 * @param serverId
	 * 逻辑服务器对象ID
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbObjectCategoryCount> getThirdCategorySoftwareCount(Long serverId) throws Exception;
	
	/**
	 * 查询软件对象某个进程的所有端口信息
	 * 
	 * @param softwareId
	 * 软件对象ID
	 * 
	 * @param procRecordId
	 * 进程记录ID
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbProcessPort> getSoftwarePortInfo(Long softwareId, Long procRecordId) throws Exception;
	
//	/**
//	 * 查询软件下的所有进程, 以及每个进程包含的监听端口数量
//	 * 
//	 * @param swObjectId
//	 * 软件对象ID
//	 * 
//	 * @return
//	 * <li> map-key, 进程名称
//	 * <li> map-value, 对应的监听端口数
//	 * 
//	 * @throws Exception
//	 */
//	Map<String,Integer> getSoftwarePortCount(Long swObjectId) throws Exception;
	
	/**
	 * 查询软件下的所有进程, 以及每个进程包含的监听端口数量
	 * 
	 * @param swObjectId
	 * 软件对象ID
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbProcessPortCount> getSoftwarePortCount(Long swObjectId) throws Exception;
	
	/**
	 * 获取逻辑服务器下, 属于某个系统的, 按软件的二级分类统计数量
	 * 
	 * @param srvObjectId
	 * 逻辑服务器对象ID
	 * 
	 * @param appObjectId
	 * 系统对象ID
	 * 
	 * @return
	 * <li> map-key, 软件二级分类名称
	 * <li> map-value, 软件数量
	 * 
	 * @throws Exception
	 */
	Map<String,Long> getServerRelatedSoftwareCount(Long srvObjectId, Long appObjectId) throws Exception;
	
	/**
	 * 获取所有应用程序
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbAppSoftware> getAllSoftwares() throws Exception;
	
	/**
	 * 获取所有进程相关信息
	 * @return
	 * @throws Exception
	 */
	List<CmdbProcessAppSoftware> getAllProcess() throws Exception;
}
