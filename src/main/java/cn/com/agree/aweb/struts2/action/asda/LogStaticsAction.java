package cn.com.agree.aweb.struts2.action.asda;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import tc.bank.asda.logstatis.service.IAimlMonInputStaticsService;
import tc.bank.asda.logstatis.service.IDataPredictService;
import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;

@Controller("LogStaticsActionBean")
@Scope("prototype")
public class LogStaticsAction extends StandardActionSupport {


	/**
	 * 
	 */
	private static final long serialVersionUID = 6890657222245492389L;
	
	@Autowired
	private IAimlMonInputStaticsService service;
	
	@Autowired
	private IDataPredictService predictService;
	
	private String staticsDate;
	/**
	 * 排序数字
	 */
	private int topSize;
	/**
	 * 排序方法 1:降序 2：升序
	 */
	private int sortType;
	/**
	 * 排序字段 datasize/dataips
	 */
	private String orderField;
	/**
	 * 统计类型
	 * 1-主机 2-应用 3-数据源
	 */
	private String statisticstype;
	
	private String keyName;
	
	private String startTime;
	
	private String endTime;
	
	private List<String> keyIds;
	
	private List<String> keyid;
	
	private int timeModel;
	
	private int timeInterval;
	
	private int startNumber;
	
	private String queryStr;
	
	private String appName;
	
	private int pageSize;
	
	private int pageNum;
	
	private int intervalMinute;
	
	private int intervalSecond;
	
	private String singleKeyid;
	
	private int duration;
	
	
	//objId, metric, start, end
	private int objId;
	private String metric;
	private Date start;
	private Date end;
	public int getObjId() {
		return objId;
	}

	public void setDuration(int objId) {
		this.duration = objId;
	}

	public int getDuration() {
		return duration;
	}

	public void setObjId(int objId) {
		this.objId = objId;
	}

	public String getMetric() {
		return metric;
	}

	public void setMetric(String metric) {
		this.metric = metric;
	}

	public Date getStart() {
		return start;
	}

	public void setStart(Date start) {
		this.start = start;
	}

	public Date getEnd() {
		return end;
	}

	public void setEnd(Date end) {
		this.end = end;
	}

	public String getQueryStr() {
		return queryStr;
	}

	public void setQueryStr(String queryStr) {
		this.queryStr = queryStr;
	}

	public int getTimeInterval() {
		return timeInterval;
	}

	public void setTimeInterval(int timeInterval) {
		this.timeInterval = timeInterval;
	}

	public int getStartNumber() {
		return startNumber;
	}

	public void setStartNumber(int startNumber) {
		this.startNumber = startNumber;
	}

	public List<String> getKeyIds() {
		return keyIds;
	}

	public void setKeyIds(List<String> keyIds) {
		this.keyIds = keyIds;
	}

	public String getStaticsDate() {
		return staticsDate;
	}

	public void setStaticsDate(String staticsDate) {
		this.staticsDate = staticsDate;
	}

	public String getStatisticstype() {
		return statisticstype;
	}

	public void setStatisticstype(String statisticstype) {
		this.statisticstype = statisticstype;
	}

	public String getKeyName() {
		return keyName;
	}

	public void setKeyName(String keyName) {
		this.keyName = keyName;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	

	public List<String> getKeyid() {
		return keyid;
	}

	public void setKeyid(List<String> keyid) {
		this.keyid = keyid;
	}

	public int getTimeModel() {
		return timeModel;
	}

	public void setTimeModel(int timeModel) {
		this.timeModel = timeModel;
	}

	public String getAppName() {
		return appName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	public int getTopSize() {
		return topSize;
	}

	public void setTopSize(int topSize) {
		this.topSize = topSize;
	}

	public int getSortType() {
		return sortType;
	}

	public void setSortType(int sortType) {
		this.sortType = sortType;
	}

	public String getOrderField() {
		return orderField;
	}

	public void setOrderField(String orderField) {
		this.orderField = orderField;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPageNum() {
		return pageNum;
	}

	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}
	
	public int getIntervalMinute() {
		return intervalMinute;
	}

	public void setIntervalMinute(int intervalMinute) {
		this.intervalMinute = intervalMinute;
	}

	public int getIntervalSecond() {
		return intervalSecond;
	}

	public void setIntervalSecond(int intervalSecond) {
		this.intervalSecond = intervalSecond;
	}

	public String getSingleKeyid() {
		return singleKeyid;
	}

	public void setSingleKeyid(String singleKeyid) {
		this.singleKeyid = singleKeyid;
	}

	/**
	 * 日志采集统计
	 * :param staticsDate  统计采集日期
	 * @return  JSONObject
	 * 			appNum  采集应用系统数  
	 *          ipNum   采集主机数
	 *          logDataToTalSize   采集日志总量
	 *          currentLogDataIps  日志采集速率
	 * @throws Exception
	 */
	public String logCollectionStatics() throws Exception{
		
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.logCollectionStatics(staticsDate)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
		
	}
	/**
	 * 分页查询某个时间点的某个分类下的对象的日志量
	 * :param statisticstype  统计类型  1-主机 2-应用 3-数据源
	 * :param keyName   筛选关键字名称 (模糊查询)
	 * :param statistcsNum 查询数目
	 * @return
	 * @throws Exception
	 */
	public String getMonInputStatics() throws Exception{
		
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.getMonInputByType(statisticstype, keyid, timeModel)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
		
	}
	/**
	 * 查询对象数组在某段时间的日志量
	 * :param statisticstype  统计类型  1-主机 2-应用 3-数据源
	 * :param queryStr     筛选字段
	 * :param timeInterval 查询时间间隔（默认5s）
	 * :param startNumber  起始记录数（默认0）
	 * @return
	 * @throws Exception
	 */
	public String getMonInputByKeyIds() throws Exception{
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.getMonInputByKeyIds(statisticstype, queryStr, timeInterval, startNumber,topSize,sortType,orderField)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String getMonInputByKeyIdsByAppid() throws Exception{
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.getMonInputByKeyIdsByAppid(statisticstype,Long.valueOf(singleKeyid), timeInterval, startNumber,topSize,sortType,orderField)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 获取流量采集汇总页面的结构树
	 * @return
	 * @throws Exception
	 */
	public String getMonInPutStatics() throws Exception{
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.getMonInPutStatics(Integer.valueOf(statisticstype), keyName)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	 /**
	 * 获取流量采集汇总页面的应用汇总信息
	 * @return
	 * @throws Exception
	 */
	public String getAppStaticsSummary() throws Exception{
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.getAppStaticsSummary(Integer.valueOf(statisticstype), keyName, duration)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	 /**
	 * 获取流量监控对象Echarts
	 * @return
	 * @throws Exception
	 */
	public String getMonInputECharts() throws Exception{
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.getMonInputECharts(Integer.valueOf(statisticstype), keyName, duration)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	 /**
	 *根据应用获取日志量
	 * @return
	 * @throws Exception
	 */
	public String getMonInputByApp() throws Exception{
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.getMonInputByApp(timeInterval, appName)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**数据预测
	 * @return
	 */
	public String predict(){
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", predictService.predict(objId, metric, start, end)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**分页统计
	 * @return
	 */
	public String statisMonInput(){
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.statisMonInput(statisticstype, pageSize,pageNum,orderField)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 获取应用速度
	 */
	public String getAppIps(){
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.getAppIps(statisticstype, singleKeyid,intervalMinute,intervalSecond)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 获取应用名称与id映射
	 */
	public String getAppIdMapping(){
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.getAppIdMapping()));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String logCollectionStaticsByAppID(){
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.logCollectionStaticsByAppID(Long.valueOf(singleKeyid))));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
}
