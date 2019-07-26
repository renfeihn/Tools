package cn.com.agree.aweb.struts2.action.tymh;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.cama.core.bean.AppEventPreview;
import tc.cama.aweb.service.IAppEventView;

/**
 * 应用事件总览
 *
 */
@Controller("TYMHActionBean")
@Scope("prototype")
public class TYMHAction extends StandardActionSupport {

	private static final long serialVersionUID = 1L;
	@Autowired
	private IAppEventView appEventView;

	private int appId;

	public int getAppId() {
		return appId;
	}

	public void setAppId(int appId) {
		this.appId = appId;
	}

	public String getEventData() {
		AppEventPreview eventData = appEventView.getEventData(appId, 0, 0,getUsername());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("eventData", eventData.getItilEvents().getItilEvent()));
		return SUCCESS;
	}
	
	/**
	 * 获取当前session中用户名
	 * 
	 * @return
	 */
	private String getUsername() {
		return (String) getSession().getAttribute("username");
	}
}
