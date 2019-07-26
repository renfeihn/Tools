package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.bean.PageEsbMonitor;
import tc.cama.aweb.esb.model.EsbErrorFlow;
import tc.cama.aweb.esb.model.EsbMonMS;
import tc.cama.aweb.esb.model.EsbTransError;
import tc.cama.aweb.service.IEsbMonitor;

/**
 * esb对象监控视图
 */
@Controller("EsbMonitorActionBean")
@Scope("prototype")
public class EsbMonitorAction extends StandardActionSupport {
	private static final long serialVersionUID = 1L;
	@Autowired
	private IEsbMonitor esbMonitor;

	private int type;
	private int statisticType;
	private int orderType;
	private int top;

	private int flag; 
	private String monitorObject;
	private int field;
	private List<Integer> fields;
	private int interval;
	private int time;
	private String respcode;
	
	public List<Integer> getFields(){
		return fields;
	}
	
	public void setFields(List<Integer> fields){
		this.fields = fields;
	}
	
	public IEsbMonitor getEsbMonitor() {
		return esbMonitor;
	}

	public int getType() {
		return type;
	}

	public int getStatisticType() {
		return statisticType;
	}

	public int getOrderType() {
		return orderType;
	}

	public int getTop() {
		return top;
	}

	public int getFlag() {
		return flag;
	}

	public String getMonitorObject() {
		return monitorObject;
	}

	public int getField() {
		return field;
	}

	public int getInterval() {
		return interval;
	}

	public int getTime() {
		return time;
	}

	public void setEsbMonitor(IEsbMonitor esbMonitor) {
		this.esbMonitor = esbMonitor;
	}

	public void setType(int type) {
		this.type = type;
	}

	public void setStatisticType(int statisticType) {
		this.statisticType = statisticType;
	}

	public void setOrderType(int orderType) {
		this.orderType = orderType;
	}

	public void setTop(int top) {
		this.top = top;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}

	public void setMonitorObject(String monitorObject) {
		this.monitorObject = monitorObject;
	}

	public void setField(int field) {
		this.field = field;
	}

	public void setInterval(int interval) {
		this.interval = interval;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public String getRespcode() {
		return respcode;
	}

	public void setRespcode(String respcode) {
		this.respcode = respcode;
	}

	/**
	 * 获取esb列表
	 * @return
	 * @throws Exception
	 */
	public String getAppAnalyse() throws Exception{
		List<EsbMonMS> esbMonMSs = esbMonitor.getEsbMonList(type, statisticType, orderType, top);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("esbMonMSs", esbMonMSs!=null?esbMonMSs:new ArrayList<EsbMonMS>()));
		return SUCCESS;
	}
	
	/**
	 * 获取echarts
	 * @return
	 * @throws Exception
	 */
	public String getEcharts() throws Exception{
		Map<String, List<String>> echartsData = esbMonitor.getEcharts(flag, time, type,monitorObject,field);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", echartsData));
		return SUCCESS;
	}
	
	/**
	 * 获取5分钟、10分钟、30分钟、60分钟echarts
	 * @return
	 * @throws Exception
	 */
	public String getEchartsData() throws Exception{
		Map<String, List<String>> echartsData = esbMonitor.getEchartsData(flag, interval, type,monitorObject,fields);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", echartsData));
		return SUCCESS;
	}
	
	/**
	 * 获取esb对象详情
	 * @return
	 * @throws Exception
	 */
	public String getEsbDetail() throws Exception{
		PageEsbMonitor esbDetail = esbMonitor.getEsbDetail(type, monitorObject);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("esbDetail", esbDetail));
		return SUCCESS;
	}
	
	/**
	 * 获取错误信息
	 * @return
	 * @throws Exception
	 */
	public String getErrorInfo() throws Exception{
		List<EsbTransError> errorInfo = esbMonitor.getErrorInfo(type,monitorObject,flag,top);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("errorInfo", errorInfo!=null?errorInfo:new ArrayList<EsbTransError>()));
		return SUCCESS;
	}
	
	/**
	 * 获取错误流水信息
	 * @return
	 * @throws Exception
	 */
	public String getErrorFlowInfo() throws Exception{
		List<EsbErrorFlow> errorFlowInfo = esbMonitor.getErrorFlowInfo(type,monitorObject,respcode,top);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("errorFlowInfo", errorFlowInfo!=null?errorFlowInfo:new ArrayList<EsbErrorFlow>()));
		return SUCCESS;
	}
	
	/**
	 * 获取昨日和今日的echarts
	 * @return
	 * @throws Exception
	 */
	public String getTwoTimeEcharts() throws Exception{
		Map<String, List<String>> twoTimeEcharts = esbMonitor.getDayAndYesEcharts(flag, interval,time, type, monitorObject,field);
		Map<String,Object> data = new HashMap<String,Object>();
		data.put("unit", "笔");
		data.put("items", new String[]{"今日交易量","昨日交易量"});
		if(null==twoTimeEcharts){
			twoTimeEcharts = new HashMap<String,List<String>>();
		}
		data.putAll(twoTimeEcharts);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", data));
//		Timeline<Double> twoTimeEcharts = esbMonitor.getTwoTimeEcharts(flag, interval, time, type, monitorObject, field);
//		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), TimelineUtils.integerFormat(twoTimeEcharts)));
		return SUCCESS;
	}
}
