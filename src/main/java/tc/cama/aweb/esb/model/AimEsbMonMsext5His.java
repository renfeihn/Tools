package tc.cama.aweb.esb.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;

@Entity
@Table(name = "aim_esb_mon_msext_5_his")
public class AimEsbMonMsext5His implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1399462553379548200L;
	/**
	 * ID
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "GLOBAL")
	@Column(name = "id")
	private Integer id;
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
	 * 采集时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "sample_time")
	private Date sampleTime;
	/**
	 * 应用系统ID
	 */
	@Column(name = "app_id")
	private Integer appId;
	/**
	 * 服务器ID
	 */
	@Column(name = "server_id")
	private Integer serverId;
	/**
	 * 服务ID
	 */
	@Column(name = "service_id")
	private Integer serviceId;
	/**
	 * 对象ID
	 */
	@Column(name = "mobj_id")
	private Integer mobjId;
	/**
	 * 对象类型
	 */
	@Column(name = "mon_type")
	private Integer monType;
	/**
	 * 监控对象
	 */
	@Column(name = "mon_obj")
	private String monObj;
	/**
	 * 渠道类型
	 */
	@Column(name = "channelid")
	private String channelid;
	/**
	 * 消费者
	 */
	@Column(name = "consumer")
	private String consumer;
	/**
	 * 服务提供者
	 */
	@Column(name = "provider")
	private String provider;
	/**
	 * 服务代码
	 */
	@Column(name = "esbserviceid")
	private String esbserviceid;
	/**
	 * 错误码
	 */
	@Column(name = "errcode")
	private String errcode;
	
	/**
	 * 错误信息
	 */
	@Column(name = "errmsg")
	private String errmsg;
	
	/**
	 * 记库时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "record_datetime")
	private Date recordDatetime;
	/**
	 * 统计开始时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "start_datetime")
	private Date startDatetime;
	/**
	 * 统计结束时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "end_datetime")
	private Date endDatetime;
	/**
	 * 监控时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "mon_time")
	private Date monTime;
	/**
	 * 监控状态
	 */
	@Column(name = "mon_flag")
	private String monFlag;

/**
 *当前交易量
*/
@Column(name = "curr_totnum")
private Double currTotnum;

/**
 *当前系统成功笔数
*/
@Column(name = "curr_sys_succ_num")
private Double currSysSuccNum;

/**
 *当前系统错误笔数
*/
@Column(name = "curr_sys_err_num")
private Double currSysErrNum;

/**
 *当前业务成功笔数
*/
@Column(name = "curr_buss_succ_num")
private Double currBussSuccNum;

/**
 *当前业务错误笔数
*/
@Column(name = "curr_buss_err_num")
private Double currBussErrNum;

/**
 *当前系统成功率
*/
@Column(name = "curr_sys_rate")
private Double  currSysRate;

/**
 *当前业务成功率
*/
@Column(name = "curr_buss_rate")
private Double  currBussRate;

/**
 *当前交易处理时间
*/
@Column(name = "curr_trans_avgtime")
private Double  currTransAvgtime;

/**
 *当前ESB内部平均处理时间
*/
@Column(name = "curr_esb_avgtime")
private Double  currEsbAvgtime;

/**
 *当前异常数
*/
@Column(name = "curr_expt")
private Double  currExpt;

/**
 *当前TPS
*/
@Column(name = "curr_tps")
private Double  currTps;

	/**
	 * @return ID
	 */
	public Integer getId() {
		return this.id;
	}

	/**
	 * @param id
	 *            ID
	 */
	@Column(name = "id")
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * errmsg
	 * @return
	 */
	public String getErrmsg() {
		return errmsg;
	}

	/**
	 * 
	 * @param errmsg
	 */
	@Column(name = "errmsg")
	public void setErrmsg(String errmsg) {
		this.errmsg = errmsg;
	}
	
	/**
	 * @return 记录时间
	 */
	public Date getRecordTime() {
		return this.recordTime;
	}

	/**
	 * @param recordTime
	 *            记录时间
	 */
	@Column(name = "record_time")
	public void setRecordTime(Date recordTime) {
		this.recordTime = recordTime;
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
	@Column(name = "agent_name")
	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}

	/**
	 * @return 汇报渠道
	 */
	public String getInChannel() {
		return this.inChannel;
	}

	/**
	 * @param inChannel
	 *            汇报渠道
	 */
	@Column(name = "in_channel")
	public void setInChannel(String inChannel) {
		this.inChannel = inChannel;
	}

	/**
	 * @return 采集时间
	 */
	public Date getSampleTime() {
		return this.sampleTime;
	}

	/**
	 * @param sampleTime
	 *            采集时间
	 */
	@Column(name = "sample_time")
	public void setSampleTime(Date sampleTime) {
		this.sampleTime = sampleTime;
	}

	/**
	 * @return 应用系统ID
	 */
	public Integer getAppId() {
		return this.appId;
	}

	/**
	 * @param appId
	 *            应用系统ID
	 */
	@Column(name = "app_id")
	public void setAppId(Integer appId) {
		this.appId = appId;
	}

	/**
	 * @return 服务器ID
	 */
	public Integer getServerId() {
		return this.serverId;
	}

	/**
	 * @param serverId
	 *            服务器ID
	 */
	@Column(name = "server_id")
	public void setServerId(Integer serverId) {
		this.serverId = serverId;
	}

	/**
	 * @return 服务ID
	 */
	public Integer getServiceId() {
		return this.serviceId;
	}

	/**
	 * @param serviceId
	 *            服务ID
	 */
	@Column(name = "service_id")
	public void setServiceId(Integer serviceId) {
		this.serviceId = serviceId;
	}

	/**
	 * @return 对象ID
	 */
	public Integer getMobjId() {
		return this.mobjId;
	}

	/**
	 * @param mobjId
	 *            对象ID
	 */
	@Column(name = "mobj_id")
	public void setMobjId(Integer mobjId) {
		this.mobjId = mobjId;
	}

	/**
	 * @return 对象类型
	 */
	public Integer getMonType() {
		return this.monType;
	}

	/**
	 * @param monType
	 *            对象类型
	 */
	@Column(name = "mon_type")
	public void setMonType(Integer monType) {
		this.monType = monType;
	}

	/**
	 * @return 监控对象
	 */
	public String getMonObj() {
		return this.monObj;
	}

	/**
	 * @param monObj
	 *            监控对象
	 */
	@Column(name = "mon_obj")
	public void setMonObj(String monObj) {
		this.monObj = monObj;
	}

	/**
	 * @return 渠道类型
	 */
	public String getChannelid() {
		return this.channelid;
	}

	/**
	 * @param channelid
	 *            渠道类型
	 */
	@Column(name = "channelid")
	public void setChannelid(String channelid) {
		this.channelid = channelid;
	}

	/**
	 * @return 消费者
	 */
	public String getConsumer() {
		return this.consumer;
	}

	/**
	 * @param consumer
	 *            消费者
	 */
	@Column(name = "consumer")
	public void setConsumer(String consumer) {
		this.consumer = consumer;
	}

	/**
	 * @return 服务提供者
	 */
	public String getProvider() {
		return this.provider;
	}

	/**
	 * @param provider
	 *            服务提供者
	 */
	@Column(name = "provider")
	public void setProvider(String provider) {
		this.provider = provider;
	}

	/**
	 * @return 服务代码
	 */
	public String getEsbserviceid() {
		return this.esbserviceid;
	}

	/**
	 * @param esbserviceid
	 *            服务代码
	 */
	@Column(name = "esbserviceid")
	public void setEsbserviceid(String esbserviceid) {
		this.esbserviceid = esbserviceid;
	}

	/**
	 * @return 错误码
	 */
	public String getErrcode() {
		return this.errcode;
	}

	/**
	 * @param errcode
	 *            错误码
	 */
	@Column(name = "errcode")
	public void setErrcode(String errcode) {
		this.errcode = errcode;
	}

	/**
	 * @return 记库时间
	 */
	public Date getRecordDatetime() {
		return this.recordDatetime;
	}

	/**
	 * @param recordDatetime
	 *            记库时间
	 */
	@Column(name = "record_datetime")
	public void setRecordDatetime(Date recordDatetime) {
		this.recordDatetime = recordDatetime;
	}

	/**
	 * @return 统计开始时间
	 */
	public Date getStartDatetime() {
		return this.startDatetime;
	}

	/**
	 * @param startDatetime
	 *            统计开始时间
	 */
	@Column(name = "start_datetime")
	public void setStartDatetime(Date startDatetime) {
		this.startDatetime = startDatetime;
	}

	/**
	 * @return 统计结束时间
	 */
	public Date getEndDatetime() {
		return this.endDatetime;
	}

	/**
	 * @param endDatetime
	 *            统计结束时间
	 */
	@Column(name = "end_datetime")
	public void setEndDatetime(Date endDatetime) {
		this.endDatetime = endDatetime;
	}

	/**
	 * @return 监控时间
	 */
	public Date getMonTime() {
		return this.monTime;
	}

	/**
	 * @param monTime
	 *            监控时间
	 */
	@Column(name = "mon_time")
	public void setMonTime(Date monTime) {
		this.monTime = monTime;
	}

	/**
	 * @return 监控状态
	 */
	public String getMonFlag() {
		return this.monFlag;
	}

	/**
	 * @param monFlag
	 *            监控状态
	 */
	@Column(name = "mon_flag")
	public void setMonFlag(String monFlag) {
		this.monFlag = monFlag;
	}

/**
 *@return 当前交易量
*/
public Double

	getCurrTotnum(){return this.currTotnum;}

/**
 *@param currTotnum 当前交易量
*/
@Column(name = "curr_totnum")
public void setCurrTotnum(Double currTotnum) {this.currTotnum = currTotnum;}

/**
 *@return 当前系统成功笔数
*/
public Double

	getCurrSysSuccNum(){return this.currSysSuccNum;}

/**
 *@param currSysSuccNum 当前系统成功笔数
*/
@Column(name = "curr_sys_succ_num")
public void setCurrSysSuccNum(Double currSysSuccNum) {this.currSysSuccNum = currSysSuccNum;}

/**
 *@return 当前系统错误笔数
*/
public Double

	getCurrSysErrNum(){return this.currSysErrNum;}

/**
 *@param currSysErrNum 当前系统错误笔数
*/
@Column(name = "curr_sys_err_num")
public void setCurrSysErrNum(Double currSysErrNum) {this.currSysErrNum = currSysErrNum;}

/**
 *@return 当前业务成功笔数
*/
public Double

	getCurrBussSuccNum(){return this.currBussSuccNum;}

/**
 *@param currBussSuccNum 当前业务成功笔数
*/
@Column(name = "curr_buss_succ_num")
public void setCurrBussSuccNum(Double currBussSuccNum) {this.currBussSuccNum = currBussSuccNum;}

/**
 *@return 当前业务错误笔数
*/
public Double

	getCurrBussErrNum(){return this.currBussErrNum;}

/**
 *@param currBussErrNum 当前业务错误笔数
*/
@Column(name = "curr_buss_err_num")
public void setCurrBussErrNum(Double currBussErrNum) {this.currBussErrNum = currBussErrNum;}

/**
 *@return 当前系统成功率
*/
public Double 

	getCurrSysRate(){return this.currSysRate;}

/**
 *@param currSysRate 当前系统成功率
*/
@Column(name = "curr_sys_rate")
public void setCurrSysRate(Double  currSysRate) {this.currSysRate = currSysRate;}

/**
 *@return 当前业务成功率
*/
public Double 

	getCurrBussRate(){return this.currBussRate;}

/**
 *@param currBussRate 当前业务成功率
*/
@Column(name = "curr_buss_rate")
public void setCurrBussRate(Double  currBussRate) {this.currBussRate = currBussRate;}

/**
 *@return 当前交易处理时间
*/
public Double 

	getCurrTransAvgtime(){return this.currTransAvgtime;}

/**
 *@param currTransAvgtime 当前交易处理时间
*/
@Column(name = "curr_trans_avgtime")
public void setCurrTransAvgtime(Double  currTransAvgtime) {this.currTransAvgtime = currTransAvgtime;}

/**
 *@return 当前ESB内部平均处理时间
*/
public Double 

	getCurrEsbAvgtime(){return this.currEsbAvgtime;}

/**
 *@param currEsbAvgtime 当前ESB内部平均处理时间
*/
@Column(name = "curr_esb_avgtime")
public void setCurrEsbAvgtime(Double  currEsbAvgtime) {this.currEsbAvgtime = currEsbAvgtime;}

/**
 *@return 当前异常数
*/
public Double 

	getCurrExpt(){return this.currExpt;}

/**
 *@param currExpt 当前异常数
*/
@Column(name = "curr_expt")
public void setCurrExpt(Double  currExpt) {this.currExpt = currExpt;}

/**
 *@return 当前TPS
*/
public Double 

	getCurrTps(){return this.currTps;}

/**
 *@param currTps 当前TPS
*/
@Column(name = "curr_tps")
public void setCurrTps(Double  currTps) {this.currTps = currTps;}

}
