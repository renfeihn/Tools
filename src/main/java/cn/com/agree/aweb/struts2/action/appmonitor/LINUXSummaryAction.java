package cn.com.agree.aweb.struts2.action.appmonitor;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;


import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.EchartsUtils;
import tc.bank.common.core.Timeline;
import tc.cama.aweb.bean.LINUXSummaryBaseInfo;
import tc.cama.aweb.service.ILINUXSummary;

/**
 * oracle信息界面Action
 */
@Controller("LINUXSummaryActionBean")
@Scope("prototype")
public class LINUXSummaryAction extends StandardActionSupport {

	private static final long serialVersionUID=1L;

	@Autowired
	private ILINUXSummary linuxSummary;
	
	private int time;
	private int interval;
	public ILINUXSummary getLinuxSummary() {
		return linuxSummary;
	}
	public void setLinuxSummary(ILINUXSummary linuxSummary) {
		this.linuxSummary = linuxSummary;
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
	 * 获取linux汇总页面信息
	 * @return
	 * @throws Exception 
	 */
	public String getLinuxSummaryInfo() throws Exception{
		
		LINUXSummaryBaseInfo linuxSummaryBaseInfo = linuxSummary.getLINUXSummaryBaseInfo();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("linuxSummaryBaseInfo", linuxSummaryBaseInfo));
		return SUCCESS;
	}
	
	/**
	 * 获取事件总览echarts
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getEventViewEcharts() throws Exception {
		Timeline<Integer> result = linuxSummary.getEventViewEcharts(time ,interval);
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), result));
		return SUCCESS;
	}

	
}
