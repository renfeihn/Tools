package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.bean.AppAPM;
import tc.cama.aweb.bean.AppEsbSummary;
import tc.cama.aweb.bean.BeforeComper;
import tc.cama.aweb.bean.FiveComper;
import tc.cama.aweb.service.IShowUserPrivilegeBaseCfgService;
import tc.cama.aweb.service.ISummaryAPM;

@Scope("prototype")
@Controller("SummaryAPMBean")
public class SummaryAPMAction extends StandardActionSupport implements ModelDriven<AppEsbSummary> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4151812997405257214L;
	@Autowired
	private ISummaryAPM summaryAPM;
	
	@Autowired
	private IShowUserPrivilegeBaseCfgService showUserPrivilegeBaseCfgService;
	
	private Long appId1;
	private int timeBlock;
	private String flag;
	
	private String mertic;
	private AppEsbSummary esb = new AppEsbSummary();

	public ISummaryAPM getSummaryAPM() {
		return summaryAPM;
	}

	public void setSummaryAPM(ISummaryAPM summaryAPM) {
		this.summaryAPM = summaryAPM;
	}

	

	public Long getAppId1() {
		return appId1;
	}

	public int getTimeBlock() {
		return timeBlock;
	}

	public void setTimeBlock(int timeBlock) {
		this.timeBlock = timeBlock;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getMertic() {
		return mertic;
	}

	public void setMertic(String mertic) {
		this.mertic = mertic;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public void setAppId1(Long appId1) {
		this.appId1 = appId1;
	}

	/**
	 * 应用性能总览
	 * 得到汇总APM信息
	 * @return
	 * @throws Exception
	 */
	public String getSummaryAPMf() throws Exception {
		List<AppEsbSummary> summarys = showUserPrivilegeBaseCfgService.getAppSummary(getUsername());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("summarys", summarys));
		return SUCCESS;
	}
	/**
	 * 根据应用系统查询昨日同比
	 * 
	 * @param appId
	 * @return
	 * @throws Exception
	 */
	public String getAppBCInfoByAppId() throws Exception {
		BeforeComper beforeDay = showUserPrivilegeBaseCfgService.getAppBCInfoByAppId(esb,getUsername());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("beforeDay", beforeDay));
		return SUCCESS;
	}

	/**
	 * 应用性能总览
	 * 总览
	 * @return
	 * @throws Exception
	 */
	public String getAppAPM() throws Exception {
		AppAPM appAPM = showUserPrivilegeBaseCfgService.getAppAPM(getUsername(),appId1);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("appAPM", appAPM));
		return SUCCESS;
	}
	/**
	 * 应用性能总览
	 * 根据5分钟筛选
	 * @return
	 */
	public String getFiveAPM() throws Exception {
		List<AppEsbSummary> fiveAPM = showUserPrivilegeBaseCfgService.getListAimEsbAvgtimeunit5minCurren(getUsername());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("fiveAPM", fiveAPM));
		return SUCCESS;
	}
	/**
	 * 应用性能总览
	 * 5分钟同比
	 * @return
	 * @throws Exception
	 */
	public String getAppFCInfoByAppId() throws Exception {
		FiveComper beforeFive = showUserPrivilegeBaseCfgService.getAppFCInfoByAppId(getUsername(),esb);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("beforeFive", beforeFive));
		return SUCCESS;
	}
	
	public String getEchartsData() throws Exception {
		Map<String, Map<String, Object>> echarts=null;
		if(flag==null){
			 echarts= summaryAPM.getEchartsData(appId1, timeBlock);
				setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", echarts.get(mertic)));
		}else{
			echarts= summaryAPM.getLastEchartsData(appId1, timeBlock);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", echarts.get(mertic)));
		} 
		return SUCCESS;
	}
	
	public AppEsbSummary getEsb() {
		return esb;
	}

	public void setEsb(AppEsbSummary esb) {
		this.esb = esb;
	}

	@Override
	public AppEsbSummary getModel() {
		return this.esb;
	}
	/**
	 * 获取当前session中用户名
	 * @return
	 */
	private String getUsername() {
		return (String) getSession().getAttribute("username");
	}
}
