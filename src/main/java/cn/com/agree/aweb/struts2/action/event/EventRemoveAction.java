package cn.com.agree.aweb.struts2.action.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.Constants;
import cn.com.agree.aweb.service.impl.RemoteServiceImpl;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.model.AwebUser;

/***
 * 事件解除
 *
 */
@Controller("EventRemoveActionBean")
@Scope("prototype")
public class EventRemoveAction extends StandardActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int eventId;
	
	@Autowired
	RemoteServiceImpl remoteService;
	
	public int getEventId() {
		return eventId;
	}

	public void setEventId(int eventId) {
		this.eventId = eventId;
	}

	/**
	 * 通过eventId更新事件状态解除事件
	 * @return
	 * @throws Exception
	 */
	public String removeEvent() throws Exception{
		AwebUser user = (AwebUser) (this.getSession().getAttribute(Constants.SESSION_USERVO));
		JSONObject reqData = new JSONObject();
		reqData.put("eventId", eventId);
		reqData.put("eventOwner", user.getUsername());
		JSONObject data = remoteService.exchange("server", "A031", reqData);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("rows",data.get("rows")));
		return SUCCESS;
	}
}
