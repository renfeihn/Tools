package tc.bank.cama.cmdb.service;

import java.util.Map;


/**
 * 应用程序维护接口
 */
public interface SoftwareMaintain {

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
	Integer modifySoftwareProcess(Long procRecordId, String processName, String processDescription) throws Exception;

	/**
	 * 删除软件的进程
	 * 
	 * @param procRecordId
	 * 进程记录ID
	 * 
	 * @return
	 * @throws Exception
	 */
	Integer removeSoftwareProcess(Long procRecordId) throws Exception;
	
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
	Integer newSoftwareProcess(Long swObjectId, String processName, String processDescription) throws Exception;
	
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
	Integer newSoftwareProcessPort(Long swObjectId, Long procRecordId, int port, String portDescription) throws Exception;
	
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
	Integer modifySoftwareProcessPort(Long portRecordId, int port, String portDescription) throws Exception;
	
	/**
	 * 删除软件进程的端口信息
	 * 
	 * @param portRecordId
	 * 端口记录ID
	 * 
	 * @return
	 * @throws Exception
	 */
	Integer removeSoftwareProcessPort(Long portRecordId) throws Exception;
	
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
	void newSoftware(Long cateId, Long appObjectId, String softwareName, Long srvObjectId, Map<String,Object> swAttributes) throws Exception;
	
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
}
