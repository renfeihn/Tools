package tc.cama.aweb.service.attention;

import java.util.List;

import tc.cama.aweb.model.AwebUserAttentionObj;

public interface IUserAttention {

	/**
	 * 查询用户关注
	 * @param username 用户名
	 * @return
	 */
	List<AwebUserAttentionObj> getUserAttentionByUsername(String username);
	
	/**
	 * 查询用户是否关注某个对象
	 * @param username
	 * @return
	 */
	Boolean isUserAttentionObj(String username, Long objId);

	/**
	 * 取消用户对某个应用的关注
	 * @param username 用户名
	 * @param objId 应用id
	 * @return
	 */
	int cancelUserAttentionObj(String username, int objId);
	
	/**
	 * 添加用户对某个应用的关注
	 * @param username 用户名
	 * @param objId 应用id
	 * @return
	 */
	int addUserAttentionObj(AwebUserAttentionObj userAttentionObj);
	
	/**
	 * 查询某个对象的关注信息
	 * @param objId 对象id
	 * @return
	 */
	List<AwebUserAttentionObj> getUserAttentionByObjid(Long objId);
	
}
