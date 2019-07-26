package cn.com.agree.aweb.struts2.action.ab;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.ab.model.AimAbsAgentCur;
import tc.cama.aweb.ab.service.IAimAbcAgentCurManager;
import tc.cama.aweb.bean.AbsBean;
import tc.cama.aweb.bean.AsbPortState;

@Controller("AimAbsAgentBean")
@Scope("prototype")
public class AimAbsAgentAction extends StandardActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7435860542072840017L;
	@Autowired
	IAimAbcAgentCurManager absManager;
	private int mobjId;
	
	public int getMobjId() {
		return mobjId;
	}
	public void setMobjId(int mobjId) {
		this.mobjId = mobjId;
	}
	public String getAgentCurByObjId() {
		AimAbsAgentCur result = absManager.getAgentCurByObjId(mobjId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}
	public String getAgentCurByObjIdDate() {
		Map<String, List<String>> result = absManager.getAgentCurByObjIdDate(mobjId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", result));
		return SUCCESS;
	}
	public String getAgentRepPortsByObjId() {
		AsbPortState result = absManager.getAgentRepPortsByObjId(mobjId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", result.getEchartsData()).addParameter("absCur", result.getAbsCur()));
		return SUCCESS;
	}
	public String getAgentFileByObjId() {
		Map<String, List<String>> result = absManager.getAgentFileByObjId(mobjId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", result));
		return SUCCESS;
	}
	public String getPlatformState() {
		AbsBean result = absManager.getPlatformState(mobjId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", result));
		return SUCCESS;
	}
}
