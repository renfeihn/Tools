package tc.cama.aweb.esb.model;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * ESBMDATA.ESB_MON_MS表记录的POJO
 */
@Table(name = "aim_esb_mon_ms")
public class EsbMonMS {
	
	private String monType;     //监控类型
	private String monObj;		//监控对象
	private String monObjName;	//监控对象
	private String monTime;		//监控时间
	private String monFlag;		//监控状态
	private Double dayTotnum;	//日交易量
	private Double daySysSuccNum;	//日系统成功笔数
	private Double daySysErrNum;	//日系统错误笔数
	private Double dayBussSuccNum;	//日业务成功笔数
	private Double dayBussErrNum;   //日业务错误笔数
	private Double daySysRate;		//日系统成功率
	private Double dayBussRate;		//日业务成功率
	private Double dayTransAvgtime;	//日交易平均处理时间
	private Double dayEsbAvgtime;	//日ESB内部平均处理时间
	private Double dayExpt;			//日异常笔数
	private Double currTotnum;		//当前交易量
	private Double currSysSuccNum;	//当前系统成功笔数
	private Double currSysErrNum;	//当前系统错误笔数
	private Double currBussSuccNum;	//当前业务成功笔数
	private Double currBussErrNum;  //当前业务错误笔数
	private Integer currSysRateFlag; //当前系统成功率状态
	private Integer currSysRateInfoTime;  
	private Integer currSysRateWarnTime;  
	private Double currSysRate;		//当前系统成功率
	private Integer currBussRateFlag; //当前业务成功率状态
	private Integer currBussRateInfoTime;
	private Integer currBussRateWarnTime;
	private Double currBussRate;	//当前业务成功率
	private Integer currTpsFlag;	//当前TPS状态
	private Integer currTpsInfoTime;
	private Integer currTpsWarnTime;
	private Double currTps;			//当前TPS
	private Integer currTransAvgtimeFlag;    //当前交易处理时间状态
	private Integer currTransAvgtimeInfoTime;
	private Integer currTransAvgtimeWarnTime;
	private Double currTransAvgtime;	//当前交易处理时间
	private Integer currEsbAvgtimeFlag;  //当前ESB内部平均处理时间状态
	private Integer currEsbAvgtimeInfoTime;
	private Integer currEsbAvgtimeWarnTime;
	private Double currEsbAvgtime;     //当前ESB内部平均处理时间连续异常数
	private Integer currExptFlag;      //当前异常数状态
	private Integer currExptInfoTime;
	private Integer currExptWarnTime;
	private Double currExpt;		   //当前异常数
	private Integer stopHoldTimeFlag;    //当前系统持续无交易时间
	private Integer stopHoldTimeInfoTime;
	private Integer stopHoldTimeWarnTime;
	private Double stopHoldTime;          //当前系统持续无交易时间
	private Integer consThreadNumFlag;    //当前接入容器并发线程数状态
	private Integer consThreadNumInfoTime;
	private Integer consThreadNumWarnTime;
	private Double consThreadNum;         //当前接入容器并发线程数
	private Integer prvdThreadNumFlag;    //当前接出容器并发线程数状态
	private Integer prvdThreadNumInfoTime;
	private Integer prvdThreadNumWarnTime;
	private Double prvdThreadNum;         //当前接出容器并发线程数
	
	/*
	 * setters
	 */
	
	@Column(name = "Mon_Type")
	public void setMonType(String monType) {
		this.monType = monType;
	}

	@Column(name = "Mon_Obj")
	public void setMonObj(String monObj) {
		this.monObj = monObj;
	}

	@Column(name = "Mon_Time")
	public void setMonTime(String monTime) {
		this.monTime = monTime;
	}

	@Column(name = "Mon_Flag")
	public void setMonFlag(String monFlag) {
		this.monFlag = monFlag;
	}

	@Column(name = "Day_Totnum")
	public void setDayTotnum(Double dayTotnum) {
		this.dayTotnum = dayTotnum;
	}

	@Column(name = "Day_Sys_Succ_Num")
	public void setDaySysSuccNum(Double daySysSuccNum) {
		this.daySysSuccNum = daySysSuccNum;
	}

	@Column(name = "Day_Sys_Err_Num")
	public void setDaySysErrNum(Double daySysErrNum) {
		this.daySysErrNum = daySysErrNum;
	}

	@Column(name = "Day_Buss_Succ_Num")
	public void setDayBussSuccNum(Double dayBussSuccNum) {
		this.dayBussSuccNum = dayBussSuccNum;
	}

	@Column(name = "Day_Buss_Err_Num")
	public void setDayBussErrNum(Double dayBussErrNum) {
		this.dayBussErrNum = dayBussErrNum;
	}

	@Column(name = "Day_Sys_Rate")
	public void setDaySysRate(Double daySysRate) {
		this.daySysRate = daySysRate;
	}

	@Column(name = "Day_Buss_Rate")
	public void setDayBussRate(Double dayBussRate) {
		this.dayBussRate = dayBussRate;
	}

	@Column(name = "Day_Trans_Avgtime")
	public void setDayTransAvgtime(Double dayTransAvgtime) {
		this.dayTransAvgtime = dayTransAvgtime;
	}

	@Column(name = "Day_Esb_Avgtime")
	public void setDayEsbAvgtime(Double dayEsbAvgtime) {
		this.dayEsbAvgtime = dayEsbAvgtime;
	}

	@Column(name = "Day_Expt")
	public void setDayExpt(Double dayExpt) {
		this.dayExpt = dayExpt;
	}

	@Column(name = "Curr_Totnum")
	public void setCurrTotnum(Double currTotnum) {
		this.currTotnum = currTotnum;
	}

	@Column(name = "Curr_Sys_Succ_Num")
	public void setCurrSysSuccNum(Double currSysSuccNum) {
		this.currSysSuccNum = currSysSuccNum;
	}

	@Column(name = "Curr_Sys_Err_Num")
	public void setCurrSysErrNum(Double currSysErrNum) {
		this.currSysErrNum = currSysErrNum;
	}

	@Column(name = "Curr_Buss_Succ_Num")
	public void setCurrBussSuccNum(Double currBussSuccNum) {
		this.currBussSuccNum = currBussSuccNum;
	}

	@Column(name = "Curr_Buss_Err_Num")
	public void setCurrBussErrNum(Double currBussErrNum) {
		this.currBussErrNum = currBussErrNum;
	}

	@Column(name = "Curr_Sys_Rate_Flag")
	public void setCurrSysRateFlag(Integer currSysRateFlag) {
		this.currSysRateFlag = currSysRateFlag;
	}

	@Column(name = "Curr_Sys_Rate_Info_Time")
	public void setCurrSysRateInfoTime(Integer currSysRateInfoTime) {
		this.currSysRateInfoTime = currSysRateInfoTime;
	}

	@Column(name = "Curr_Sys_Rate_Warn_Time")
	public void setCurrSysRateWarnTime(Integer currSysRateWarnTime) {
		this.currSysRateWarnTime = currSysRateWarnTime;
	}

	@Column(name = "Curr_Sys_Rate")
	public void setCurrSysRate(Double currSysRate) {
		this.currSysRate = currSysRate;
	}

	@Column(name = "Curr_Buss_Rate_Flag")
	public void setCurrBussRateFlag(Integer currBussRateFlag) {
		this.currBussRateFlag = currBussRateFlag;
	}

	@Column(name = "Curr_Buss_Rate_Info_Time")
	public void setCurrBussRateInfoTime(Integer currBussRateInfoTime) {
		this.currBussRateInfoTime = currBussRateInfoTime;
	}

	@Column(name = "Curr_Buss_Rate_Warn_Time")
	public void setCurrBussRateWarnTime(Integer currBussRateWarnTime) {
		this.currBussRateWarnTime = currBussRateWarnTime;
	}

	@Column(name = "Curr_Buss_Rate")
	public void setCurrBussRate(Double currBussRate) {
		this.currBussRate = currBussRate;
	}

	@Column(name = "Curr_Tps_Flag")
	public void setCurrTpsFlag(Integer currTpsFlag) {
		this.currTpsFlag = currTpsFlag;
	}

	@Column(name = "Curr_Tps_Info_Time")
	public void setCurrTpsInfoTime(Integer currTpsInfoTime) {
		this.currTpsInfoTime = currTpsInfoTime;
	}

	@Column(name = "Curr_Tps_Warn_Time")
	public void setCurrTpsWarnTime(Integer currTpsWarnTime) {
		this.currTpsWarnTime = currTpsWarnTime;
	}

	@Column(name = "Curr_Tps")
	public void setCurrTps(Double currTps) {
		this.currTps = currTps;
	}

	@Column(name = "Curr_Trans_Avgtime_Flag")
	public void setCurrTransAvgtimeFlag(Integer currTransAvgtimeFlag) {
		this.currTransAvgtimeFlag = currTransAvgtimeFlag;
	}

	@Column(name = "Curr_Trans_Avgtime_Info_Time")
	public void setCurrTransAvgtimeInfoTime(Integer currTransAvgtimeInfoTime) {
		this.currTransAvgtimeInfoTime = currTransAvgtimeInfoTime;
	}

	@Column(name = "Curr_Trans_Avgtime_Warn_Time")
	public void setCurrTransAvgtimeWarnTime(Integer currTransAvgtimeWarnTime) {
		this.currTransAvgtimeWarnTime = currTransAvgtimeWarnTime;
	}

	@Column(name = "Curr_Trans_Avgtime")
	public void setCurrTransAvgtime(Double currTransAvgtime) {
		this.currTransAvgtime = currTransAvgtime;
	}

	@Column(name = "Curr_Esb_Avgtime_Flag")
	public void setCurrEsbAvgtimeFlag(Integer currEsbAvgtimeFlag) {
		this.currEsbAvgtimeFlag = currEsbAvgtimeFlag;
	}

	@Column(name = "Curr_Esb_Avgtime_Info_Time")
	public void setCurrEsbAvgtimeInfoTime(Integer currEsbAvgtimeInfoTime) {
		this.currEsbAvgtimeInfoTime = currEsbAvgtimeInfoTime;
	}

	@Column(name = "Curr_Esb_Avgtime_Warn_Time")
	public void setCurrEsbAvgtimeWarnTime(Integer currEsbAvgtimeWarnTime) {
		this.currEsbAvgtimeWarnTime = currEsbAvgtimeWarnTime;
	}

	@Column(name = "Curr_Esb_Avgtime")
	public void setCurrEsbAvgtime(Double currEsbAvgtime) {
		this.currEsbAvgtime = currEsbAvgtime;
	}

	@Column(name = "Curr_Expt_Flag")
	public void setCurrExptFlag(Integer currExptFlag) {
		this.currExptFlag = currExptFlag;
	}

	@Column(name = "Curr_Expt_Info_Time")
	public void setCurrExptInfoTime(Integer currExptInfoTime) {
		this.currExptInfoTime = currExptInfoTime;
	}

	@Column(name = "Curr_Expt_Warn_Time")
	public void setCurrExptWarnTime(Integer currExptWarnTime) {
		this.currExptWarnTime = currExptWarnTime;
	}

	@Column(name = "Curr_Expt")
	public void setCurrExpt(Double currExpt) {
		this.currExpt = currExpt;
	}

	@Column(name = "Stop_Hold_Time_Flag")
	public void setStopHoldTimeFlag(Integer stopHoldTimeFlag) {
		this.stopHoldTimeFlag = stopHoldTimeFlag;
	}

	@Column(name = "Stop_Hold_Time_Info_Time")
	public void setStopHoldTimeInfoTime(Integer stopHoldTimeInfoTime) {
		this.stopHoldTimeInfoTime = stopHoldTimeInfoTime;
	}

	@Column(name = "Stop_Hold_Time_Warn_Time")
	public void setStopHoldTimeWarnTime(Integer stopHoldTimeWarnTime) {
		this.stopHoldTimeWarnTime = stopHoldTimeWarnTime;
	}

	@Column(name = "Stop_Hold_Time")
	public void setStopHoldTime(Double stopHoldTime) {
		this.stopHoldTime = stopHoldTime;
	}

	@Column(name = "Cons_Thread_Num_Flag")
	public void setConsThreadNumFlag(Integer consThreadNumFlag) {
		this.consThreadNumFlag = consThreadNumFlag;
	}

	@Column(name = "Cons_Thread_Num_Info_Time")
	public void setConsThreadNumInfoTime(Integer consThreadNumInfoTime) {
		this.consThreadNumInfoTime = consThreadNumInfoTime;
	}

	@Column(name = "Cons_Thread_Num_Warn_Time")
	public void setConsThreadNumWarnTime(Integer consThreadNumWarnTime) {
		this.consThreadNumWarnTime = consThreadNumWarnTime;
	}

	@Column(name = "Cons_Thread_Num")
	public void setConsThreadNum(Double consThreadNum) {
		this.consThreadNum = consThreadNum;
	}

	@Column(name = "Prvd_Thread_Num_Flag")
	public void setPrvdThreadNumFlag(Integer prvdThreadNumFlag) {
		this.prvdThreadNumFlag = prvdThreadNumFlag;
	}

	@Column(name = "Prvd_Thread_Num_Info_Time")
	public void setPrvdThreadNumInfoTime(Integer prvdThreadNumInfoTime) {
		this.prvdThreadNumInfoTime = prvdThreadNumInfoTime;
	}

	@Column(name = "Prvd_Thread_Num_Warn_Time")
	public void setPrvdThreadNumWarnTime(Integer prvdThreadNumWarnTime) {
		this.prvdThreadNumWarnTime = prvdThreadNumWarnTime;
	}

	@Column(name = "Prvd_Thread_Num")
	public void setPrvdThreadNum(Double prvdThreadNum) {
		this.prvdThreadNum = prvdThreadNum;
	}

	public void setMonObjName(String monObjName) {
		this.monObjName = monObjName;
	}
	
	/*
	 * getters
	 */
	
	@Column(name = "Mon_Type")
	public String getMonType() {
		return monType;
	}

	@Column(name = "Mon_Obj")
	public String getMonObj() {
		return monObj;
	}

	@Column(name = "Mon_Time")
	public String getMonTime() {
		return monTime;
	}

	@Column(name = "Mon_Flag")
	public String getMonFlag() {
		return monFlag;
	}

	@Column(name = "Day_Totnum")
	public Double getDayTotnum() {
		return dayTotnum;
	}

	@Column(name = "Day_Sys_Succ_Num")
	public Double getDaySysSuccNum() {
		return daySysSuccNum;
	}

	@Column(name = "Day_Sys_Err_Num")
	public Double getDaySysErrNum() {
		return daySysErrNum;
	}

	@Column(name = "Day_Buss_Succ_Num")
	public Double getDayBussSuccNum() {
		return dayBussSuccNum;
	}

	@Column(name = "Day_Buss_Err_Num")
	public Double getDayBussErrNum() {
		return dayBussErrNum;
	}

	@Column(name = "Day_Sys_Rate")
	public Double getDaySysRate() {
		return daySysRate;
	}

	@Column(name = "Day_Buss_Rate")
	public Double getDayBussRate() {
		return dayBussRate;
	}

	@Column(name = "Day_Trans_Avgtime")
	public Double getDayTransAvgtime() {
		return dayTransAvgtime;
	}

	@Column(name = "Day_Esb_Avgtime")
	public Double getDayEsbAvgtime() {
		return dayEsbAvgtime;
	}

	@Column(name = "Day_Expt")
	public Double getDayExpt() {
		return dayExpt;
	}

	@Column(name = "Curr_Totnum")
	public Double getCurrTotnum() {
		return currTotnum;
	}

	@Column(name = "Curr_Sys_Succ_Num")
	public Double getCurrSysSuccNum() {
		return currSysSuccNum;
	}

	@Column(name = "Curr_Sys_Err_Num")
	public Double getCurrSysErrNum() {
		return currSysErrNum;
	}

	@Column(name = "Curr_Buss_Succ_Num")
	public Double getCurrBussSuccNum() {
		return currBussSuccNum;
	}

	@Column(name = "Curr_Buss_Err_Num")
	public Double getCurrBussErrNum() {
		return currBussErrNum;
	}

	@Column(name = "Curr_Sys_Rate_Flag")
	public Integer getCurrSysRateFlag() {
		return currSysRateFlag;
	}

	@Column(name = "Curr_Sys_Rate_Info_Time")
	public Integer getCurrSysRateInfoTime() {
		return currSysRateInfoTime;
	}

	@Column(name = "Curr_Sys_Rate_Warn_Time")
	public Integer getCurrSysRateWarnTime() {
		return currSysRateWarnTime;
	}

	@Column(name = "Curr_Sys_Rate")
	public Double getCurrSysRate() {
		return currSysRate;
	}

	@Column(name = "Curr_Buss_Rate_Flag")
	public Integer getCurrBussRateFlag() {
		return currBussRateFlag;
	}

	@Column(name = "Curr_Buss_Rate_Info_Time")
	public Integer getCurrBussRateInfoTime() {
		return currBussRateInfoTime;
	}

	@Column(name = "Curr_Buss_Rate_Warn_Time")
	public Integer getCurrBussRateWarnTime() {
		return currBussRateWarnTime;
	}

	@Column(name = "Curr_Buss_Rate")
	public Double getCurrBussRate() {
		return currBussRate;
	}

	@Column(name = "Curr_Tps_Flag")
	public Integer getCurrTpsFlag() {
		return currTpsFlag;
	}

	@Column(name = "Curr_Tps_Info_Time")
	public Integer getCurrTpsInfoTime() {
		return currTpsInfoTime;
	}

	@Column(name = "Curr_Tps_Warn_Time")
	public Integer getCurrTpsWarnTime() {
		return currTpsWarnTime;
	}

	@Column(name = "Curr_Tps")
	public Double getCurrTps() {
		return currTps;
	}

	@Column(name = "Curr_Trans_Avgtime_Flag")
	public Integer getCurrTransAvgtimeFlag() {
		return currTransAvgtimeFlag;
	}

	@Column(name = "Curr_Trans_Avgtime_Info_Time")
	public Integer getCurrTransAvgtimeInfoTime() {
		return currTransAvgtimeInfoTime;
	}

	@Column(name = "Curr_Trans_Avgtime_Warn_Time")
	public Integer getCurrTransAvgtimeWarnTime() {
		return currTransAvgtimeWarnTime;
	}

	@Column(name = "Curr_Trans_Avgtime")
	public Double getCurrTransAvgtime() {
		return currTransAvgtime;
	}

	@Column(name = "Curr_Esb_Avgtime_Flag")
	public Integer getCurrEsbAvgtimeFlag() {
		return currEsbAvgtimeFlag;
	}

	@Column(name = "Curr_Esb_Avgtime_Info_Time")
	public Integer getCurrEsbAvgtimeInfoTime() {
		return currEsbAvgtimeInfoTime;
	}

	@Column(name = "Curr_Esb_Avgtime_Warn_Time")
	public Integer getCurrEsbAvgtimeWarnTime() {
		return currEsbAvgtimeWarnTime;
	}

	@Column(name = "Curr_Esb_Avgtime")
	public Double getCurrEsbAvgtime() {
		return currEsbAvgtime;
	}

	@Column(name = "Curr_Expt_Flag")
	public Integer getCurrExptFlag() {
		return currExptFlag;
	}

	@Column(name = "Curr_Expt_Info_Time")
	public Integer getCurrExptInfoTime() {
		return currExptInfoTime;
	}

	@Column(name = "Curr_Expt_Warn_Time")
	public Integer getCurrExptWarnTime() {
		return currExptWarnTime;
	}

	@Column(name = "Curr_Expt")
	public Double getCurrExpt() {
		return currExpt;
	}

	@Column(name = "Stop_Hold_Time_Flag")
	public Integer getStopHoldTimeFlag() {
		return stopHoldTimeFlag;
	}

	@Column(name = "Stop_Hold_Time_Info_Time")
	public Integer getStopHoldTimeInfoTime() {
		return stopHoldTimeInfoTime;
	}

	@Column(name = "Stop_Hold_Time_Warn_Time")
	public Integer getStopHoldTimeWarnTime() {
		return stopHoldTimeWarnTime;
	}

	@Column(name = "Stop_Hold_Time")
	public Double getStopHoldTime() {
		return stopHoldTime;
	}

	@Column(name = "Cons_Thread_Num_Flag")
	public Integer getConsThreadNumFlag() {
		return consThreadNumFlag;
	}

	@Column(name = "Cons_Thread_Num_Info_Time")
	public Integer getConsThreadNumInfoTime() {
		return consThreadNumInfoTime;
	}

	@Column(name = "Cons_Thread_Num_Warn_Time")
	public Integer getConsThreadNumWarnTime() {
		return consThreadNumWarnTime;
	}

	@Column(name = "Cons_Thread_Num")
	public Double getConsThreadNum() {
		return consThreadNum;
	}

	@Column(name = "Prvd_Thread_Num_Flag")
	public Integer getPrvdThreadNumFlag() {
		return prvdThreadNumFlag;
	}

	@Column(name = "Prvd_Thread_Num_Info_Time")
	public Integer getPrvdThreadNumInfoTime() {
		return prvdThreadNumInfoTime;
	}

	@Column(name = "Prvd_Thread_Num_Warn_Time")
	public Integer getPrvdThreadNumWarnTime() {
		return prvdThreadNumWarnTime;
	}

	@Column(name = "Prvd_Thread_Num")
	public Double getPrvdThreadNum() {
		return prvdThreadNum;
	}

	public String getMonObjName() {
		return monObjName;
	}
}
