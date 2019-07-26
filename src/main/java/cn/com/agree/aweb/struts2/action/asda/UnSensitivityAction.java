package cn.com.agree.aweb.struts2.action.asda;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.logconfig.model.AimlCfgLogUnSensitivity;
import tc.bank.asda.logconfig.service.IAimLogUnSensitivityService;

@Controller("unSensitivityActionBean")
@Scope("prototype")
public class UnSensitivityAction extends StandardActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Autowired
	private IAimLogUnSensitivityService unSensitivityService;

	/**
	 * 脱敏ID
	 */
	private long id;
	/**
	 * 脱敏描述
	 */
	private String description;
	/**
	 * 脱敏规则RegEx
	 */
	private String regex;
	/**
	 * 脱敏规则RegEx
	 */
	private String replaced;
	/**
	 * 角色列表
	 */
	private List<Long> rids;
	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getRegex() {
		return regex;
	}

	public void setRegex(String regex) {
		this.regex = regex;
	}

	public String getReplaced() {
		return replaced;
	}

	public void setReplaced(String replaced) {
		this.replaced = replaced;
	}

	public List<Long> getRids() {
		return rids;
	}

	public void setRids(List<Long> rids) {
		this.rids = rids;
	}

	/**
	 * 添加脫敏規則
	 * 
	 * @return
	 */
	public String add() {
		try {
			AimlCfgLogUnSensitivity unSensitivity = new AimlCfgLogUnSensitivity();
			unSensitivity.setDescription(description);
			unSensitivity.setRegex(regex);
			unSensitivity.setReplaced(replaced);
			if(null != rids && rids.size()>0) {
				unSensitivity.setRids(StringUtils.join(rids, ","));
			}
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", unSensitivityService.add(unSensitivity)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 修改脫敏規則
	 * 
	 * @return
	 */
	public String update() {
		try {
			AimlCfgLogUnSensitivity unSensitivity = new AimlCfgLogUnSensitivity();
			unSensitivity.setId(id);
			unSensitivity.setDescription(description);
			unSensitivity.setRegex(regex);
			unSensitivity.setReplaced(replaced);
			if(null != rids && rids.size()>0) {
				unSensitivity.setRids(StringUtils.join(rids, ","));
			}
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", unSensitivityService.update(unSensitivity)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 刪除脫敏規則
	 * 
	 * @return
	 */
	public String delById() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", unSensitivityService.delById(id)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 查詢所有的脫敏規則
	 * 
	 * @return
	 */
	public String getAll() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", unSensitivityService.getAll()));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
}
