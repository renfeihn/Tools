package cn.com.agree.aweb.struts2.action.system;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.cama.cmdb.model.view.CmdbPortAppSoftware;
import tc.bank.cama.cmdb.model.view.CmdbProcessAppSoftware;
import tc.bank.common.core.Page;
import tc.cama.aweb.model.AimObjectCommandView;
import tc.cama.aweb.model.AimTriggerRule;
import tc.cama.aweb.model.AimlKeywordsConfig;
import tc.cama.aweb.model.AimlLogfileConfig;
import tc.cama.aweb.service.IShowUserPrivilegeBaseCfgService;
@Controller("ShowUserPrivilegeBaseCfgActionBean")
@Scope("prototype")
public class ShowUserPrivilegeBaseCfgAction extends StandardActionSupport {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6435942255802995859L;
	@Autowired
	private IShowUserPrivilegeBaseCfgService showUserPrivilegeBaseCfgService;
	private Long appId;					// 应用系统ID
	private Long mobjId;				// 监控对象
	private Integer page;				// 当前分页(base on 0)
	private Integer pageSize;			// 分页大小
	private String metricCate;			// 指标分组
	
	public Long getAppId() {
		return appId;
	}

	public void setAppId(Long appId) {
		this.appId = appId;
	}

	public Long getMobjId() {
		return mobjId;
	}

	public void setMobjId(Long mobjId) {
		this.mobjId = mobjId;
	}

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public String getMetricCate() {
		return metricCate;
	}

	public void setMetricCate(String metricCate) {
		this.metricCate = metricCate;
	}

	/**
	 * 对象采集关系维护---查询对象各项指标
	 * @return
	 * @throws Exception
	 */
	public String queryObjectCommandsByFilters() throws Exception {
		try {
			Page<AimObjectCommandView> page = showUserPrivilegeBaseCfgService.queryObjectCommandsByFilters(getUsername(),appId, this.mobjId, this.metricCate,
						this.page, this.pageSize);
			this.success(page.getContent(), page.getTotal());
		} catch (Exception e) {
			this.fail("查询对象采集命令异常", e.getMessage());
		}
		return SUCCESS;
	}
	private Integer eventType;		// 事件类型
	private Long mobjectId;			// 监控对象ID
	private String metricGroup;		// 指标分组
	
	public Integer getEventType() {
		return eventType;
	}

	public void setEventType(Integer eventType) {
		this.eventType = eventType;
	}

	public Long getMobjectId() {
		return mobjectId;
	}

	public void setMobjectId(Long mobjectId) {
		this.mobjectId = mobjectId;
	}

	public String getMetricGroup() {
		return metricGroup;
	}

	public void setMetricGroup(String metricGroup) {
		this.metricGroup = metricGroup;
	}

	/**
	 * 触发器管理---根据查询条件, 获取相关配置规则
	 * @return
	 * @throws Exception
	 */
	public String queryTriggerRules() throws Exception {
		try {
			Integer pEventType = (this.eventType.equals(-1))?null:this.eventType;
			List<AimTriggerRule> results=new ArrayList<AimTriggerRule>();
			System.out.println(appId);
			results = showUserPrivilegeBaseCfgService.queryTriggerRules(getUsername(),appId,mobjectId, this.metricGroup, pEventType);	
			this.success(results);
		} catch (Exception e) {
			this.fail("查询对象触发规则异常", e.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 文件检测配置---获取所有AimlLogfileConfig
	 */
	public String getAllAimlLogfileConfig() throws Exception{
		List<AimlLogfileConfig> aimlLogfileConfigs = 
				showUserPrivilegeBaseCfgService.getAllAimlLogfileConfig(getUsername());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("aimlLogfileConfigs", aimlLogfileConfigs));
		return SUCCESS;
	}
	
	private Long appObjectId;//应用id
	
	public Long getAppObjectId() {
		return appObjectId;
	}

	public void setAppObjectId(Long appObjectId) {
		this.appObjectId = appObjectId;
	}

	/**
	 * 应用程序配置--进程维护
	 * 应用系统与软件筛选进程
	 */
	public String getProcessAppSw() throws NumberFormatException, Exception{
		List<CmdbProcessAppSoftware> processAppSoftwares=showUserPrivilegeBaseCfgService.getProcessRelatedInfo(getUsername());	
		setStrutsMessage(StrutsMessage.successMessage().addParameter("processAppSoftwares", processAppSoftwares));
		return SUCCESS;
	}
	/**
	 * 应用程序配置--端口维护
	 * 应用系统与软件筛选端口
	 * @return
	 * @throws Exception
	 */
	public String getPortAppSw() throws Exception{
		List<CmdbPortAppSoftware> portAppSoftwares = showUserPrivilegeBaseCfgService.getPortRelatedInfo(getUsername());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("processAppSoftwares", portAppSoftwares));
		return SUCCESS;
	}
	
	/**
	 * 日志关键字配置--获取所有AimlKeywordsConfig
	 * @param 
	 * @return
	 * @throws Exception 
	 */
	public String getAllAimlKeywordsConfig() throws Exception{
		List<AimlKeywordsConfig> aimlKeywordsConfigs = 
				showUserPrivilegeBaseCfgService.getAllAimlKeywordsConfig(getUsername());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("aimlKeywordsConfigs", aimlKeywordsConfigs));
		return SUCCESS;
	}
	
	/**
	 * 获取当前session中用户名
	 * 
	 * @return
	 */
	private String getUsername() {
		return (String) getSession().getAttribute("username");
	}
	
	private void success(Object data) {
		setStrutsMessage(StrutsMessage.successMessage()
				.addParameter("retCode", "0")
				.addParameter("data", data));
	}
	private void success(Object data, long total) {
		setStrutsMessage(StrutsMessage.successMessage()
				.addParameter("retCode", "0")
				.addParameter("data", data)
				.addParameter("total", total));
	}
	
	private void fail(String errMsg, String exceptionMsg) {
		setStrutsMessage(StrutsMessage.successMessage()
				.addParameter("retCode", "1")
				.addParameter("exception", exceptionMsg)
				.addErrorMsg(errMsg));
	}


	
}
