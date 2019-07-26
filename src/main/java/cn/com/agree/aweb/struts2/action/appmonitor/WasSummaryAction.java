package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.service.IWasSummary;
/**
 * was总览
 *
 */
@Controller("WasSummaryActionBean")
@Scope("prototype")
public class WasSummaryAction extends StandardActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = 6170844645845496750L;
	@Autowired
	private IWasSummary wasSummary;
	private int time;
	private int interval;
	public IWasSummary getWasSummary() {
		return wasSummary;
	}
	public void setWasSummary(IWasSummary wasSummary) {
		this.wasSummary = wasSummary;
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
	 * 汇总基础信息及was列表
	 * @return
	 */
	public String getBaseInfo(){
		setStrutsMessage(StrutsMessage.successMessage().addParameter("baseinfo", wasSummary.getWasBaseInfo()).addParameter("wasList", wasSummary.getWasList()));
		return SUCCESS;
	}
	public String getwasEcharts(){
		Map<String,Object> result = wasSummary.getEventInfo(time, interval);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData",result.get("echarts")).addParameter("curr_data", result.get("curr_data")).addParameter("unClosed", result.get("unClosed")).addParameter("eventNum", result.get("eventNum")));
		return SUCCESS;
	}

	
}
