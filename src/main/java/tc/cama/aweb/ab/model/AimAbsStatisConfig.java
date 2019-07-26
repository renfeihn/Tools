package tc.cama.aweb.ab.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;
@Entity
@Table(name = "aim_abs_statis_config")
public class AimAbsStatisConfig implements Serializable {
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
 *注册ID: 由平台自动生成
*/
@Column(name = "regid")
private String regid;
/**
 *实例名称: 实例名称不能重复
*/
@Column(name = "inst_name")
private String instName;
/**
 *实例名称描述: 实例名称描述
*/
@Column(name = "inst_desp")
private String instDesp;
/**
 *部署IP: 实例部署IP地址
*/
@Column(name = "inst_ip")
private String instIp;
/**
 *平台名称: 平台名称
*/
@Column(name = "inst_platname")
private String instPlatname;
/**
 *安装路径: 平台安装路径（从/根路径开始）
*/
@Column(name = "inst_path")
private String instPath;
/**
 *实例负责人: 实例负责人
*/
@Column(name = "inst_owner")
private String instOwner;
/**
 *监控状态: 1-监控中 2-暂停 3-取消监控
*/
@Column(name = "inst_moniter")
private String instMoniter;
/**
 *实例状态
*/
@Column(name = "inst_status")
private String instStatus;
/**
 *实例用户名
*/
@Column(name = "inst_user")
private String instUser;
/**
 *实例用户密码
*/
@Column(name = "inst_pwd")
private String instPwd;
/**
 *协议:只支持ssh
*/
@Column(name = "inst_protocol")
private String instProtocol;
/**
 *ssh端口
*/
@Column(name = "inst_port")
private String instPort;
/**
 *ab服务安装路径
*/
@Column(name = "inst_inspath")
private String instInspath;
/**
 *是否是版本服务器
*/
@Column(name = "inst_isver")
private String instIsver;
/**
 *集群
*/
@Column(name = "inst_clusters")
private String instClusters;
/**
 *上次体检时间
*/
@Column(name = "inst_last_checktime")
private String instLastChecktime;
/**
 *备注1: 备用字段1
*/
@Column(name = "inst_note1")
private String instNote1;
/**
 *备注2: 备用字段2
*/
@Column(name = "inst_note2")
private String instNote2;
/**
 *备注3: 备用字段3
*/
@Column(name = "inst_note3")
private String instNote3;
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
 *@return 注册ID: 由平台自动生成
*/
public String getRegid(){return this.regid;}
/**
 *@param regid 注册ID: 由平台自动生成
*/
@Column(name = "regid")
public void setRegid(String regid) {this.regid = regid;}
/**
 *@return 实例名称: 实例名称不能重复
*/
public String getInstName(){return this.instName;}
/**
 *@param instName 实例名称: 实例名称不能重复
*/
@Column(name = "inst_name")
public void setInstName(String instName) {this.instName = instName;}
/**
 *@return 实例名称描述: 实例名称描述
*/
public String getInstDesp(){return this.instDesp;}
/**
 *@param instDesp 实例名称描述: 实例名称描述
*/
@Column(name = "inst_desp")
public void setInstDesp(String instDesp) {this.instDesp = instDesp;}
/**
 *@return 部署IP: 实例部署IP地址
*/
public String getInstIp(){return this.instIp;}
/**
 *@param instIp 部署IP: 实例部署IP地址
*/
@Column(name = "inst_ip")
public void setInstIp(String instIp) {this.instIp = instIp;}
/**
 *@return 平台名称: 平台名称
*/
public String getInstPlatname(){return this.instPlatname;}
/**
 *@param instPlatname 平台名称: 平台名称
*/
@Column(name = "inst_platname")
public void setInstPlatname(String instPlatname) {this.instPlatname = instPlatname;}
/**
 *@return 安装路径: 平台安装路径（从/根路径开始）
*/
public String getInstPath(){return this.instPath;}
/**
 *@param instPath 安装路径: 平台安装路径（从/根路径开始）
*/
@Column(name = "inst_path")
public void setInstPath(String instPath) {this.instPath = instPath;}
/**
 *@return 实例负责人: 实例负责人
*/
public String getInstOwner(){return this.instOwner;}
/**
 *@param instOwner 实例负责人: 实例负责人
*/
@Column(name = "inst_owner")
public void setInstOwner(String instOwner) {this.instOwner = instOwner;}
/**
 *@return 监控状态: 1-监控中 2-暂停 3-取消监控
*/
public String getInstMoniter(){return this.instMoniter;}
/**
 *@param instMoniter 监控状态: 1-监控中 2-暂停 3-取消监控
*/
@Column(name = "inst_moniter")
public void setInstMoniter(String instMoniter) {this.instMoniter = instMoniter;}
/**
 *@return 实例状态
*/
public String getInstStatus(){return this.instStatus;}
/**
 *@param instStatus 实例状态
*/
@Column(name = "inst_status")
public void setInstStatus(String instStatus) {this.instStatus = instStatus;}
/**
 *@return 实例用户名
*/
public String getInstUser(){return this.instUser;}
/**
 *@param instUser 实例用户名
*/
@Column(name = "inst_user")
public void setInstUser(String instUser) {this.instUser = instUser;}
/**
 *@return 实例用户密码
*/
public String getInstPwd(){return this.instPwd;}
/**
 *@param instPwd 实例用户密码
*/
@Column(name = "inst_pwd")
public void setInstPwd(String instPwd) {this.instPwd = instPwd;}
/**
 *@return 协议:只支持ssh
*/
public String getInstProtocol(){return this.instProtocol;}
/**
 *@param instProtocol 协议:只支持ssh
*/
@Column(name = "inst_protocol")
public void setInstProtocol(String instProtocol) {this.instProtocol = instProtocol;}
/**
 *@return ssh端口
*/
public String getInstPort(){return this.instPort;}
/**
 *@param instPort ssh端口
*/
@Column(name = "inst_port")
public void setInstPort(String instPort) {this.instPort = instPort;}
/**
 *@return ab服务安装路径
*/
public String getInstInspath(){return this.instInspath;}
/**
 *@param instInspath ab服务安装路径
*/
@Column(name = "inst_inspath")
public void setInstInspath(String instInspath) {this.instInspath = instInspath;}
/**
 *@return 是否是版本服务器
*/
public String getInstIsver(){return this.instIsver;}
/**
 *@param instIsver 是否是版本服务器
*/
@Column(name = "inst_isver")
public void setInstIsver(String instIsver) {this.instIsver = instIsver;}
/**
 *@return 集群
*/
public String getInstClusters(){return this.instClusters;}
/**
 *@param instClusters 集群
*/
@Column(name = "inst_clusters")
public void setInstClusters(String instClusters) {this.instClusters = instClusters;}
/**
 *@return 上次体检时间
*/
public String getInstLastChecktime(){return this.instLastChecktime;}
/**
 *@param instLastChecktime 上次体检时间
*/
@Column(name = "inst_last_checktime")
public void setInstLastChecktime(String instLastChecktime) {this.instLastChecktime = instLastChecktime;}
/**
 *@return 备注1: 备用字段1
*/
public String getInstNote1(){return this.instNote1;}
/**
 *@param instNote1 备注1: 备用字段1
*/
@Column(name = "inst_note1")
public void setInstNote1(String instNote1) {this.instNote1 = instNote1;}
/**
 *@return 备注2: 备用字段2
*/
public String getInstNote2(){return this.instNote2;}
/**
 *@param instNote2 备注2: 备用字段2
*/
@Column(name = "inst_note2")
public void setInstNote2(String instNote2) {this.instNote2 = instNote2;}
/**
 *@return 备注3: 备用字段3
*/
public String getInstNote3(){return this.instNote3;}
/**
 *@param instNote3 备注3: 备用字段3
*/
@Column(name = "inst_note3")
public void setInstNote3(String instNote3) {this.instNote3 = instNote3;}

}