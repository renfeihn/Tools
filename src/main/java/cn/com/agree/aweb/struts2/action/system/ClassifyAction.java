package cn.com.agree.aweb.struts2.action.system;


import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.model.AwebMenu;
import tc.cama.aweb.service.IClassifyManager;

@Controller("ClassifyBean")
@Scope("prototype")
public class ClassifyAction extends StandardActionSupport implements ModelDriven<AwebMenu>{

	private static final long serialVersionUID = 4153459105735166064L;

	@Autowired
	private IClassifyManager classifyManager;
	
	
	private Integer roleId;
	private AwebMenu menu=new AwebMenu();
	private Integer menuId;
	
	public Integer getRoleId() {
		return roleId;
	}

	public AwebMenu getMenu() {
		return menu;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public void setMenu(AwebMenu menu) {
		this.menu = menu;
	}

	public Integer getMenuId() {
		return menuId;
	}

	public void setMenuId(Integer menuId) {
		this.menuId = menuId;
	}

	/**
	 * 查询所有菜单数据和当前角色拥有的交易
	 * @return
	 */
	public String getAllMenu() {
		
		//所有菜单数据,未按照菜单排序字段升序排序，待修改
		List<AwebMenu> menus = classifyManager.getMenu();
		
		//当前角色拥有的交易
		List<AwebMenu> roleMenus = classifyManager.getMenuByRoleId(this.roleId);
		
		setStrutsMessage(StrutsMessage.successMessage().addParameter("lists", menus).addParameter("ownList", roleMenus));
		return SUCCESS;
	}
	
	/**
	 * 查询分类
	 * @return
	 */
	public String getClassify() {
		
		//未按照菜单排序字段升序排序，待修改
		List<AwebMenu> menus = classifyManager.getClassify();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("lists", menus));
		return SUCCESS;
	}
	
	/**
	 * 查询子菜单id，包括当前菜单id
	 * @return
	 */
	public String getSubMemuIds() {
		Set<Integer> menuIds = classifyManager.getSubMemuIds(this.menuId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("list", menuIds));
		return SUCCESS;
	}
	
	/**
	 * 保存分类
	 * @return
	 */
	public String saveClassify(){
		int count = classifyManager.saveClassify(this.menu);
		if(count>0){
			setStrutsMessage(StrutsMessage.successMessage());
		}else{
			setStrutsMessage(StrutsMessage.errorMessage("保存分类失败！"));
		}
		return SUCCESS;
	}
	
	/**
	 * 修改分类信息
	 * @param menu
	 * @return
	 */
	public String updateClassify(){
		int count = classifyManager.updateClassifyByMid(this.menu);
		if(count>0){
			setStrutsMessage(StrutsMessage.successMessage());
		}else{
			setStrutsMessage(StrutsMessage.errorMessage("修改分类信息失败！"));
		}
		return SUCCESS;
	}
	
	/**
	 * 删除分类，并删除该分类下的子分类
	 * @return
	 */
	public String deleteClassify() {
		classifyManager.deleteClassifyByMid(this.menuId);
		setStrutsMessage(StrutsMessage.successMessage());
		return SUCCESS;
	}

	@Override
	public AwebMenu getModel() {
		return menu;
	}
	
	
}
