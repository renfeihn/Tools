package tc.cama.aweb.service;

import java.util.List;

import tc.cama.aweb.bean.Node;
import tc.cama.aweb.model.AwebUser;

public interface IUserManager {

	/**
	 * 根据用户名查询用户
	 * 
	 * @return
	 */
	public AwebUser getUserByUsername(String username);

	/**
	 * 保存用户
	 * 
	 * @param user
	 * @return
	 */
	public int saveUser(AwebUser user);

	/**
	 * 修改用户信息
	 * 
	 * @param user
	 * @return
	 */
	public int updateUserByUsername(AwebUser user);

	/**
	 * 删除用户
	 * 
	 * @param username
	 * @return
	 */
	public int deleteUserByUsername(String username);

	/**
	 * 重置密码
	 * 
	 * @param username
	 * @param password
	 */
	public int resetPassword(String username, String password);

	/**
	 * 修改密码
	 * 
	 * @param username
	 * @param oldPassword
	 * @param newPassword
	 */
	public int modifyPassword(String username, String oldPassword, String newPassword);

	/**
	 * 查询所有用户
	 * 
	 * @return
	 */
	public List<AwebUser> getAllUsers();

	/**
	 * 查询用户拥有的所有角色对应的菜单树结构
	 * 
	 * @param username
	 * @return
	 */
	public Node getTreeMenuByUsername(String username);

}
