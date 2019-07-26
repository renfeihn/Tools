package cn.com.agree.aweb.struts2.action.appmonitor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.service.ILogManager;

@Controller("LogManagerActionBean")
@Scope("prototype")
public class LogManagerAction extends StandardActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5599837079330253784L;
	@Autowired
	private ILogManager logManager;
	private String fileName;
	private String info;
	private String type;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}



	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public ILogManager getLogManager() {
		return logManager;
	}

	public void setLogManager(ILogManager logManager) {
		this.logManager = logManager;
	}

	public String getConfigName() throws Exception {
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logManager.getConfigName()));
		return SUCCESS;
	}

	public String getConfigtempletName() throws Exception {
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logManager.getConfigtempletName()));
		return SUCCESS;
	}

	public String getConfigInfo() throws Exception {
		String content = new String(logManager.getConfigInfo(fileName), "UTF-8");
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", content));
		return SUCCESS;
	}
	
	public String getTempletInfo() throws Exception {
		String content = new String(logManager.getTempletInfo(fileName));
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", content));
		return SUCCESS;
	}
	public String subConfig() throws Exception {
		logManager.subConfig(fileName, info);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", true));
		return SUCCESS;
	}
	public String delConfig() throws Exception {
		logManager.delConfig(fileName, type);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", true));
		return SUCCESS;
	}
}
