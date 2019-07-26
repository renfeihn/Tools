package cn.com.agree.aweb.struts2.action;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;

/**
 * 
 *
 * @author lihao lihao01@cfischina.com
 * Sep 1, 2015
 */
public class SessionSyncAction extends StandardActionSupport {

	private static final long serialVersionUID = -4653170361634150241L;

	private StrutsMessage strutsMessage;
	
	/**
	 * 获取sessionid
	 * @return
	 */
	public String sessionId() {
		strutsMessage = StrutsMessage.successMessage().addParameter("sessionId", getSession().getId());
		return SUCCESS;
	}

	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}
	
	public void setStrutsMessage(StrutsMessage strutsMessage) {
		this.strutsMessage = strutsMessage;
	}
	
}
