package tc.cama.aweb.esb.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;
@Entity
@Table(name = "aim_esb_avgtimeunit_10min_his")
public class AimEsbAvgtimeunit10minHis{
	/**
	 *监控对象类型
	*/
	@Column(name = "mon_type")
	private String monType;
	/**
	 *监控对象
	*/
	@Column(name = "mon_obj")
	private String monObj;
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
	 *总交易量
	*/
	@Column(name = "sum_totnum")
	private double sumTotnum;
	/**
	 *系统成功笔数
	*/
	@Column(name = "sum_sys_succ_num")
	private double sumSysSuccNum;
	/**
	 *系统失败笔数
	*/
	@Column(name = "sum_sys_err_num")
	private double sumSysErrNum;
	/**
	 *业务成功笔数
	*/
	@Column(name = "sum_buss_succ_num")
	private double sumBussSuccNum;
	/**
	 *业务成功笔数
	*/
	@Column(name = "sum_buss_err_num")
	private double sumBussErrNum;
	/**
	 *系统成功率
	*/
	@Column(name = "avg_sys_rate")
	private double avgSysRate;
	/**
	 *业务成功率
	*/
	@Column(name = "avg_buss_rate")
	private double avgBussRate;
	/**
	 *tps
	*/
	@Column(name = "avg_tps")
	private double avgTps;
	/**
	 *交易处理时间
	*/
	@Column(name = "avg_trans_avgtime")
	private double avgTransAvgtime;
	/**
	 *ESB内部平均处理时间
	*/
	@Column(name = "avg_esb_avgtime")
	private double avgEsbAvgtime;
	/**
	 *@return 监控对象类型
	*/
	public String getMonType(){return this.monType;}
	/**
	 *@param monType 监控对象类型
	*/
	@Column(name = "mon_type")
	public void setMonType(String monType) {this.monType = monType;}
	/**
	 *@return 监控对象
	*/
	public String getMonObj(){return this.monObj;}
	/**
	 *@param monObj 监控对象
	*/
	@Column(name = "mon_obj")
	public void setMonObj(String monObj) {this.monObj = monObj;}
	/**
	 *@return 记库时间
	*/
	public Date getRecordDatetime(){return this.recordDatetime;}
	/**
	 *@param recordDatetime 记库时间
	*/
	@Column(name = "record_datetime")
	public void setRecordDatetime(Date recordDatetime) {this.recordDatetime = recordDatetime;}
	/**
	 *@return 统计开始时间
	*/
	public Date getStartDatetime(){return this.startDatetime;}
	/**
	 *@param startDatetime 统计开始时间
	*/
	@Column(name = "start_datetime")
	public void setStartDatetime(Date startDatetime) {this.startDatetime = startDatetime;}
	/**
	 *@return 统计结束时间
	*/
	public Date getEndDatetime(){return this.endDatetime;}
	/**
	 *@param endDatetime 统计结束时间
	*/
	@Column(name = "end_datetime")
	public void setEndDatetime(Date endDatetime) {this.endDatetime = endDatetime;}
	/**
	 *@return 总交易量
	*/
	public double getSumTotnum(){return this.sumTotnum;}
	/**
	 *@param sumTotnum 总交易量
	*/
	@Column(name = "sum_totnum")
	public void setSumTotnum(double sumTotnum) {this.sumTotnum = sumTotnum;}
	/**
	 *@return 系统成功笔数
	*/
	public double getSumSysSuccNum(){return this.sumSysSuccNum;}
	/**
	 *@param sumSysSuccNum 系统成功笔数
	*/
	@Column(name = "sum_sys_succ_num")
	public void setSumSysSuccNum(double sumSysSuccNum) {this.sumSysSuccNum = sumSysSuccNum;}
	/**
	 *@return 系统失败笔数
	*/
	public double getSumSysErrNum(){return this.sumSysErrNum;}
	/**
	 *@param sumSysErrNum 系统失败笔数
	*/
	@Column(name = "sum_sys_err_num")
	public void setSumSysErrNum(double sumSysErrNum) {this.sumSysErrNum = sumSysErrNum;}
	/**
	 *@return 业务成功笔数
	*/
	public double getSumBussSuccNum(){return this.sumBussSuccNum;}
	/**
	 *@param sumBussSuccNum 业务成功笔数
	*/
	@Column(name = "sum_buss_succ_num")
	public void setSumBussSuccNum(double sumBussSuccNum) {this.sumBussSuccNum = sumBussSuccNum;}
	/**
	 *@return 业务成功笔数
	*/
	public double getSumBussErrNum(){return this.sumBussErrNum;}
	/**
	 *@param sumBussErrNum 业务成功笔数
	*/
	@Column(name = "sum_buss_err_num")
	public void setSumBussErrNum(double sumBussErrNum) {this.sumBussErrNum = sumBussErrNum;}
	/**
	 *@return 系统成功率
	*/
	public double getAvgSysRate(){return this.avgSysRate;}
	/**
	 *@param avgSysRate 系统成功率
	*/
	@Column(name = "avg_sys_rate")
	public void setAvgSysRate(double avgSysRate) {this.avgSysRate = avgSysRate;}
	/**
	 *@return 业务成功率
	*/
	public double getAvgBussRate(){return this.avgBussRate;}
	/**
	 *@param avgBussRate 业务成功率
	*/
	@Column(name = "avg_buss_rate")
	public void setAvgBussRate(double avgBussRate) {this.avgBussRate = avgBussRate;}
	/**
	 *@return tps
	*/
	public double getAvgTps(){return this.avgTps;}
	/**
	 *@param avgTps tps
	*/
	@Column(name = "avg_tps")
	public void setAvgTps(double avgTps) {this.avgTps = avgTps;}
	/**
	 *@return 交易处理时间
	*/
	public double getAvgTransAvgtime(){return this.avgTransAvgtime;}
	/**
	 *@param avgTransAvgtime 交易处理时间
	*/
	@Column(name = "avg_trans_avgtime")
	public void setAvgTransAvgtime(double avgTransAvgtime) {this.avgTransAvgtime = avgTransAvgtime;}
	/**
	 *@return ESB内部平均处理时间
	*/
	public double getAvgEsbAvgtime(){return this.avgEsbAvgtime;}
	/**
	 *@param avgEsbAvgtime ESB内部平均处理时间
	*/
	@Column(name = "avg_esb_avgtime")
	public void setAvgEsbAvgtime(double avgEsbAvgtime) {this.avgEsbAvgtime = avgEsbAvgtime;}
}