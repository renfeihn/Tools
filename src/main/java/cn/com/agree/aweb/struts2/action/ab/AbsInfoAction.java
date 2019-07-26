package cn.com.agree.aweb.struts2.action.ab;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.ab.model.AimAbsDynamicCur;
import tc.cama.aweb.ab.model.AimAbsStatisConfig;
import tc.cama.aweb.ab.service.IAbsInfoManager;

@Controller("AbsInfoBean")
@Scope("prototype")
public class AbsInfoAction extends StandardActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Autowired
	IAbsInfoManager absInfoManager;
	
	private int mobjId;
	
	private String instStatus;

	public String getInstStatus() {
		return instStatus;
	}

	public void setInstStatus(String instStatus) {
		this.instStatus = instStatus;
	}

	public IAbsInfoManager getAbsInfoManager() {
		return absInfoManager;
	}

	public void setAbsInfoManager(IAbsInfoManager absInfoManager) {
		this.absInfoManager = absInfoManager;
	}

	public int getMobjId() {
		return mobjId;
	}

	public void setMobjId(int mobjId) {
		this.mobjId = mobjId;
	}


	/**
	 * 2001--Jvm echarts
	 *
	 * @return
	 */
	public String getJvmEcharts() {
		Map<String, List<String>> result = absInfoManager.getJvmEcharts(mobjId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", result!=null?result:new HashMap<String, List<String>>()));
		return SUCCESS;
	}

	/**
	 * 2001--当前登录数 echarts
	 *
	 * @return
	 */
	public String getLoginCountEcharts() {
		Map<String, List<String>> result = absInfoManager.getLoginCountEcharts(mobjId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", result!=null?result:new HashMap<String, List<String>>()));
		return SUCCESS;
	}
	
	public String getJvmInfo() {
		JSONObject result = absInfoManager.getJvmPercentInfo(mobjId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}
	
	/**
	 * 单ABS静态数据查询
	 * @return
	 */
	public String getSglAbsByMobjId(){
		AimAbsStatisConfig sglAbs=absInfoManager.getSglAbsByMobjId(mobjId);
		if(sglAbs==null)
			sglAbs=new AimAbsStatisConfig();
		
		setStrutsMessage(StrutsMessage.successMessage().addParameter("sglAbs", sglAbs));
		return SUCCESS;
	}
	
	/**
	 * 全部abs列表信息查询
	 * @return
	 */
	public String getAbsList(){
		List<AimAbsStatisConfig> absList=absInfoManager.getAbsList();
		if(absList==null)
			absList=new ArrayList<AimAbsStatisConfig>();
			
		setStrutsMessage(StrutsMessage.successMessage().addParameter("absList", absList));
		return SUCCESS;
	}
	
	
	/**
	 * 在线ABS服务器数量查询
	 * @param instStatus
	 * @return
	 */
	public String getAbsCountOnline(){
		int absCountOnline=absInfoManager.getAbsCountOnline(instStatus);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("absCountOnline", absCountOnline));
		return SUCCESS;
	}
	
	/**
	 * ABS服务器数量查询
	 * @return
	 */
	public String getAbsCount(){
		int absCount=absInfoManager.getAbsCount();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("absCount", absCount));
		return SUCCESS;
	}
	
	
}
