package tc.cama.aweb.ab.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;
@Entity
@Table(name = "aim_abs_agent_cur")
public class AimAbsAgentCur implements Serializable {
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
 *，暂没有用，默认为空
*/
@Column(name = "app_id")
private Integer appId;
/**
 *，暂没有用，默认为空
*/
@Column(name = "server_id")
private Integer serverId;
/**
 *，暂没有用，默认为空
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
 *端口
*/
@Column(name = "port")
private String port;
/**
 *fin数
*/
@Column(name = "finnum")
private String finnum;
/**
 *timewait数
*/
@Column(name = "timewaitnum")
private String timewaitnum;
/**
 *closewait数
*/
@Column(name = "closewaitnum")
private String closewaitnum;
/**
 *established数
*/
@Column(name = "establishednum")
private String establishednum;
/**
 *连接数
*/
@Column(name = "connectnum")
private String connectnum;
/**
 *进程号
*/
@Column(name = "pid")
private String pid;
/**
 *打开文件的句柄数
*/
@Column(name = "filenum")
private String filenum;
/**
 *用户名
*/
@Column(name = "username")
private String username;
/**
 *打开文件的句柄数
*/
@Column(name = "userid")
private String userid;
/**
 *父进程id
*/
@Column(name = "ppid")
private String ppid;
/**
 *进程总体虚拟内存的大小
*/
@Column(name = "vsize")
private String vsize;
/**
 *实际驻留内存的大小
*/
@Column(name = "rss")
private String rss;
/**
 *内存利用率
*/
@Column(name = "pmem")
private String pmem;
/**
 *CPU利用率
*/
@Column(name = "pcpu")
private String pcpu;
/**
 *进程状态
*/
@Column(name = "stat")
private String stat;
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
 *@return ，暂没有用，默认为空
*/
public Integer getAppId(){return this.appId;}
/**
 *@param appId ，暂没有用，默认为空
*/
@Column(name = "app_id")
public void setAppId(Integer appId) {this.appId = appId;}
/**
 *@return ，暂没有用，默认为空
*/
public Integer getServerId(){return this.serverId;}
/**
 *@param serverId ，暂没有用，默认为空
*/
@Column(name = "server_id")
public void setServerId(Integer serverId) {this.serverId = serverId;}
/**
 *@return ，暂没有用，默认为空
*/
public Integer getServiceId(){return this.serviceId;}
/**
 *@param serviceId ，暂没有用，默认为空
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
 *@return 端口
*/
public String getPort(){return this.port;}
/**
 *@param port 端口
*/
@Column(name = "port")
public void setPort(String port) {this.port = port;}
/**
 *@return fin数
*/
public String getFinnum(){return this.finnum;}
/**
 *@param finnum fin数
*/
@Column(name = "finnum")
public void setFinnum(String finnum) {this.finnum = finnum;}
/**
 *@return timewait数
*/
public String getTimewaitnum(){return this.timewaitnum;}
/**
 *@param timewaitnum timewait数
*/
@Column(name = "timewaitnum")
public void setTimewaitnum(String timewaitnum) {this.timewaitnum = timewaitnum;}
/**
 *@return closewait数
*/
public String getClosewaitnum(){return this.closewaitnum;}
/**
 *@param closewaitnum closewait数
*/
@Column(name = "closewaitnum")
public void setClosewaitnum(String closewaitnum) {this.closewaitnum = closewaitnum;}
/**
 *@return established数
*/
public String getEstablishednum(){return this.establishednum;}
/**
 *@param establishednum established数
*/
@Column(name = "establishednum")
public void setEstablishednum(String establishednum) {this.establishednum = establishednum;}
/**
 *@return 连接数
*/
public String getConnectnum(){return this.connectnum;}
/**
 *@param connectnum 连接数
*/
@Column(name = "connectnum")
public void setConnectnum(String connectnum) {this.connectnum = connectnum;}
/**
 *@return 进程号
*/
public String getPid(){return this.pid;}
/**
 *@param pid 进程号
*/
@Column(name = "pid")
public void setPid(String pid) {this.pid = pid;}
/**
 *@return 打开文件的句柄数
*/
public String getFilenum(){return this.filenum;}
/**
 *@param filenum 打开文件的句柄数
*/
@Column(name = "filenum")
public void setFilenum(String filenum) {this.filenum = filenum;}
/**
 *@return 用户名
*/
public String getUsername(){return this.username;}
/**
 *@param username 用户名
*/
@Column(name = "username")
public void setUsername(String username) {this.username = username;}
/**
 *@return 打开文件的句柄数
*/
public String getUserid(){return this.userid;}
/**
 *@param userid 打开文件的句柄数
*/
@Column(name = "userid")
public void setUserid(String userid) {this.userid = userid;}
/**
 *@return 父进程id
*/
public String getPpid(){return this.ppid;}
/**
 *@param ppid 父进程id
*/
@Column(name = "ppid")
public void setPpid(String ppid) {this.ppid = ppid;}
/**
 *@return 进程总体虚拟内存的大小
*/
public String getVsize(){return this.vsize;}
/**
 *@param vsize 进程总体虚拟内存的大小
*/
@Column(name = "vsize")
public void setVsize(String vsize) {this.vsize = vsize;}
/**
 *@return 实际驻留内存的大小
*/
public String getRss(){return this.rss;}
/**
 *@param rss 实际驻留内存的大小
*/
@Column(name = "rss")
public void setRss(String rss) {this.rss = rss;}
/**
 *@return 内存利用率
*/
public String getPmem(){return this.pmem;}
/**
 *@param pmem 内存利用率
*/
@Column(name = "pmem")
public void setPmem(String pmem) {this.pmem = pmem;}
/**
 *@return CPU利用率
*/
public String getPcpu(){return this.pcpu;}
/**
 *@param pcpu CPU利用率
*/
@Column(name = "pcpu")
public void setPcpu(String pcpu) {this.pcpu = pcpu;}
/**
 *@return 进程状态
*/
public String getStat(){return this.stat;}
/**
 *@param stat 进程状态
*/
@Column(name = "stat")
public void setStat(String stat) {this.stat = stat;}

}