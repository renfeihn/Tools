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
import tc.cama.aweb.esb.model.EsbMonMS;
import tc.cama.aweb.service.IAppEsbRunTimeMonitor;


/**
 * ESB系统运行监控
 * @author Win-User
 *
 */
@Controller("AppEsbRunTimeMonitorActionBean")
@Scope("prototype")
public class AppEsbRunTimeMonitorAction extends StandardActionSupport{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Autowired
	private IAppEsbRunTimeMonitor appEsbRunTimeMonitor;
	
	private int time;
	
	private int interval;
	private int flag;
	
	public int getTime() {
		return time;
	}

	public int getInterval() {
		return interval;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public void setInterval(int interval) {
		this.interval = interval;
	}

	public IAppEsbRunTimeMonitor getAppEsbRunTimeMonitor() {
		return appEsbRunTimeMonitor;
	}

	public void setAppEsbRunTimeMonitor(IAppEsbRunTimeMonitor appEsbRunTimeMonitor) {
		this.appEsbRunTimeMonitor = appEsbRunTimeMonitor;
	}

	public int getFlag() {
		return flag;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}

	/**
	 * 服务提供者运行情况
	 * @return
	 * @throws Exception 
	 */
	public String getServiceProvider() throws Exception{
		List<EsbMonMS> serviceProvider =appEsbRunTimeMonitor.getServiceProvider();
		if(serviceProvider!=null)
			setStrutsMessage(StrutsMessage.successMessage().addParameter("serviceProvider", serviceProvider));
		else
			setStrutsMessage(StrutsMessage.successMessage().addParameter("serviceProvider", new ArrayList<EsbMonMS>()));
		return SUCCESS;
	}
	
	/**
	 * 服务消费者运行情况
	 * @return
	 * @throws Exception 
	 */
	public String getServiceConsumer() throws Exception{
		List<EsbMonMS> serviceConsumer=appEsbRunTimeMonitor.getServiceConsumer();
		if(serviceConsumer!=null)
			setStrutsMessage(StrutsMessage.successMessage().addParameter("serviceConsumer", serviceConsumer));
		else
			setStrutsMessage(StrutsMessage.successMessage().addParameter("serviceConsumer", new ArrayList<EsbMonMS>()));
		return SUCCESS;
	}
	
	/**
	 * Esb服务运行情况
	 * @throws Exception 
	 */
	public String getEsbService() throws Exception{
		List<EsbMonMS> esbService=appEsbRunTimeMonitor.getEsbService();
		if(esbService!=null)
			setStrutsMessage(StrutsMessage.successMessage().addParameter("esbService", esbService));
		else
			setStrutsMessage(StrutsMessage.successMessage().addParameter("esbService", new ArrayList<EsbMonMS>()));
		return SUCCESS;
	}
	
	/**
	 * Esb运行情况
	 * @return
	 * @throws Exception 
	 */
	public String getEsbRunningCondition() throws Exception{
		List<EsbMonMS> esbRunningCondition=appEsbRunTimeMonitor.getEsbRunningCondition();
		if(esbRunningCondition!=null)
			setStrutsMessage(StrutsMessage.successMessage().addParameter("esbRunningCondition", esbRunningCondition));
		else
			setStrutsMessage(StrutsMessage.successMessage().addParameter("esbRunningCondition", new ArrayList<EsbMonMS>()));
		return SUCCESS;
	}
	
	
	/**
	 * 交易量echarts
	 * time : 小时
	 * interval 间隔(默认分钟)
	 * @return
	 * @throws Exception 
	 */
	public String getTransCountEcharts() throws Exception{
		Map<String, List<String>> echartsData = null;
		Map<String,Object> data = new HashMap<String,Object>();
		if(1==flag){
			 echartsData = appEsbRunTimeMonitor.getCurrTransCountEcharts();
		}else{
			 echartsData = appEsbRunTimeMonitor.getTransCountEcharts(time, interval);
		}
		data.put("unit", "笔");
		if(echartsData==null){
			echartsData=new HashMap<String,List<String>>();
		}
		data.putAll(echartsData);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", data));
		return SUCCESS;
	}
	
	/**
	 * TPS echarts
	 * @return
	 * @throws Exception 
	 */
	public String getTPSEcharts() throws Exception{
		Map<String, List<String>> echartsData = null;
		Map<String,Object> data = new HashMap<String,Object>();
		if(1==flag){
			echartsData=appEsbRunTimeMonitor.getCurrTPSEcharts();
		}else{
			echartsData=appEsbRunTimeMonitor.getTPSEcharts(time, interval);
		}
		data.put("unit", "笔/秒");
		if(echartsData==null){
			echartsData=new HashMap<String,List<String>>();
		}
		data.putAll(echartsData);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", data));
		return SUCCESS;
		
	}
	
	/**
	 * 平均响应时间echarts
	 * @return
	 * @throws Exception 
	 */
	public String getRspTimeAvgEcharts() throws Exception{
		Map<String, List<String>> echartsData = null;
		Map<String,Object> data = new HashMap<String,Object>();
		if(1==flag){
			echartsData=appEsbRunTimeMonitor.getCurrRspTimeAvgEcharts();
		}else{
			echartsData=appEsbRunTimeMonitor.getRspTimeAvgEcharts(time, interval);
		}
		data.put("unit", "毫秒");
		if(echartsData==null){
			echartsData=new HashMap<String,List<String>>();
		}
		data.putAll(echartsData);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", data));
		return SUCCESS;
	}
	
	/**
	 * 系统成功率echarts
	 * @return
	 * @throws Exception 
	 */
	public String getSysRate() throws Exception{
		Map<String, List<String>> esbSysRate =appEsbRunTimeMonitor.getEsbSysRate();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", esbSysRate));
		return SUCCESS;
	}
	
	
	
	/**
	 * 全局拓扑图
	 * @return
	 * @throws Exception 
	 */
	public String globalTopoGraph() throws Exception{
		Map<String,List<?>> globalTopo=appEsbRunTimeMonitor.getGobalTopo();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("globalTopo", globalTopo));
		return SUCCESS;
	}
	
	/**
	 * 异常提示信息
	 * @return
	 */
	public String errorInfomation(){
		return SUCCESS;
	}
	
}
