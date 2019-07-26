package cn.com.agree.aweb.struts2.action.basemonitor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.base_monitor.storm.IStormService;

@Controller("StormMonitorAction")
@Scope("prototype")
public class StormMonitorAction  extends StandardActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4230338628366849453L;

	@Autowired
	private IStormService service;
	
	private String path;
	

	public String getPath() {
		return path;
	}


	public void setPath(String path) {
		this.path = path;
	}


	/**获取详细
	 * @return
	 * @throws Exception
	 */
	public String getAppDetail() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.getAppDetail(path)));
		return SUCCESS;
	}
	
}
