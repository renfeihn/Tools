package cn.com.agree.aweb.struts2.action.appmonitor;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.bean.PageEsbTransAnalyse;
import tc.cama.aweb.bean.PageEsbTransError;
import tc.cama.aweb.bean.PageEsbTransTop;
import tc.cama.aweb.service.IAppEsbTransAnalyse;

/**
 *应用性能-流水分析
 */
@Controller("AppEsbTransAnalyseActionBean")
@Scope("prototype")
public class AppEsbTransAnalyseAction extends StandardActionSupport {

	private static final long serialVersionUID = 1L;
	@Autowired
	private IAppEsbTransAnalyse appEsbTransAnalyse;
	
	long appId;
	String startTime;
	String endTime;
	int top;
	String errorCode;
	int time;
	int interval;
	int flag ;
	int mon_type;
	
	public int getMon_type() {
		return mon_type;
	}

	public void setMon_type(int mon_type) {
		this.mon_type = mon_type;
	}

	public IAppEsbTransAnalyse getAppEsbTransAnalyse() {
		return appEsbTransAnalyse;
	}

	public long getAppId() {
		return appId;
	}

	public String getStartTime() {
		return startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public int getTop() {
		return top;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public int getTime() {
		return time;
	}

	public int getInterval() {
		return interval;
	}

	public void setAppEsbTransAnalyse(IAppEsbTransAnalyse appEsbTransAnalyse) {
		this.appEsbTransAnalyse = appEsbTransAnalyse;
	}

	public void setAppId(long appId) {
		this.appId = appId;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public void setTop(int top) {
		this.top = top;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public void setInterval(int interval) {
		this.interval = interval;
	}
	
	public int getFlag() {
		return flag;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}

	/**
	 * 获取性能分析数据
	 * @return
	 * @throws Exception
	 */
	public String getAppAnalyse() throws Exception{
		PageEsbTransAnalyse  esbTransAnalyse = appEsbTransAnalyse.getAppAnalyse(appId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("esbTransAnalyse", esbTransAnalyse));
		return SUCCESS;
	}
	
	/**
	 * 获取系统错误笔数
	 * @return
	 * @throws Exception
	 */
	public String getEcharSys() throws Exception{
		PageEsbTransAnalyse  esbTransAnalyse = new PageEsbTransAnalyse();
		Map<String,Object> data = new HashMap<String,Object>();
		Map<String, List<String>> lines  = new HashMap<String, List<String>>();
		if(1==flag){
			//flag为1时调实时
			esbTransAnalyse = appEsbTransAnalyse.getCurrEcharErrNum(appId);
			lines = esbTransAnalyse.getEcharSysErrNum();
		}else{
			esbTransAnalyse = appEsbTransAnalyse.getEcharErrNum(appId, time, interval);
			lines = esbTransAnalyse.getEcharSysErrNum();
		}
		data.put("unit", "笔");
		data.put("items", new String[]{"失败笔数"});
		if(null==lines){
			lines = new HashMap<String,List<String>>();
		}
		data.putAll(lines);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", data));
		return SUCCESS;
	}
	
	/**
	 * 获取业务错误笔数
	 * @return
	 * @throws Exception
	 */
	public String getEcharBuss() throws Exception{
		PageEsbTransAnalyse  esbTransAnalyse = new PageEsbTransAnalyse();
		Map<String,Object> data = new HashMap<String,Object>();
		Map<String, List<String>> lines  = new HashMap<String, List<String>>();
		if(1==flag){
			//flag为1时调实时
			esbTransAnalyse = appEsbTransAnalyse.getCurrEcharErrNum(appId);
			lines = esbTransAnalyse.getEcharBussErrNum();
		}else{
			esbTransAnalyse = appEsbTransAnalyse.getEcharErrNum(appId, time, interval);
			lines = esbTransAnalyse.getEcharBussErrNum();
		}
		if(lines == null){
			lines = new HashMap<String, List<String>>();
		}
		data.put("unit", "笔");
		data.put("items", new String[]{"失败笔数"});
		data.putAll(lines);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", data));
		return SUCCESS;
	}
	
	/**
	 * 获取top数据
	 * @param appId
	 * @param top
	 * @return
	 * @throws Exception
	 */
	public String getEsbTop() throws Exception{
		PageEsbTransTop  esbTransTop = appEsbTransAnalyse.getTop(appId, top);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("esbTransTop", esbTransTop));
		return SUCCESS;
	
	}
	
	public String getProConsu() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("esbTransTop",appEsbTransAnalyse.getConsuProv(appId, top, mon_type)));
		return SUCCESS;
	}

	/**
	 * 获取流水错误信息
	 * @return
	 * @throws Exception
	 */
	public String getErrorInfo() throws Exception{
		List<PageEsbTransError>  esbTransError = appEsbTransAnalyse.getErrorInfo(appId,top);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("esbTransError", esbTransError));
		return SUCCESS;
	}
	
	/**
	 * 获取流水错误发生次数echar
	 * @return
	 * @throws Exception
	 */
	public String getErrorCountEchar() throws Exception{
		Map<String,List<String>> errorCountEchar = null;
		Map<String,Object> data = new HashMap<String,Object>();
		if(1==flag){
			errorCountEchar = appEsbTransAnalyse.getCurrErrorCountEchar(errorCode);
		}else{
			errorCountEchar = appEsbTransAnalyse.getErrorCountEchar(errorCode, time, interval);
		}
		data.put("unit", "次");
		data.put("items", new String[]{"错误发生次数"});
		if(errorCountEchar==null){
			errorCountEchar = new HashMap<String,List<String>>();
		}
		data.putAll(errorCountEchar);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", data));
		return SUCCESS;
	}
	

}
