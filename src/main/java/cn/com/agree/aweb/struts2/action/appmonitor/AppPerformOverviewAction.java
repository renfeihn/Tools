package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.bean.EsbErrCode;
import tc.cama.aweb.bean.PageAppAPMSummary;
import tc.cama.aweb.bean.PageEsbMsSysName;
import tc.cama.aweb.service.IAppPerformOverview;

/**
 * 应用性能总览
 * @author yuanf
 *
 */

@Controller("AppPerformOverviewActionBean")
@Scope("prototype")
public class AppPerformOverviewAction extends StandardActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Autowired
	private IAppPerformOverview appPerformOverview;

	
	private int statisticType;
	
	
	private int top;
	

	/**
	 * getters
	 * @return
	 */
	public int getStatisticType() {
		return statisticType;
	}


	public int getTop() {
		return top;
	}

	
	/**
	 * setters
	 * @param statisticType
	 */
	public void setStatisticType(int statisticType) {
		this.statisticType = statisticType;
	}

	public void setTop(int top) {
		this.top = top;
	}


	/**
	 * 汇总APM信息
	 * @return
	 * @throws Exception 
	 */
	public String getAPMSummary() throws Exception{
		PageAppAPMSummary pageAppAPMSummary=appPerformOverview.getAPMSummary(2);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("pageAppAPMSummary", pageAppAPMSummary));
		return SUCCESS;
	}
	
	/**
	 * 获取服务的top
	 * @return
	 * @throws Exception 
	 */
	public String getTopOfService() throws Exception{
		List<PageEsbMsSysName> topOfService = appPerformOverview.getTopOfService(top);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("topOfService", topOfService));
		return SUCCESS;
	}
	
	/**
	 * 获取错误码的top
	 * @return
	 * @throws Exception 
	 */
	public String getTopOfErrorCode() throws Exception{
		List<EsbErrCode> topOfErrorCode= appPerformOverview.getTopOfErrorCode(top);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("topOfErrorCode", topOfErrorCode));
		return SUCCESS;
	}
	
	/**
	 * 测试专用
	 * @return
	 * @throws Exception
	 */
	public String getTopOfErrorCode1() throws Exception{
		List<EsbErrCode> topOfErrorCode = appPerformOverview.getTopOfErrorCode1(top);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("topOfErrorCode", topOfErrorCode));
		return SUCCESS;
	}
	
}
