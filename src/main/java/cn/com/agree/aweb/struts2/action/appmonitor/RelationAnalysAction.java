package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.service.RelationAnalysisService;

@Controller("RelationAnalysBean")
@Scope("prototype")
public class RelationAnalysAction extends StandardActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1681192255516994661L;
	@Autowired
	private RelationAnalysisService relationAnalysisService;
	private Integer eventId;
    private int[] appIds;
	public Integer getEventId() {
		return eventId;
	}

	public void setEventId(Integer eventId) {
		this.eventId = eventId;
	}

	public int[] getAppIds() {
		return appIds;
	}

	public void setAppIds(int[] appIds) {
		this.appIds = appIds;
	}

	public String getRelatedEvents() throws Exception {
		List<Map<String, Object>> eventList = relationAnalysisService.getRelatedEvents(eventId,appIds);
		String message = relationAnalysisService.getConclusion(eventId, eventList);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("eventList", eventList).addParameter("conclusion",
				message));
		return SUCCESS;
	}
}
