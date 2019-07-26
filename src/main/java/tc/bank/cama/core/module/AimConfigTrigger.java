package tc.bank.cama.core.module;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;

@Entity
@Table(name = "aim_config_trigger")
public class AimConfigTrigger implements Serializable {
	private static final long serialVersionUID = -5796095623587153158L;
	/**
	 * ID
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "GLOBAL")
	@Column(name = "id")
	private Integer id;
	/**
	 * 联合触发器 1/0
	 */
	@Column(name = "mixt")
	private Integer mixt;
	/**
	 * 对象ID
	 */
	@Column(name = "mobj_id")
	private int mobjId;
	/**
	 * 指标ID
	 */
	@Column(name = "mid")
	private int mid;
	/**
	 * 标签
	 */
	@Column(name = "tagkvs")
	private String tagkvs;
	/**
	 * 持续时间 单位秒
	 */
	@Column(name = "duration_time")
	private int durationTime;
	/**
	 * 限制时间 单位秒
	 */
	@Column(name = "clipping_time")
	private int clippingTime;
	/**
	 * 计算函数id
	 */
	@Column(name = "meid")
	private int meid;
	
	/**
	 * 恢复计算函数id
	 */
	@Column(name = "rmeid")
	private Integer rmeid;
	
	/**
	 * 阈值类型:固值-0
	 */
	@Column(name = "threshold_type")
	private Integer thresholdType;
	/**
	 * 阈值
	 */
	@Column(name = "threshold_value")
	private String thresholdValue;
	/**
	 * 自动恢复 1/0
	 */
	@Column(name = "recoverable")
	private Integer recoverable;
	/**
	 * 自动恢复阈值
	 */
	@Column(name = "recover_value")
	private String recoverValue;
	/**
	 * 事件类型:故障-0,预警-1,信息-2
	 */
	@Column(name = "event_type")
	private int eventType;
	/**
	 * 事件级别:1-5
	 */
	@Column(name = "event_level")
	private String eventLevel;
	/**
	 * 启用 1/0
	 */
	@Column(name = "enabled")
	private Integer enabled;
	/**
	 * 有效 1/0
	 */
	@Column(name = "record_valid")
	private Integer recordValid;
	/**
	 * 创建时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "created")
	private Date created;
	/**
	 * 更新时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "modified")
	private Date modified;

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
	 * @return ID
	 */
	public Integer getId() {
		return this.id;
	}

	/**
	 * @param id
	 *            ID
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * @return 联合触发器 1/0
	 */
	public Integer getMixt() {
		return this.mixt;
	}

	/**
	 * @param mixt
	 *            联合触发器 1/0
	 */
	public void setMixt(Integer mixt) {
		this.mixt = mixt;
	}

	/**
	 * @return 对象ID
	 */
	public int getMobjId() {
		return this.mobjId;
	}

	/**
	 * @param mobjId
	 *            对象ID
	 */
	public void setMobjId(int mobjId) {
		this.mobjId = mobjId;
	}

	/**
	 * @return 指标ID
	 */
	public int getMid() {
		return this.mid;
	}

	/**
	 * @param mid
	 *            指标ID
	 */
	public void setMid(int mid) {
		this.mid = mid;
	}

	/**
	 * @return 标签
	 */
	public String getTagkvs() {
		return this.tagkvs;
	}

	/**
	 * @param tagkvs
	 *            标签
	 */
	public void setTagkvs(String tagkvs) {
		this.tagkvs = tagkvs;
	}

	/**
	 * @return 持续时间 单位秒
	 */
	public int getDurationTime() {
		return this.durationTime;
	}

	/**
	 * @param durationTime
	 *            持续时间 单位秒
	 */
	public void setDurationTime(int durationTime) {
		this.durationTime = durationTime;
	}

	/**
	 * @return 限制时间 单位秒
	 */
	public int getClippingTime() {
		return this.clippingTime;
	}

	/**
	 * @param clippingTime
	 *            限制时间 单位秒
	 */
	public void setClippingTime(int clippingTime) {
		this.clippingTime = clippingTime;
	}

	/**
	 * @return 计算函数id
	 */
	public int getMeid() {
		return this.meid;
	}

	/**
	 * @param meid
	 *            计算函数id
	 */
	public void setMeid(int meid) {
		this.meid = meid;
	}

	/**
	 * @return 阈值类型:固值-0
	 */
	public Integer getThresholdType() {
		return this.thresholdType;
	}

	/**
	 * @param thresholdType
	 *            阈值类型:固值-0
	 */
	public void setThresholdType(Integer thresholdType) {
		this.thresholdType = thresholdType;
	}

	/**
	 * @return 阈值
	 */
	public String getThresholdValue() {
		return this.thresholdValue;
	}

	/**
	 * @param thresholdValue
	 *            阈值
	 */
	public void setThresholdValue(String thresholdValue) {
		this.thresholdValue = thresholdValue;
	}

	/**
	 * @return 自动恢复 1/0
	 */
	public Integer getRecoverable() {
		return this.recoverable;
	}

	/**
	 * @param recoverable
	 *            自动恢复 1/0
	 */
	public void setRecoverable(Integer recoverable) {
		this.recoverable = recoverable;
	}

	/**
	 * @return 自动恢复阈值
	 */
	public String getRecoverValue() {
		return this.recoverValue;
	}

	/**
	 * @param recoverValue
	 *            自动恢复阈值
	 */
	public void setRecoverValue(String recoverValue) {
		this.recoverValue = recoverValue;
	}

	/**
	 * @return 事件类型:故障-0,预警-1,信息-2
	 */
	public int getEventType() {
		return this.eventType;
	}

	/**
	 * @param eventType
	 *            事件类型:故障-0,预警-1,信息-2
	 */
	public void setEventType(int eventType) {
		this.eventType = eventType;
	}

	/**
	 * @return 事件级别:1-5
	 */
	public String getEventLevel() {
		return this.eventLevel;
	}

	/**
	 * @param eventLevel
	 *            事件级别:1-5
	 */
	public void setEventLevel(String eventLevel) {
		this.eventLevel = eventLevel;
	}

	/**
	 * @return 启用 1/0
	 */
	public Integer getEnabled() {
		return this.enabled;
	}

	/**
	 * @param enabled
	 *            启用 1/0
	 */
	public void setEnabled(Integer enabled) {
		this.enabled = enabled;
	}

	/**
	 * @return 有效 1/0
	 */
	public Integer getRecordValid() {
		return this.recordValid;
	}

	/**
	 * @param recordValid
	 *            有效 1/0
	 */
	public void setRecordValid(Integer recordValid) {
		this.recordValid = recordValid;
	}

	/**
	 * @return 创建时间
	 */
	public Date getCreated() {
		return this.created;
	}

	/**
	 * @param created
	 *            创建时间
	 */
	public void setCreated(Date created) {
		this.created = created;
	}

	/**
	 * @return 更新时间
	 */
	public Date getModified() {
		return this.modified;
	}

	/**
	 * @param modified
	 *            更新时间
	 */
	public void setModified(Date modified) {
		this.modified = modified;
	}

	@Column(name = "rmeid")
	public void setRmeid(Integer rmeid) {
		this.rmeid = rmeid;
	}
	
	public Integer getRmeid() {
		return rmeid;
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
}