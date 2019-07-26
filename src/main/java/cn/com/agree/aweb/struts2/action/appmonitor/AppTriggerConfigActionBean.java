package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.cama.core.module.AimDefineMetric;
import tc.cama.aweb.model.AimMetricView;
import tc.cama.aweb.model.AimTriggerRule;
import tc.cama.aweb.service.IAimlKeywordsConfig;
import tc.cama.aweb.service.IAppTriggerConfig;

@Controller("AppTriggerConfigActionBean")
@Scope("prototype")
public class AppTriggerConfigActionBean extends StandardActionSupport {

	private static final long serialVersionUID = 1L;
	
	@Autowired
	IAppTriggerConfig appTriggerConfig;

	@Autowired
	IAimlKeywordsConfig aimlKeywordsConfigService;
	
	Long id;				// 触发规则记录ID(aim_config_trigger)
	Long mobjId;			// 监控对象ID
	Integer metricId;		// 指标ID
	String metricName;		// 指标名称
	String funcId;			// 函数标识
	String funcName;		// 函数名称
	String restoreFuncId;	// 恢复函数标识
	String restoreFuncName;	// 恢复函数名称
	String tagkvs;			// JSON标签名
	Integer durationTime;	// 持续时间
	Integer durationCount;	// 持续次数
	String thresholdValue;	// 阈值
	Integer recoverable;	// 是否可恢复
	String recoverValue;	// 恢复阈值
	Integer eventType;		// 事件类型
	String eventLevel;		// 事件级别
	Integer enabled;		// 触发规则是否启用
	Long appId;				// 应用系统ID
	Integer page;			// 当前分页(base on 0)
	Integer pageSize;		// 分页大小
	Long cateId;			// CMDB三级分类ID
	String metricGroup;		// 指标分组
	String metricItem;		// 指标项
	Integer upgradeType;	// 升级类型
	Long upgradeRange;		// 级别间隔
	Integer msgTemplateId;	// 消息模板ID
	String pattern;			// 文件名模板

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public IAppTriggerConfig getAppTriggerConfig() {
		return appTriggerConfig;
	}

	public void setAppTriggerConfig(IAppTriggerConfig appTriggerConfig) {
		this.appTriggerConfig = appTriggerConfig;
	}

	public Long getMobjId() {
		return mobjId;
	}

	public void setMobjId(Long mobjId) {
		this.mobjId = mobjId;
	}

	public Integer getMetricId() {
		return metricId;
	}

	public void setMetricId(Integer mid) {
		this.metricId = mid;
	}

	public String getTagkvs() {
		return tagkvs;
	}

	public void setTagkvs(String tagkvs) {
		this.tagkvs = tagkvs;
	}

	public Integer getDurationTime() {
		return durationTime;
	}

	public void setDurationTime(Integer durationTime) {
		this.durationTime = durationTime;
	}

	public Integer getDurationCount() {
		return durationCount;
	}

	public void setDurationCount(Integer durationCount) {
		this.durationCount = durationCount;
	}

	public String getThresholdValue() {
		return thresholdValue;
	}

	public void setThresholdValue(String thresholdValue) {
		this.thresholdValue = thresholdValue;
	}

	public Integer getRecoverable() {
		return recoverable;
	}

	public void setRecoverable(Integer recoverable) {
		this.recoverable = recoverable;
	}

	public String getRecoverValue() {
		return recoverValue;
	}

	public void setRecoverValue(String recoverValue) {
		this.recoverValue = recoverValue;
	}

	public Integer getEventType() {
		return eventType;
	}

	public void setEventType(Integer eventType) {
		this.eventType = eventType;
	}

	public String getEventLevel() {
		return eventLevel;
	}

	public void setEventLevel(String eventLevel) {
		this.eventLevel = eventLevel;
	}

	public Integer getEnabled() {
		return enabled;
	}

	public void setEnabled(Integer enabled) {
		this.enabled = enabled;
	}

	public String getFuncId() {
		return funcId;
	}

	public void setFuncId(String funcId) {
		this.funcId = funcId;
	}

	public String getMetricName() {
		return metricName;
	}

	public void setMetricName(String metricName) {
		this.metricName = metricName;
	}

	public String getFuncName() {
		return funcName;
	}

	public void setFuncName(String funcName) {
		this.funcName = funcName;
	}

	public Long getAppId() {
		return appId;
	}

	public void setAppId(Long appId) {
		this.appId = appId;
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
	
	public Long getCateId() {
		return cateId;
	}

	public void setCateId(Long cateId) {
		this.cateId = cateId;
	}

	public String getMetricGroup() {
		return metricGroup;
	}

	public void setMetricGroup(String metricGroup) {
		this.metricGroup = metricGroup;
	}

	public String getRestoreFuncId() {
		return restoreFuncId;
	}

	public void setRestoreFuncId(String restoreFuncId) {
		this.restoreFuncId = restoreFuncId;
	}

	public String getRestoreFuncName() {
		return restoreFuncName;
	}

	public void setRestoreFuncName(String restoreFuncName) {
		this.restoreFuncName = restoreFuncName;
	}

	public String getMetricItem() {
		return metricItem;
	}

	public void setMetricItem(String metricItem) {
		this.metricItem = metricItem;
	}
	
	public Integer getUpgradeType() {
		return upgradeType;
	}

	public void setUpgradeType(Integer upgradeType) {
		this.upgradeType = upgradeType;
	}

	public Long getUpgradeRange() {
		return upgradeRange;
	}

	public void setUpgradeRange(Long upgradeRange) {
		this.upgradeRange = upgradeRange;
	}

	public Integer getMsgTemplateId() {
		return msgTemplateId;
	}

	public void setMsgTemplateId(Integer msgTemplateId) {
		this.msgTemplateId = msgTemplateId;
	}

	public String getPattern() {
		return pattern;
	}

	public void setPattern(String pattern) {
		this.pattern = pattern;
	}

	public String queryTriggerRule() throws Exception {
		try {
			List<AimTriggerRule> results = this.appTriggerConfig.queryTriggerRule(this.mobjId);
			this.success(results);
		} catch (Exception e) {
			this.fail("查询对象触发规则异常", e.getMessage());
		}
		return SUCCESS;
	}
	
	public String queryTriggerRules() throws Exception {
		try {
			Integer pEventType = (this.eventType.equals(-1))?null:this.eventType;
			List<AimTriggerRule> results = this.appTriggerConfig.queryTriggerRules(this.appId, this.mobjId, this.metricGroup, pEventType);
			this.success(results);
		} catch (Exception e) {
			this.fail("查询对象触发规则异常", e.getMessage());
		}
		return SUCCESS;
	}
	
	public String queryAllMetrices() throws Exception {
		try {
			List<AimMetricView> metrics = this.appTriggerConfig.queryAllMetrices();
			this.success(metrics);
		} catch (Exception e) {
			this.fail("查询指标定义异常", e.getMessage());
		}
		return SUCCESS;
	}
	
	public String queryObjectMetrices() throws Exception {

		try {
			List<AimMetricView> metrics = this.appTriggerConfig.queryObjectMetrices(this.mobjId);
			this.success(metrics);
		} catch (Exception e) {
			this.fail("查询对象指标定义异常", e.getMessage());
		}
		return SUCCESS;
	}
	
	public String queryMetricMeasures() throws Exception {
		try {
			List<Map<String,Object>> measures = this.appTriggerConfig.queryMetricMeasures(this.metricGroup, this.metricItem);
			this.success(measures);
		} catch (Exception e) {
			this.fail("查询指标计算函数异常", e.getMessage());
		}
		return SUCCESS;
	}
	
	public String queryMetricGroup() throws Exception {
		try {
			List<Map<String, Object>> measures = this.appTriggerConfig.queryMetricGroup(this.mobjId, this.cateId);
			this.success(measures);
		} catch (Exception e) {
			this.fail("查询指标分组异常", e.getMessage());
		}
		return SUCCESS;
	}
	
	public String queryMetricOfGroup() throws Exception {
		try {
			List<AimDefineMetric> metrics = this.appTriggerConfig.queryMetricOfGroup(this.metricGroup);
			this.success(metrics);
		} catch (Exception e) {
			this.fail("查询指标信息异常", e.getMessage());
		}
		return SUCCESS;
	}
	
	public String newTriggerRule() throws Exception {
		AimTriggerRule rule = new AimTriggerRule();
		rule.setMObjId(this.mobjId);
		rule.setMetricId(this.metricId.longValue());
		rule.setMetricName(this.metricName);
		rule.setTags(this.tagkvs);
		rule.setFuncId(this.funcId);
		rule.setFuncName(this.funcName);
		rule.setRestoreFuncId(this.restoreFuncId);
		rule.setRestoreFuncName(this.restoreFuncName);
		
		if (null != this.durationTime) {
			rule.setDurationTime(this.durationTime.longValue());
		}
		
		if (null != this.durationCount) {
			rule.setDurationCount(this.durationCount.longValue());
		}
		
		if (null != this.msgTemplateId) {
			rule.setMsgTemplateId(this.msgTemplateId);
		}
		
		rule.setAppId(this.appId);
		rule.setUpgradeType(this.upgradeType);
		rule.setUpgradeRange(this.upgradeRange);
		rule.setThresholdValue(this.thresholdValue);
		rule.setRecoverable(this.recoverable);
		rule.setRecoverValue(this.recoverValue);
		rule.setEventType(this.eventType);
		rule.setEventLevel(this.eventLevel);
		rule.setEnabled(this.enabled);
		try {
			this.appTriggerConfig.newTriggerRule(rule);
			this.success("触发规则添加成功");
		} catch (Exception e) {
			this.fail("触发规则添加异常", e.getMessage());
		}
		return SUCCESS;
	}
	
	public String modifyTriggerRule() throws Exception {
		AimTriggerRule rule = new AimTriggerRule();
		rule.setId(this.id);
		rule.setMObjId(this.mobjId);
		rule.setMetricId(this.metricId.longValue());
		rule.setMetricName(this.metricName);
		rule.setFuncId(funcId);
		rule.setFuncName(this.funcName);
		rule.setTags(this.tagkvs);
		rule.setDurationTime(this.durationTime.longValue());
		rule.setDurationCount(this.durationCount.longValue());
		rule.setThresholdValue(this.thresholdValue);
		rule.setRecoverable(this.recoverable);
		rule.setRecoverValue(this.recoverValue);
		rule.setEventType(this.eventType);
		rule.setEventLevel(this.eventLevel);
		rule.setEnabled(this.enabled);
		rule.setRestoreFuncId(this.restoreFuncId);
		rule.setRestoreFuncName(this.restoreFuncName);
		rule.setUpgradeType(this.upgradeType);
		rule.setUpgradeRange(this.upgradeRange);
		
		if (null != this.msgTemplateId) {
			rule.setMsgTemplateId(this.msgTemplateId);
		}
		
		try {
			this.appTriggerConfig.modifyTriggerRule(rule);
			this.success("触发规则修改成功");
		} catch (Exception e) {
			this.fail("触发规则修改异常", e.getMessage());
		}
		return SUCCESS;
	}

	public String removeTriggerRule() throws Exception {
		try {
			this.appTriggerConfig.removeTriggerRule(this.mobjId, this.id);
			this.success("触发规则删除成功");
		} catch (Exception e) {
			this.fail("触发规则删除异常", e.getMessage());
		}
		return SUCCESS;
	}

	public String findAimlKeywords() throws Exception {
		try {
			List<String> keywords = this.aimlKeywordsConfigService.findAimlKeywords(this.appId.intValue(), this.pattern);
			this.success(keywords);
		} catch (Exception e) {
			this.fail("查询关键字配置异常", e.getMessage());
		}
		return SUCCESS;
	}
	
	private void success(Object data) {
		setStrutsMessage(StrutsMessage.successMessage()
				.addParameter("retCode", "0")
				.addParameter("data", data));
	}

	private void fail(String errMsg, String exceptionMsg) {
		setStrutsMessage(StrutsMessage.successMessage()
				.addParameter("retCode", "1")
				.addParameter("exception", exceptionMsg)
				.addErrorMsg(errMsg));
	}
	
}
