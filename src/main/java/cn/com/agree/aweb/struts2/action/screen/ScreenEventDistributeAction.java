package cn.com.agree.aweb.struts2.action.screen;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONArray;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.cama.core.service.alert.EventConstants.EventDealStatus;
import tc.bank.cama.core.service.alert.EventConstants.EventType;
import tc.cama.aweb.bean.PageScreenEventBean;
import tc.cama.aweb.service.IScreenEventDistribute;
/***
 * 大屏：事件分布
 * @author win7user
 *
 */
@Controller("ScreenEventDistributeActionBean")
@Scope("prototype")
public class ScreenEventDistributeAction extends StandardActionSupport{

	private static final long serialVersionUID = 1L;
	
	private String categoryNoLists;
	private EventType eventType;
	private EventDealStatus dealStatus;
	
	
	public EventDealStatus getDealStatus() {
		return dealStatus;
	}

	public void setDealStatus(EventDealStatus dealStatus) {
		this.dealStatus = dealStatus;
	}

	public EventType getEventType() {
		return eventType;
	}

	public void setEventType(EventType eventType) {
		this.eventType = eventType;
	}

	public String getCategoryNoLists() {
		return categoryNoLists;
	}

	public void setCategoryNoLists(String categoryNoLists) {
		this.categoryNoLists = categoryNoLists;
	}




	@Autowired
	private IScreenEventDistribute iScreenEventDistribute;
	
	/**
	 * 获取对象分类获取健康度
	 * @return
	 * @throws Exception 
	 */
	public String getHealthByListCategory() throws Exception {
		@SuppressWarnings("unchecked")
		List<Integer> categoryNoList=(List<Integer>) JSONArray.parse(categoryNoLists);
		List<PageScreenEventBean> categoryHealthy=iScreenEventDistribute.getHealthyByListCategory(categoryNoList);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("categoryList", categoryHealthy));
		return SUCCESS;
	}
	
	/**
	 * 按照对象类型列表获取cmdb监控资源数
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	public String getCmdbCountByListCategory() throws Exception {
		List<Integer> categoryNoList=(List<Integer>) JSONArray.parse(categoryNoLists);
		List<PageScreenEventBean> categoryCmdbCounts=iScreenEventDistribute.getCmdbCountByListCategory(categoryNoList);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("categoryList", categoryCmdbCounts));
		return SUCCESS;
	}
	
	/**
	 * 按照对象类型列表获取未解决事件数
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	public String getCategoryEventByListCategory() throws Exception {
		List<Integer> categoryNoList=(List<Integer>) JSONArray.parse(categoryNoLists);
		List<PageScreenEventBean> categoryEventCounts=iScreenEventDistribute.getCategoryEventByListCategory(categoryNoList, eventType,dealStatus);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("categoryList", categoryEventCounts));
		return SUCCESS;
	}
	
}