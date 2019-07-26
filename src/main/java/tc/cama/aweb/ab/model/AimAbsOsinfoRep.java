package tc.cama.aweb.ab.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;
@Entity
@Table(name = "aim_abs_osinfo_rep")
public class AimAbsOsinfoRep implements Serializable {
/**
 *记录id
*/
@Column(name = "id")
private Integer id;
/**
 *对象id
*/
@Column(name = "mobj_id")
private Integer mobjId;
/**
 *记录时间
*/
@JSONField(format="yyyy-MM-dd HH:mm:ss")
@Column(name = "record_time")
private Date recordTime;
/**
 *代理名称
*/
@Column(name = "agrent_name")
private String agrentName;
/**
 *暂没有用，默认为空
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
 *暂没有用，默认为空
*/
@Column(name = "app_id")
private Integer appId;
/**
 *暂没有用，默认为空
*/
@Column(name = "server_id")
private Integer serverId;
/**
 *暂没有用，默认为空
*/
@Column(name = "service_id")
private Integer serviceId;
/**
 *ip
*/
@Column(name = "ip")
private String ip;
/**
 *代理名称
*/
@Column(name = "agentname")
private String agentname;
/**
 *生产厂商
*/
@Column(name = "jvmcompany")
private String jvmcompany;
/**
 *jvm版本
*/
@Column(name = "jvmver")
private String jvmver;
/**
 *jvm名称
*/
@Column(name = "vmname")
private String vmname;
/**
 *虚拟机启动时间
*/
@Column(name = "jvmstarttime")
private String jvmstarttime;
/**
 *输入参数
*/
@Column(name = "jvmargs")
private String jvmargs;
/**
 *安装路径
*/
@Column(name = "jvminspath")
private String jvminspath;
@Column(name = "archname")
private String archname;
/**
 *操作系统名称
*/
@Column(name = "osname")
private String osname;
/**
 *cpu数量
*/
@Column(name = "oscpunum")
private String oscpunum;
/**
 *版本
*/
@Column(name = "osver")
private String osver;
/**
 *备注1: 备用字段1
*/
@Column(name = "note1")
private String note1;
/**
 *备注2: 备用字段2
*/
@Column(name = "note2")
private String note2;
/**
 *@return 记录id
*/
public Integer getId(){return this.id;}
/**
 *@param id 记录id
*/
@Column(name = "id")
public void setId(Integer id) {this.id = id;}
/**
 *@return 对象id
*/
public Integer getMobjId(){return this.mobjId;}
/**
 *@param mobjId 对象id
*/
@Column(name = "mobj_id")
public void setMobjId(Integer mobjId) {this.mobjId = mobjId;}
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
public String getAgrentName(){return this.agrentName;}
/**
 *@param agrentName 代理名称
*/
@Column(name = "agrent_name")
public void setAgrentName(String agrentName) {this.agrentName = agrentName;}
/**
 *@return 暂没有用，默认为空
*/
public String getInChannel(){return this.inChannel;}
/**
 *@param inChannel 暂没有用，默认为空
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
 *@return 暂没有用，默认为空
*/
public Integer getAppId(){return this.appId;}
/**
 *@param appId 暂没有用，默认为空
*/
@Column(name = "app_id")
public void setAppId(Integer appId) {this.appId = appId;}
/**
 *@return 暂没有用，默认为空
*/
public Integer getServerId(){return this.serverId;}
/**
 *@param serverId 暂没有用，默认为空
*/
@Column(name = "server_id")
public void setServerId(Integer serverId) {this.serverId = serverId;}
/**
 *@return 暂没有用，默认为空
*/
public Integer getServiceId(){return this.serviceId;}
/**
 *@param serviceId 暂没有用，默认为空
*/
@Column(name = "service_id")
public void setServiceId(Integer serviceId) {this.serviceId = serviceId;}
/**
 *@return ip
*/
public String getIp(){return this.ip;}
/**
 *@param ip ip
*/
@Column(name = "ip")
public void setIp(String ip) {this.ip = ip;}
/**
 *@return 代理名称
*/
public String getAgentname(){return this.agentname;}
/**
 *@param agentname 代理名称
*/
@Column(name = "agentname")
public void setAgentname(String agentname) {this.agentname = agentname;}
/**
 *@return 生产厂商
*/
public String getJvmcompany(){return this.jvmcompany;}
/**
 *@param jvmcompany 生产厂商
*/
@Column(name = "jvmcompany")
public void setJvmcompany(String jvmcompany) {this.jvmcompany = jvmcompany;}
/**
 *@return jvm版本
*/
public String getJvmver(){return this.jvmver;}
/**
 *@param jvmver jvm版本
*/
@Column(name = "jvmver")
public void setJvmver(String jvmver) {this.jvmver = jvmver;}
/**
 *@return jvm名称
*/
public String getVmname(){return this.vmname;}
/**
 *@param vmname jvm名称
*/
@Column(name = "vmname")
public void setVmname(String vmname) {this.vmname = vmname;}
/**
 *@return 虚拟机启动时间
*/
public String getJvmstarttime(){return this.jvmstarttime;}
/**
 *@param jvmstarttime 虚拟机启动时间
*/
@Column(name = "jvmstarttime")
public void setJvmstarttime(String jvmstarttime) {this.jvmstarttime = jvmstarttime;}
/**
 *@return 输入参数
*/
public String getJvmargs(){return this.jvmargs;}
/**
 *@param jvmargs 输入参数
*/
@Column(name = "jvmargs")
public void setJvmargs(String jvmargs) {this.jvmargs = jvmargs;}
/**
 *@return 安装路径
*/
public String getJvminspath(){return this.jvminspath;}
/**
 *@param jvminspath 安装路径
*/
@Column(name = "jvminspath")
public void setJvminspath(String jvminspath) {this.jvminspath = jvminspath;}
/**
 *@return %s
*/
public String getArchname(){return this.archname;}
/**
 *@param %s %s
*/
@Column(name = "%s")
public void setArchname(String archname) {this.archname = archname;}
/**
 *@return 操作系统名称
*/
public String getOsname(){return this.osname;}
/**
 *@param osname 操作系统名称
*/
@Column(name = "osname")
public void setOsname(String osname) {this.osname = osname;}
/**
 *@return cpu数量
*/
public String getOscpunum(){return this.oscpunum;}
/**
 *@param oscpunum cpu数量
*/
@Column(name = "oscpunum")
public void setOscpunum(String oscpunum) {this.oscpunum = oscpunum;}
/**
 *@return 版本
*/
public String getOsver(){return this.osver;}
/**
 *@param osver 版本
*/
@Column(name = "osver")
public void setOsver(String osver) {this.osver = osver;}
/**
 *@return 备注1: 备用字段1
*/
public String getNote1(){return this.note1;}
/**
 *@param note1 备注1: 备用字段1
*/
@Column(name = "note1")
public void setNote1(String note1) {this.note1 = note1;}
/**
 *@return 备注2: 备用字段2
*/
public String getNote2(){return this.note2;}
/**
 *@param note2 备注2: 备用字段2
*/
@Column(name = "note2")
public void setNote2(String note2) {this.note2 = note2;}

}