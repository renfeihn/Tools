package cn.com.agree.aweb.struts2.action.system;

import java.util.List;

import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.DES;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.CycleDetectionStrategy;
import tc.cama.aweb.bean.Node;
import tc.cama.aweb.model.AwebUser;
import tc.cama.aweb.service.IUserManager;

@Controller("AwebUserBean")
@Scope("prototype")
public class UserAction extends StandardActionSupport implements ModelDriven<AwebUser> {
	private static final long serialVersionUID = -7188190320323050599L;
	private String oldPassword;
	private String newPassword = "888888";
	private AwebUser user = new AwebUser();
	private StrutsMessage strutsMessage;

	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}

	public void setStrutsMessage(StrutsMessage strutsMessage) {
		this.strutsMessage = strutsMessage;
	}

	@Override
	public AwebUser getModel() {
		return user;
	}

	@Autowired
	private IUserManager userService;

	public String getOldPassword() {
		return oldPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public AwebUser getUser() {
		return this.user;
	}

	public void setUser(AwebUser user) {
		this.user = user;
	}

	public String getAllUsers() {
		List<AwebUser> users = userService.getAllUsers();
		if (users.size() != 0) {
			strutsMessage = StrutsMessage.successMessage().addParameter("users", users);
		} else {
			strutsMessage = StrutsMessage.errorMessage("用户数据查询失败！");
		}
		return SUCCESS;
	}

	public String getUserByUserName() {
		AwebUser user1 = userService.getUserByUsername(user.getUsername());
		if (user1 != null) {
			strutsMessage = StrutsMessage.successMessage().addParameter("user", user1);
		} else {
			strutsMessage = StrutsMessage.errorMessage("用户数据查询失败！");
		}
		return SUCCESS;
	}

	public String addUser() throws Exception {
		int result = userService.saveUser(user);
		if (result != 0) {
			strutsMessage = StrutsMessage.successMessage().addParameter("result", result);
		} else {
			strutsMessage = StrutsMessage.errorMessage("添加用户失败！");
		}
		return SUCCESS;
	}

	public String deleteUser() {
		int result = userService.deleteUserByUsername(user.getUsername());
		if (result != 0) {
			strutsMessage = StrutsMessage.successMessage().addParameter("result", result);
		} else {
			strutsMessage = StrutsMessage.errorMessage("删除用户失败！");
		}
		return SUCCESS;
	}

	public String updateUser() {
		int result = userService.updateUserByUsername(user);
		if (result != 0) {
			strutsMessage = StrutsMessage.successMessage().addParameter("result", result);
		} else {
			strutsMessage = StrutsMessage.errorMessage("修改用户失败！");
		}
		return SUCCESS;
	}

	public String resetPassword() {
		int result = userService.resetPassword(user.getUsername(), DES.getEncString(newPassword));
		if (result != 0) {
			strutsMessage = StrutsMessage.successMessage().addParameter("result", result);
		} else {
			strutsMessage = StrutsMessage.errorMessage("修改密码失败！");
		}
		return SUCCESS;
	}

	public String modifyPassword() {
		int result = userService.modifyPassword(user.getUsername(), oldPassword, newPassword);
		if (result != 0) {
			strutsMessage = StrutsMessage.successMessage().addParameter("result", result);
		} else {
			strutsMessage = StrutsMessage.errorMessage("修改密码失败！");
		}
		return SUCCESS;
	}
	
	/**
	 * 密码重置
	 * @return
	 */
	public String resetPwd() {
		int result = userService.resetPassword(user.getUsername(), DES.getEncString("888888"));
		if (result > 0) {
			strutsMessage = StrutsMessage.successMessage();
		} else {
			strutsMessage = StrutsMessage.errorMessage("重置密码失败！");
		}
		return SUCCESS;
	}

	/**
	 * 查询用户拥有的所有角色对应的菜单，树结构组织形式
	 * 
	 * @return
	 */
	public String getTreeMenuByUsername() {
		String curUsername = (String) ServletActionContext.getRequest().getSession().getAttribute("username");
		Node tree = userService.getTreeMenuByUsername(curUsername);
		if (tree != null) {
			// 处理树形结构转json时出现死循环
			JsonConfig jc = new JsonConfig();
			jc.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
			System.out.println(JSONObject.fromObject(tree, jc));
			strutsMessage = StrutsMessage.successMessage().addParameter("menu", JSONObject.fromObject(tree, jc));
		} else {
			strutsMessage = StrutsMessage.errorMessage("菜单加载失败！");
		}
		return SUCCESS;
	}

}
