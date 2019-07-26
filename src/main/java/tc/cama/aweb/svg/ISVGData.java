package tc.cama.aweb.svg;

import java.util.Map;

import tc.bank.cama.cmdb.model.view.CmdbIpRelatedAppAndServer;

public interface ISVGData {

	/**
	 * 根据应用id获取相关的SVG图
	 * @param appId
	 * @return
	 * @throws Exception 
	 */
	public String getSvgGraph(Long appId) throws Exception;
	
	/**
	 * 根据ip地址获取关联的服务器信息
	 * @param ipAddrs
	 * @return
	 * @throws Exception
	 */
	public Map<String,CmdbIpRelatedAppAndServer> getIpRelatedAppsAndServers(String ipAddr) throws Exception;
}
