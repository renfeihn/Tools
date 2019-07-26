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
@Table(name = "aim_esb_mon_msext")
public class AimEsbMonMsExtBean implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
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
	 * 日交易量
	 */
	@Column(name = "day_totnum")
	private Double dayTotnum;
	/**
	 * 日系统成功笔数
	 */
	@Column(name = "day_sys_succ_num")
	private Double daySysSuccNum;
	/**
	 * 日系统错误笔数
	 */
	@Column(name = "day_sys_err_num")
	private Double daySysErrNum;
	/**
	 * 日业务成功笔数
	 */
	@Column(name = "day_buss_succ_num")
	private Double dayBussSuccNum;
	/**
	 * 日业务错误笔数
	 */
	@Column(name = "day_buss_err_num")
	private Double dayBussErrNum;
	/**
	 * 日系统成功率
	 */
	@Column(name = "day_sys_rate")
	private Double daySysRate;
	/**
	 * 日业务成功率
	 */
	@Column(name = "day_buss_rate")
	private Double dayBussRate;
	/**
	 * 日交易平均处理时间
	 */
	@Column(name = "day_trans_avgtime")
	private Double dayTransAvgtime;
	/**
	 * 日ESB内部平均处理时间
	 */
	@Column(name = "day_esb_avgtime")
	private Double dayEsbAvgtime;
	/**
	 * 日异常笔数
	 */
	@Column(name = "day_expt")
	private Double dayExpt;
	/**
	 * 当前交易量
	 */
	@Column(name = "curr_totnum")
	private Double currTotnum;
	/**
	 * 当前系统成功笔数
	 */
	@Column(name = "curr_sys_succ_num")
	private Double currSysSuccNum;
	/**
	 * 当前系统错误笔数
	 */
	@Column(name = "curr_sys_err_num")
	private Double currSysErrNum;
	/**
	 * 当前业务成功笔数
	 */
	@Column(name = "curr_buss_succ_num")
	private Double currBussSuccNum;
	/**
	 * 当前业务错误笔数
	 */
	@Column(name = "curr_buss_err_num")
	private Double currBussErrNum;
	/**
	 * 当前系统成功率状态
	 */
	@Column(name = "curr_sys_rate_flag")
	private Integer currSysRateFlag;
	/**
	 * 当前系统成功率连续异常通知次数
	 */
	@Column(name = "curr_sys_rate_info_time")
	private Integer currSysRateInfoTime;
	/**
	 * 当前系统成功率连续异常告警次数
	 */
	@Column(name = "curr_sys_rate_warn_time")
	private Integer currSysRateWarnTime;
	/**
	 * 当前系统成功率
	 */
	@Column(name = "curr_sys_rate")
	private Double currSysRate;
	/**
	 * 当前业务成功率状态
	 */
	@Column(name = "curr_buss_rate_flag")
	private Integer currBussRateFlag;
	/**
	 * 当前业务成功率连续异常通知次数
	 */
	@Column(name = "curr_buss_rate_info_time")
	private Integer currBussRateInfoTime;
	/**
	 * 当前业务成功率连续异常告警次数
	 */
	@Column(name = "curr_buss_rate_warn_time")
	private Integer currBussRateWarnTime;
	/**
	 * 当前业务成功率
	 */
	@Column(name = "curr_buss_rate")
	private Double currBussRate;
	/**
	 * 当前TPS状态
	 */
	@Column(name = "curr_tps_flag")
	private Integer currTpsFlag;
	/**
	 * 当前TPS连续异常通知次数
	 */
	@Column(name = "curr_tps_info_time")
	private Integer currTpsInfoTime;
	/**
	 * 当前TPS连续异常告警次数
	 */
	@Column(name = "curr_tps_warn_time")
	private Integer currTpsWarnTime;
	/**
	 * 当前TPS
	 */
	@Column(name = "curr_tps")
	private Double currTps;
	/**
	 * 当前交易处理时间状态
	 */
	@Column(name = "curr_trans_avgtime_flag")
	private Integer currTransAvgtimeFlag;
	/**
	 * 当前交易处理时间连续异常通知次数
	 */
	@Column(name = "curr_trans_avgtime_info_time")
	private Integer currTransAvgtimeInfoTime;
	/**
	 * 当前交易处理时间连续异常告警次数
	 */
	@Column(name = "curr_trans_avgtime_warn_time")
	private Integer currTransAvgtimeWarnTime;
	/**
	 * 当前交易处理时间
	 */
	@Column(name = "curr_trans_avgtime")
	private Double currTransAvgtime;
	/**
	 * 当前ESB内部平均处理时间状态
	 */
	@Column(name = "curr_esb_avgtime_flag")
	private Integer currEsbAvgtimeFlag;
	/**
	 * 当前ESB内部平均处理时间连续异常通知次数
	 */
	@Column(name = "curr_esb_avgtime_info_time")
	private Integer currEsbAvgtimeInfoTime;
	/**
	 * 当前ESB内部平均处理时间连续异常告警次数
	 */
	@Column(name = "curr_esb_avgtime_warn_time")
	private Integer currEsbAvgtimeWarnTime;
	/**
	 * 当前ESB内部平均处理时间
	 */
	@Column(name = "curr_esb_avgtime")
	private Double currEsbAvgtime;
	/**
	 * 当前异常数状态
	 */
	@Column(name = "curr_expt_flag")
	private Integer currExptFlag;
	/**
	 * 当前异常连续通知次数
	 */
	@Column(name = "curr_expt_info_time")
	private Integer currExptInfoTime;
	/**
	 * 当前异常连续告警次数
	 */
	@Column(name = "curr_expt_warn_time")
	private Integer currExptWarnTime;
	/**
	 * 当前异常数
	 */
	@Column(name = "curr_expt")
	private Double currExpt;
	/**
	 * 当前系统持续无交易时间
	 */
	@Column(name = "stop_hold_time_flag")
	private Integer stopHoldTimeFlag;
	/**
	 * 当前系统持续无交易时间异常通知次数
	 */
	@Column(name = "stop_hold_time_info_time")
	private Integer stopHoldTimeInfoTime;
	/**
	 * 当前系统持续无交易时间异常告警次数
	 */
	@Column(name = "stop_hold_time_warn_time")
	private Integer stopHoldTimeWarnTime;
	/**
	 * 当前系统持续无交易时间
	 */
	@Column(name = "stop_hold_time")
	private Double stopHoldTime;
	/**
	 * 当前接入容器并发线程数状态
	 */
	@Column(name = "cons_thread_num_flag")
	private Integer consThreadNumFlag;
	/**
	 * 当前接入容器并发线程连续异常通知次数
	 */
	@Column(name = "cons_thread_num_info_time")
	private Integer consThreadNumInfoTime;
	/**
	 * 当前接入容器并发线程连续异常告警次数
	 */
	@Column(name = "cons_thread_num_warn_time")
	private Integer consThreadNumWarnTime;
	/**
	 * 当前接入容器并发线程数
	 */
	@Column(name = "cons_thread_num")
	private Double consThreadNum;
	/**
	 * 当前接出容器并发线程数状态
	 */
	@Column(name = "prvd_thread_num_flag")
	private Integer prvdThreadNumFlag;
	/**
	 * 当前接出容器并发线程连续异常通知次数
	 */
	@Column(name = "prvd_thread_num_info_time")
	private Integer prvdThreadNumInfoTime;
	/**
	 * 当前接出容器并发线程连续异常告警次数
	 */
	@Column(name = "prvd_thread_num_warn_time")
	private Integer prvdThreadNumWarnTime;
	/**
	 * 当前接出容器并发线程数
	 */
	@Column(name = "prvd_thread_num")
	private Double prvdThreadNum;

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
	 * @return 错误信息
	 */
	public String getErrmsg() {
		return this.errmsg;
	}

	/**
	 * @param errmsg
	 *            错误信息
	 */
	@Column(name = "errmsg")
	public void setErrmsg(String errmsg) {
		this.errmsg = errmsg;
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
	 * @return 日交易量
	 */
	public Double getDayTotnum() {
		return this.dayTotnum;
	}

	/**
	 * @param dayTotnum
	 *            日交易量
	 */
	@Column(name = "day_totnum")
	public void setDayTotnum(Double dayTotnum) {
		this.dayTotnum = dayTotnum;
	}

	/**
	 * @return 日系统成功笔数
	 */
	public Double getDaySysSuccNum() {
		return this.daySysSuccNum;
	}

	/**
	 * @param daySysSuccNum
	 *            日系统成功笔数
	 */
	@Column(name = "day_sys_succ_num")
	public void setDaySysSuccNum(Double daySysSuccNum) {
		this.daySysSuccNum = daySysSuccNum;
	}

	/**
	 * @return 日系统错误笔数
	 */
	public Double getDaySysErrNum() {
		return this.daySysErrNum;
	}

	/**
	 * @param daySysErrNum
	 *            日系统错误笔数
	 */
	@Column(name = "day_sys_err_num")
	public void setDaySysErrNum(Double daySysErrNum) {
		this.daySysErrNum = daySysErrNum;
	}

	/**
	 * @return 日业务成功笔数
	 */
	public Double getDayBussSuccNum() {
		return this.dayBussSuccNum;
	}

	/**
	 * @param dayBussSuccNum
	 *            日业务成功笔数
	 */
	@Column(name = "day_buss_succ_num")
	public void setDayBussSuccNum(Double dayBussSuccNum) {
		this.dayBussSuccNum = dayBussSuccNum;
	}

	/**
	 * @return 日业务错误笔数
	 */
	public Double getDayBussErrNum() {
		return this.dayBussErrNum;
	}

	/**
	 * @param dayBussErrNum
	 *            日业务错误笔数
	 */
	@Column(name = "day_buss_err_num")
	public void setDayBussErrNum(Double dayBussErrNum) {
		this.dayBussErrNum = dayBussErrNum;
	}

	/**
	 * @return 日系统成功率
	 */
	public Double getDaySysRate() {
		return this.daySysRate;
	}

	/**
	 * @param daySysRate
	 *            日系统成功率
	 */
	@Column(name = "day_sys_rate")
	public void setDaySysRate(Double daySysRate) {
		this.daySysRate = daySysRate;
	}

	/**
	 * @return 日业务成功率
	 */
	public Double getDayBussRate() {
		return this.dayBussRate;
	}

	/**
	 * @param dayBussRate
	 *            日业务成功率
	 */
	@Column(name = "day_buss_rate")
	public void setDayBussRate(Double dayBussRate) {
		this.dayBussRate = dayBussRate;
	}

	/**
	 * @return 日交易平均处理时间
	 */
	public Double getDayTransAvgtime() {
		return this.dayTransAvgtime;
	}

	/**
	 * @param dayTransAvgtime
	 *            日交易平均处理时间
	 */
	@Column(name = "day_trans_avgtime")
	public void setDayTransAvgtime(Double dayTransAvgtime) {
		this.dayTransAvgtime = dayTransAvgtime;
	}

	/**
	 * @return 日ESB内部平均处理时间
	 */
	public Double getDayEsbAvgtime() {
		return this.dayEsbAvgtime;
	}

	/**
	 * @param dayEsbAvgtime
	 *            日ESB内部平均处理时间
	 */
	@Column(name = "day_esb_avgtime")
	public void setDayEsbAvgtime(Double dayEsbAvgtime) {
		this.dayEsbAvgtime = dayEsbAvgtime;
	}

	/**
	 * @return 日异常笔数
	 */
	public Double getDayExpt() {
		return this.dayExpt;
	}

	/**
	 * @param dayExpt
	 *            日异常笔数
	 */
	@Column(name = "day_expt")
	public void setDayExpt(Double dayExpt) {
		this.dayExpt = dayExpt;
	}

	/**
	 * @return 当前交易量
	 */
	public Double getCurrTotnum() {
		return this.currTotnum;
	}

	/**
	 * @param currTotnum
	 *            当前交易量
	 */
	@Column(name = "curr_totnum")
	public void setCurrTotnum(Double currTotnum) {
		this.currTotnum = currTotnum;
	}

	/**
	 * @return 当前系统成功笔数
	 */
	public Double getCurrSysSuccNum() {
		return this.currSysSuccNum;
	}

	/**
	 * @param currSysSuccNum
	 *            当前系统成功笔数
	 */
	@Column(name = "curr_sys_succ_num")
	public void setCurrSysSuccNum(Double currSysSuccNum) {
		this.currSysSuccNum = currSysSuccNum;
	}

	/**
	 * @return 当前系统错误笔数
	 */
	public Double getCurrSysErrNum() {
		return this.currSysErrNum;
	}

	/**
	 * @param currSysErrNum
	 *            当前系统错误笔数
	 */
	@Column(name = "curr_sys_err_num")
	public void setCurrSysErrNum(Double currSysErrNum) {
		this.currSysErrNum = currSysErrNum;
	}

	/**
	 * @return 当前业务成功笔数
	 */
	public Double getCurrBussSuccNum() {
		return this.currBussSuccNum;
	}

	/**
	 * @param currBussSuccNum
	 *            当前业务成功笔数
	 */
	@Column(name = "curr_buss_succ_num")
	public void setCurrBussSuccNum(Double currBussSuccNum) {
		this.currBussSuccNum = currBussSuccNum;
	}

	/**
	 * @return 当前业务错误笔数
	 */
	public Double getCurrBussErrNum() {
		return this.currBussErrNum;
	}

	/**
	 * @param currBussErrNum
	 *            当前业务错误笔数
	 */
	@Column(name = "curr_buss_err_num")
	public void setCurrBussErrNum(Double currBussErrNum) {
		this.currBussErrNum = currBussErrNum;
	}

	/**
	 * @return 当前系统成功率状态
	 */
	public Integer getCurrSysRateFlag() {
		return this.currSysRateFlag;
	}

	/**
	 * @param currSysRateFlag
	 *            当前系统成功率状态
	 */
	@Column(name = "curr_sys_rate_flag")
	public void setCurrSysRateFlag(Integer currSysRateFlag) {
		this.currSysRateFlag = currSysRateFlag;
	}

	/**
	 * @return 当前系统成功率连续异常通知次数
	 */
	public Integer getCurrSysRateInfoTime() {
		return this.currSysRateInfoTime;
	}

	/**
	 * @param currSysRateInfoTime
	 *            当前系统成功率连续异常通知次数
	 */
	@Column(name = "curr_sys_rate_info_time")
	public void setCurrSysRateInfoTime(Integer currSysRateInfoTime) {
		this.currSysRateInfoTime = currSysRateInfoTime;
	}

	/**
	 * @return 当前系统成功率连续异常告警次数
	 */
	public Integer getCurrSysRateWarnTime() {
		return this.currSysRateWarnTime;
	}

	/**
	 * @param currSysRateWarnTime
	 *            当前系统成功率连续异常告警次数
	 */
	@Column(name = "curr_sys_rate_warn_time")
	public void setCurrSysRateWarnTime(Integer currSysRateWarnTime) {
		this.currSysRateWarnTime = currSysRateWarnTime;
	}

	/**
	 * @return 当前系统成功率
	 */
	public Double getCurrSysRate() {
		return this.currSysRate;
	}

	/**
	 * @param currSysRate
	 *            当前系统成功率
	 */
	@Column(name = "curr_sys_rate")
	public void setCurrSysRate(Double currSysRate) {
		this.currSysRate = currSysRate;
	}

	/**
	 * @return 当前业务成功率状态
	 */
	public Integer getCurrBussRateFlag() {
		return this.currBussRateFlag;
	}

	/**
	 * @param currBussRateFlag
	 *            当前业务成功率状态
	 */
	@Column(name = "curr_buss_rate_flag")
	public void setCurrBussRateFlag(Integer currBussRateFlag) {
		this.currBussRateFlag = currBussRateFlag;
	}

	/**
	 * @return 当前业务成功率连续异常通知次数
	 */
	public Integer getCurrBussRateInfoTime() {
		return this.currBussRateInfoTime;
	}

	/**
	 * @param currBussRateInfoTime
	 *            当前业务成功率连续异常通知次数
	 */
	@Column(name = "curr_buss_rate_info_time")
	public void setCurrBussRateInfoTime(Integer currBussRateInfoTime) {
		this.currBussRateInfoTime = currBussRateInfoTime;
	}

	/**
	 * @return 当前业务成功率连续异常告警次数
	 */
	public Integer getCurrBussRateWarnTime() {
		return this.currBussRateWarnTime;
	}

	/**
	 * @param currBussRateWarnTime
	 *            当前业务成功率连续异常告警次数
	 */
	@Column(name = "curr_buss_rate_warn_time")
	public void setCurrBussRateWarnTime(Integer currBussRateWarnTime) {
		this.currBussRateWarnTime = currBussRateWarnTime;
	}

	/**
	 * @return 当前业务成功率
	 */
	public Double getCurrBussRate() {
		return this.currBussRate;
	}

	/**
	 * @param currBussRate
	 *            当前业务成功率
	 */
	@Column(name = "curr_buss_rate")
	public void setCurrBussRate(Double currBussRate) {
		this.currBussRate = currBussRate;
	}

	/**
	 * @return 当前TPS状态
	 */
	public Integer getCurrTpsFlag() {
		return this.currTpsFlag;
	}

	/**
	 * @param currTpsFlag
	 *            当前TPS状态
	 */
	@Column(name = "curr_tps_flag")
	public void setCurrTpsFlag(Integer currTpsFlag) {
		this.currTpsFlag = currTpsFlag;
	}

	/**
	 * @return 当前TPS连续异常通知次数
	 */
	public Integer getCurrTpsInfoTime() {
		return this.currTpsInfoTime;
	}

	/**
	 * @param currTpsInfoTime
	 *            当前TPS连续异常通知次数
	 */
	@Column(name = "curr_tps_info_time")
	public void setCurrTpsInfoTime(Integer currTpsInfoTime) {
		this.currTpsInfoTime = currTpsInfoTime;
	}

	/**
	 * @return 当前TPS连续异常告警次数
	 */
	public Integer getCurrTpsWarnTime() {
		return this.currTpsWarnTime;
	}

	/**
	 * @param currTpsWarnTime
	 *            当前TPS连续异常告警次数
	 */
	@Column(name = "curr_tps_warn_time")
	public void setCurrTpsWarnTime(Integer currTpsWarnTime) {
		this.currTpsWarnTime = currTpsWarnTime;
	}

	/**
	 * @return 当前TPS
	 */
	public Double getCurrTps() {
		return this.currTps;
	}

	/**
	 * @param currTps
	 *            当前TPS
	 */
	@Column(name = "curr_tps")
	public void setCurrTps(Double currTps) {
		this.currTps = currTps;
	}

	/**
	 * @return 当前交易处理时间状态
	 */
	public Integer getCurrTransAvgtimeFlag() {
		return this.currTransAvgtimeFlag;
	}

	/**
	 * @param currTransAvgtimeFlag
	 *            当前交易处理时间状态
	 */
	@Column(name = "curr_trans_avgtime_flag")
	public void setCurrTransAvgtimeFlag(Integer currTransAvgtimeFlag) {
		this.currTransAvgtimeFlag = currTransAvgtimeFlag;
	}

	/**
	 * @return 当前交易处理时间连续异常通知次数
	 */
	public Integer getCurrTransAvgtimeInfoTime() {
		return this.currTransAvgtimeInfoTime;
	}

	/**
	 * @param currTransAvgtimeInfoTime
	 *            当前交易处理时间连续异常通知次数
	 */
	@Column(name = "curr_trans_avgtime_info_time")
	public void setCurrTransAvgtimeInfoTime(Integer currTransAvgtimeInfoTime) {
		this.currTransAvgtimeInfoTime = currTransAvgtimeInfoTime;
	}

	/**
	 * @return 当前交易处理时间连续异常告警次数
	 */
	public Integer getCurrTransAvgtimeWarnTime() {
		return this.currTransAvgtimeWarnTime;
	}

	/**
	 * @param currTransAvgtimeWarnTime
	 *            当前交易处理时间连续异常告警次数
	 */
	@Column(name = "curr_trans_avgtime_warn_time")
	public void setCurrTransAvgtimeWarnTime(Integer currTransAvgtimeWarnTime) {
		this.currTransAvgtimeWarnTime = currTransAvgtimeWarnTime;
	}

	/**
	 * @return 当前交易处理时间
	 */
	public Double getCurrTransAvgtime() {
		return this.currTransAvgtime;
	}

	/**
	 * @param currTransAvgtime
	 *            当前交易处理时间
	 */
	@Column(name = "curr_trans_avgtime")
	public void setCurrTransAvgtime(Double currTransAvgtime) {
		this.currTransAvgtime = currTransAvgtime;
	}

	/**
	 * @return 当前ESB内部平均处理时间状态
	 */
	public Integer getCurrEsbAvgtimeFlag() {
		return this.currEsbAvgtimeFlag;
	}

	/**
	 * @param currEsbAvgtimeFlag
	 *            当前ESB内部平均处理时间状态
	 */
	@Column(name = "curr_esb_avgtime_flag")
	public void setCurrEsbAvgtimeFlag(Integer currEsbAvgtimeFlag) {
		this.currEsbAvgtimeFlag = currEsbAvgtimeFlag;
	}

	/**
	 * @return 当前ESB内部平均处理时间连续异常通知次数
	 */
	public Integer getCurrEsbAvgtimeInfoTime() {
		return this.currEsbAvgtimeInfoTime;
	}

	/**
	 * @param currEsbAvgtimeInfoTime
	 *            当前ESB内部平均处理时间连续异常通知次数
	 */
	@Column(name = "curr_esb_avgtime_info_time")
	public void setCurrEsbAvgtimeInfoTime(Integer currEsbAvgtimeInfoTime) {
		this.currEsbAvgtimeInfoTime = currEsbAvgtimeInfoTime;
	}

	/**
	 * @return 当前ESB内部平均处理时间连续异常告警次数
	 */
	public Integer getCurrEsbAvgtimeWarnTime() {
		return this.currEsbAvgtimeWarnTime;
	}

	/**
	 * @param currEsbAvgtimeWarnTime
	 *            当前ESB内部平均处理时间连续异常告警次数
	 */
	@Column(name = "curr_esb_avgtime_warn_time")
	public void setCurrEsbAvgtimeWarnTime(Integer currEsbAvgtimeWarnTime) {
		this.currEsbAvgtimeWarnTime = currEsbAvgtimeWarnTime;
	}

	/**
	 * @return 当前ESB内部平均处理时间
	 */
	public Double getCurrEsbAvgtime() {
		return this.currEsbAvgtime;
	}

	/**
	 * @param currEsbAvgtime
	 *            当前ESB内部平均处理时间
	 */
	@Column(name = "curr_esb_avgtime")
	public void setCurrEsbAvgtime(Double currEsbAvgtime) {
		this.currEsbAvgtime = currEsbAvgtime;
	}

	/**
	 * @return 当前异常数状态
	 */
	public Integer getCurrExptFlag() {
		return this.currExptFlag;
	}

	/**
	 * @param currExptFlag
	 *            当前异常数状态
	 */
	@Column(name = "curr_expt_flag")
	public void setCurrExptFlag(Integer currExptFlag) {
		this.currExptFlag = currExptFlag;
	}

	/**
	 * @return 当前异常连续通知次数
	 */
	public Integer getCurrExptInfoTime() {
		return this.currExptInfoTime;
	}

	/**
	 * @param currExptInfoTime
	 *            当前异常连续通知次数
	 */
	@Column(name = "curr_expt_info_time")
	public void setCurrExptInfoTime(Integer currExptInfoTime) {
		this.currExptInfoTime = currExptInfoTime;
	}

	/**
	 * @return 当前异常连续告警次数
	 */
	public Integer getCurrExptWarnTime() {
		return this.currExptWarnTime;
	}

	/**
	 * @param currExptWarnTime
	 *            当前异常连续告警次数
	 */
	@Column(name = "curr_expt_warn_time")
	public void setCurrExptWarnTime(Integer currExptWarnTime) {
		this.currExptWarnTime = currExptWarnTime;
	}

	/**
	 * @return 当前异常数
	 */
	public Double getCurrExpt() {
		return this.currExpt;
	}

	/**
	 * @param currExpt
	 *            当前异常数
	 */
	@Column(name = "curr_expt")
	public void setCurrExpt(Double currExpt) {
		this.currExpt = currExpt;
	}

	/**
	 * @return 当前系统持续无交易时间
	 */
	public Integer getStopHoldTimeFlag() {
		return this.stopHoldTimeFlag;
	}

	/**
	 * @param stopHoldTimeFlag
	 *            当前系统持续无交易时间
	 */
	@Column(name = "stop_hold_time_flag")
	public void setStopHoldTimeFlag(Integer stopHoldTimeFlag) {
		this.stopHoldTimeFlag = stopHoldTimeFlag;
	}

	/**
	 * @return 当前系统持续无交易时间异常通知次数
	 */
	public Integer getStopHoldTimeInfoTime() {
		return this.stopHoldTimeInfoTime;
	}

	/**
	 * @param stopHoldTimeInfoTime
	 *            当前系统持续无交易时间异常通知次数
	 */
	@Column(name = "stop_hold_time_info_time")
	public void setStopHoldTimeInfoTime(Integer stopHoldTimeInfoTime) {
		this.stopHoldTimeInfoTime = stopHoldTimeInfoTime;
	}

	/**
	 * @return 当前系统持续无交易时间异常告警次数
	 */
	public Integer getStopHoldTimeWarnTime() {
		return this.stopHoldTimeWarnTime;
	}

	/**
	 * @param stopHoldTimeWarnTime
	 *            当前系统持续无交易时间异常告警次数
	 */
	@Column(name = "stop_hold_time_warn_time")
	public void setStopHoldTimeWarnTime(Integer stopHoldTimeWarnTime) {
		this.stopHoldTimeWarnTime = stopHoldTimeWarnTime;
	}

	/**
	 * @return 当前系统持续无交易时间
	 */
	public Double getStopHoldTime() {
		return this.stopHoldTime;
	}

	/**
	 * @param stopHoldTime
	 *            当前系统持续无交易时间
	 */
	@Column(name = "stop_hold_time")
	public void setStopHoldTime(Double stopHoldTime) {
		this.stopHoldTime = stopHoldTime;
	}

	/**
	 * @return 当前接入容器并发线程数状态
	 */
	public Integer getConsThreadNumFlag() {
		return this.consThreadNumFlag;
	}

	/**
	 * @param consThreadNumFlag
	 *            当前接入容器并发线程数状态
	 */
	@Column(name = "cons_thread_num_flag")
	public void setConsThreadNumFlag(Integer consThreadNumFlag) {
		this.consThreadNumFlag = consThreadNumFlag;
	}

	/**
	 * @return 当前接入容器并发线程连续异常通知次数
	 */
	public Integer getConsThreadNumInfoTime() {
		return this.consThreadNumInfoTime;
	}

	/**
	 * @param consThreadNumInfoTime
	 *            当前接入容器并发线程连续异常通知次数
	 */
	@Column(name = "cons_thread_num_info_time")
	public void setConsThreadNumInfoTime(Integer consThreadNumInfoTime) {
		this.consThreadNumInfoTime = consThreadNumInfoTime;
	}

	/**
	 * @return 当前接入容器并发线程连续异常告警次数
	 */
	public Integer getConsThreadNumWarnTime() {
		return this.consThreadNumWarnTime;
	}

	/**
	 * @param consThreadNumWarnTime
	 *            当前接入容器并发线程连续异常告警次数
	 */
	@Column(name = "cons_thread_num_warn_time")
	public void setConsThreadNumWarnTime(Integer consThreadNumWarnTime) {
		this.consThreadNumWarnTime = consThreadNumWarnTime;
	}

	/**
	 * @return 当前接入容器并发线程数
	 */
	public Double getConsThreadNum() {
		return this.consThreadNum;
	}

	/**
	 * @param consThreadNum
	 *            当前接入容器并发线程数
	 */
	@Column(name = "cons_thread_num")
	public void setConsThreadNum(Double consThreadNum) {
		this.consThreadNum = consThreadNum;
	}

	/**
	 * @return 当前接出容器并发线程数状态
	 */
	public Integer getPrvdThreadNumFlag() {
		return this.prvdThreadNumFlag;
	}

	/**
	 * @param prvdThreadNumFlag
	 *            当前接出容器并发线程数状态
	 */
	@Column(name = "prvd_thread_num_flag")
	public void setPrvdThreadNumFlag(Integer prvdThreadNumFlag) {
		this.prvdThreadNumFlag = prvdThreadNumFlag;
	}

	/**
	 * @return 当前接出容器并发线程连续异常通知次数
	 */
	public Integer getPrvdThreadNumInfoTime() {
		return this.prvdThreadNumInfoTime;
	}

	/**
	 * @param prvdThreadNumInfoTime
	 *            当前接出容器并发线程连续异常通知次数
	 */
	@Column(name = "prvd_thread_num_info_time")
	public void setPrvdThreadNumInfoTime(Integer prvdThreadNumInfoTime) {
		this.prvdThreadNumInfoTime = prvdThreadNumInfoTime;
	}

	/**
	 * @return 当前接出容器并发线程连续异常告警次数
	 */
	public Integer getPrvdThreadNumWarnTime() {
		return this.prvdThreadNumWarnTime;
	}

	/**
	 * @param prvdThreadNumWarnTime
	 *            当前接出容器并发线程连续异常告警次数
	 */
	@Column(name = "prvd_thread_num_warn_time")
	public void setPrvdThreadNumWarnTime(Integer prvdThreadNumWarnTime) {
		this.prvdThreadNumWarnTime = prvdThreadNumWarnTime;
	}

	/**
	 * @return 当前接出容器并发线程数
	 */
	public Double getPrvdThreadNum() {
		return this.prvdThreadNum;
	}

	/**
	 * @param prvdThreadNum
	 *            当前接出容器并发线程数
	 */
	@Column(name = "prvd_thread_num")
	public void setPrvdThreadNum(Double prvdThreadNum) {
		this.prvdThreadNum = prvdThreadNum;
	}

}