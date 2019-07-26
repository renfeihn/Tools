package cn.com.agree.aweb.struts2.action.asda;

import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.logmanagement.model.LogOperation;
import tc.bank.asda.logmanagement.service.ICommonLogOperationService;
import tc.bank.asda.logmanagement.service.ILogOperationService;
import tc.bank.common.date.DateUtils;
import tc.cama.aweb.model.AwebUser;

@Controller("LogOperationActionBean")
@Scope("prototype")
public class LogOperationAction extends StandardActionSupport{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -7602913772702928120L;
	
	@Autowired
	private ILogOperationService logOperationService;
	
	@Autowired
	private ICommonLogOperationService commonLogOperationService;
	
	
	private String logOperationBean;
	
	private String whereEx;
	
	private Date startTime;
	
	private Date endTime;
	
	private int duration;
	
	private String type;
	
	
	
	public String add(){
		try {
			AwebUser userVO = this.getUserVO();
			LogOperation logOperation = JSONObject.parseObject(logOperationBean, LogOperation.class);
			logOperation.setUserId(userVO.getId());
			logOperation.setUserName(userVO.getUsername());
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logOperationService.add(logOperation)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String search(){
		try {
			JSONObject obj = JSONObject.parseObject(whereEx);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logOperationService.search(obj, startTime, endTime)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}		
	}
	public String queryViewDownloadSummary(){
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", 
					logOperationService.queryViewDownloadSummary(duration)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}		
	}
	
	public String query7DayViewDownloadSummary () {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", 
					logOperationService.query7DayViewDownloadSummary()));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}	
	}
	
	
	/**
	 * 获取日志查看、下载统计总数
	 * @param duration
	 * @return
	 */
	public String getLogStatisSum(){
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", 
					commonLogOperationService.getLogStatisSum(duration)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}		
	}
	
	/**
	 * 获取日志访问趋势图
	 * @param duration
	 * @return
	 */
	public String getLogAccessEcharts(){
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", 
					commonLogOperationService.getLogAccessEcharts(duration)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}	
	}
	
	/**
	 * 获取SQL查询趋势图
	 * @param duration
	 * @return
	 */
	public String getLogSqlSearchEcharts(){
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", 
					commonLogOperationService.getLogSqlSearchEcharts(duration)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}	
	}
	
	/**
	 * 获取按查询sql 统计次数top10
	 * @param duration
	 * @return
	 */
	public String getSqlStatisTop10(){
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", 
					commonLogOperationService.getSqlStatisTop10(duration)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}	
	}
	
	/**
	 * 源日志查看Top10
	 * @param duration
	 * @return
	 */
	public String getLogViewTop10(){
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", 
					commonLogOperationService.getLogViewTop10(duration)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}	
	}
	
	/**
	 * 源日志下载Top10
	 * @param duration
	 * @return
	 */
	public String getLogDownloadTop10(){
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", 
					commonLogOperationService.getLogDownloadTop10(duration)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}	
	}
	
	/**
	 * 按应用统计人员访问日志情况
	 * @param duration
	 * @return
	 */
	public String getAppLogView(){
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", 
					commonLogOperationService.getAppLogView(duration)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}	
	}
	
	/**
	 * 按应用统计人员下载日志情况
	 * @param duration
	 * @return
	 */
	public String getAppLogDownLoad(){
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", 
					commonLogOperationService.getAppLogDownLoad(duration)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}	
	}
	
	/**
	 * 获取公共操作日志列表
	 * @return
	 */
	public String getCommonOperationList(){
		try {
			String sdate = DateUtils.format(startTime, "yyyy-MM-dd HH:mm:ss");
			String edate = DateUtils.format(endTime, "yyyy-MM-dd HH:mm:ss");
			Map<String,Object> lst = commonLogOperationService.getCommonOperationList(type,whereEx,sdate,edate);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", lst));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}	
	}
	
	
	/**
	 * 查询源日志归档记录
	 * @param sdate
	 * @param edate
	 * @return
	 */
	public String getSourceLogOperRecord(){
		try {
			String sdate = DateUtils.format(startTime, "yyyy-MM-dd HH:mm:ss");
			String edate = DateUtils.format(endTime, "yyyy-MM-dd HH:mm:ss");
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", 
					commonLogOperationService.getSourceLogOperRecord(sdate,edate)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}	
	}
	
	/**
	 * 查询日志平台归档记录
	 * @param sdate
	 * @param edate
	 * @return
	 */
	public String getLocalLogOperRecord(){
		try {
			String sdate = DateUtils.format(startTime, "yyyy-MM-dd HH:mm:ss");
			String edate = DateUtils.format(endTime, "yyyy-MM-dd HH:mm:ss");
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", 
					commonLogOperationService.getLocalLogOperRecord(sdate,edate)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}	
	}
	
	
	/**
	 * 查询系统任务执行记录
	 * @param sdate
	 * @param edate
	 * @return
	 */
	public String getTaskLogOperRecord(){
		try {
			String sdate = DateUtils.format(startTime, "yyyy-MM-dd HH:mm:ss");
			String edate = DateUtils.format(endTime, "yyyy-MM-dd HH:mm:ss");
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", 
					commonLogOperationService.getTaskLogOperRecord(sdate,edate)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}	
	}

	public String getLogOperationBean() {
		return logOperationBean;
	}

	public void setLogOperationBean(String logOperationBean) {
		this.logOperationBean = logOperationBean;
	}

	public String getWhereEx() {
		return whereEx;
	}

	public void setWhereEx(String whereEx) {
		this.whereEx = whereEx;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	
	

}
