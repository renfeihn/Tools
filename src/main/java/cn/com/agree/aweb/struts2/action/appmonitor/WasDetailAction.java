package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.service.IWasDetail;
/**
 * was详情
 *
 */
@Controller("WasDetailActionBean")
@Scope("prototype")
public class WasDetailAction extends StandardActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = 3669374710009765403L;
	@Autowired
	private IWasDetail wasDetail;
	private int time;
	private int interval;
	private int objId;
	private String[]metric;
	public IWasDetail getWasDetail() {
		return wasDetail;
	}

	public void setWasDetail(IWasDetail wasDetail) {
		this.wasDetail = wasDetail;
	}
	
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

	public int getObjId() {
		return objId;
	}

	public void setObjId(int objId) {
		this.objId = objId;
	}


	public String[] getMetric() {
		return metric;
	}

	public void setMetric(String[] metric) {
		this.metric = metric;
	}

	/**
	 * 基础信息
	 * @return
	 * @throws Exception 
	 */
	public String getBaseInfo() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", wasDetail.getBaseInfo(objId)));
		return SUCCESS;
	}
	/**
	 * 进程echarts
	 * @return
	 */
	public String getProcessEcharts(){
		Map<String, Object> result = wasDetail.getEcharts(objId, time, interval, metric);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", result.get("echarts")).addParameter("curr_data",result.get("curr_data")).addParameter("threadNum", wasDetail.getThreadNum(objId)));
		return SUCCESS;
	}
	/**
	 * 端口状态echarts
	 * @return
	 */
	public String getPortEcharts(){
		Map<String, Object> result = wasDetail.getEcharts(objId, time, interval, metric);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", result.get("echarts")).addParameter("curr_data", result.get("curr_data")).addParameter("port_status", wasDetail.getPortStatus(objId)));
		return SUCCESS;
	}
	/**
	 * jdbc状态echarts
	 * @return
	 */
	public String getJdbcEcharts(){
		Map<String, Object> result = wasDetail.getEcharts(objId, time, interval, metric);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", result.get("echarts")).addParameter("curr_data", result.get("curr_data")));
		return SUCCESS;
	}
	/**
	 * 线程使用率
	 * @return
	 */
	public String getThreadUseRate(){
		Map<String, Object> result = wasDetail.getEcharts(objId, time, interval, metric);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", result.get("echarts")).addParameter("curr_data", result.get("curr_data")));
		return SUCCESS;
	}
	/**
	 * 线程池运行情况echarts
	 * @return
	 */
	public String getThreadPoolEcharts(){
		Map<String, Object> result = wasDetail.getEcharts(objId, time, interval, metric);
		Double threadNum = 0.0;
		if(result.get("curr_data")!=null){
			@SuppressWarnings("unchecked")
			List<String> curr_data = (List<String>) result.get("curr_data");
			for(String num : curr_data){
				threadNum += Double.parseDouble(num);
			}
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", result.get("echarts")).addParameter("curr_data", result.get("curr_data")).addParameter("threadNum", threadNum));
		return SUCCESS;
	}
	/**
	 * 内存echarts
	 * @return
	 */
	public String getMemEcharts(){
		Map<String, Object> result = wasDetail.getEcharts(objId, time, interval, metric);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", result.get("echarts")).addParameter("curr_data", result.get("curr_data")).addParameter("run_time",wasDetail.getJvmRunTime(objId)));
		return SUCCESS;
	}
	/**
	 * 得到app信息
	 * @return
	 * @throws Exception 
	 * @throws NumberFormatException 
	 */
	public String getAppInfo() throws NumberFormatException, Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", wasDetail.getAppinfo(objId)));
		return SUCCESS;
	}
	/**
	 * 得到进程信息
	 * @return
	 */
	public String getThreadInfo(){
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", wasDetail.getThreadinfo(objId)));
		return SUCCESS;
	}
	/**
	 * 得到日志信息
	 */
	public String getLogInfo(){
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", wasDetail.getLoginfo(objId)));
		return SUCCESS;
	}
}
