package tc.cama.aweb.service;

import java.util.List;

import tc.bank.cama.cmdb.model.table.network.CmdbNetworkInflowCount;

/**
 * 配置管理-网络管理
 * @author huangjun
 *
 */
public interface IConfigManage {

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
	 * @param remotePort
	 * @return
	 */
	List<String> getInflowIpAddresses(String remoteIp, int remotePort) throws Exception;
	
	/**
	 * 添加网络IP/端口通讯信息
	 * 
	 * @param localIp
	 * 本端IP
	 * 
	 * @param remoteIp
	 * 远端IP
	 * 
	 * @param remotePort
	 * 远端端口
	 * 
	 * @return
	 */
	String addNetworkFlow(String localIp, String remoteIp, int remotePort) throws Exception;
	
	/**
	 * 删除连接到<code>destIp:destPort</code>, IP地址为<code>sourceIp</code>的记录
	 * 
	 * @param localIp
	 * 本端IP
	 * 
	 * @param remoteIp
	 * 远端IP
	 * 
	 * @param remotePort
	 * 远端端口
	 * 
	 * @return
	 * @throws Exception
	 */
	String removeNetworkFlow(String localIp, String remoteIp, int remotePort) throws Exception;
}
