package tc.bank.cama.agentmgr.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;

@Entity
@Table(name = "aim_adm_agent_reg")
public class AimAdmAgentReg implements Serializable {
	private static final long serialVersionUID = -7625916517264101786L;
	/**
	 * 主键
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "GLOBAL")
	@Column(name = "id")
	private Integer id;
	/**
	 * 代理名称
	 */
	@Column(name = "agent_name")
	private String agentName;
	/**
	 * 代理别称
	 */
	@Column(name = "agent_alias")
	private String agentAlias;
	/**
	 * 代理类型 aweb,sdk,host
	 */
	@Column(name = "agent_type")
	private String agentType;
	/**
	 * 代理版本 主版本.次版本
	 */
	@Column(name = "agent_ver")
	private String agentVer;
	/**
	 * 设备ID
	 */
	@Column(name = "device_id")
	private Integer deviceId;
	/**
	 * 节点名称
	 */
	@Column(name = "node_name")
	private String nodeName;
	/**
	 * 节点别称
	 */
	@Column(name = "node_alias")
	private String nodeAlias;
	/**
	 * 代理标识
	 */
	@Column(name = "agent_flag")
	private Integer agentFlag;
	/**
	 * 代理状态 离线-0,在线-1,未知-2
	 */
	@Column(name = "agent_status")
	private Integer agentStatus;
	/**
	 * 注册时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "reg_time")
	private Date regTime;
	/**
	 * 注销时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "unreg_time")
	private Date unregTime;
	/**
	 * 同步时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "sync_time")
	private Date syncTime;

	/**
	 * @return 主键
	 */
	public Integer getId() {
		return this.id;
	}

	/**
	 * @param id
	 *            主键
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * @return 代理名称
	 */
	public String getAgentName() {
		return this.agentName;
	}

	/**
	 * @param agentName
	 *            代理名称
	 */
	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}

	/**
	 * @return 代理别称
	 */
	public String getAgentAlias() {
		return this.agentAlias;
	}

	/**
	 * @param agentAlias
	 *            代理别称
	 */
	public void setAgentAlias(String agentAlias) {
		this.agentAlias = agentAlias;
	}

	/**
	 * @return 代理类型 aweb,sdk,host
	 */
	public String getAgentType() {
		return this.agentType;
	}

	/**
	 * @param agentType
	 *            代理类型 aweb,sdk,host
	 */
	public void setAgentType(String agentType) {
		this.agentType = agentType;
	}

	/**
	 * @return 代理版本 主版本.次版本
	 */
	public String getAgentVer() {
		return this.agentVer;
	}

	/**
	 * @param agentVer
	 *            代理版本 主版本.次版本
	 */
	public void setAgentVer(String agentVer) {
		this.agentVer = agentVer;
	}

	/**
	 * @return 设备ID
	 */
	public Integer getDeviceId() {
		return this.deviceId;
	}

	/**
	 * @param deviceId
	 *            设备ID
	 */
	public void setDeviceId(Integer deviceId) {
		this.deviceId = deviceId;
	}

	/**
	 * @return 节点名称
	 */
	public String getNodeName() {
		return this.nodeName;
	}

	/**
	 * @param nodeName
	 *            节点名称
	 */
	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
	}

	/**
	 * @return 节点别称
	 */
	public String getNodeAlias() {
		return this.nodeAlias;
	}

	/**
	 * @param nodeAlias
	 *            节点别称
	 */
	public void setNodeAlias(String nodeAlias) {
		this.nodeAlias = nodeAlias;
	}

	/**
	 * @return 代理标识
	 */
	public Integer getAgentFlag() {
		return this.agentFlag;
	}

	/**
	 * @param agentFlag
	 *            代理标识
	 */
	public void setAgentFlag(Integer agentFlag) {
		this.agentFlag = agentFlag;
	}

	/**
	 * @return 代理状态 离线-0,在线-1,未知-2
	 */
	public Integer getAgentStatus() {
		return this.agentStatus;
	}

	/**
	 * @param agentStatus
	 *            代理状态 离线-0,在线-1,未知-2
	 */
	public void setAgentStatus(Integer agentStatus) {
		this.agentStatus = agentStatus;
	}

	/**
	 * @return 注册时间
	 */
	public Date getRegTime() {
		return this.regTime;
	}

	/**
	 * @param regTime
	 *            注册时间
	 */
	public void setRegTime(Date regTime) {
		this.regTime = regTime;
	}

	/**
	 * @return 注销时间
	 */
	public Date getUnregTime() {
		return this.unregTime;
	}

	/**
	 * @param unregTime
	 *            注销时间
	 */
	public void setUnregTime(Date unregTime) {
		this.unregTime = unregTime;
	}

	/**
	 * @return 同步时间
	 */
	public Date getSyncTime() {
		return this.syncTime;
	}

	/**
	 * @param syncTime
	 *            同步时间
	 */
	public void setSyncTime(Date syncTime) {
		this.syncTime = syncTime;
	}

}
