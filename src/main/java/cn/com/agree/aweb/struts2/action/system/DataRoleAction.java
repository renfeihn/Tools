package cn.com.agree.aweb.struts2.action.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.model.AimAppGroupView;
import tc.cama.aweb.model.AwebRole;
import tc.cama.aweb.service.IRoleDataService;
/**
 * 角色数据
 * @author Win7-user
 *
 */
@Controller("DataRoleBean")
@Scope("prototype")
public class DataRoleAction extends StandardActionSupport implements ModelDriven<AwebRole>{

	/**
	 * 
	 */
	private static final long serialVersionUID = -3426951373385139020L;
	private AwebRole role = new AwebRole();
	private String objIds = "";
	private Integer roleId;
	public AwebRole getRole() {
		return role;
	}

	public void setRole(AwebRole role) {
		this.role = role;
	}

	public String getObjIds() {
		return objIds;
	}

	public void setObjIds(String objIds) {
		this.objIds = objIds;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	@Autowired
	private IRoleDataService roleDataService;
	
	/**
	 * 查询所有菜单数据和当前角色拥有的交易
	 * @return
	 */
	public String getAllMenu() {
		//所有菜单数据,未按照菜单排序字段升序排序，待修改
		List<AimAppGroupView> allList = roleDataService.getAppGroupList();
		//当前角色拥有的交易
		List<AimAppGroupView> roleList = roleDataService.getAppGroupByRoleId(this.roleId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("lists", allList).addParameter("ownList", roleList));
		return SUCCESS;
	}
	
	
	/**
	 * 更新角色权限
	 * @return
	 */
	public String updatePriv(){
		String msg = roleDataService.updateRolesPriv(role.getRid(), objIds);
		setStrutsMessage(getStrutsMessageBean(msg));
		return SUCCESS;
	}
	
	/**
	 * 获取StrutsMessage对象
	 * 
	 * @param msg
	 * @return
	 */
	private StrutsMessage getStrutsMessageBean(String msg) {
		return "".equals(msg) ? StrutsMessage.successMessage() : StrutsMessage.errorMessage(msg);
	}
	
	/**
	 * 查询所有角色
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getAllRole() throws Exception {
		List<AwebRole> allRoles = roleDataService.getAllRoleList();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("list", allRoles));
		return SUCCESS;
	}

	@Override
	public AwebRole getModel() {
		return role;
	}

}
