package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONArray;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.EchartsUtils;
import tc.bank.common.core.Timeline;
import tc.bank.common.utils.TimelineUtils;
import tc.cama.aweb.bean.AppEventView;
import tc.cama.aweb.bean.PageAppAPMView;
import tc.cama.aweb.bean.PageAppServerSummary;
import tc.cama.aweb.service.IAppPerform;

/**
 * 应用概览
 */
@Controller("AppPerformActionBean")
@Scope("prototype")
public class AppPerformAction extends StandardActionSupport{

	private static final long serialVersionUID = 1L;
	
	@Autowired
	private IAppPerform appPerform;
	
	private long objectId;
	
	private int interval;
	
	private int time;
	
	private int orderType;
	
	private int appId;

	private String categoryIds;


	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}
	
	public int getInterval() {
		return interval;
	}


	public void setInterval(int interval) {
		this.interval = interval;
	}

	public int getOrderType() {
		return orderType;
	}

	public void setOrderType(int orderType) {
		this.orderType = orderType;
	}


	public long getObjectId() {
		return objectId;
	}


	public void setObjectId(long objectId) {
		this.objectId = objectId;
	}

	
	public IAppPerform getAppPerform() {
		return appPerform;
	}

	public int getAppId() {
		return appId;
	}

	public String getCategoryIds() {
		return categoryIds;
	}

	public void setAppPerform(IAppPerform appPerform) {
		this.appPerform = appPerform;
	}

	public void setAppId(int appId) {
		this.appId = appId;
	}

	public void setCategoryIds(String categoryIds) {
		this.categoryIds = categoryIds;
	}

	/**
	 * 获取事件汇总信息
	 * @return
	 * @throws Exception 
	 */
	public String getTotalEvent() throws Exception {
		AppEventView appEventSummary = appPerform.getTotalEvent(objectId,time,interval,getUsername());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("eventData", appEventSummary).addParameter("echartsData",
				appEventSummary.getEchartsData()));
		return SUCCESS;
	}

	/**
	 * 获取应用总体健康度
	 * @return
	 */
	public String getAPPHealth(){
		int appTotalHealth=appPerform.getAppHealthy(objectId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("appHealth", appTotalHealth));
		return SUCCESS;
	}
	
	/**
	 * 获取服务器列表数据
	 * @return
	 * @throws Exception 
	 */
	public String getServerList() throws Exception{
		List<PageAppServerSummary> serverList=appPerform.getServerList(objectId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("serverList", serverList));
		return SUCCESS;
	}
	
	/**
	 * 获取APM性能数据
	 * @return
	 * @throws Exception 
	 */
	public String getAPMPerformance() throws Exception{
		PageAppAPMView view=appPerform.getAPMPerformance(objectId,time,interval);
		Map<String,Object> data = new HashMap<String,Object>();
		data.put("unit", "笔/秒");
		data.put("items", new String[]{"TPS"});
		Map<String, List<String>> echartsData=view.getEchartsData();
		if(echartsData==null){
			echartsData=new HashMap<String,List<String>>();
		}
		data.putAll(echartsData);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("view", view).addParameter("echartsData", data));
		return SUCCESS;
	}
	
	/**
	 * 获取对象事件和监控数列表
	 * @return
	 * @throws Exception
	 */
	public String getObjectEvent() throws Exception{
		@SuppressWarnings("unchecked")
		List<Integer> categoryIdList=(List<Integer>) JSONArray.parse(categoryIds);
		Map<String, List<Integer>> objectevent = appPerform.getObjectEvent(categoryIdList, appId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("objectevent", objectevent));
		return SUCCESS;
	}
	
	
	/**
	 * 获取CPU echarts数据
	 * @return
	 */
	public String getMetricCpuEcharts(){
		Timeline<Double> cpuEcharts=appPerform.getMetricCPUEcharts(objectId,time,interval);
		if(cpuEcharts!=null)
			setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), cpuEcharts));
		else
			setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", new ArrayList<String>()));
		return SUCCESS;
	}

	/**
	 * 获取内存 echarts数据
	 * @return
	 */
	public String getMetricMemEcharts(){
		Timeline<Double> memEcharts=appPerform.getMetricMEMEcharts(objectId, time, interval);
		if(memEcharts!=null)
			setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), TimelineUtils.numberFormat(memEcharts)));
		else
			setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", new ArrayList<String>()));
		return SUCCESS;		
	}
	
	/**
	 * 获取磁盘 echarts数据
	 * @return
	 */
	public String getMetricDiskIOEcharts(){
		Timeline<Double> diskIOEcharts=appPerform.getMetricDiskIOEcharts(objectId, time, interval);
		if(diskIOEcharts!=null)
			setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), diskIOEcharts));
		else
			setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", new ArrayList<String>()));
		return SUCCESS;	
	}
	
	/**
	 * 获取网络 echarts数据
	 * @return
	 */
	public String getMetricNetIOEcharts(){
		Timeline<Double> netIOEcharts=appPerform.getMetricNETIOEcharts(objectId, time, interval);
		if(netIOEcharts!=null)
			setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), netIOEcharts));
		else
			setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", new ArrayList<String>()));
		return SUCCESS;	
	}
	
	/**
	 * 获取当前session中用户名
	 * 
	 * @return
	 */
	private String getUsername() {
		return (String) getSession().getAttribute("username");
	}
}