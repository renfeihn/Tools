package tc.cama.aweb.ab.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;
@Entity
@Table(name = "aim_abc_list_cur")
public class AimAbcListCur implements Serializable {
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
 *服务器日期
*/
@Column(name = "srv_server_date")
private String srvServerDate;
/**
 *服务器时间
*/
@Column(name = "srv_server_time")
private String srvServerTime;
/**
 *ip
*/
@Column(name = "srv_ip")
private String srvIp;
/**
 *代理名称
*/
@Column(name = "srv_agentname")
private String srvAgentname;
/**
 *agent响应日期
*/
@Column(name = "srv_agent_date")
private String srvAgentDate;
/**
 *agent响应时间
*/
@Column(name = "srv_agent_time")
private String srvAgentTime;
/**
 *柜员名称
*/
@Column(name = "tellername")
private String tellername;
/**
 *机构号
*/
@Column(name = "brno")
private String brno;
/**
 *柜员号
*/
@Column(name = "tellerno")
private String tellerno;
/**
 *机构名称
*/
@Column(name = "brname")
private String brname;
/**
 *客户端ip
*/
@Column(name = "abc_ip")
private String abcIp;
/**
 *oid
*/
@Column(name = "oid")
private String oid;
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
 *@return 服务器日期
*/
public String getSrvServerDate(){return this.srvServerDate;}
/**
 *@param srvServerDate 服务器日期
*/
@Column(name = "srv_server_date")
public void setSrvServerDate(String srvServerDate) {this.srvServerDate = srvServerDate;}
/**
 *@return 服务器时间
*/
public String getSrvServerTime(){return this.srvServerTime;}
/**
 *@param srvServerTime 服务器时间
*/
@Column(name = "srv_server_time")
public void setSrvServerTime(String srvServerTime) {this.srvServerTime = srvServerTime;}
/**
 *@return ip
*/
public String getSrvIp(){return this.srvIp;}
/**
 *@param srvIp ip
*/
@Column(name = "srv_ip")
public void setSrvIp(String srvIp) {this.srvIp = srvIp;}
/**
 *@return 代理名称
*/
public String getSrvAgentname(){return this.srvAgentname;}
/**
 *@param srvAgentname 代理名称
*/
@Column(name = "srv_agentname")
public void setSrvAgentname(String srvAgentname) {this.srvAgentname = srvAgentname;}
/**
 *@return agent响应日期
*/
public String getSrvAgentDate(){return this.srvAgentDate;}
/**
 *@param srvAgentDate agent响应日期
*/
@Column(name = "srv_agent_date")
public void setSrvAgentDate(String srvAgentDate) {this.srvAgentDate = srvAgentDate;}
/**
 *@return agent响应时间
*/
public String getSrvAgentTime(){return this.srvAgentTime;}
/**
 *@param srvAgentTime agent响应时间
*/
@Column(name = "srv_agent_time")
public void setSrvAgentTime(String srvAgentTime) {this.srvAgentTime = srvAgentTime;}
/**
 *@return 柜员名称
*/
public String getTellername(){return this.tellername;}
/**
 *@param tellername 柜员名称
*/
@Column(name = "tellername")
public void setTellername(String tellername) {this.tellername = tellername;}
/**
 *@return 机构号
*/
public String getBrno(){return this.brno;}
/**
 *@param brno 机构号
*/
@Column(name = "brno")
public void setBrno(String brno) {this.brno = brno;}
/**
 *@return 柜员号
*/
public String getTellerno(){return this.tellerno;}
/**
 *@param tellerno 柜员号
*/
@Column(name = "tellerno")
public void setTellerno(String tellerno) {this.tellerno = tellerno;}
/**
 *@return 机构名称
*/
public String getBrname(){return this.brname;}
/**
 *@param brname 机构名称
*/
@Column(name = "brname")
public void setBrname(String brname) {this.brname = brname;}
/**
 *@return 客户端ip
*/
public String getAbcIp(){return this.abcIp;}
/**
 *@param abcIp 客户端ip
*/
@Column(name = "abc_ip")
public void setAbcIp(String abcIp) {this.abcIp = abcIp;}
/**
 *@return oid
*/
public String getOid(){return this.oid;}
/**
 *@param oid oid
*/
@Column(name = "oid")
public void setOid(String oid) {this.oid = oid;}
}