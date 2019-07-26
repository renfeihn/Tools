package cn.com.agree.aweb.struts2.action.appmonitor;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import com.aim.alibaba.fastjson.JSONObject;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.cama.statistic.AimCommonTrans;
import tc.bank.common.core.Page;
import tc.cama.aweb.bean.PageEsbTransList;
import tc.cama.aweb.esb.model.EsbMonTransService;
import tc.cama.aweb.esb.model.EsbService;
import tc.cama.aweb.service.IAppEsbTransMonitor;

/**
 *应用性能-流水监控
 */
@Controller("AppEsbTransMonitorActionBean")
@Scope("prototype")
public class AppEsbTransMonitorAction extends StandardActionSupport {

	private static final long serialVersionUID = 1L;
	private String sysId;
	public String getSysId() {
		return sysId;
	}

	public void setSysId(String sysId) {
		this.sysId = sysId;
	}

	String conditions;
	int page;
	int pageCount;
	long appId;
	String syscode;
	@Autowired
	private IAppEsbTransMonitor appEsbTransMonitor;

	public String getConditions() {
		return conditions;
	}

	public int getPage() {
		return page;
	}

	public int getPageCount() {
		return pageCount;
	}

	public IAppEsbTransMonitor getAppEsbTransMonitor() {
		return appEsbTransMonitor;
	}

	public void setConditions(String conditions) {
		this.conditions = conditions;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}

	public void setAppEsbTransMonitor(IAppEsbTransMonitor appEsbTransMonitor) {
		this.appEsbTransMonitor = appEsbTransMonitor;
	}

	public long getAppId() {
		return appId;
	}

	public void setAppId(long appId) {
		this.appId = appId;
	}

	public String getSyscode() {
		return syscode;
	}

	public void setSyscode(String syscode) {
		this.syscode = syscode;
	}

	/**
	 * 获取ESB流水列表信息
	 * @return
	 * @throws Exception
	 */
	public String getEsbTransMonitor() throws Exception{
		@SuppressWarnings("unchecked")
		Map<Integer, Object> map = (Map<Integer, Object>)JSONObject.parse(conditions);
		Page<EsbMonTransService> result = appEsbTransMonitor.getEsbTransMonitor(map, page, pageCount);		
		setStrutsMessage(StrutsMessage.successMessage().addParameter("transMonitorList", result));
		return SUCCESS;
	}
	
	
	/**
	 * 获取统一监控流水列表信息
	 * @return
	 * @throws Exception
	 */
	public String getUMONTransMonitor() throws Exception{
		@SuppressWarnings("unchecked")
		Map<Integer, Object> map = (Map<Integer, Object>)JSONObject.parse(conditions);
		Page<AimCommonTrans> result = appEsbTransMonitor.getUMONTransDetail(map, page, pageCount);		
		setStrutsMessage(StrutsMessage.successMessage().addParameter("transMonitorList", result));
		return SUCCESS;
	}
	
	public String getUMONService() throws SQLException{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("serviceList",appEsbTransMonitor.getUMONService(sysId)));
		return SUCCESS;
	}
	
	/**
	 * 获取ESB列表条件
	 * @return
	 * @throws Exception
	 */
	public String getEsbList() throws Exception{
		
		PageEsbTransList  esbTransList = appEsbTransMonitor.getEsbList(appId);		
		setStrutsMessage(StrutsMessage.successMessage().addParameter("esbTransList", esbTransList));
		return SUCCESS;
	}
	
	/**
	 * 获取ESB服务列表
	 * @return
	 * @throws Exception
	 */
	public String getServiceList() throws Exception{
		List<EsbService> serviceList = appEsbTransMonitor.getServiceList(syscode);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("serviceList", serviceList));
		return SUCCESS;
	}

}
