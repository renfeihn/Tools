package tc.cama.aweb.service;

import java.util.List;
import java.util.Set;

import tc.cama.aweb.model.AwebMenu;


public interface IClassifyManager {

	/**
	 * 根据角色id查询当前角色拥有的交易
	 * 
	 * @param roleId
	 * @return
	 */
	public List<AwebMenu> getMenuByRoleId(Integer roleId);

	/**
	 * 查询菜单
	 * 
	 * @return
	 */
	public List<AwebMenu> getMenu();
	
	/**
	 * 查询分类
	 * 
	 * @return
	 */
	public List<AwebMenu> getClassify();

	/**
	 * 查询子菜单id，包括当前菜单id
	 * 
	 * @param mid
	 * @return
	 */
	public Set<Integer> getSubMemuIds(Integer mid);
	
	/**
	 * 保存分类
	 * 
	 * @param menu
	 * @return
	 */
	public int saveClassify(AwebMenu menu);

	/**
	 * 修改分类信息
	 * 
	 * @param menu
	 * @return
	 */
	public int updateClassifyByMid(AwebMenu menu);

	/**
	 * 删除分类，并删除该分类下的子分类（包括交易）
	 * 
	 * @param mid
	 */
	public int deleteClassifyByMid(Integer mid);


	
	
}
