package cn.com.agree.aweb.struts2.action.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.service.IMessSendConfig;
@Scope("prototype")
@Controller("MessSendConfigActionBean")
public class MessSendConfigAction extends StandardActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Autowired
	private IMessSendConfig messSendConfig;
	private String  platform;
	private String  gname;
	private String gid;
	private String roleId;
	private String username;
	private String telPhone;
	private String mail;
	private List<String> userIds;
	private String userId;
	private List<String> appIds;
	private List<String> gids;
	private int flag;
	public String getPlatform() {
		return platform;
	}
	public void setPlatform(String platform) {
		this.platform = platform;
	}
	public String getGname() {
		return gname;
	}
	public void setGname(String gname) {
		this.gname = gname;
	}
	public String getGid() {
		return gid;
	}
	public void setGid(String gid) {
		this.gid = gid;
	}
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getTelPhone() {
		return telPhone;
	}
	public void setTelPhone(String telPhone) {
		this.telPhone = telPhone;
	}
	public String getMail() {
		return mail;
	}
	public void setMail(String mail) {
		this.mail = mail;
	}
	public List<String> getUserIds() {
		return userIds;
	}
	public void setUserIds(List<String> userIds) {
		this.userIds = userIds;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public List<String> getAppIds() {
		return appIds;
	}
	public void setAppIds(List<String> appIds) {
		this.appIds = appIds;
	}
	
	public List<String> getGids() {
		return gids;
	}
	public void setGids(List<String> gids) {
		this.gids = gids;
	}
	
	public int getFlag() {
		return flag;
	}
	public void setFlag(int flag) {
		this.flag = flag;
	}
	public String addGroup() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",messSendConfig.addGroup(platform, gname, gid, roleId)));
		return SUCCESS;
	}
	public String updateGroup() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",messSendConfig.updateGroup(gid, platform, gname, roleId)));
		return SUCCESS;
	}
	public String addUser() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",messSendConfig.addUser(username, telPhone, mail, gids, roleId)));
		return SUCCESS;
	}
	public String delGroup() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",messSendConfig.delGroup(gid)));
		return SUCCESS;
	}
	public String queryAllApp() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",messSendConfig.queryAllApp()));
		return SUCCESS;
	}
	public String setGroupUsers() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",messSendConfig.setGroupUsers(gid, roleId, userIds)));
		return SUCCESS;
	}
	public String updateUser() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",messSendConfig.updateUser(userId, username, telPhone, mail, gids, roleId)));
		return SUCCESS;
	}
	public String delUser() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",messSendConfig.delUser(userId)));
		return SUCCESS;
	}
	public String setUserApp() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",messSendConfig.setUserApp(userId, appIds)));
		return SUCCESS;
	}
	public String queryGroup() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",messSendConfig.queryGroup(gid)));
		return SUCCESS;
	}
	public String queryUserInfo() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",messSendConfig.queryUserInfo(userId)));
		return SUCCESS;
	}
	public String queryUserAppInfo() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",messSendConfig.queryUserAppInfo(userId)));
		return SUCCESS;
	}
	public String groupSendOrStop() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",messSendConfig.groupSendOrStop(gid, flag)));
		return SUCCESS;
	}
}
