package tc.cama.aweb.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;

import com.aim.alibaba.fastjson.annotation.JSONField;
import com.aim.alibaba.fastjson.serializer.SerializerFeature;

/**
 * 
 * 监控对象触发规则
 *
 */
public class AimTriggerRule extends AbstractDataModel {

	private static final long serialVersionUID = 1L;

	/**
	 * 规则ID
	 */
	@Column(name = "id")
	private Long id;
	
	/**
	 * 监控对象ID
	 */
	@Column(name = "mobj_id")
	private Long mObjId;
	
	/**
	 * 指标ID
	 */
	@Column(name = "mid")
	private Long metricId;
	
	/**
	 * 指标分类
	 */
	@Column(name = "category")
	private String metricCategory;
	
	/**
	 * 指标项
	 */
	@Column(name = "item")
	private String metricItem;
	
	/**
	 * 指标名称
	 */
	@Column(name = "display_name")
	private String metricName;
	
	/**
	 * 指标值计量单位
	 */
	@Column(name = "unit")
	private String metricUnit;
	
	/**
	 * 指标相关标签
	 */
	@Column(name = "tagkvs")
	@JSONField(serialzeFeatures=SerializerFeature.WriteNullStringAsEmpty)
	private String tags;
	
	/**
	 * 持续时间(秒)
	 */
	@Column(name = "duration_time")
	private Long durationTime;
	
	/**
	 * 持续次数
	 */
	@Column(name = "duration_times")
	private Long durationCount;
	
	/**
	 * 阈值计算方法ID
	 */
	@Column(name = "func")
	private String funcId;
	
	/**
	 * 阈值计算方法名称
	 */
	@Column(name = "func_name")
	private String funcName;
	
	/**
	 * 恢复阈值计算方法ID
	 */
	@Column(name = "rfunc")
	private String restoreFuncId;
	
	/**
	 * 恢复阈值计算方法名称
	 */
	@Column(name = "rfunc_name")
	private String restoreFuncName;
	
	/**
	 * 阈值
	 */
	@Column(name = "threshold_value")
	private String thresholdValue;
	
	/**
	 * 是否可自动恢复
	 */
	@Column(name = "recoverable")
	private Integer recoverable;
	
	/**
	 * 自动恢复的阈值
	 */
	@Column(name = "recover_value")
	private String recoverValue;
	
	/**
	 * 事件类型
	 */
	@Column(name = "event_type")
	private Integer eventType;
	
	/**
	 * 事件级别
	 */
	@Column(name = "event_level")
	private String eventLevel;
	
	/**
	 * 规则是否启用
	 */
	@Column(name = "enabled")
	private Integer enabled;

	/**
	 * 升级类型，0-不升级，1-按事件发生次数，2-按事件持续时间
	 */
	@Column(name = "upgrade_type")
	private Integer upgradeType;
	
	/**
	 * 若升级类型为0，这里为次数；若升级类型为1，这里为秒数
	 */
	@Column(name = "upgrade_range")
	private Long upgradeRange;

	/**
	 * 消息模板ID
	 */
	@Column(name = "msg_template_id")
	private Integer msgTemplateId;
	
	/**
	 * 标签中的key数量
	 */
	private Integer tagCount = 0;
	
	/**
	 * 标签明细, Map-key说明
	 * <li> key, 标签ID
	 * <li> value, 标签值
	 * <li> label, 标签名
	 */
	private List<Map<String,Object>> tagDetail = new ArrayList<Map<String,Object>>();
	
	/**
	 * 对象类型(ESB)
	 */
	private Integer objType;
	
	/**
	 * 对象名称
	 */
	private String objName;
	
	/**
	 * 对象所属的系统ID
	 */
	@Column(name = "app_id")
	private Long appId;
	
	/**
	 * 对象所属的系统名称
	 */
	private String appName;
	
	/**
	 * 监控对象所属三级分类ID
	 */
	private Long cateId;
	
	/**
	 * 对象一级分类
	 */
	private String l1CateName;
	
	/**
	 * 对象二级分类
	 */
	private String l2CateName;
	
	/**
	 * 对象三级分类
	 */
	private String l3CateName;
	
	private Map<String,Object> enumValues;

	public void setId(Long id) {
		this.id = id;
	}

	public void setMObjId(Long mObjId) {
		this.mObjId = mObjId;
	}

	public void setMetricId(Long metricId) {
		this.metricId = metricId;
	}

	public void setMetricCategory(String metricCategory) {
		this.metricCategory = metricCategory;
	}

	public void setMetricItem(String metricItem) {
		this.metricItem = metricItem;
	}

	public void setMetricName(String metricName) {
		this.metricName = metricName;
	}

	public void setMetricUnit(String metricUnit) {
		this.metricUnit = metricUnit;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}
	
	public void setDurationTime(Long durationTime) {
		this.durationTime = durationTime;
	}

	public void setDurationCount(Long durationCount) {
		this.durationCount = durationCount;
	}

	public void setFuncId(String funcId) {
		this.funcId = funcId;
	}

	public void setFuncName(String funcName) {
		this.funcName = funcName;
	}

	public void setThresholdValue(String thresholdValue) {
		this.thresholdValue = thresholdValue;
	}

	public void setRecoverable(Integer recoverable) {
		this.recoverable = recoverable;
	}

	public void setRecoverValue(String recoverValue) {
		this.recoverValue = recoverValue;
	}

	public void setEventType(Integer eventType) {
		this.eventType = eventType;
	}

	public void setEventLevel(String eventLevel) {
		this.eventLevel = eventLevel;
	}

	public void setEnabled(Integer enabled) {
		this.enabled = enabled;
	}

	public Long getId() {
		return id;
	}

	public Long getMObjId() {
		return mObjId;
	}

	public Long getMetricId() {
		return metricId;
	}

	public String getMetricCategory() {
		return metricCategory;
	}

	public String getMetricItem() {
		return metricItem;
	}

	public String getMetricName() {
		return metricName;
	}

	public String getMetricUnit() {
		return metricUnit;
	}

	public String getTags() {
		return this.tags;
	}

	public Long getDurationTime() {
		return durationTime;
	}

	public Long getDurationCount() {
		return durationCount;
	}

	public String getFuncId() {
		return funcId;
	}

	public String getFuncName() {
		return funcName;
	}

	public String getThresholdValue() {
		return thresholdValue;
	}

	public Integer getRecoverable() {
		return this.recoverable;
	}

	public String getRecoverValue() {
		return recoverValue;
	}

	public Integer getEventType() {
		return eventType;
	}

	public String getEventLevel() {
		return eventLevel;
	}

	public Integer getEnabled() {
		return this.enabled;
	}
	
	public void setTagCount(Integer tagCount) {
		this.tagCount = tagCount;
	}
	
	public Integer getTagCount() {
		return tagCount;
	}
	
	
	public Integer getObjType() {
		return objType;
	}

	public void setObjType(Integer objType) {
		this.objType = objType;
	}

	public String getObjName() {
		return objName;
	}

	public void setObjName(String objName) {
		this.objName = objName;
	}

	public Long getAppId() {
		return appId;
	}

	public void setAppId(Long appId) {
		this.appId = appId;
	}

	public String getAppName() {
		return appName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	public Long getCateId() {
		return cateId;
	}

	public void setCateId(Long cateId) {
		this.cateId = cateId;
	}

	public String getL1CateName() {
		return l1CateName;
	}

	public void setL1CateName(String l1CateName) {
		this.l1CateName = l1CateName;
	}

	public String getL2CateName() {
		return l2CateName;
	}

	public void setL2CateName(String l2CateName) {
		this.l2CateName = l2CateName;
	}

	public String getL3CateName() {
		return l3CateName;
	}

	public void setL3CateName(String l3CateName) {
		this.l3CateName = l3CateName;
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

	/**
	 * 
	 * @param key
	 * 标签ID
	 * @param value
	 * 标签值
	 * @param label
	 * 标签名称
	 */
	public void addTagDetail(String key, Object value, String label) {
		Map<String,Object> detail = new HashMap<String,Object>();
		detail.put("key", key);
		detail.put("value", value);
		detail.put("label", label);
		this.tagDetail.add(detail);
	}

	public List<Map<String, Object>> getTagDetail() {
		return tagDetail;
	}

	public Map<String, Object> getEnumValues() {
		return enumValues;
	}

	public void setEnumValues(Map<String, Object> enumValues) {
		this.enumValues = enumValues;
	}

	public void setUpgradeType(Integer upgradeType) {
		this.upgradeType = upgradeType;
	}

	public void setUpgradeRange(Long upgradeRange) {
		this.upgradeRange = upgradeRange;
	}

	public Integer getUpgradeType() {
		return upgradeType;
	}

	public Long getUpgradeRange() {
		return upgradeRange;
	}
	
	public Integer getMsgTemplateId() {
		return msgTemplateId;
	}
	public void setMsgTemplateId(Integer msgTemplateId) {
		this.msgTemplateId = msgTemplateId;
	}
	@Override
	public String toString() {
		
		StringBuilder builder = new StringBuilder();
		
		builder.append("id = ").append(this.id).append("\n");
		builder.append("mObjId = ").append(this.mObjId).append("\n");
		builder.append("metricId = ").append(this.metricId).append("\n");
		builder.append("metricCategory = ").append(this.metricCategory).append("\n");
		builder.append("metricItem = ").append(this.metricItem).append("\n");
		builder.append("metricName = ").append(this.metricName).append("\n");
		builder.append("metricUnit = ").append(this.metricUnit).append("\n");
		builder.append("tags = ").append(this.getTags()).append("\n");
		builder.append("durationTime = ").append(this.getDurationTime()).append("\n");
		builder.append("durationCount = ").append(this.getDurationCount()).append("\n");
		builder.append("funcId = ").append(this.funcId).append("\n");
		builder.append("funcName = ").append(this.funcName).append("\n");
		builder.append("thresholdValue = ").append(this.thresholdValue).append("\n");
		builder.append("recoverable = ").append(this.getRecoverValue()).append("\n");
		builder.append("recoverValue = ").append(this.recoverValue).append("\n");
		builder.append("eventType = ").append(this.eventType).append("\n");
		builder.append("eventLevel = ").append(this.eventLevel).append("\n");
		builder.append("objName = ").append(this.objName).append("\n");
		builder.append("objType = ").append(this.objType).append("\n");
		builder.append("appId = ").append(this.appId).append("\n");
		builder.append("appName = ").append(this.appName).append("\n");
		builder.append("restoreFuncId = ").append(this.restoreFuncId).append("\n");
		builder.append("restoreFuncName = ").append(this.restoreFuncName).append("\n");
		builder.append("upgradeType = ").append(this.upgradeType).append("\n");
		builder.append("upgradeRange = ").append(this.upgradeRange).append("\n");
		
		return builder.toString();
	}
}
