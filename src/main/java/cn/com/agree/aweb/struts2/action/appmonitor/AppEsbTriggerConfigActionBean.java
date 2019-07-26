package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.model.AimTriggerRule;
import tc.cama.aweb.service.IAppEsbTriggerConfig;

@Controller("AppEsbTriggerConfigActionBean")
@Scope("prototype")
public class AppEsbTriggerConfigActionBean extends StandardActionSupport {

	private static final long serialVersionUID = 1L;

	@Autowired
	IAppEsbTriggerConfig appEsbTriggerConfig;

	Integer objType;		// 对象类型
	String monObj;			// ESB对象
	Long id;				// 触发规则记录ID(aim_config_trigger)
	Long mobjId;			// 监控对象ID
	Long appId;				// 系统对象ID
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
	Integer page;			// 当前页(以0开始计算)
	Integer pageSize;		// 分页记录数
	Integer upgradeType;	// 升级类型
	Long upgradeRange;		// 级别间隔

	public Integer getObjType() {
		return objType;
	}

	public void setObjType(Integer objType) {
		this.objType = objType;
	}

	public String getMonObj() {
		return monObj;
	}

	public void setMonObj(String monObj) {
		this.monObj = monObj;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public void setMetricId(Integer metricId) {
		this.metricId = metricId;
	}

	public String getMetricName() {
		return metricName;
	}

	public void setMetricName(String metricName) {
		this.metricName = metricName;
	}

	public String getFuncId() {
		return funcId;
	}

	public void setFuncId(String funcId) {
		this.funcId = funcId;
	}

	public String getFuncName() {
		return funcName;
	}

	public void setFuncName(String funcName) {
		this.funcName = funcName;
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

	public Long getAppId() {
		return appId;
	}

	public void setAppId(Long appId) {
		this.appId = appId;
	}

	public String queryEsbObjectsByType() throws Exception {
		try {
			List<Map<String, String>> results = this.appEsbTriggerConfig.queryEsbObjectsByType(this.objType);
			this.success(results);
		} catch (Exception e) {
			this.fail("查询ESB对象异常", e.getMessage());
		}
		return SUCCESS;
	}
	
	public String queryEsbMetrics() throws Exception {
		try {
			List<Map<String, Object>> results = this.appEsbTriggerConfig.queryEsbMetrics();
			this.success(results);
		} catch (Exception e) {
			this.fail("查询ESB指标异常", e.getMessage());
		}
		return SUCCESS;
	}
	
//	public String queryEsbTriggerRules() throws Exception {
//		try {
//			Page<AimTriggerRule> page = this.appEsbTriggerConfig.queryEsbTriggerRules(this.objType, this.monObj, this.metricId, this.eventType, 
//					this.page, this.pageSize);
//			this.success(page.getContent());
//		} catch (Exception e) {
//			this.fail("查询ESB触发规则异常", e.getMessage());
//		}
//		return SUCCESS;
//	}

	public String queryEsbTriggerRules() throws Exception {
		try {
			List<AimTriggerRule> results = this.appEsbTriggerConfig.queryEsbTriggerRules(this.objType, this.monObj, this.metricId, this.eventType);
			this.success(results);
		} catch (Exception e) {
			this.fail("查询ESB触发规则异常", e.getMessage());
		}
		return SUCCESS;
	}
	
	public String newEsbTriggerRule() throws Exception {
		AimTriggerRule rule = new AimTriggerRule();
		rule.setMObjId(this.mobjId);
		rule.setAppId(this.appId);
		rule.setMetricId(this.metricId.longValue());
		rule.setMetricName(this.metricName);
		rule.setTags(this.tagkvs);
		rule.setFuncId(funcId);
		rule.setFuncName(this.funcName);
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
		try {
			this.appEsbTriggerConfig.newEsbTriggerRule(rule);
			this.success("触发规则添加成功");
		} catch (Exception e) {
			this.fail("触发规则添加异常", e.getMessage());
		}
		return SUCCESS;
	}

	public String modifyEsbTriggerRule() throws Exception {
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
		try {
			this.appEsbTriggerConfig.modifyEsbTriggerRule(rule);
			this.success("触发规则修改成功");
		} catch (Exception e) {
			this.fail("触发规则修改异常", e.getMessage());
		}
		return SUCCESS;
	}

	public String removeEsbTriggerRule() throws Exception {
		try {
			this.appEsbTriggerConfig.removeEsbTriggerRule(this.mobjId, this.id);
			this.success("触发规则删除成功");
		} catch (Exception e) {
			this.fail("触发规则删除异常", e.getMessage());
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
