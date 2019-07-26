package tc.cama.aweb.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;
@Entity
@Table(name = "aim_data_os_filestat")
public class AimDataOsFilestat implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = -8328675124473567348L;
	/**
	 *ID
	*/
	@Id
	@SequenceGenerator(name = "", sequenceName = "GLOBAL")
	@Column(name = "id")
	private Integer id;
	/**
	 *记录时间
	*/
	@JSONField(format="yyyy-MM-dd HH:mm:ss")
	@Column(name = "record_time")
	private Date recordTime;
	/**
	 *代理名称
	*/
	@Column(name = "agent_name")
	private String agentName;
	/**
	 *汇报渠道
	*/
	@Column(name = "in_channel")
	private String inChannel;
	/**
	 *采集时间
	*/
	@JSONField(format="yyyy-MM-dd HH:mm:ss")
	@Column(name = "sample_time")
	private Date sampleTime;
	/**
	 *应用系统ID
	*/
	@Column(name = "app_id")
	private Integer appId;
	/**
	 *服务器ID
	*/
	@Column(name = "server_id")
	private Integer serverId;
	/**
	 *服务ID
	*/
	@Column(name = "service_id")
	private Integer serviceId;
	/**
	 *对象ID
	*/
	@Column(name = "mobj_id")
	private Integer mobjId;
	/**
	 *文件名称
	*/
	@Column(name = "fname")
	private String fname;
	/**
	 *文件是否存在(0-不存在 1-存在)
	*/
	@Column(name = "fexist")
	private String fexist;
	/**
	 *文件大小
	*/
	@Column(name = "fsize")
	private Long fsize;
	/**
	 *文件修改时间
	*/
	@Column(name = "ftime")
	private Integer ftime;
	/**
	 *文件权限
	*/
	@Column(name = "fmod")
	private String fmod;
	/**
	 *文件所属用户
	*/
	@Column(name = "fusr")
	private String fusr;
	/**
	 *文件所属组
	*/
	@Column(name = "fgrp")
	private String fgrp;
	/**
	 *@return ID
	*/
	public Integer getId(){return this.id;}
	/**
	 *@param id ID
	*/
	@Column(name = "id")
	public void setId(Integer id) {this.id = id;}
	/**
	 *@return 记录时间
	*/
	public Date getRecordTime(){return this.recordTime;}
	/**
	 *@param recordTime 记录时间
	*/
	@Column(name = "record_time")
	public void setRecordTime(Date recordTime) {this.recordTime = recordTime;}
	/**
	 *@return 代理名称
	*/
	public String getAgentName(){return this.agentName;}
	/**
	 *@param agentName 代理名称
	*/
	@Column(name = "agent_name")
	public void setAgentName(String agentName) {this.agentName = agentName;}
	/**
	 *@return 汇报渠道
	*/
	public String getInChannel(){return this.inChannel;}
	/**
	 *@param inChannel 汇报渠道
	*/
	@Column(name = "in_channel")
	public void setInChannel(String inChannel) {this.inChannel = inChannel;}
	/**
	 *@return 采集时间
	*/
	public Date getSampleTime(){return this.sampleTime;}
	/**
	 *@param sampleTime 采集时间
	*/
	@Column(name = "sample_time")
	public void setSampleTime(Date sampleTime) {this.sampleTime = sampleTime;}
	/**
	 *@return 应用系统ID
	*/
	public Integer getAppId(){return this.appId;}
	/**
	 *@param appId 应用系统ID
	*/
	@Column(name = "app_id")
	public void setAppId(Integer appId) {this.appId = appId;}
	/**
	 *@return 服务器ID
	*/
	public Integer getServerId(){return this.serverId;}
	/**
	 *@param serverId 服务器ID
	*/
	@Column(name = "server_id")
	public void setServerId(Integer serverId) {this.serverId = serverId;}
	/**
	 *@return 服务ID
	*/
	public Integer getServiceId(){return this.serviceId;}
	/**
	 *@param serviceId 服务ID
	*/
	@Column(name = "service_id")
	public void setServiceId(Integer serviceId) {this.serviceId = serviceId;}
	/**
	 *@return 对象ID
	*/
	public Integer getMobjId(){return this.mobjId;}
	/**
	 *@param mobjId 对象ID
	*/
	@Column(name = "mobj_id")
	public void setMobjId(Integer mobjId) {this.mobjId = mobjId;}
	/**
	 *@return 文件名称
	*/
	public String getFname(){return this.fname;}
	/**
	 *@param fname 文件名称
	*/
	@Column(name = "fname")
	public void setFname(String fname) {this.fname = fname;}
	/**
	 *@return 文件是否存在(0-不存在 1-存在)
	*/
	public String getFexist(){return this.fexist;}
	/**
	 *@param fexist 文件是否存在(0-不存在 1-存在)
	*/
	@Column(name = "fexist")
	public void setFexist(String fexist) {this.fexist = fexist;}
	/**
	 *@return 文件大小
	*/
	public Long getFsize(){return this.fsize;}
	/**
	 *@param fsize 文件大小
	*/
	@Column(name = "fsize")
	public void setFsize(Long fsize) {this.fsize = fsize;}
	/**
	 *@return 文件修改时间
	*/
	public Integer getFtime(){return this.ftime;}
	/**
	 *@param ftime 文件修改时间
	*/
	@Column(name = "ftime")
	public void setFtime(Integer ftime) {this.ftime = ftime;}
	/**
	 *@return 文件权限
	*/
	public String getFmod(){return this.fmod;}
	/**
	 *@param fmod 文件权限
	*/
	@Column(name = "fmod")
	public void setFmod(String fmod) {this.fmod = fmod;}
	/**
	 *@return 文件所属用户
	*/
	public String getFusr(){return this.fusr;}
	/**
	 *@param fusr 文件所属用户
	*/
	@Column(name = "fusr")
	public void setFusr(String fusr) {this.fusr = fusr;}
	/**
	 *@return 文件所属组
	*/
	public String getFgrp(){return this.fgrp;}
	/**
	 *@param fgrp 文件所属组
	*/
	@Column(name = "fgrp")
	public void setFgrp(String fgrp) {this.fgrp = fgrp;}

}
