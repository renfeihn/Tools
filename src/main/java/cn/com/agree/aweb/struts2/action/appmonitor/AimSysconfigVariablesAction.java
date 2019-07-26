package cn.com.agree.aweb.struts2.action.appmonitor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.service.ISysconfigVariables;
@Controller("AimSysconfigVariablesActionBean")
@Scope("prototype")
public class AimSysconfigVariablesAction extends StandardActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = -8583381786840740485L;
	@Autowired
	private ISysconfigVariables sysconfigVariables;
	
	
	public ISysconfigVariables getSysconfigVariables() {
		return sysconfigVariables;
	}


	public void setSysconfigVariables(ISysconfigVariables sysconfigVariables) {
		this.sysconfigVariables = sysconfigVariables;
	}


	public AimSysconfigVariablesAction() {
		// TODO Auto-generated constructor stub
	}
	
	public String getEsbConfig(){
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sysconfigVariables.getEsbConfig()));
		return SUCCESS;
	}
	
	

}
