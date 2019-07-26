package cn.com.agree.aweb.struts2.action.appmonitor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import tc.bank.common.core.Timeline;
import tc.cama.aweb.bean.PageOracleSummary;
import tc.cama.aweb.service.IOracleSummary;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.EchartsUtils;


/**
 * oracle汇总界面Action
 */
@Controller("OracleSummaryActionBean")
@Scope("prototype")
public class OracleSummaryAction extends StandardActionSupport{
	
	private static final long serialVersionUID = 1L;
	
	@Autowired
	private IOracleSummary oracleSummary;
	
	private int time ;
	private int interval;
	
	public IOracleSummary getOracleSummary() {
		return oracleSummary;
	}
	public void setOracleSummary(IOracleSummary oracleSummary) {
		this.oracleSummary = oracleSummary;
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
	 * 获取oracle汇总页面信息
	 * @return
	 * @throws Exception 
	 */
	public String getOracleSummaryInfo() throws Exception{
		
		PageOracleSummary pageOracleSummary = oracleSummary.getOracleSummaryInfo();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("pageOracleSummary", pageOracleSummary));
		return SUCCESS;
	}
	
	/**
	 * 获取事件总览echarts
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getEventViewEcharts() throws Exception {
		Timeline<Integer> result = oracleSummary.getEventViewEcharts(time ,interval);
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), result));
		return SUCCESS;
	}

}
