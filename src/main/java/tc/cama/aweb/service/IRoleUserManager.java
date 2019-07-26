package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;

import tc.cama.aweb.model.AwebRole;
import tc.cama.aweb.model.AwebUserRoleView;

public interface IRoleUserManager {
	/**
	 * 查询用户信息和用户拥有的角色数
	 * 
	 * @param username
	 * @return
	 */
	public Map<String, Object> getUserAndRolesByUsername(String username);

	/**
	 * 根据用户名查寻所有角色
	 * 
	 * @param username
	 * @return
	 */
	public List<AwebUserRoleView> getRolesByUsername(String username);

	/**
	 * 查询未拥有角色
	 * 
	 * @param username
	 * @return
	 */
	public List<AwebRole> getUnRoleByUsername(String username);

	/**
	 * 编辑权限
	 * 
	 * @param username
	 * @param rid
	 */
	public int updateRoleByUsername(String username, int rid);

	/**
	 * 为用户新增权限
	 * 
	 * @param username
	 * @param rid
	 */
	public int addUserRole(String username, int rid);

	/**
	 * 回收用户权限
	 * 
	 * @param username
	 * @param rid
	 */
	public int removeUserRoleByUsername(String username, int rid);

	/**
	 * 查询所有的用户信息和角色分配与否
	 * 
	 * @param username
	 * @return
	 */
	public List<Object[]> getUserAndRoles();

	/**
	 * 清除原有角色，并重新分配角色
	 * 
	 * @param ids
	 * @param username
	 * @return
	 */
	public int reDistribute(String rids, String username);
}
