package tc.bank.cama.cmdb.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import tc.bank.cama.cmdb.model.table.network.CmdbNetworkFlow;
import tc.bank.cama.cmdb.model.table.network.CmdbNetworkInflowCount;
import tc.bank.cama.cmdb.model.view.CmdbIpRelatedAppAndServer;

/**
 * 网络IP/端口通讯查询接口
 */
public interface NetworkFlowQuery {

	/**
	 * 查询所有网络IP/端口信息和IP接入数量信息
	 * 
	 * @return
	 */
	List<CmdbNetworkInflowCount> getAllNetworkFlows() throws Exception;
	
	/**
	 * 查询某个远端IP/端口的所有接入IP地址
	 * 
	 * @param remoteIp
	 * 远端IP地址
	 * 
	 * @param remotePort
	 * 远端端口
	 * 
	 * @return
	 */
	List<String> getInflowIpAddresses(String remoteIp, int remotePort) throws Exception;
	
	/**
	 * 按应用系统, 查询系统接出的IP/端口, 和接入系统的IP/端口信息
	 * 
	 * @param appObjectId
	 * 系统CMDB对象ID
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbNetworkFlow> getApplicationNetworkFlow(Long appObjectId) throws Exception;
	
	/**
	 * 获取与IP地址相关系统和逻辑服务器信息
	 * 
	 * @param ipAddrs
	 * IP地址列表
	 * 
	 * @return
	 * @throws Exception
	 */
	Map<String,CmdbIpRelatedAppAndServer> getIpRelatedAppsAndServers(Set<String> ipAddrs) throws Exception;
}
