package cn.com.agree.aweb.struts2.action.screen;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONArray;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.bean.ScreenEsbSystem;
import tc.cama.aweb.esb.model.EsbMonMS;
import tc.cama.aweb.service.IScreenFrame;
/***
 * 大屏：ESB架构图
 * @author win7user
 *
 */
@Controller("ScreenFrameActionBean")
@Scope("prototype")
public class ScreenFrameAction extends StandardActionSupport{

	private static final long serialVersionUID = 1L;
	
	private int monType=3;
	private String monObjLists;
	private int statisticType=1;
	private int orderType=1;
	private int top;
	@Autowired
	private IScreenFrame iScreenFrame;
	public int getMonType() {
		return monType;
	}

	public void setMonType(int monType) {
		this.monType = monType;
	}
	
	
	public String getMonObjLists() {
		return monObjLists;
	}

	public void setMonObjLists(String monObjLists) {
		this.monObjLists = monObjLists;
	}

	public int getStatisticType() {
		return statisticType;
	}

	public void setStatisticType(int statisticType) {
		this.statisticType = statisticType;
	}

	public int getOrderType() {
		return orderType;
	}

	public void setOrderType(int orderType) {
		this.orderType = orderType;
	}

	public int getTop() {
		return top;
	}

	public void setTop(int top) {
		this.top = top;
	}

	/**
	 * 获取ESB应用对象信息
	 * 1.应用系统总数
	 * 2.应用系统信息(带健康度)
	 * @return
	 * @throws Exception 
	 */
	public String getEsbSysData() throws Exception {
		long sysCount=iScreenFrame.getEsbSystemCount();
		Double transCount=iScreenFrame.getEsbTransCount();
		List<ScreenEsbSystem> screenEsbSystems=iScreenFrame.getEsbSystemList();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("sysCount", sysCount).addParameter("transCount", transCount).addParameter("screenEsbSystems", screenEsbSystems));
		return SUCCESS;
	}
	/**
	 * 获取ESB健康度不为100的系统的性能数据
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public String getEsbDataByMonList() throws Exception{
		List<String> monObjList=(List<String>) JSONArray.parse(monObjLists);
		List<EsbMonMS> esbMonMs=iScreenFrame.getEsbDataByMonList(monType,monObjList,statisticType,orderType,top);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("esbMonMs", esbMonMs));
		return SUCCESS;
	}
	
}