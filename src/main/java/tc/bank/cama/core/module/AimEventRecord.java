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
@Table(name = "aim_event_record")
public class AimEventRecord implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 7773750670885574113L;
	/**
	 * ID
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "AIMEVENT")
	@Column(name = "id")
	private Integer id;
	/**
	 * 记录时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "record_time")
	private Date recordTime;
	/**
	 * 系统编号
	 */
	@Column(name = "in_sys_no")
	private String inSysNo;
	/**
	 * 系统时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "in_sys_time")
	private Date inSysTime;
	/**
	 * 源流水
	 */
	@Column(name = "in_serial_no")
	private String inSerialNo;
	/**
	 * 身份标识
	 */
	@Column(name = "identifier")
	private String identifier;
	/**
	 * 抛出渠道
	 */
	@Column(name = "platform")
	private String platform;
	/**
	 * 初始时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "first_time")
	private Date firstTime;
	/**
	 * 最新时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "last_time")
	private Date lastTime;
	/**
	 * 事件计数
	 */
	@Column(name = "tally")
	private int tally;
	/**
	 * 事件名称
	 */
	@Column(name = "name")
	private String name;
	/**
	 * 事件描述/告警信息
	 */
	@Column(name = "description")
	private String description;
	/**
	 * 事件摘要
	 */
	@Column(name = "summary")
	private String summary;
	/**
	 * 事件类型 故障-0,预警-1,信息-2
	 */
	@Column(name = "otype")
	private int otype;
	/**
	 * 事件类型 故障-0,预警-1,信息-2
	 */
	@Column(name = "type")
	private int type;
	/**
	 * 事件级别 1-5
	 */
	@Column(name = "level")
	private String level;
	/**
	 * 事件状态 触发-0,解决-1,关闭-2
	 */
	@Column(name = "status")
	private String status;
	/**
	 * 关闭状态 1/0
	 */
	@Column(name = "closed")
	private Integer closed;
	/**
	 * 恢复状态 自动-0,人工-1
	 */
	@Column(name = "recover")
	private String recover;
	/**
	 * 处理建议
	 */
	@Column(name = "help")
	private String help;
	/**
	 * 代理名称
	 */
	@Column(name = "agent")
	private String agent;
	/**
	 * 设备
	 */
	@Column(name = "device_id")
	private Integer deviceId;
	/**
	 * 应用系统
	 */
	@Column(name = "app_id")
	private Integer appId;
	/**
	 * 监控对象
	 */
	@Column(name = "mobj_id")
	private Integer mobjId;
	/**
	 * ITIL工单是否创建
	 */
	@Column(name = "itil_crt")
	private Integer itilCrt;
	/**
	 * ITIL标识 需创建工单: 1/0
	 */
	@Column(name = "itil_flag")
	private Integer itilFlag;
	/**
	 * ITIL事件ID
	 */
	@Column(name = "itil_id")
	private String itilId;
	/**
	 * ITIL工单状态 Pending，待分派；Assigned,已分派；In
	 * Progress，处理中；Resolved,已解决；Closed,已关闭；Cancelled,已取消；
	 */
	@Column(name = "itil_status")
	private String itilStatus;
	/**
	 * ITIL工单创建时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "itil_created")
	private Date itilCreated;
	/**
	 * ITIL工单修改时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "itil_modified")
	private Date itilModified;
	/**
	 * ITIL工单所属人
	 */
	@Column(name = "itil_owner")
	private String itilOwner;
	/**
	 * 发送消息标识
	 */
	@Column(name = "msg_bit_flag")
	private String msgBitFlag;
	/**
	 * 指标分组
	 */
	@Column(name = "metric_grp")
	private String metricGrp;
	/**
	 * 指标
	 */
	@Column(name = "metric")
	private String metric;
	/**
	 * 指标标签
	 */
	@Column(name = "metric_tag")
	private String metricTag;
	/**
	 * 汇报数据
	 */
	@Column(name = "point_data")
	private String pointData;
	/**
	 * 恢复数据
	 */
	@Column(name = "restore_data")
	private String restoreData;
	/**
	 * 联合触发器: 1/0
	 */
	@Column(name = "mixt")
	private Integer mixt;
	/**
	 * 触发器ID
	 */
	@Column(name = "trigger_id")
	private Integer triggerId;
	/**
	 * 事件性质
	 */
	@Column(name = "nature")
	private String nature;
	/**
	 * 影响度
	 */
	@Column(name = "influence")
	private String influence;
	/**
	 * 优先级
	 */
	@Column(name = "priority")
	private String priority;
	/**
	 * 等级 0-4
	 */
	@Column(name = "grade")
	private String grade;
	/**
	 * 升级原因
	 */
	@Column(name = "upgrade_reason")
	private String upgradeReason;
	/**
	 * 根事件ID
	 */
	@Column(name = "principal_id")
	private Integer principalId;
	/**
	 * 根事件时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "principal_time")
	private Date principalTime;

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
	@Column(name = "id")
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * @return 记录时间
	 */
	public Date getRecordTime() {
		return this.recordTime;
	}

	/**
	 * @param recordTime
	 *            记录时间
	 */
	@Column(name = "record_time")
	public void setRecordTime(Date recordTime) {
		this.recordTime = recordTime;
	}

	/**
	 * @return 系统编号
	 */
	public String getInSysNo() {
		return this.inSysNo;
	}

	/**
	 * @param inSysNo
	 *            系统编号
	 */
	@Column(name = "in_sys_no")
	public void setInSysNo(String inSysNo) {
		this.inSysNo = inSysNo;
	}

	/**
	 * @return 系统时间
	 */
	public Date getInSysTime() {
		return this.inSysTime;
	}

	/**
	 * @param inSysTime
	 *            系统时间
	 */
	@Column(name = "in_sys_time")
	public void setInSysTime(Date inSysTime) {
		this.inSysTime = inSysTime;
	}

	/**
	 * @return 源流水
	 */
	public String getInSerialNo() {
		return this.inSerialNo;
	}

	/**
	 * @param inSerialNo
	 *            源流水
	 */
	@Column(name = "in_serial_no")
	public void setInSerialNo(String inSerialNo) {
		this.inSerialNo = inSerialNo;
	}

	/**
	 * @return 身份标识
	 */
	public String getIdentifier() {
		return this.identifier;
	}

	/**
	 * @param identifier
	 *            身份标识
	 */
	@Column(name = "identifier")
	public void setIdentifier(String identifier) {
		this.identifier = identifier;
	}

	/**
	 * @return 抛出渠道
	 */
	public String getPlatform() {
		return this.platform;
	}

	/**
	 * @param platform
	 *            抛出渠道
	 */
	@Column(name = "platform")
	public void setPlatform(String platform) {
		this.platform = platform;
	}

	/**
	 * @return 初始时间
	 */
	public Date getFirstTime() {
		return this.firstTime;
	}

	/**
	 * @param firstTime
	 *            初始时间
	 */
	@Column(name = "first_time")
	public void setFirstTime(Date firstTime) {
		this.firstTime = firstTime;
	}

	/**
	 * @return 最新时间
	 */
	public Date getLastTime() {
		return this.lastTime;
	}

	/**
	 * @param lastTime
	 *            最新时间
	 */
	@Column(name = "last_time")
	public void setLastTime(Date lastTime) {
		this.lastTime = lastTime;
	}

	/**
	 * @return 事件计数
	 */
	public int getTally() {
		return this.tally;
	}

	/**
	 * @param tally
	 *            事件计数
	 */
	@Column(name = "tally")
	public void setTally(int tally) {
		this.tally = tally;
	}

	/**
	 * @return 事件名称
	 */
	public String getName() {
		return this.name;
	}

	/**
	 * @param name
	 *            事件名称
	 */
	@Column(name = "name")
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return 事件描述/告警信息
	 */
	public String getDescription() {
		return this.description;
	}

	/**
	 * @param description
	 *            事件描述/告警信息
	 */
	@Column(name = "description")
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return 事件摘要
	 */
	public String getSummary() {
		return this.summary;
	}

	/**
	 * @param summary
	 *            事件摘要
	 */
	@Column(name = "summary")
	public void setSummary(String summary) {
		this.summary = summary;
	}

	/**
	 * @return 事件类型 故障-0,预警-1,信息-2
	 */
	public int getOtype() {
		return this.otype;
	}

	/**
	 * @param otype
	 *            事件类型 故障-0,预警-1,信息-2
	 */
	@Column(name = "otype")
	public void setOtype(int otype) {
		this.otype = otype;
	}

	/**
	 * @return 事件类型 故障-0,预警-1,信息-2
	 */
	public int getType() {
		return this.type;
	}

	/**
	 * @param type
	 *            事件类型 故障-0,预警-1,信息-2
	 */
	@Column(name = "type")
	public void setType(int type) {
		this.type = type;
	}

	/**
	 * @return 事件级别 1-5
	 */
	public String getLevel() {
		return this.level;
	}

	/**
	 * @param level
	 *            事件级别 1-5
	 */
	@Column(name = "level")
	public void setLevel(String level) {
		this.level = level;
	}

	/**
	 * @return 事件状态 触发-0,解决-1,关闭-2
	 */
	public String getStatus() {
		return this.status;
	}

	/**
	 * @param status
	 *            事件状态 触发-0,解决-1,关闭-2
	 */
	@Column(name = "status")
	public void setStatus(String status) {
		this.status = status;
	}

	/**
	 * @return 关闭状态 1/0
	 */
	public Integer getClosed() {
		return this.closed;
	}

	/**
	 * @param closed
	 *            关闭状态 1/0
	 */
	@Column(name = "closed")
	public void setClosed(Integer closed) {
		this.closed = closed;
	}

	/**
	 * @return 恢复状态 自动-0,人工-1
	 */
	public String getRecover() {
		return this.recover;
	}

	/**
	 * @param recover
	 *            恢复状态 自动-0,人工-1
	 */
	@Column(name = "recover")
	public void setRecover(String recover) {
		this.recover = recover;
	}

	/**
	 * @return 处理建议
	 */
	public String getHelp() {
		return this.help;
	}

	/**
	 * @param help
	 *            处理建议
	 */
	@Column(name = "help")
	public void setHelp(String help) {
		this.help = help;
	}

	/**
	 * @return 代理名称
	 */
	public String getAgent() {
		return this.agent;
	}

	/**
	 * @param agent
	 *            代理名称
	 */
	@Column(name = "agent")
	public void setAgent(String agent) {
		this.agent = agent;
	}

	/**
	 * @return 设备
	 */
	public Integer getDeviceId() {
		return this.deviceId;
	}

	/**
	 * @param deviceId
	 *            设备
	 */
	@Column(name = "device_id")
	public void setDeviceId(Integer deviceId) {
		this.deviceId = deviceId;
	}

	/**
	 * @return 应用系统
	 */
	public Integer getAppId() {
		return this.appId;
	}

	/**
	 * @param appId
	 *            应用系统
	 */
	@Column(name = "app_id")
	public void setAppId(Integer appId) {
		this.appId = appId;
	}

	/**
	 * @return 监控对象
	 */
	public Integer getMobjId() {
		return this.mobjId;
	}

	/**
	 * @param mobjId
	 *            监控对象
	 */
	@Column(name = "mobj_id")
	public void setMobjId(Integer mobjId) {
		this.mobjId = mobjId;
	}

	/**
	 * @return ITIL工单是否创建
	 */
	public Integer getItilCrt() {
		return this.itilCrt;
	}

	/**
	 * @param itilCrt
	 *            ITIL工单是否创建
	 */
	@Column(name = "itil_crt")
	public void setItilCrt(Integer itilCrt) {
		this.itilCrt = itilCrt;
	}

	/**
	 * @return ITIL标识 需创建工单: 1/0
	 */
	public Integer getItilFlag() {
		return this.itilFlag;
	}

	/**
	 * @param itilFlag
	 *            ITIL标识 需创建工单: 1/0
	 */
	@Column(name = "itil_flag")
	public void setItilFlag(Integer itilFlag) {
		this.itilFlag = itilFlag;
	}

	/**
	 * @return ITIL事件ID
	 */
	public String getItilId() {
		return this.itilId;
	}

	/**
	 * @param itilId
	 *            ITIL事件ID
	 */
	@Column(name = "itil_id")
	public void setItilId(String itilId) {
		this.itilId = itilId;
	}

	/**
	 * @return ITIL工单状态 Pending，待分派；Assigned,已分派；In
	 *         Progress，处理中；Resolved,已解决；Closed,已关闭；Cancelled,已取消；
	 */
	public String getItilStatus() {
		return this.itilStatus;
	}

	/**
	 * @param itilStatus
	 *            ITIL工单状态 Pending，待分派；Assigned,已分派；In
	 *            Progress，处理中；Resolved,已解决；Closed,已关闭；Cancelled,已取消；
	 */
	@Column(name = "itil_status")
	public void setItilStatus(String itilStatus) {
		this.itilStatus = itilStatus;
	}

	/**
	 * @return ITIL工单创建时间
	 */
	public Date getItilCreated() {
		return this.itilCreated;
	}

	/**
	 * @param itilCreated
	 *            ITIL工单创建时间
	 */
	@Column(name = "itil_created")
	public void setItilCreated(Date itilCreated) {
		this.itilCreated = itilCreated;
	}

	/**
	 * @return ITIL工单修改时间
	 */
	public Date getItilModified() {
		return this.itilModified;
	}

	/**
	 * @param itilModified
	 *            ITIL工单修改时间
	 */
	@Column(name = "itil_modified")
	public void setItilModified(Date itilModified) {
		this.itilModified = itilModified;
	}

	/**
	 * @return ITIL工单所属人
	 */
	public String getItilOwner() {
		return this.itilOwner;
	}

	/**
	 * @param itilOwner
	 *            ITIL工单所属人
	 */
	@Column(name = "itil_owner")
	public void setItilOwner(String itilOwner) {
		this.itilOwner = itilOwner;
	}

	/**
	 * @return 发送消息标识
	 */
	public String getMsgBitFlag() {
		return this.msgBitFlag;
	}

	/**
	 * @param msgBitFlag
	 *            发送消息标识
	 */
	@Column(name = "msg_bit_flag")
	public void setMsgBitFlag(String msgBitFlag) {
		this.msgBitFlag = msgBitFlag;
	}

	/**
	 * @return 指标分组
	 */
	public String getMetricGrp() {
		return this.metricGrp;
	}

	/**
	 * @param metricGrp
	 *            指标分组
	 */
	@Column(name = "metric_grp")
	public void setMetricGrp(String metricGrp) {
		this.metricGrp = metricGrp;
	}

	/**
	 * @return 指标
	 */
	public String getMetric() {
		return this.metric;
	}

	/**
	 * @param metric
	 *            指标
	 */
	@Column(name = "metric")
	public void setMetric(String metric) {
		this.metric = metric;
	}

	/**
	 * @return 指标标签
	 */
	public String getMetricTag() {
		return this.metricTag;
	}

	/**
	 * @param metricTag
	 *            指标标签
	 */
	@Column(name = "metric_tag")
	public void setMetricTag(String metricTag) {
		this.metricTag = metricTag;
	}

	/**
	 * @return 汇报数据
	 */
	public String getPointData() {
		return this.pointData;
	}

	/**
	 * @param pointData
	 *            汇报数据
	 */
	@Column(name = "point_data")
	public void setPointData(String pointData) {
		this.pointData = pointData;
	}

	/**
	 * @return 恢复数据
	 */
	public String getRestoreData() {
		return this.restoreData;
	}

	/**
	 * @param restoreData
	 *            恢复数据
	 */
	@Column(name = "restore_data")
	public void setRestoreData(String restoreData) {
		this.restoreData = restoreData;
	}

	/**
	 * @return 联合触发器: 1/0
	 */
	public Integer getMixt() {
		return this.mixt;
	}

	/**
	 * @param mixt
	 *            联合触发器: 1/0
	 */
	@Column(name = "mixt")
	public void setMixt(Integer mixt) {
		this.mixt = mixt;
	}

	/**
	 * @return 触发器ID
	 */
	public Integer getTriggerId() {
		return this.triggerId;
	}

	/**
	 * @param triggerId
	 *            触发器ID
	 */
	@Column(name = "trigger_id")
	public void setTriggerId(Integer triggerId) {
		this.triggerId = triggerId;
	}

	/**
	 * @return 事件性质
	 */
	public String getNature() {
		return this.nature;
	}

	/**
	 * @param nature
	 *            事件性质
	 */
	@Column(name = "nature")
	public void setNature(String nature) {
		this.nature = nature;
	}

	/**
	 * @return 影响度
	 */
	public String getInfluence() {
		return this.influence;
	}

	/**
	 * @param influence
	 *            影响度
	 */
	@Column(name = "influence")
	public void setInfluence(String influence) {
		this.influence = influence;
	}

	/**
	 * @return 优先级
	 */
	public String getPriority() {
		return this.priority;
	}

	/**
	 * @param priority
	 *            优先级
	 */
	@Column(name = "priority")
	public void setPriority(String priority) {
		this.priority = priority;
	}

	/**
	 * @return 等级 0-4
	 */
	public String getGrade() {
		return this.grade;
	}

	/**
	 * @param grade
	 *            等级 0-4
	 */
	@Column(name = "grade")
	public void setGrade(String grade) {
		this.grade = grade;
	}

	/**
	 * @return 升级原因
	 */
	public String getUpgradeReason() {
		return this.upgradeReason;
	}

	/**
	 * @param upgradeReason
	 *            升级原因
	 */
	@Column(name = "upgrade_reason")
	public void setUpgradeReason(String upgradeReason) {
		this.upgradeReason = upgradeReason;
	}

	/**
	 * @return 根事件ID
	 */
	public Integer getPrincipalId() {
		return this.principalId;
	}

	/**
	 * @param principalId
	 *            根事件ID
	 */
	@Column(name = "principal_id")
	public void setPrincipalId(Integer principalId) {
		this.principalId = principalId;
	}

	/**
	 * @return 根事件时间
	 */
	public Date getPrincipalTime() {
		return this.principalTime;
	}

	/**
	 * @param principalTime
	 *            根事件时间
	 */
	@Column(name = "principal_time")
	public void setPrincipalTime(Date principalTime) {
		this.principalTime = principalTime;
	}

}