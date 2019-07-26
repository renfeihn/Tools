package cn.com.agree.aweb.struts2.action.screen;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.bean.PageScreenAppRate;
import tc.cama.aweb.service.IScreenImpApps;
/**
 * 大屏-重要应用系统
 * @author luotong
 *
 */
@Controller("ScreenImpAppsActionBean")
@Scope("prototype")
public class ScreenImpAppsAction extends StandardActionSupport{

	private static final long serialVersionUID = 1L;
	
	@Autowired
	private IScreenImpApps screenImpApps;
	//3-提供者，2-消费者
	private Integer type;
	private Integer time;
	private int interval;
	private int flag;
	public IScreenImpApps getScreenImpApps() {
		return screenImpApps;
	}

	public Integer getType() {
		return type;
	}

	public Integer getTime() {
		return time;
	}

	public int getInterval() {
		return interval;
	}

	public void setScreenImpApps(IScreenImpApps screenImpApps) {
		this.screenImpApps = screenImpApps;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public void setTime(Integer time) {
		this.time = time;
	}

	public void setInterval(int interval) {
		this.interval = interval;
	}

	public int getFlag() {
		return flag;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}

	public String getAppRates() throws Exception {
		PageScreenAppRate appRate = screenImpApps.getAppRates(type);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("appRate", appRate));
		return SUCCESS;
	}
	
	public String getTPSEcharts() throws Exception {
		Map<String, List<String>> echartsData = null;
		if(1==flag){
			echartsData = screenImpApps.getCurrTPSEcharts();
		}else{
			echartsData = screenImpApps.getTPSEcharts(time,interval);
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", echartsData!=null?echartsData:new HashMap<String, List<String>>()));
		return SUCCESS;
	}

}