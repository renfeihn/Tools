package tc.bank.cama.cmdb.service;

import java.util.List;

import tc.bank.cama.cmdb.model.table.extention.CmdbLogicalServer;

/**
 * 逻辑服务器查询接口
 */
public interface LogicalServerQuery {

	/**
	 * 获取软件关联的逻辑服务器
	 * 
	 * @param swObjectId
	 * 软件对象ID
	 * 
	 * @return
	 * @throws Exception
	 */
	CmdbLogicalServer getSoftwareRelatedServer(Long swObjectId) throws Exception;
	
	/**
	 * 获取系统关联的逻辑服务器
	 * 
	 * @param appObjectId
	 * 系统对象ID
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbLogicalServer> getAppRelatedServers(Long appObjectId) throws Exception;
	
	/**
	 * 获取IP地址关联的逻辑服务器
	 * 
	 * @param ipObjectId
	 * IP对象ID
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbLogicalServer> getIPRelatedServers(Long ipObjectId) throws Exception;
	
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
	 * 获取IP地址关联的逻辑服务器
	 * @param ipAddrs
	 * @return
	 * @throws Exception
	 */
	List<CmdbLogicalServer> getIPRelatedServers(List<String> ipAddrs) throws Exception;

	/**
	 * 获取物理服务器关联的逻辑服务器
	 * 
	 * @param srvObjectId
	 * 物理服务器对象ID
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbLogicalServer> getHardwareRelatedServers(Long srvObjectId) throws Exception;
}
