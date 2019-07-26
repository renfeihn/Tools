package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;

import tc.bank.cama.cmdb.model.table.extention.CmdbLogicalServer;

import com.aim.alibaba.fastjson.JSONObject;

public interface IAgentManager {
	List<Map<String, Object>> queryAgentList(JSONObject whereMap);
	
	/**
	 * 根据CMDB配置查询代理
	 * @param queryType
	 * @param queryValue
	 * @return
	 */
	List<Map<String, Object>> queryAgentListByCmdb(String queryType, String queryValue);
	
	/**
	 * 新增代理
	 * @param whereMap
	 * @return
	 */
	boolean saveAgent(JSONObject saveMap);
	
	/**
	 * 修改代理
	 * @param ip
	 * @param user
	 * @param updateMap
	 * @return
	 */
	boolean modifyAgent(String ip,JSONObject updateMap);
	
	/**
	 * 根据Ip获得代理信息
	 * @param ip
	 * @return
	 */
	List<Map<String, Object>> getAgentByIp(String ip);
	
	/**
	 * 根据ip获取服务器信息
	 * @param ip
	 * @return
	 */
	CmdbLogicalServer getServerByIp(String ip) throws Exception ;
	
	/**
	 * 根据ip获取删除代理信息
	 * @param ip
	 * @return
	 */
	
	boolean deleteAgentByIp(String[] ipArr);
	
	
	/**
	 * 根据ip检查配置是否存在
	 * @param ip
	 * @return
	 */
	boolean checkAgentByIp(String ip);
	
	
	/**
	 * 获取代理压缩包列表
	 * @return
	 */
	List<Map<String,Object>> getAgentList();
	
	/**
	 * 获取操作系统类型
	 * @return
	 */
	List<String> getOsTypeList();
	
	/**
	 * 获取代理文件上传配置
	 * @return
	 * @throws Exception 
	 */
	Map<String,String> getAgentUploadConfig() throws Exception;

	List<Map<String, Object>> queryAgentOSList(JSONObject whereMap);

	List<Map<String, Object>> getAgentOS(JSONObject whereMap);
	
	List<Map<String, Object>> getIpOperHis(String ip);

	List<Map<String, Object>> queryAgentListByApp(Long app_id);
}
