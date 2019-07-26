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
@Table(name = "aim_data_metrics")
public class AimDataMetrics implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -9117322983468551809L;
	
	/**
	 * ID
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "GLOBAL")
	@Column(name = "id")
	private int id;
	/**
	 * 记录时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "record_time")
	private Date recordTime;
	/**
	 * 代理名称
	 */
	@Column(name = "agent_name")
	private String agentName;
	/**
	 * 汇报渠道
	 */
	@Column(name = "in_channel")
	private String inChannel;
	/**
	 * 记录时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "sample_time")
	private Date sampleTime;
	/**
	 * 应用系统ID
	 */
	@Column(name = "app_id")
	private int appId;
	/**
	 * 服务器ID
	 */
	@Column(name = "server_id")
	private int serverId;
	/**
	 * 服务ID
	 */
	@Column(name = "service_id")
	private int serviceId;
	/**
	 * 对象ID
	 */
	@Column(name = "mobj_id")
	private int mobjId;
	/**
	 * 分类
	 */
	@Column(name = "cate")
	private String cate;
	/**
	 * 值
	 */
	@Column(name = "value")
	private String value;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Date getRecordTime() {
		return recordTime;
	}
	public void setRecordTime(Date recordTime) {
		this.recordTime = recordTime;
	}
	public String getAgentName() {
		return agentName;
	}
	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}
	public String getInChannel() {
		return inChannel;
	}
	public void setInChannel(String inChannel) {
		this.inChannel = inChannel;
	}
	public Date getSampleTime() {
		return sampleTime;
	}
	public void setSampleTime(Date sampleTime) {
		this.sampleTime = sampleTime;
	}
	public int getAppId() {
		return appId;
	}
	public void setAppId(int appId) {
		this.appId = appId;
	}
	public int getServerId() {
		return serverId;
	}
	public void setServerId(int serverId) {
		this.serverId = serverId;
	}
	public int getServiceId() {
		return serviceId;
	}
	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}
	public int getMobjId() {
		return mobjId;
	}
	public void setMobjId(int mobjId) {
		this.mobjId = mobjId;
	}
	public String getCate() {
		return cate;
	}
	public void setCate(String cate) {
		this.cate = cate;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
}