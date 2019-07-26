package cn.com.agree.aweb.struts2.action.appmonitor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;
import com.opensymphony.xwork2.util.ResolverUtil.Test;

import cn.com.agree.aweb.service.IRemoteService;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;

@Controller("CommWithAFABean")
public class CommWithAFA extends StandardActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = 2236361603169934109L;
	public CommWithAFA() {
		// TODO Auto-generated constructor stub
	}
	
	@Autowired
	private IRemoteService remoteService;
	public IRemoteService getRemoteService() {
		return remoteService;
	}
	public void setRemoteService(IRemoteService remoteService) {
		this.remoteService = remoteService;
	}
	

	public String commincationWithAFA(){
		JSONObject jo = new JSONObject();
		jo.put("rcvrList", new String[]{"彭立阳","周伟荣"});
		jo.put("subject", "test");
		jo.put("mailInfo", "test-content");
		jo.put("mailattach", new String[]{"d:/test.txt"});
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", remoteService.exchange("aweb", "T004", jo)));
		return SUCCESS; 
	}
	
	public String getAllTest(){
		JSONObject req = new JSONObject();
		JSONObject whereEx= new JSONObject();
		req.put("entityClassName", Test.class.getName());
		req.put("whereEx", whereEx);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", remoteService.exchange("aweb", "C011",req)));

		return SUCCESS;
	}

}
