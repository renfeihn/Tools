package tc.cama.aweb.service;

import java.util.List;

import tc.cama.aweb.bean.PageAppSummary;
import tc.cama.aweb.bean.PageAppView;
import tc.cama.aweb.model.AwebUserAttentionObj;

/**
 * 应用总览
 * @author huangjun
 *
 */
public interface IAppOverview {

	/**
	 * 查询：
	 * 1.全部应用的数量
	 * 2.不同分组下应用的数量
	 * 3.预警、故障的数量
	 * 4.所有应用
	 * @return
	 * @throws Exception
	 */
	public PageAppView getAppsData(String username) throws Exception;
	
	
	/**
	 * 查询所有应用
	 * @return
	 * @throws Exception 
	 */
	public List<PageAppSummary> getAllAppList(String username) throws Exception;
	
	/**
	 * 查询指定分组下的应用列表
	 * @param groupId 分组id
	 * @return
	 * @throws Exception 
	 */
	public List<PageAppSummary> getAppForGroup(Long groupId, String username) throws Exception;
	
	/**
	 * 查询所有应用的预警和故障数size：2,list(0)：预警、list(1)故障
	 * @param objType 对象类型
	 * @return
	 */
	public List<Integer> getEventCount(int objType);
	
	/**
	 * 查询用户关注
	 * @param username 用户名
	 * @return
	 */
	List<AwebUserAttentionObj> getUserAttentionByUsername(String username);

	/**
	 * 取消用户对某个应用的关注
	 * @param username 用户名
	 * @param objId 应用id
	 * @return
	 */
	public String cancelUserAttentionObj(String username, int objId);
	
	/**
	 * 添加用户对某个应用的关注
	 * @param username 用户名
	 * @param objId 应用id
	 * @return
	 */
	public String addUserAttentionObj(AwebUserAttentionObj userAttentionObj);
}
