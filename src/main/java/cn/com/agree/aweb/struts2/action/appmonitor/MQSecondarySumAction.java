package cn.com.agree.aweb.struts2.action.appmonitor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.EchartsUtils;
import tc.bank.common.core.Timeline;
import tc.cama.aweb.bean.MQBaseInfo;
/**
 * MQ二级汇总交易Action
 * @author dai
 *
 */
import tc.cama.aweb.service.IMQSecondarySum;

@Controller("MQSecondarySumBean")
@Scope("prototype")
public class MQSecondarySumAction extends StandardActionSupport {
	
	private static final long serialVersionUID = 1L;
	@Autowired
	private IMQSecondarySum mqSecondarySum;
	private int time ;
	private int interval;
	

	public IMQSecondarySum getMqSecondarySum() {
		return mqSecondarySum;
	}


	public void setMqSecondarySum(IMQSecondarySum mqSecondarySum) {
		this.mqSecondarySum = mqSecondarySum;
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
    public String  getMQBaseInfo() throws Exception{
    	MQBaseInfo mqBaseInfo = mqSecondarySum.getMQBaseInfo();
    	setStrutsMessage(StrutsMessage.successMessage().addParameter("mqBaseInfo", mqBaseInfo));
		return SUCCESS;
    	
    }

	/**
	 * 获取事件总览echarts  
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getEventViewEcharts() throws Exception {
		Timeline<Integer> result = mqSecondarySum.getEventViewEcharts(time ,interval);
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), result));
		return SUCCESS;
	}
}
