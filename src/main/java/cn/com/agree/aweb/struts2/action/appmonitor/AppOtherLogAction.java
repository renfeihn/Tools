package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.bean.AimlOther;
import tc.cama.aweb.service.IAppOtherLog;

@Scope("prototype")
@Controller("AppOtherLogActionBean")
public class AppOtherLogAction extends StandardActionSupport{
	
	private static final long serialVersionUID = 1L;
	
	@Autowired
	private IAppOtherLog appOtherLogService;
	/**
	 * 应用ID
	 */
	Long appId;
	
	public IAppOtherLog getAppOtherLogService() {
		return appOtherLogService;
	}
	
	public void setAppOtherLogService(IAppOtherLog appOtherLogService) {
		this.appOtherLogService = appOtherLogService;
	}
	
	public Long getAppId() {
		return appId;
	}
	
	public void setAppId(Long appId) {
		this.appId = appId;
	}
	
	public String statCurrDayOther() throws Exception{
		List<AimlOther> statOther = appOtherLogService.statCurrDayOther(appId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("statOther", statOther));
		return SUCCESS;
	}

}
