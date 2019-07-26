package tc.cama.aweb.service;

import java.util.List;

import tc.cama.aweb.model.AimAppGroupView;
import tc.cama.aweb.model.AwebRole;

public interface IRoleDataService {
	
	
	/**
	 * 根据角色id查询当前角色拥有的系统应用
	 * 
	 * @param roleId
	 * @return
	 */
	public List<AimAppGroupView> getAppGroupByRoleId(Integer roleId);

	/**
	 * 查询所有系统应用
	 * 
	 * @return
	 */
	public List<AimAppGroupView> getAppGroupList();
	/**
	 * 更新角色的权限
	 * @param rid
	 * @param objIds
	 * @return
	 */
	public String updateRolesPriv(Integer rid, String objIds);
	/**
	 * 得到所有角色列表
	 * @return
	 */
	public List<AwebRole> getAllRoleList();
}
