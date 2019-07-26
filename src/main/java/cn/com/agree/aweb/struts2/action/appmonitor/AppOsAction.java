package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;




import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.EchartsUtils;
import tc.bank.cama.core.service.metric.MetricConstants;
import tc.bank.cama.core.service.metric.MetricConstants.Metric;
import tc.bank.common.core.Timeline;
import tc.bank.common.utils.TimelineUtils;
import tc.cama.aweb.bean.AppOsMem;
import tc.cama.aweb.bean.PageOsBase;
import tc.cama.aweb.service.IAppOs;

/**
 * 操作系统
 */
@Controller("AppOsActionBean")
@Scope("prototype")
public class AppOsAction extends StandardActionSupport {

	private static final long serialVersionUID = 1L;

	@Autowired
	private IAppOs appOs;

	long logicalId;
	Date startDate ;
	int interval;
	String tagvs;

	public IAppOs getAppOs() {
		return appOs;
	}

	public long getLogicalId() {
		return logicalId;
	}

	public Date getStartDate() {
		return startDate;
	}

	public int getInterval() {
		return interval;
	}

	public String getTagvs() {
		return tagvs;
	}

	public void setAppOs(IAppOs appOs) {
		this.appOs = appOs;
	}

	public void setLogicalId(long logicalId) {
		this.logicalId = logicalId;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public void setInterval(int interval) {
		this.interval = interval;
	}

	public void setTagvs(String tagvs) {
		this.tagvs = tagvs;
	}

	/**
	 * 获取逻辑服务器基本信息，包括指标、事件和健康度
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getOsBaseInfo() throws Exception {
		PageOsBase osBase = appOs.getOsBaseInfo(logicalId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("osBase", osBase));
		return SUCCESS;
	}
	
	/**
	 * 获取cpu--echarts
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getCpuEcharts() throws Exception {
		
		Timeline<Double> cpuEcharts = appOs.getCpuEcharts(logicalId, startDate ,interval,TimeUnit.MINUTES);

		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), cpuEcharts));
		
		return SUCCESS;
	}
	
	/**
	 * 获取mem--echarts
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getCurrMem() throws Exception {
		
		AppOsMem appOsMem = appOs.getCurrMem(logicalId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("appOsMem", appOsMem));
		return SUCCESS;
	}
	
	/**
	 * 获取mem--echarts
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getMemEcharts() throws Exception {
		if(0==interval){
			interval = 1*60;
		}else{
			interval = interval*60;
		}
		Timeline<Double> memEcharts = appOs.getMemEcharts(logicalId,Metric.OS_MEM_MEM_USED_PCT.getName(), startDate ,interval,TimeUnit.SECONDS);
		// 指标名称
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), TimelineUtils.numberFormat(memEcharts)));
		return SUCCESS;
	}

	/**
	 * 获取memawap--echarts
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getAwapMemEcharts() throws Exception {
		if(0==interval){
			interval = 1*60;
		}else{
			interval = interval*60;
		}
		Timeline<Double> awapMemEcharts = appOs.getMemEcharts(logicalId,Metric.OS_MEM_SWAP_USED_PCT.getName(), startDate ,interval,TimeUnit.SECONDS);
		// 指标名称
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), TimelineUtils.numberFormat(awapMemEcharts)));
		return SUCCESS;
	}

	/**
	 * 查询磁盘标签
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getDiskTags() throws Exception {
		
		List<String> diskTags = appOs.getDiskTags(logicalId);
		
		setStrutsMessage(StrutsMessage.successMessage().addParameter("diskTags", diskTags));
		
		return SUCCESS;
	}
	
	/**
	 * 获取磁盘--echarts
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getDiskEcharts() throws Exception {
		
		if(0==interval){
			interval = 1*60;
		}else{
			interval = interval*60;
		}
		Timeline<Double> diskEcharts = appOs.getDiskEcharts(logicalId, tagvs, startDate ,interval,TimeUnit.SECONDS);
		
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), diskEcharts));
		
		return SUCCESS;
	}
	
	/**
	 * 查询网卡标签
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getNetTags() throws Exception {
		
		List<String> netTags = appOs.getNetTags(logicalId);
		
		setStrutsMessage(StrutsMessage.successMessage().addParameter("netTags", netTags));
		
		return SUCCESS;
	}
	
	/**
	 * 获取net--echarts
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getNetEcharts() throws Exception {
		
		if(0==interval){
			interval = 1*60;
		}else{
			interval = interval*60;
		}
		Timeline<Double> netEcharts = appOs.getNetEcharts(logicalId, tagvs, startDate ,interval,TimeUnit.SECONDS);
		
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), netEcharts));
		
		return SUCCESS;
	}
	
	/**
	 * 获取文件系统信息
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getFileEcharts() throws Exception {
		
		Map<String,List<String>> echartsData = appOs.getFileEcharts(logicalId);
	
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", echartsData));
	
		return SUCCESS;
	}
	
	public String getTopProcs() throws Exception{
		
		Map<String, Object> data = appOs.getTopProcs(logicalId, 5, MetricConstants.Metric.OS_PROC_CPU_USED);
		if(data!=null){
			StrutsMessage msg = StrutsMessage.successMessage();
			for(Map.Entry<String, Object> entry:data.entrySet()){
				msg.addParameter(entry.getKey(), entry.getValue());
			}
			setStrutsMessage(msg);
		}
		
		return SUCCESS;
	}
}
