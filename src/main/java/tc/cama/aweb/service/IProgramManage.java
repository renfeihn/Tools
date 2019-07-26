package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;

import tc.bank.cama.cmdb.model.table.extention.CmdbLogicalServer;
import tc.bank.cama.cmdb.model.table.extention.CmdbProcessPort;
import tc.bank.cama.cmdb.model.view.CmdbAppSoftware;
import tc.bank.cama.cmdb.model.view.CmdbPortAppSoftware;
import tc.bank.cama.cmdb.model.view.CmdbProcessAppSoftware;
import tc.bank.cama.cmdb.model.view.CmdbProcessPortCount;


/**
 * 应用程序管理
 *
 */
public interface IProgramManage {
	
	/**
	 * 修改软件的进程信息
	 * 
	 * @param procRecordId
	 * 进程记录ID
	 * 
	 * @param processName
	 * 进程名称
	 * 
	 * @param processDescription
	 * 进程描述
	 * 
	 * @return
	 * @throws Exception
	 */
	String modifySoftwareProcess(Long procRecordId, String processName, String processDescription,String processCmd) throws Exception;

	/**
	 * 删除软件的进程
	 * 
	 * @param procRecordId
	 * 进程记录ID
	 * 
	 * @return
	 * @throws Exception
	 */
	String removeSoftwareProcess(Long procRecordId) throws Exception;
	
	/**
	 * 新增软件的进程
	 * 
	 * @param swObjectId
	 * 软件对象ID
	 * 
	 * @param processName
	 * 进程名称
	 * 
	 * @param processDescription
	 * 进程描述
	 * 
	 * @return
	 * @throws Exception
	 */
	String newSoftwareProcess(Long swObjectId, String processName, String processDescription,String processCmd) throws Exception;
	
	/**
	 * 新增软件进程的端口
	 * 
	 * @param swObjectId
	 * 软件对象ID
	 * 
	 * @param procRecordId
	 * 进程记录ID
	 * 
	 * @param port
	 * 进程监听端口
	 * 
	 * @param portDescription
	 * 监听端口描述
	 * 
	 * @return
	 * @throws Exception
	 */
	String newSoftwareProcessPort(Long swObjectId, Long procRecordId, int port, String portDescription) throws Exception;
	
	/**
	 * 修改软件进程的端口信息
	 * 
	 * @param portRecordId
	 * 端口记录ID
	 * 
	 * @param port
	 * 进程监听端口
	 * 
	 * @param portDescription
	 * 监听端口描述
	 * 
	 * @return
	 * @throws Exception
	 */
	String modifySoftwareProcessPort(Long portRecordId, int port, String portDescription) throws Exception;
	
	/**
	 * 删除软件进程的端口信息
	 * 
	 * @param portRecordId
	 * 端口记录ID
	 * 
	 * @return
	 * @throws Exception
	 */
	String removeSoftwareProcessPort(Long portRecordId) throws Exception;
	
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
	 * 获取所有应用程序
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbAppSoftware> getAllSoftwares() throws Exception;
	
	/**
	 * 获取一级分类[软件]的所有对象的公共概要信息
	 * @return
	 * @throws Exception
	 */
	public List<CmdbAppSoftware> getAllFirstCategorySoftwares() throws Exception;

	/**
	 * 新增应用程序
	 * 
	 * @param cateId
	 * 应用程序所属的分类ID
	 * 
	 * @param appObjectId
	 * 应用程序所属的系统对象ID
	 * 
	 * @param softwareName
	 * 应用程序名称
	 * 
	 * @param srvObjectId
	 * 应用程序所属的逻辑服务器对象ID
	 * 
	 * @param swAttributes
	 * 应用程序其他属性
	 * <li> serviceIp, 服务IP
	 * <li> manageIp, 管理IP
	 * <li> version, 版本信息
	 * <li> swHome, 按照路径
	 * <li> jvmVersion, JVM版本
	 * <li> isCluster, 集群标志(0-非集群, 1-集群)
	 * 
	 * @throws Exception
	 */
	boolean newSoftware(Long cateId, Long appObjectId, String softwareName, Long srvObjectId, Map<String,Object> swAttributes) throws Exception;
	
	/**
	 * 根据应用程序ID, 删除与其相关的信息<br>
	 * 应用程序相关信息包括:
	 * <li> 应用程序在cmdb_objects的信息
	 * <li> 应用程序在cmdb_object_summary的信息
	 * <li> 应用程序在cmdb_object_extention的信息
	 * <li> 应用程序在对应的明细表里的信息
	 * <li> cmdb_object_relation中, 与应用程序相关的, relation_type=APP_SW的信息
	 * <li> cmdb_object_relation中, 与应用程序相关的, relation_type=SW_SERVER的信息
	 * <li> cmdb_object_relation中, APP_LOGSRV的信息
	 * 
	 * @param appObjectId
	 * 系统对象ID
	 * 
	 * @param swObjectId
	 * 软件对象ID
	 * 
	 * @throws Exception
	 */
	void removeSoftware(Long appObjectId, Long swObjectId) throws Exception;
	
	/**
	 * 修改应用程序自身的属性
	 * 
	 * @param swObjectId
	 * 软件对象ID
	 * 
	 * @param swAttributes
	 * <li> softwareName, 软件名称
	 * <li> version, 版本信息
	 * <li> swHome, 按照路径
	 * <li> jvmVersion, JVM版本
	 * <li> isCluster, 集群标志(0-非集群, 1-集群)
	 * 
	 * @return
	 * @throws Exception
	 */
	Integer modifySoftwareDetail(Long swObjectId, Map<String,Object> swAttributes) throws Exception;
	
	
	/**
	 * 获取IP地址关联的逻辑服务器
	 * 
	 * @param ipAddr
	 * IP地址
	 * 
	 * @return
	 * @throws Exception
	 */
	CmdbLogicalServer getIPRelatedServers(String ipAddr) throws Exception;
	
	/**
	 * 获取进程相关联信息
	 * @return
	 * @throws Exception
	 */
	List<CmdbProcessAppSoftware> getProcessRelatedInfo() throws Exception;
	
	/**
	 * 应用系统与软件筛选
	 * @param appObjectId
	 * @param swObjectId
	 * @return
	 * @throws Exception 
	 * @throws NumberFormatException 
	 */
	List<CmdbProcessAppSoftware> getProcessRelatedInfo(String appObjectId, String swObjectId) throws NumberFormatException, Exception;
	
	/**
	 * 获取端口相关联信息
	 * @return
	 * @throws Exception
	 */
	List<CmdbPortAppSoftware> getPortRelatedInfo() throws Exception;
	
	/**
	 * 获取应用系统下的软件
	 * @return
	 * @throws Exception
	 */
	List<Object> getAppRelatedSoftwares(Long appId) throws Exception;

	List<CmdbPortAppSoftware> getPortRelatedInfo(String appObjectId,
			String swObjectId) throws Exception;

	List<CmdbAppSoftware> getAllFirstCategorySoftwares(String appId)
			throws Exception;

	List<CmdbAppSoftware> getAllSoftwares(String appId) throws Exception;


	
}
