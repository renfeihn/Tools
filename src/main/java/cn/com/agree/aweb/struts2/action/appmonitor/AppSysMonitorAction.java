package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.EchartsUtils;
import tc.bank.cama.cmdb.model.table.extention.CmdbLogicalServer;
import tc.bank.cama.cmdb.service.LogicalServerQuery;
import tc.bank.common.core.Timeline;
import tc.cama.aweb.bean.AppMetric;
import tc.cama.aweb.bean.PageAppLogicServers;
import tc.cama.aweb.bean.PageAppObjectClassify;
import tc.cama.aweb.service.IAppSysMonitor;
/**
 * 应用性能-系统监控
 * @author luotong
 *
 */
@Scope("prototype")
@Controller("AppSysMonitorActionBean")
public class AppSysMonitorAction extends StandardActionSupport{

	private static final long serialVersionUID = 1L;
	@Autowired
	private IAppSysMonitor appSysMonitor;
	@Autowired
	private LogicalServerQuery logicalServerQuery;
	private Long appObjectId;
	private Long interval;
	private Date startDate;
	private Date endDate;
	private int timeBlock;
	private  int[] objId;
	private String[] metricNames;
	private String metricName;
	public Long getAppObjectId() {
		return appObjectId;
	}

	public void setAppObjectId(Long appObjectId) {
		this.appObjectId = appObjectId;
	}

	public Long getInterval() {
		return interval;
	}

	public void setInterval(Long interval) {
		this.interval = interval;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public int getTimeBlock() {
		return timeBlock;
	}

	public void setTimeBlock(int timeBlock) {
		this.timeBlock = timeBlock;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
    

	public int[] getObjId() {
		return objId;
	}

	public void setObjId(int[] objId) {
		this.objId = objId;
	}

	public String getMetricName() {
		return metricName;
	}

	public void setMetricName(String metricName) {
		this.metricName = metricName;
	}

	public String[] getMetricNames() {
		return metricNames;
	}

	public void setMetricNames(String[] metricNames) {
		this.metricNames = metricNames;
	}

	/**
	 * 获取系统分类的对象数
	 * @return
	 * @throws Exception
	 */
	public String getClassifyCounts() throws Exception{
		PageAppObjectClassify objClassify = appSysMonitor.getClassifyCounts(appObjectId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("objClassify", objClassify));
		return SUCCESS;
	}
	
	/**
	 * 查询系统下逻辑服务器列表
	 * @return
	 * @throws Exception 
	 */
	public String getServers() throws Exception{
//		appObjectId = 70464L;
		List<PageAppLogicServers> logicServers = appSysMonitor.getAppRelatedServers(appObjectId, getUsername());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("logicServers", logicServers));
		return SUCCESS;
	}
	/**
	 * 查询指标top5信息
	 * @return
	 * @throws Exception
	 */
	public String getAppMetricByAppId() throws Exception{
		
		AppMetric appMetric = appSysMonitor.getAppMetricByAppId(appObjectId, startDate,endDate, 60);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("objsMetric", appMetric));
		return SUCCESS;
	
	}
//	/**
//	 * 查询指定服务器的指标实时数据
//	 * @return
//	 * @throws Exception
//	 */
//	public String getAppMetricByAppServerId() throws Exception{
//		ObjectMetric objsMetric = appSysMonitor.getAppMetricByAppServerId(objId, metricName);
//		
//		setStrutsMessage(StrutsMessage.successMessage().addParameter("objsMetric", objsMetric));
//		return SUCCESS;
//	}
	/**
	 * 单指标多对象实时信息
	 */
	public String getAppMetricByAppServerId() throws Exception{
	    startDate=new Date(System.currentTimeMillis()-timeBlock*60*1000);
	    endDate=new Date(System.currentTimeMillis());
		Timeline<Double> timeLine = appSysMonitor.getAppMetricByAppServerId(objId, metricName, startDate,endDate, interval);	
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(),timeLine ));
		return SUCCESS;
	}
	
	public String currentMetric() throws Exception{
		
	     Map<String,List<String>> echartsData= appSysMonitor.currentMetric(objId, metricName);	
		 setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", echartsData));
		return SUCCESS;
	}
	/**
	 * 获取当前session中用户名k
	 * @return
	 */
	private String getUsername(){
		return (String)getSession().getAttribute("username");
	}
	
	public String getAppIp() throws Exception{
		List<CmdbLogicalServer> logicServers = logicalServerQuery.getAppRelatedServers(appObjectId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("logicServers", logicServers));
		return SUCCESS;
	}
	
}