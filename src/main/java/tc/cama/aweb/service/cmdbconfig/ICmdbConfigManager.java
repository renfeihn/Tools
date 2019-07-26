package tc.cama.aweb.service.cmdbconfig;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

public interface ICmdbConfigManager {
	
	List<Map<String, Object>> queryAlllevelCmdbConfig(String pid)
			throws SQLException;

	Map<String, Object> queryAllCmdbObject(String conf_id) throws SQLException;

	int updateCmdbObject(Map<String, Object> updateData, String conf_id)
			throws SQLException;

	int removeObjs(List<Long> objIds, String conf_id) throws SQLException;

	Map<String, Object> getRelation(List<Long> soruce_objIds,
			String soruce_cateId, String target_cateId) throws SQLException;

	void setRelation(List<Long> soruce_objIds, String soruce_cateId,
			String target_cateId, List<Long> target_objIds) throws SQLException;

	Map<String, Object> getObjInfo(Long objId, String conf_id)
			throws SQLException;

	List<Map<String, Object>> getCmdbModule(String conf_id) throws SQLException;

	int importCmdbData(List<Map<String, Object>> insertDatas, String conf_id)
			throws SQLException;

	Map<String, Object> exportCmdbData(String conf_id) throws SQLException;

	List<Map<String, Object>> queryObjSummaryByCateId(String cateId)
			throws SQLException;

	Object updateTopoCate(Map<String, Object> topoData, String topoId, int flag)
			throws SQLException;

	Object updateTopoContent(Map<String, Object> topoData, String topoId,
			List<Map<String, Object>> topoItems, int flag, String username)
			throws SQLException;

	List<Map<String, Object>> queryAllCate() throws SQLException;

	/**
	 * 删除软件
	 * @param cateId
	 * @return
	 */
	boolean delSoftWare(String cateId);
	/**
	 * 添加软件
	 * @param softwareName
	 * @return
	 */
	Long addSoftWare(String softwareName);

	/**
	 * 根据应用获取应用下关联的资源
	 * @param app_id
	 * @return
	 * @throws Exception
	 */
	JSONObject getAppRelaObjs(Long app_id) throws Exception;

	/**
	 * 根据对象id获取关联数据
	 * @param objId
	 * @return
	 * @throws Exception
	 */
	List<Map<String, Object>> getObjRelations(Long objId) throws Exception;

	/**
	 * 根据应用id获取拓扑图
	 * @param app_id
	 * @return
	 * @throws Exception
	 */
	List<Map<String, Object>> getAppTopo(Long app_id) throws Exception;

	boolean addObjRel(String flag, Long id, JSONArray nodeList)
			throws Exception;
	
	/**
	 * 根据关系id删除关系
	 * @param record_id
	 * @return
	 * @throws Exception
	 */
	public boolean delObjRel(Long record_id) throws Exception;
}
