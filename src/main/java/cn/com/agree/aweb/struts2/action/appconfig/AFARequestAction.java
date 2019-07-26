package cn.com.agree.aweb.struts2.action.appconfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.service.IRemoteService;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;

@Controller("AFARequestActionBean")
@Scope("prototype")
public class AFARequestAction extends StandardActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String appType;
	private String target;
	private String args;
	private StrutsMessage strutsMessage;

	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}

	public void setStrutsMessage(StrutsMessage strutsMessage) {
		this.strutsMessage = strutsMessage;
	}

	@Autowired
	private IRemoteService remoteService;

	public IRemoteService getRemoteService() {
		return remoteService;
	}

	public String getAppType() {
		return appType;
	}

	public void setAppType(String appType) {
		this.appType = appType;
	}

	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public String getArgs() {
		return args;
	}

	public void setArgs(String args) {
		this.args = args;
	}

	public void setRemoteService(IRemoteService remoteService) {
		this.remoteService = remoteService;
	}

	public String callAfaApp() {
		JSONObject params = new JSONObject();
		params = JSONObject.parseObject(args);
		params=params==null?new JSONObject():params;
		params.put("userName", getUserName());
		JSONObject result = remoteService.exchange(appType, target, params);
		strutsMessage = StrutsMessage.successMessage().addParameter("result", result);
		return SUCCESS;
	}
}
