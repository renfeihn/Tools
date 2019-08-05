package cn.com.agree.aweb.struts2.action.system;


import java.io.File;
import java.text.ParseException;
import java.util.Map;

import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;

import cn.com.agree.aweb.Constants;
import cn.com.agree.aweb.service.aweb.ILoginService;
import cn.com.agree.aweb.session.HttpSessionContainer;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;

/**
 * 用户登录类，处理登录退出等相关功能
 * @author luotong
 *
 */
@Controller("LoginBean")
@Scope("prototype")
public class LoginAction extends StandardActionSupport {
	
	private static final long serialVersionUID = 4153459105735166064L;

	@Autowired
	private ILoginService loginServer;
	
	private String username;
	private String password;
	private String sid;
	private String jsonPath;
	private String oldPassword;
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSid() {
		return sid;
	}

	public void setSid(String sid) {
		this.sid = sid;
	}

	public String getJsonPath() {
		return jsonPath;
	}

	public void setJsonPath(String jsonPath) {
		this.jsonPath = jsonPath;
	}

	public String getOldPassword() {
		return oldPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

	/**
	 * 登录
	 * @return
	 * @throws Exception
	 */
	public String signIn() throws Exception{
		String msg = loginServer.signIn(username, password);
		setStrutsMessage(getStrutsMessageBean(msg));
		return SUCCESS;
	}
	/**
	 * 退出登录
	 * @return
	 * @throws Exception
	 */
	public String signOut(){
		loginServer.signOut(sid);
		setStrutsMessage(StrutsMessage.successMessage());
		return SUCCESS;
	}
	
	/**
	 * 修改用户
	 * @return
	 * @throws ParseException 
	 */
	public String doEditUser() throws ParseException{
		String msg = loginServer.doEditUser(oldPassword,username, password);
		setStrutsMessage(getStrutsMessageBean(msg));
		return SUCCESS;
	}
	
	/**
	 * @Description:获取当前用户 
	 */
	public String loadNowUser(){
		setStrutsMessage(StrutsMessage.successMessage().addParameter("userVO",this.getSession().getAttribute(Constants.SESSION_USERVO)));
		return SUCCESS;
	}
	/**
	 * 重定向
	 * @return
	 */
	public String redirect() {
		if (getSession() != null && HttpSessionContainer.contains(getSession())){
			return "redirect";
		}
		return "login";
	}
	
	/**
	 * 获取项目js插件的最后修改时间
	 * @return
	 */
	public String getModifyTime(){
		Map<?, ?> mapPath = JSON.toJavaObject(JSON.parseObject(jsonPath), Map.class);
		long lastTime = 0;
		for (Object key : mapPath.keySet()) {
			String path = ServletActionContext.getServletContext().getRealPath(mapPath.get(key) + ".js");
			File file = new File(path);
			if(file.lastModified() > lastTime){
				lastTime = file.lastModified();
			}
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("lastTime", lastTime));
		return SUCCESS;
	}
	
	/**
	 * 获取StrutsMessage对象
	 * @param msg
	 * @return
	 */
	private StrutsMessage getStrutsMessageBean(String msg){
		return "".equals(msg) ? StrutsMessage.successMessage() : StrutsMessage.errorMessage(msg);
	}
	
}