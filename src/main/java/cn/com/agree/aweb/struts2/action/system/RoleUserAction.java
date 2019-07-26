package cn.com.agree.aweb.struts2.action.system;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.model.AwebRole;
import tc.cama.aweb.model.AwebRoleUser;
import tc.cama.aweb.model.AwebUserRoleView;
import tc.cama.aweb.service.IRoleUserManager;

//角色管理 
@Controller("AwebRoleUserBean")
@Scope("prototype")
public class RoleUserAction extends StandardActionSupport implements ModelDriven<AwebRoleUser> {
	private static final long serialVersionUID = -1611977992670859341L;
	@Autowired
	private IRoleUserManager roleUserService;
    private String ids;
    private AwebRoleUser roleUser = new AwebRoleUser();
    private String name;
    
    public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}

	public void setStrutsMessage(StrutsMessage strutsMessage) {
		this.strutsMessage = strutsMessage;
	}
	private StrutsMessage strutsMessage;
	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}
	
	@Override
	public AwebRoleUser getModel() {
		return this.roleUser;
	}

	public String getNname() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	public IRoleUserManager getRoleUserService() {
		return roleUserService;
	}

	public void setRoleUserService(IRoleUserManager roleuserService) {
		this.roleUserService = roleuserService;
	}

	// 编辑角色
	public String updateRole() {
		int result = roleUserService.updateRoleByUsername(roleUser.getUsername(), roleUser.getRid());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}

	// 删除用户的角色
	public String removeRole() {
		int result = roleUserService.removeUserRoleByUsername(roleUser.getUsername(), roleUser.getRid());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}

	// 新增用户角色(单个)
	public String addRole() {
		int result = roleUserService.addUserRole(roleUser.getUsername(), roleUser.getRid());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}

	// 查询当前用户拥有的角色
	public String getRolesByUsername() {
		List<AwebUserRoleView> list = roleUserService.getRolesByUsername(roleUser.getUsername());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("list", list));
		return SUCCESS;
	}

	// 查询未拥有角色
	public String getUnHaveRole() {
		List<AwebRole> roles = roleUserService.getUnRoleByUsername(roleUser.getUsername());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("roles", roles));
		return SUCCESS;
	}
   //查询所有用户信息及角色分配情况
	public String getUserAndRoles(){
		List<Object[]> roles = roleUserService.getUserAndRoles();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("roles", roles));
		return SUCCESS;
	}
	 //查询所有用户信息及已分配角色个数
		public String getUserAndRolesByUsername(){
			Map<String,Object> roles = (Map<String, Object>) roleUserService.getUserAndRolesByUsername(roleUser.getUsername());
		 	setStrutsMessage(StrutsMessage.successMessage().addParameter("roles", roles));
			return SUCCESS;
		}
	// 清除原有角色，新增角色
		public String reDistribute(){
			int result=roleUserService.reDistribute(ids, name);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",result));
			return SUCCESS;
		}
}
