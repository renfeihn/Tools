package tc.bank.cama.cmdb.service;

/**
 * 网络IP/端口通讯修改接口
 */
public interface NetworkFlowModifier {

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
	Integer addNetworkFlow(String localIp, String remoteIp, int remotePort) throws Exception;
	
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
	Integer removeNetworkFlow(String localIp, String remoteIp, int remotePort) throws Exception;
}
