package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.bean.AppPerformAnsBean;
import tc.cama.aweb.bean.FiveStates;
import tc.cama.aweb.bean.SoftWareDeployBean;
import tc.cama.aweb.esb.model.AimEsbMonMsext5;
import tc.cama.aweb.service.IAppPerformAnsy;

@Controller("EsbActionBean")
@Scope("prototype")
public class AppPerformAnsyAction extends StandardActionSupport {
	/**
	 * 
	 */
	private int timeBlock;
	private int interval;
	private long objectId;
	/**
	 * 是否是第一次访问 
	 */
	private String flag;
	/**
	 * 应用系统id
	 */
     private long  appId;
     /**
      * 应用名称
      */
     private String objName;

	public int getInterval() {
		return interval;
	}

	public void setInterval(int interval) {
		this.interval = interval;
	}

	public int getTimeBlock() {
		return timeBlock;
	}

	public void setTimeBlock(int timeBlock) {
		this.timeBlock = timeBlock;
	}

	public long getObjectId() {
		return objectId;
	}

	public void setObjectId(long objectId) {
		this.objectId = objectId;
	}
    
	public long getAppId() {
		return appId;
	}

	public void setAppId(long appId) {
		this.appId = appId;
	}

	public String getObjName() {
		return objName;
	}

	public void setObjName(String objName) {
		this.objName = objName;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	private static final long serialVersionUID = 6414813261402433551L;
	@Autowired
	private IAppPerformAnsy appAns;
	
	
	public String getFiveStates() throws Exception {
		//@SuppressWarnings("unchecked")
		FiveStates echarsData =appAns.getFiveStates(objectId, timeBlock, interval);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", echarsData.getFiveRspRate()));
		return SUCCESS;
	}
	public String getAPMPerformance() throws Exception {
		AppPerformAnsBean bean=new AppPerformAnsBean();
		if(flag==null){
		 bean = appAns.getAPMPerformance(timeBlock, interval, objectId);
		}else{
			bean = appAns.getLastAPMPerformance(objectId);
		}
		Map<String, List<String>> echarts = bean.getEchartsData();
		bean.setEchartsData(null);
		setStrutsMessage(
				StrutsMessage.successMessage().addParameter("echartsData", echarts).addParameter("bean", bean));
		return SUCCESS;
	}
	public String getLastAPMPerformance() throws Exception {
		AppPerformAnsBean bean = appAns.getLastAPMPerformance(objectId);
		Map<String, List<String>> echarts = bean.getEchartsData();
		bean.setEchartsData(null);
		setStrutsMessage(
				StrutsMessage.successMessage().addParameter("echartsData", echarts).addParameter("bean", bean));
		return SUCCESS;
	}
	public String fiveMiuRspRate() throws Exception {
		FiveStates echarsData=new FiveStates();
		if(flag==null){
         echarsData =appAns.getFiveStates(objectId, timeBlock, interval);
		}
		else{
			 echarsData =appAns.getFiveStates(objectId);	
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", echarsData.getFiveRspRate()));
		return SUCCESS;
	}

	public String fiveMiuRspTime() throws Exception {
		FiveStates echarsData=new FiveStates();
		if(flag==null){
         echarsData =appAns.getFiveStates(objectId, timeBlock, interval);
		}
		else{
			 echarsData =appAns.getFiveStates(objectId);	
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData",echarsData.getFiveRspTime()));
		return SUCCESS;
	}

	
	public String fiveMiuSussRate() throws Exception {
		FiveStates echarsData=new FiveStates();
		if(flag==null){
         echarsData =appAns.getFiveStates(objectId, timeBlock, interval);
		}
		else{
			 echarsData =appAns.getFiveStates(objectId);	
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", echarsData.getFiveSussRate()));
		return SUCCESS;
	}
	@SuppressWarnings("unchecked")
	public String curTPS() throws Exception {
		
		List<Map<String,List<String>>> echartsData=new ArrayList<Map<String,List<String>>>();
		if(flag==null){
		echartsData = (List<Map<String, List<String>>>) appAns.curTimeState(timeBlock,  interval, appId,  objectId, objName);
		}
		else{
			echartsData = (List<Map<String, List<String>>>) appAns.curTimeState(appId,  objectId, objName);
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", echartsData.get(0)));
		return SUCCESS;
	}

	@SuppressWarnings("unchecked")
	public String curRspRate() throws Exception {
	
		List<Map<String,List<String>>> echartsData=new ArrayList<Map<String,List<String>>>();
		if(flag==null){
		echartsData = (List<Map<String, List<String>>>) appAns.curTimeState(timeBlock,  interval, appId,  objectId, objName);
		}
		else{
			echartsData = (List<Map<String, List<String>>>) appAns.curTimeState(appId,  objectId, objName);
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", echartsData.get(1)));
		return SUCCESS;
	}
	@SuppressWarnings("unchecked")
	public String curRspTime() throws Exception {
		List<Map<String,List<String>>> echartsData=new ArrayList<Map<String,List<String>>>();
		if(flag==null){
		echartsData = (List<Map<String, List<String>>>) appAns.curTimeState(timeBlock,  interval, appId,  objectId, objName);
		}
		else{
			echartsData = (List<Map<String, List<String>>>) appAns.curTimeState(appId,  objectId, objName);
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", echartsData.get(2)));
		return SUCCESS;
	}
	@SuppressWarnings("unchecked")
	public String curSusRate() throws Exception {
		List<Map<String,List<String>>> echartsData=new ArrayList<Map<String,List<String>>>();
		if(flag==null){
		echartsData = (List<Map<String, List<String>>>) appAns.curTimeState(timeBlock,  interval, appId,  objectId, objName);
		}
		else{
			echartsData = (List<Map<String, List<String>>>) appAns.curTimeState(appId,  objectId, objName);
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", echartsData.get(3)));
		return SUCCESS;
	}
	
	public String getAppCurPerformByAppID() throws Exception {
		List<SoftWareDeployBean> beans = appAns.getAppCurPerformByAppID(objectId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("beans", beans));
		return SUCCESS;

	}
	
	/**
	 * 5分钟错误码原因分析
	 * @return
	 * @throws Exception
	 */
	public String reasonAnsyFiveMiuErrorCode() throws Exception{
		List<AimEsbMonMsext5> result=appAns.reasonAnsy(15, appId, 1, 2, -1);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}
	
	/**
	 * 5分钟服务码原因分析
	 * @return
	 * @throws Exception
	 */
	public String reasonAnsyFiveMiuServiceCode() throws Exception{
		List<AimEsbMonMsext5> result=appAns.reasonAnsy(14, appId, 1, 2, -1);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}

}