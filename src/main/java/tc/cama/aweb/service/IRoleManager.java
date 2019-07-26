package tc.cama.aweb.service;

import java.util.List;

import tc.cama.aweb.model.AwebRole;

public interface IRoleManager {

	/**
	 * 查询所有角色列表 
	 * @return
	 * @throws Exception 
	 */
	public List<AwebRole> getAllRoleList() throws Exception;
	
	/**
	 * 查询所有启用的角色列表 
	 * @return
	 * @throws Exception 
	 */
	public List<AwebRole> getAllRoleListUsed() throws Exception;

	/**
	 * 保存角色
	 * @return
	 * @throws Exception 
	 */
	public String saveRoleByBean(AwebRole role);
	
	/**
	 * 编辑角色
	 * @return
	 * @throws Exception 
	 */
	public String editRoleByBean(AwebRole role);
	
	/**
	 * 通过id删除角色
	 * @param rid
	 * @return
	 */
	public String delRoleById(int rid);
	
	/**
	 * 更新菜单权限
	 * @param rid
	 * @param mids
	 * @return
	 */
	public String updateRolesPriv(int rid, String mids); 
}
