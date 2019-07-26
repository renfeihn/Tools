package tc.cama.aweb.service;

import java.util.List;

import tc.cama.aweb.model.AwebUserRoleView;

public interface IUserRoleViewManager {
	
	/**
	 * 获取所有角色分配
	 * 
	 * @return
	 */
	public List<AwebUserRoleView> getAllRolesAllocate();

	/**
	 * 根据用户名获取当前用户的所有角色
	 * 
	 * @param username
	 * @return
	 */
	public List<AwebUserRoleView> getRolesAllocateByUsername(String username);

}
