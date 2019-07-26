package cn.com.agree.aweb.struts2.action.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.model.AwebRole;
import tc.cama.aweb.service.IRoleManager;
/**
 * 角色管理类
 * @author luotong
 *
 */
@Controller("RoleManageActionBean")
@Scope("prototype")
public class RoleManageAction extends StandardActionSupport implements ModelDriven<AwebRole> {

	private static final long serialVersionUID = 4153459105735166064L;

	@Autowired
	private IRoleManager roleService;

	private AwebRole role = new AwebRole();
	private String mids = "";

	public AwebRole getRole() {
		return role;
	}

	public void setRole(AwebRole role) {
		this.role = role;
	}

	public String getMids() {
		return mids;
	}

	public void setMids(String mids) {
		this.mids = mids;
	}

	/**
	 * 查询所有角色
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getAllRole() throws Exception {
		List<AwebRole> allRoles = roleService.getAllRoleList();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("list", allRoles));
		return SUCCESS;
	}
	
	/**
	 * 查询所有启用的角色
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getAllRoleUsed() throws Exception {
		List<AwebRole> allRoles = roleService.getAllRoleListUsed();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("list", allRoles));
		return SUCCESS;
	}

	/**
	 * 新增角色
	 * 
	 * @return
	 */
	public String toSaveRole() {
		String msg = roleService.saveRoleByBean(role);
		setStrutsMessage(getStrutsMessageBean(msg));
		return SUCCESS;
	}

	/**
	 * 编辑角色
	 * 
	 * @return
	 */
	public String toEditRole() {
		String msg = roleService.editRoleByBean(role);
		setStrutsMessage(getStrutsMessageBean(msg));
		return SUCCESS;
	}

	/**
	 * 删除角色
	 * 
	 * @return
	 */
	public String toDelRole() {
		String msg = roleService.delRoleById(role.getRid());
		setStrutsMessage(getStrutsMessageBean(msg));
		return SUCCESS;
	}

	/**
	 * 更新角色权限
	 * @return
	 */
	public String updatePriv(){
		String msg = roleService.updateRolesPriv(role.getRid(), mids);
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

	@Override
	public AwebRole getModel() {
		return role;
	}

}