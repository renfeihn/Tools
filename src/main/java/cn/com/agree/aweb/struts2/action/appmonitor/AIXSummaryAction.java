package cn.com.agree.aweb.struts2.action.appmonitor;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;



import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.EchartsUtils;
import tc.bank.common.core.Timeline;
import tc.cama.aweb.bean.AIXSummaryBaseInfo;
import tc.cama.aweb.service.IAIXSummary;

/**
 * oracle信息界面Action
 */
@Controller("AIXSummaryActionBean")
@Scope("prototype")
public class AIXSummaryAction extends StandardActionSupport {

	private static final long serialVersionUID=1L;

	@Autowired
	private IAIXSummary aixSummary;
	
	private int time;
	private int interval;
	public IAIXSummary getAIXSummary() {
		return aixSummary;
	}
	public void setAIXSummary(IAIXSummary aixSummary) {
		this.aixSummary = aixSummary;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public int getInterval() {
		return interval;
	}
	public void setInterval(int interval) {
		this.interval = interval;
	}
	
	/**
	 * 获取AIX汇总页面信息
	 * @return
	 * @throws Exception 
	 */
	public String getAIXSummaryInfo() throws Exception{
		
		AIXSummaryBaseInfo AIXSummaryBaseInfo = aixSummary.getAIXSummaryBaseInfo();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("AIXSummaryBaseInfo", AIXSummaryBaseInfo));
		return SUCCESS;
	}
	
	/**
	 * 获取事件总览echarts
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getEventViewEcharts() throws Exception {
		Timeline<Integer> result = aixSummary.getEventViewEcharts(time ,interval);
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), result));
		return SUCCESS;
	}

	
}
