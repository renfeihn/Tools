package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.common.core.Page;
import tc.bank.common.core.Pageable;
import tc.cama.aweb.bean.AimlAbnormal;
import tc.cama.aweb.service.IAppAbnormalLog;

@Scope("prototype")
@Controller("AppAbnormalLogActionBean")
public class AppAbnormalLogAction extends StandardActionSupport{

	private static final long serialVersionUID = 1L;
	
	@Autowired
	private IAppAbnormalLog appAbnormalLogService;
	/**
	 * 应用ID
	 */
	Long appId;
	/**
	 * 页码，从0开始
	 */
	private int page;
	/**
	 * 每页记录数
	 */
	private int size;
	/**
	 * 
	 * 流水号
	 */
	private String serilano;
	
	public Long getAppId() {
		return appId;
	}
	public void setAppId(Long appId) {
		this.appId = appId;
	}
	
	public int getPage() {
		return page;
	}
	
	public void setPage(int page) {
		this.page = page;
	}
	
	public int getSize() {
		return size;
	}
	
	public void setSize(int size) {
		this.size = size;
	}
	
	public IAppAbnormalLog getAppAbnormalLogService() {
		return appAbnormalLogService;
	}
	
	public void setAppAbnormalLogService(IAppAbnormalLog appAbnormalLogService) {
		this.appAbnormalLogService = appAbnormalLogService;
	}
	
	public String getSerilano() {
		return serilano;
	}
	public void setSerilano(String serilano) {
		this.serilano = serilano;
	}
	
	public String statCurrDayAbnormal() throws Exception{
		List<AimlAbnormal> statAbnormal = appAbnormalLogService.statCurrDayAbnormal(appId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("statAbnormal", statAbnormal));
		return SUCCESS;
	}
	
    public String pageQueryCurrDayAbnormalLogs() throws Exception{
    	Pageable pageable = new Pageable(page,size);
		Page<JSONObject> AbnormalLogs = appAbnormalLogService.pageQueryCurrDayAbnormalLogs(appId, serilano, pageable);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("AbnormalLogs", AbnormalLogs));
		return SUCCESS;
	}

}
