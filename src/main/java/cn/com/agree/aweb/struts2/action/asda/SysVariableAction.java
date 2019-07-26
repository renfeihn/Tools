package cn.com.agree.aweb.struts2.action.asda;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.sysvariable.service.ISysVariableService;
import tc.bank.cama.core.module.AimSysconfigVariables;

@Controller("SysVariableActionBean")
@Scope("prototype")
public class SysVariableAction extends StandardActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = 9212448343752610129L;
	
	@Autowired
	private ISysVariableService sysVariableService;
	
	private Integer id;
	
	private String val;
	
	private String valDesc;
	
	private String whereEx;
	
	private String bean;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getVal() {
		return val;
	}

	public void setVal(String val) {
		this.val = val;
	}

	public String getValDesc() {
		return valDesc;
	}

	public void setValDesc(String valDesc) {
		this.valDesc = valDesc;
	}
	
	public String getWhereEx() {
		return whereEx;
	}

	public void setWhereEx(String whereEx) {
		this.whereEx = whereEx;
	}
	
	public String getBean() {
		return bean;
	}

	public void setBean(String bean) {
		this.bean = bean;
	}

	/**
	 * 获取所有常量
	 * @return
	 */
	public String getAllSysVariable() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sysVariableService.getAllSysVariable()));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 修改常量值
	 * @return
	 */
	public String updateSysVariable() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sysVariableService.updateSysVariable(id, val, valDesc)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 
	 * @return
	 */
	public String getSysVariableByCon() {
		try {
			@SuppressWarnings("unchecked")
			Map<String,Object> conditionMap = JSONObject.parseObject(whereEx, Map.class);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sysVariableService.getSysVariableByCon(conditionMap)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 
	 * @return
	 */
	public String addSysVariable() {
		try {
			AimSysconfigVariables sysconfigVariables = JSONObject.parseObject(bean, AimSysconfigVariables.class);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sysVariableService.addSysVariable(sysconfigVariables)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
}
