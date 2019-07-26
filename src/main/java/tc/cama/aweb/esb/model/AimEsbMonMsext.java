package tc.cama.aweb.esb.model;
import java.io.Serializable;
import java.util.Date;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import  tc.cama.aweb.utils.Object2MapUtil;
import com.aim.alibaba.fastjson.annotation.JSONField;
@Entity
@Table(name = "aim_esb_mon_msext")
public class AimEsbMonMsext implements Serializable {
/**
	 * 
	 */
	private static final long serialVersionUID = 1556227286104684731L;
/**
 *ID
*/
@Id
@SequenceGenerator(name = "", sequenceName = "GLOBAL")
@Column(name = "id")
private Integer id;

@Column(name = "Mon_Type")
private int monType;

@Column(name = "Mon_obj")
private String monObj;

//交易总计处理时间
private double transAvgtime;

//ESB总计内部处理时间
private double esbAvgtime;

//当前交易总计处理时间
private double currTransAvgtimes;

//当前ESB总计内部处理时间
private double currEsbAvgtimes;

@Column(name = "esbserviceid")
private String esbserviceid;

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
 *渠道类型
*/
@Column(name = "channelid")
private String channelid;
/**
 *消费者
*/
@Column(name = "consumer")
private String consumer;
/**
 *服务提供者
*/
@Column(name = "provider")
private String provider;
/**
 *错误码
*/
@Column(name = "errcode")
private String errcode;
/**
 *记库时间
*/
@JSONField(format="yyyy-MM-dd HH:mm:ss")
@Column(name = "record_datetime")
private Date recordDatetime;
/**
 *统计开始时间
*/
@JSONField(format="yyyy-MM-dd HH:mm:ss")
@Column(name = "start_datetime")
private Date startDatetime;
/**
 *统计结束时间
*/
@JSONField(format="yyyy-MM-dd HH:mm:ss")
@Column(name = "end_datetime")
private Date endDatetime;
/**
 *监控时间
*/
@JSONField(format="yyyy-MM-dd HH:mm:ss")
@Column(name = "mon_time")
private Date monTime;
/**
 *监控状态
*/
@Column(name = "mon_flag")
private String monFlag;
/**
 *日交易量
*/
@Column(name = "day_totnum")
private int dayTotnum;
/**
 *日系统成功笔数
*/
@Column(name = "day_sys_succ_num")
private int daySysSuccNum;
/**
 *日系统错误笔数
*/
@Column(name = "day_sys_err_num")
private int daySysErrNum;
/**
 *日业务成功笔数
*/
@Column(name = "day_buss_succ_num")
private int dayBussSuccNum;
/**
 *日业务错误笔数
*/
@Column(name = "day_buss_err_num")
private int dayBussErrNum;
/**
 *日系统成功率
*/
@Column(name = "day_sys_rate")
private double daySysRate;
/**
 *日业务成功率
*/
@Column(name = "day_buss_rate")
private double dayBussRate;
/**
 *日交易平均处理时间
*/
@Column(name = "day_trans_avgtime")
private double dayTransAvgtime;
/**
 *日ESB内部平均处理时间
*/
@Column(name = "day_esb_avgtime")
private double dayEsbAvgtime;
/**
 *日异常笔数
*/
@Column(name = "day_expt")
private int dayExpt;
/**
 *当前交易量
*/
@Column(name = "curr_totnum")
private int currTotnum;
/**
 *当前系统成功笔数
*/
@Column(name = "curr_sys_succ_num")
private int currSysSuccNum;
/**
 *当前系统错误笔数
*/
@Column(name = "curr_sys_err_num")
private int currSysErrNum;
/**
 *当前业务成功笔数
*/
@Column(name = "curr_buss_succ_num")
private int currBussSuccNum;
/**
 *当前业务错误笔数
*/
@Column(name = "curr_buss_err_num")
private int currBussErrNum;
/**
 *当前系统成功率状态
*/
@Column(name = "curr_sys_rate_flag")
private Integer currSysRateFlag;
/**
 *当前系统成功率连续异常通知次数
*/
@Column(name = "curr_sys_rate_info_time")
private Integer currSysRateInfoTime;
/**
 *当前系统成功率连续异常告警次数
*/
@Column(name = "curr_sys_rate_warn_time")
private Integer currSysRateWarnTime;
/**
 *当前系统成功率
*/
@Column(name = "curr_sys_rate")
private double currSysRate;
/**
 *当前业务成功率状态
*/
@Column(name = "curr_buss_rate_flag")
private Integer currBussRateFlag;
/**
 *当前业务成功率连续异常通知次数
*/
@Column(name = "curr_buss_rate_info_time")
private Integer currBussRateInfoTime;
/**
 *当前业务成功率连续异常告警次数
*/
@Column(name = "curr_buss_rate_warn_time")
private Integer currBussRateWarnTime;
/**
 *当前业务成功率
*/
@Column(name = "curr_buss_rate")
private double currBussRate;
/**
 *当前TPS状态
*/
@Column(name = "curr_tps_flag")
private Integer currTpsFlag;
/**
 *当前TPS连续异常通知次数
*/
@Column(name = "curr_tps_info_time")
private Integer currTpsInfoTime;
/**
 *当前TPS连续异常告警次数
*/
@Column(name = "curr_tps_warn_time")
private Integer currTpsWarnTime;
/**
 *当前TPS
*/
@Column(name = "curr_tps")
private double currTps;
/**
 *当前交易处理时间状态
*/
@Column(name = "curr_trans_avgtime_flag")
private Integer currTransAvgtimeFlag;
/**
 *当前交易处理时间连续异常通知次数
*/
@Column(name = "curr_trans_avgtime_info_time")
private Integer currTransAvgtimeInfoTime;
/**
 *当前交易处理时间连续异常告警次数
*/
@Column(name = "curr_trans_avgtime_warn_time")
private Integer currTransAvgtimeWarnTime;
/**
 *当前交易处理时间
*/
@Column(name = "curr_trans_avgtime")
private double currTransAvgtime;
/**
 *当前ESB内部平均处理时间状态
*/
@Column(name = "curr_esb_avgtime_flag")
private Integer currEsbAvgtimeFlag;
/**
 *当前ESB内部平均处理时间连续异常通知次数
*/
@Column(name = "curr_esb_avgtime_info_time")
private Integer currEsbAvgtimeInfoTime;
/**
 *当前ESB内部平均处理时间连续异常告警次数
*/
@Column(name = "curr_esb_avgtime_warn_time")
private Integer currEsbAvgtimeWarnTime;
/**
 *当前ESB内部平均处理时间
*/
@Column(name = "curr_esb_avgtime")
private double currEsbAvgtime;
/**
 *当前异常数状态
*/
@Column(name = "curr_expt_flag")
private Integer currExptFlag;
/**
 *当前异常连续通知次数
*/
@Column(name = "curr_expt_info_time")
private Integer currExptInfoTime;
/**
 *当前异常连续告警次数
*/
@Column(name = "curr_expt_warn_time")
private Integer currExptWarnTime;
/**
 *当前异常数
*/
@Column(name = "curr_expt")
private int currExpt;
/**
 *当前系统持续无交易时间
*/
@Column(name = "stop_hold_time_flag")
private Integer stopHoldTimeFlag;
/**
 *当前系统持续无交易时间异常通知次数
*/
@Column(name = "stop_hold_time_info_time")
private Integer stopHoldTimeInfoTime;
/**
 *当前系统持续无交易时间异常告警次数
*/
@Column(name = "stop_hold_time_warn_time")
private Integer stopHoldTimeWarnTime;
/**
 *当前系统持续无交易时间
*/
@Column(name = "stop_hold_time")
private long stopHoldTime;
/**
 *当前接入容器并发线程数状态
*/
@Column(name = "cons_thread_num_flag")
private Integer consThreadNumFlag;
/**
 *当前接入容器并发线程连续异常通知次数
*/
@Column(name = "cons_thread_num_info_time")
private Integer consThreadNumInfoTime;
/**
 *当前接入容器并发线程连续异常告警次数
*/
@Column(name = "cons_thread_num_warn_time")
private Integer consThreadNumWarnTime;
/**
 *当前接入容器并发线程数
*/
@Column(name = "cons_thread_num")
private int consThreadNum;
/**
 *当前接出容器并发线程数状态
*/
@Column(name = "prvd_thread_num_flag")
private Integer prvdThreadNumFlag;
/**
 *当前接出容器并发线程连续异常通知次数
*/
@Column(name = "prvd_thread_num_info_time")
private Integer prvdThreadNumInfoTime;
/**
 *当前接出容器并发线程连续异常告警次数
*/
@Column(name = "prvd_thread_num_warn_time")
private Integer prvdThreadNumWarnTime;
/**
 *当前接出容器并发线程数
*/
@Column(name = "prvd_thread_num")
private int prvdThreadNum;
public Integer getId() {
	return id;
}
public void setId(Integer id) {
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
public Integer getAppId() {
	return appId;
}
public void setAppId(Integer appId) {
	this.appId = appId;
}
public Integer getServerId() {
	return serverId;
}
public void setServerId(Integer serverId) {
	this.serverId = serverId;
}
public Integer getServiceId() {
	return serviceId;
}
public void setServiceId(Integer serviceId) {
	this.serviceId = serviceId;
}
public Integer getMobjId() {
	return mobjId;
}
public void setMobjId(Integer mobjId) {
	this.mobjId = mobjId;
}
public String getChannelid() {
	return channelid;
}
public void setChannelid(String channelid) {
	this.channelid = channelid;
}
public String getConsumer() {
	return consumer;
}
public void setConsumer(String consumer) {
	this.consumer = consumer;
}
public String getProvider() {
	return provider;
}
public void setProvider(String provider) {
	this.provider = provider;
}
public String getErrcode() {
	return errcode;
}
public void setErrcode(String errcode) {
	this.errcode = errcode;
}
public Date getRecordDatetime() {
	return recordDatetime;
}
public void setRecordDatetime(Date recordDatetime) {
	this.recordDatetime = recordDatetime;
}
public Date getStartDatetime() {
	return startDatetime;
}
public void setStartDatetime(Date startDatetime) {
	this.startDatetime = startDatetime;
}
public Date getEndDatetime() {
	return endDatetime;
}
public void setEndDatetime(Date endDatetime) {
	this.endDatetime = endDatetime;
}
public Date getMonTime() {
	return monTime;
}
public void setMonTime(Date monTime) {
	this.monTime = monTime;
}
public String getMonFlag() {
	return monFlag;
}
public void setMonFlag(String monFlag) {
	this.monFlag = monFlag;
}
public int getDayTotnum() {
	return dayTotnum;
}
public void setDayTotnum(int dayTotnum) {
	this.dayTotnum = dayTotnum;
}
public int getDaySysSuccNum() {
	return daySysSuccNum;
}
public void setDaySysSuccNum(int daySysSuccNum) {
	this.daySysSuccNum = daySysSuccNum;
}
public int getDaySysErrNum() {
	return daySysErrNum;
}
public void setDaySysErrNum(int daySysErrNum) {
	this.daySysErrNum = daySysErrNum;
}
public int getDayBussSuccNum() {
	return dayBussSuccNum;
}
public void setDayBussSuccNum(int dayBussSuccNum) {
	this.dayBussSuccNum = dayBussSuccNum;
}
public int getDayBussErrNum() {
	return dayBussErrNum;
}
public void setDayBussErrNum(int dayBussErrNum) {
	this.dayBussErrNum = dayBussErrNum;
}
public double getDaySysRate() {
	return daySysRate;
}
public void setDaySysRate(double daySysRate) {
	this.daySysRate = daySysRate;
}
public double getDayBussRate() {
	return dayBussRate;
}
public void setDayBussRate(double dayBussRate) {
	this.dayBussRate = dayBussRate;
}

public double getDayTransAvgtime() {
	return dayTransAvgtime;
}
public void setDayTransAvgtime(double dayTransAvgtime) {
	this.dayTransAvgtime = dayTransAvgtime;
}
public double getDayEsbAvgtime() {
	return dayEsbAvgtime;
}
public void setDayEsbAvgtime(double dayEsbAvgtime) {
	this.dayEsbAvgtime = dayEsbAvgtime;
}
public int getDayExpt() {
	return dayExpt;
}
public void setDayExpt(int dayExpt) {
	this.dayExpt = dayExpt;
}
public int getCurrTotnum() {
	return currTotnum;
}
public void setCurrTotnum(int currTotnum) {
	this.currTotnum = currTotnum;
}
public int getCurrSysSuccNum() {
	return currSysSuccNum;
}
public void setCurrSysSuccNum(int currSysSuccNum) {
	this.currSysSuccNum = currSysSuccNum;
}
public int getCurrSysErrNum() {
	return currSysErrNum;
}
public void setCurrSysErrNum(int currSysErrNum) {
	this.currSysErrNum = currSysErrNum;
}
public int getCurrBussSuccNum() {
	return currBussSuccNum;
}
public void setCurrBussSuccNum(int currBussSuccNum) {
	this.currBussSuccNum = currBussSuccNum;
}
public int getCurrBussErrNum() {
	return currBussErrNum;
}
public void setCurrBussErrNum(int currBussErrNum) {
	this.currBussErrNum = currBussErrNum;
}
public Integer getCurrSysRateFlag() {
	return currSysRateFlag;
}
public void setCurrSysRateFlag(Integer currSysRateFlag) {
	this.currSysRateFlag = currSysRateFlag;
}
public Integer getCurrSysRateInfoTime() {
	return currSysRateInfoTime;
}
public void setCurrSysRateInfoTime(Integer currSysRateInfoTime) {
	this.currSysRateInfoTime = currSysRateInfoTime;
}
public Integer getCurrSysRateWarnTime() {
	return currSysRateWarnTime;
}
public void setCurrSysRateWarnTime(Integer currSysRateWarnTime) {
	this.currSysRateWarnTime = currSysRateWarnTime;
}
public double getCurrSysRate() {
	return currSysRate;
}
public void setCurrSysRate(double currSysRate) {
	this.currSysRate = currSysRate;
}
public Integer getCurrBussRateFlag() {
	return currBussRateFlag;
}
public void setCurrBussRateFlag(Integer currBussRateFlag) {
	this.currBussRateFlag = currBussRateFlag;
}
public Integer getCurrBussRateInfoTime() {
	return currBussRateInfoTime;
}
public void setCurrBussRateInfoTime(Integer currBussRateInfoTime) {
	this.currBussRateInfoTime = currBussRateInfoTime;
}
public Integer getCurrBussRateWarnTime() {
	return currBussRateWarnTime;
}
public void setCurrBussRateWarnTime(Integer currBussRateWarnTime) {
	this.currBussRateWarnTime = currBussRateWarnTime;
}
public double getCurrBussRate() {
	return currBussRate;
}
public void setCurrBussRate(double currBussRate) {
	this.currBussRate = currBussRate;
}
public Integer getCurrTpsFlag() {
	return currTpsFlag;
}
public void setCurrTpsFlag(Integer currTpsFlag) {
	this.currTpsFlag = currTpsFlag;
}
public Integer getCurrTpsInfoTime() {
	return currTpsInfoTime;
}
public void setCurrTpsInfoTime(Integer currTpsInfoTime) {
	this.currTpsInfoTime = currTpsInfoTime;
}
public Integer getCurrTpsWarnTime() {
	return currTpsWarnTime;
}
public void setCurrTpsWarnTime(Integer currTpsWarnTime) {
	this.currTpsWarnTime = currTpsWarnTime;
}

public double getCurrTps() {
	return currTps;
}
public void setCurrTps(double currTps) {
	this.currTps = currTps;
}
public Integer getCurrTransAvgtimeFlag() {
	return currTransAvgtimeFlag;
}
public void setCurrTransAvgtimeFlag(Integer currTransAvgtimeFlag) {
	this.currTransAvgtimeFlag = currTransAvgtimeFlag;
}
public Integer getCurrTransAvgtimeInfoTime() {
	return currTransAvgtimeInfoTime;
}
public void setCurrTransAvgtimeInfoTime(Integer currTransAvgtimeInfoTime) {
	this.currTransAvgtimeInfoTime = currTransAvgtimeInfoTime;
}
public Integer getCurrTransAvgtimeWarnTime() {
	return currTransAvgtimeWarnTime;
}
public void setCurrTransAvgtimeWarnTime(Integer currTransAvgtimeWarnTime) {
	this.currTransAvgtimeWarnTime = currTransAvgtimeWarnTime;
}
public Integer getCurrEsbAvgtimeFlag() {
	return currEsbAvgtimeFlag;
}
public void setCurrEsbAvgtimeFlag(Integer currEsbAvgtimeFlag) {
	this.currEsbAvgtimeFlag = currEsbAvgtimeFlag;
}
public Integer getCurrEsbAvgtimeInfoTime() {
	return currEsbAvgtimeInfoTime;
}
public void setCurrEsbAvgtimeInfoTime(Integer currEsbAvgtimeInfoTime) {
	this.currEsbAvgtimeInfoTime = currEsbAvgtimeInfoTime;
}
public Integer getCurrEsbAvgtimeWarnTime() {
	return currEsbAvgtimeWarnTime;
}
public void setCurrEsbAvgtimeWarnTime(Integer currEsbAvgtimeWarnTime) {
	this.currEsbAvgtimeWarnTime = currEsbAvgtimeWarnTime;
}
public Integer getCurrExptFlag() {
	return currExptFlag;
}
public void setCurrExptFlag(Integer currExptFlag) {
	this.currExptFlag = currExptFlag;
}
public Integer getCurrExptInfoTime() {
	return currExptInfoTime;
}
public void setCurrExptInfoTime(Integer currExptInfoTime) {
	this.currExptInfoTime = currExptInfoTime;
}
public Integer getCurrExptWarnTime() {
	return currExptWarnTime;
}
public void setCurrExptWarnTime(Integer currExptWarnTime) {
	this.currExptWarnTime = currExptWarnTime;
}
public int getCurrExpt() {
	return currExpt;
}
public void setCurrExpt(int currExpt) {
	this.currExpt = currExpt;
}
public Integer getStopHoldTimeFlag() {
	return stopHoldTimeFlag;
}
public void setStopHoldTimeFlag(Integer stopHoldTimeFlag) {
	this.stopHoldTimeFlag = stopHoldTimeFlag;
}
public Integer getStopHoldTimeInfoTime() {
	return stopHoldTimeInfoTime;
}
public void setStopHoldTimeInfoTime(Integer stopHoldTimeInfoTime) {
	this.stopHoldTimeInfoTime = stopHoldTimeInfoTime;
}
public Integer getStopHoldTimeWarnTime() {
	return stopHoldTimeWarnTime;
}
public void setStopHoldTimeWarnTime(Integer stopHoldTimeWarnTime) {
	this.stopHoldTimeWarnTime = stopHoldTimeWarnTime;
}
public long getStopHoldTime() {
	return stopHoldTime;
}
public void setStopHoldTime(long stopHoldTime) {
	this.stopHoldTime = stopHoldTime;
}
public Integer getConsThreadNumFlag() {
	return consThreadNumFlag;
}
public void setConsThreadNumFlag(Integer consThreadNumFlag) {
	this.consThreadNumFlag = consThreadNumFlag;
}
public Integer getConsThreadNumInfoTime() {
	return consThreadNumInfoTime;
}
public void setConsThreadNumInfoTime(Integer consThreadNumInfoTime) {
	this.consThreadNumInfoTime = consThreadNumInfoTime;
}
public Integer getConsThreadNumWarnTime() {
	return consThreadNumWarnTime;
}
public void setConsThreadNumWarnTime(Integer consThreadNumWarnTime) {
	this.consThreadNumWarnTime = consThreadNumWarnTime;
}
public int getConsThreadNum() {
	return consThreadNum;
}
public void setConsThreadNum(int consThreadNum) {
	this.consThreadNum = consThreadNum;
}
public Integer getPrvdThreadNumFlag() {
	return prvdThreadNumFlag;
}
public void setPrvdThreadNumFlag(Integer prvdThreadNumFlag) {
	this.prvdThreadNumFlag = prvdThreadNumFlag;
}
public Integer getPrvdThreadNumInfoTime() {
	return prvdThreadNumInfoTime;
}
public void setPrvdThreadNumInfoTime(Integer prvdThreadNumInfoTime) {
	this.prvdThreadNumInfoTime = prvdThreadNumInfoTime;
}
public Integer getPrvdThreadNumWarnTime() {
	return prvdThreadNumWarnTime;
}
public void setPrvdThreadNumWarnTime(Integer prvdThreadNumWarnTime) {
	this.prvdThreadNumWarnTime = prvdThreadNumWarnTime;
}
public int getPrvdThreadNum() {
	return prvdThreadNum;
}
public void setPrvdThreadNum(int prvdThreadNum) {
	this.prvdThreadNum = prvdThreadNum;
}

public int getMonType() {
	return monType;
}
public void setMonType(int monType) {
	this.monType = monType;
}
public String getMonObj() {
	return monObj;
}
public void setMonObj(String monObj) {
	this.monObj = monObj;
}

public String getEsbserviceid() {
	return esbserviceid;
}
public void setEsbserviceid(String esbserviceid) {
	this.esbserviceid = esbserviceid;
}

public double getTransAvgtime() {
	return transAvgtime;
}
public void setTransAvgtime(double transAvgtime) {
	this.transAvgtime = transAvgtime;
}
public double getEsbAvgtime() {
	return esbAvgtime;
}
public void setEsbAvgtime(double esbAvgtime) {
	this.esbAvgtime = esbAvgtime;
}
public double getCurrTransAvgtimes() {
	return currTransAvgtimes;
}
public void setCurrTransAvgtimes(double currTransAvgtimes) {
	this.currTransAvgtimes = currTransAvgtimes;
}
public double getCurrEsbAvgtimes() {
	return currEsbAvgtimes;
}
public void setCurrEsbAvgtimes(double currEsbAvgtimes) {
	this.currEsbAvgtimes = currEsbAvgtimes;
}
public double getCurrTransAvgtime() {
	return currTransAvgtime;
}
public void setCurrTransAvgtime(double currTransAvgtime) {
	this.currTransAvgtime = currTransAvgtime;
}
public double getCurrEsbAvgtime() {
	return currEsbAvgtime;
}
public void setCurrEsbAvgtime(double currEsbAvgtime) {
	this.currEsbAvgtime = currEsbAvgtime;
}

public String toString(AimEsbMonMsext ext) {
	return "=====================compare====================\nAimEsbMonMsext\n [id=" + id + " -->"+ext.getId()+"\n monType=" + monType + " -->"+ext.getMonType()+"\n monObj="
			+ monObj + " -->"+ext.getMonObj()+ "\n transAvgtime=" + transAvgtime + " -->"+ext.getTransAvgtime()+"\n esbAvgtime="
			+ esbAvgtime + " -->"+ext.getEsbAvgtime()+"\n currTransAvgtimes=" + currTransAvgtimes
			+ " -->"+ext.getCurrTransAvgtimes()+"\n currEsbAvgtimes=" + currEsbAvgtimes +" -->"+ext.getCurrEsbAvgtimes()+ "\n esbserviceid="
			+ esbserviceid + " -->"+ext.getEsbserviceid()+"\n recordTime=" + recordTime + " -->"+ext.getRecordTime()+"\n sampleTime="
			+ sampleTime + " -->"+ext.getSampleTime()+"\n mobjId=" + mobjId + " -->"+ext.getMobjId()+"\n recordDatetime="
			+ recordDatetime +" -->"+ext.getRecordDatetime()+ "\n startDatetime=" + startDatetime
			+ " -->"+ext.getStartDatetime()+"\n endDatetime=" + endDatetime + " -->"+ext.getEndDatetime()+"\n monTime=" + monTime
			+ " -->"+ext.getMonTime()+"\n dayTotnum=" + dayTotnum + " -->"+ext.getDayTotnum()+"\n daySysSuccNum=" + daySysSuccNum
			+ " -->"+ext.getDaySysSuccNum()+"\n daySysErrNum=" + daySysErrNum +" -->"+ext.getDaySysErrNum()+ "\n dayBussSuccNum="
			+ dayBussSuccNum +" -->"+ext.getDayBussSuccNum()+ "\n dayBussErrNum=" + dayBussErrNum
			+ " -->"+ext.getDayBussErrNum()+"\n daySysRate=" + daySysRate + " -->"+ext.getDaySysRate()+"\n dayBussRate=" + dayBussRate
			+ " -->"+ext.getDayBussRate()+"\n dayTransAvgtime=" + dayTransAvgtime +" -->"+ext.getDayTransAvgtime()+ "\n dayEsbAvgtime="
			+ dayEsbAvgtime + " -->"+ext.getDayEsbAvgtime()+"\n dayExpt=" + dayExpt + " -->"+ext.getDayExpt()+"\n currTotnum="
			+ currTotnum + " -->"+ext.getCurrTotnum()+"\n currSysSuccNum=" + currSysSuccNum
			+ " -->"+ext.getCurrSysSuccNum()+"\n currSysErrNum=" + currSysErrNum + " -->"+ext.getCurrSysErrNum()+"\n currBussSuccNum="
			+ currBussSuccNum +" -->"+ext.getCurrBussSuccNum()+ "\n currBussErrNum=" + currBussErrNum
			+ " -->"+ext.getCurrBussErrNum()+"\n currSysRate=" + currSysRate + " -->"+ext.getCurrSysRate()+"\n currBussRate=" + currBussRate
			+ " -->"+ext.getCurrBussRate()+"\n currTps=" + currTps + " -->"+ext.getCurrTps()+"\n currTransAvgtime=" + currTransAvgtime
			+ " -->"+ext.getCurrTransAvgtime()+"\n currEsbAvgtime=" + currEsbAvgtime + " -->"+ext.getCurrEsbAvgtime()+"\n currExpt=" + currExpt
			+ " -->"+ext.getCurrExpt()+"\n stopHoldTime=" + stopHoldTime +" -->"+ext.getStopHoldTime()+ "]\n=====================compare====================";
}
public Map<String,Object> toMap(){
	return Object2MapUtil.toAnnotationMap(this);
}


}
