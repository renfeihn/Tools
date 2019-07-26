package cn.com.agree.aweb.struts2.action.appmonitor;

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
 * @author luotong
 *
 */
@Controller("AppEventViewActionBean")
@Scope("prototype")
public class AppEventViewAction extends StandardActionSupport {

	private static final long serialVersionUID = 1L;
	@Autowired
	private IAppEventView appEventView;

	private int appId;

	private int interval;// echarts时间间隔

	private int periodTime;// 时间段

	public int getAppId() {
		return appId;
	}

	public void setAppId(int appId) {
		this.appId = appId;
	}

	public int getInterval() {
		return interval;
	}

	public void setInterval(int interval) {
		this.interval = interval;
	}

	public int getPeriodTime() {
		return periodTime;
	}

	public void setPeriodTime(int periodTime) {
		this.periodTime = periodTime;
	}

	public String getEventData() {
		AppEventPreview eventData = appEventView.getEventData(appId, interval, periodTime,getUsername());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("eventData", eventData).addParameter("echartsData",
				eventData.getEchartsData()));
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