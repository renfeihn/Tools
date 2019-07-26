package tc.cama.aweb.ab.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;
@Entity
@Table(name = "aim_abs_comm_trans")
public class AimAbsCommTrans implements Serializable {
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
 *交易码
*/
@Column(name = "trancode")
private String trancode;
/**
 *机构号
*/
@Column(name = "tranbrno")
private String tranbrno;
/**
 *机构名称
*/
@Column(name = "tranbrname")
private String tranbrname;
/**
 *柜员号
*/
@Column(name = "trantelno")
private String trantelno;
/**
 *柜员姓名
*/
@Column(name = "trantelname")
private String trantelname;
/**
 *发送时间
*/
@Column(name = "transendtime")
private String transendtime;
/**
 *接收时间
*/
@Column(name = "tranrecvtime")
private String tranrecvtime;
/**
 *错误码
*/
@Column(name = "tranerrcode")
private String tranerrcode;
/**
 *错误信息
*/
@Column(name = "tranerrmsg")
private String tranerrmsg;
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
 *@return 交易码
*/
public String getTrancode(){return this.trancode;}
/**
 *@param trancode 交易码
*/
@Column(name = "trancode")
public void setTrancode(String trancode) {this.trancode = trancode;}
/**
 *@return 机构号
*/
public String getTranbrno(){return this.tranbrno;}
/**
 *@param tranbrno 机构号
*/
@Column(name = "tranbrno")
public void setTranbrno(String tranbrno) {this.tranbrno = tranbrno;}
/**
 *@return 机构名称
*/
public String getTranbrname(){return this.tranbrname;}
/**
 *@param tranbrname 机构名称
*/
@Column(name = "tranbrname")
public void setTranbrname(String tranbrname) {this.tranbrname = tranbrname;}
/**
 *@return 柜员号
*/
public String getTrantelno(){return this.trantelno;}
/**
 *@param trantelno 柜员号
*/
@Column(name = "trantelno")
public void setTrantelno(String trantelno) {this.trantelno = trantelno;}
/**
 *@return 柜员姓名
*/
public String getTrantelname(){return this.trantelname;}
/**
 *@param trantelname 柜员姓名
*/
@Column(name = "trantelname")
public void setTrantelname(String trantelname) {this.trantelname = trantelname;}
/**
 *@return 发送时间
*/
public String getTransendtime(){return this.transendtime;}
/**
 *@param transendtime 发送时间
*/
@Column(name = "transendtime")
public void setTransendtime(String transendtime) {this.transendtime = transendtime;}
/**
 *@return 接收时间
*/
public String getTranrecvtime(){return this.tranrecvtime;}
/**
 *@param tranrecvtime 接收时间
*/
@Column(name = "tranrecvtime")
public void setTranrecvtime(String tranrecvtime) {this.tranrecvtime = tranrecvtime;}
/**
 *@return 错误码
*/
public String getTranerrcode(){return this.tranerrcode;}
/**
 *@param tranerrcode 错误码
*/
@Column(name = "tranerrcode")
public void setTranerrcode(String tranerrcode) {this.tranerrcode = tranerrcode;}
/**
 *@return 错误信息
*/
public String getTranerrmsg(){return this.tranerrmsg;}
/**
 *@param tranerrmsg 错误信息
*/
@Column(name = "tranerrmsg")
public void setTranerrmsg(String tranerrmsg) {this.tranerrmsg = tranerrmsg;}

}