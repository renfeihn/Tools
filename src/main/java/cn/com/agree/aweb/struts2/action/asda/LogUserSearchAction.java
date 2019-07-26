package cn.com.agree.aweb.struts2.action.asda;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.logconfig.model.AimUserSearch;
import tc.bank.asda.logconfig.service.IAimLogUserSearch;

@Controller("LogUserSearchActionBean")
@Scope("prototype")
public class LogUserSearchAction extends StandardActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = -774339103279428853L;

	@Autowired
	private IAimLogUserSearch logUserSearch;


	/**
	 * 用户搜索内容
	 */
	private String text;

	public IAimLogUserSearch getLogUserSearch() {
		return logUserSearch;
	}

	public void setLogUserSearch(IAimLogUserSearch logUserSearch) {
		this.logUserSearch = logUserSearch;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
	
	/**
	 * 保存用户搜索记录信息
	 */
	public String addUserSearchInfo() {
		try {
			AimUserSearch userSearch = new AimUserSearch();
			userSearch.setText(text);
			userSearch.setUserId(this.getUserVO().getId());
			logUserSearch.saveLogUserSearchByBean(userSearch);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "OK"));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 获取当前用户搜索记录信息
	 */
	public String queryUserSearchInfoById() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logUserSearch.getLogUserSearchById(this.getUserVO().getId())));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 清除当前用户搜索记录信息
	 */
	public String delLogUserSearchById() {
		try {
			logUserSearch.delLogUserSearchById(this.getUserVO().getId());
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "OK"));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
}
