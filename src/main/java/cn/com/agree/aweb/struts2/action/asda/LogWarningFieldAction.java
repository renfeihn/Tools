package cn.com.agree.aweb.struts2.action.asda;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.warning.model.AimlCfgLogWarningField;
import tc.bank.asda.warning.service.IAimlCfgLogWarningFieldService;

@Controller("LogWarningFieldActionBean")
@Scope("prototype")
public class LogWarningFieldAction extends StandardActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = -919863080977537244L;
	
	@Autowired
	private IAimlCfgLogWarningFieldService warningFieldService;
	
	private long id;
	
	private String name;
	
	private String warnValue;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getWarnValue() {
		return warnValue;
	}

	public void setWarnValue(String warnValue) {
		this.warnValue = warnValue;
	}

	/**
	 * 获取所有的预警字段
	 * @return
	 */
	public String getAllWarningFields() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", warningFieldService.getAllWarningFields()));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 删除预警字段
	 * @return
	 */
	public String delWarningField() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", warningFieldService.delWarningField(id)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 删除预警字段
	 * @return
	 */
	public String addWarningField() {
		try {
			AimlCfgLogWarningField field = new AimlCfgLogWarningField();
			field.setName(name);
			field.setWarnValue(warnValue);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", warningFieldService.addWarningField(field)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 修改预警字段
	 * @return
	 */
	public String updateWarningField() {
		try {
			AimlCfgLogWarningField field = new AimlCfgLogWarningField();
			field.setId(id);
			field.setName(name);
			field.setWarnValue(warnValue);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", warningFieldService.updateWarningField(field)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
}
