package tc.cama.aweb.ab.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;
@Entity
@Table(name = "aim_abs_commcount_cur")
public class AimAbsCommcount implements Serializable {
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
 *通讯次数
*/
@Column(name = "commcount")
private Integer commcount;
/**
 *交易次数
*/
@Column(name = "tradecount")
private Integer tradecount;
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
 *@return 通讯次数
*/
public Integer getCommcount(){return this.commcount;}
/**
 *@param commcount 通讯次数
*/
@Column(name = "commcount")
public void setCommcount(Integer commcount) {this.commcount = commcount;}
/**
 *@return 交易次数
*/
public Integer getTradecount(){return this.tradecount;}
/**
 *@param tradecount 交易次数
*/
@Column(name = "tradecount")
public void setTradecount(Integer tradecount) {this.tradecount = tradecount;}

}