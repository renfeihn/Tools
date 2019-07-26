package tc.cama.aweb.service;

import java.util.List;

import tc.cama.aweb.bean.Node;
import tc.cama.aweb.model.AwebUserRoleMenuView;

public interface IUserRoleMenuViewManager {
	
	/**
	 * 查询用户所有角色对应的菜单，将数据组织为线形结构
	 * 
	 * @param username
	 * @return
	 */
	public List<AwebUserRoleMenuView> getAllMenuListByUsername(String username);

	/**
	 * 查询用户所有角色对应的菜单，将数据组织为树状结构
	 * 
	 * @param username
	 * @return
	 */
	public Node getTreeMenuByUsername(String username);

}
