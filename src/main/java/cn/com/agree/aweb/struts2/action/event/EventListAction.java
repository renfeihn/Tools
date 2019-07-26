package cn.com.agree.aweb.struts2.action.event;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONArray;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.cama.cmdb.model.table.CmdbObjectCategory;
import tc.bank.cama.cmdb.service.CmdbConstants;
import tc.bank.cama.core.bean.EventBo;
import tc.bank.cama.core.service.alert.EventConstants.EventDealStatus;
import tc.bank.cama.core.service.alert.EventConstants.EventStatus;
import tc.bank.cama.core.service.alert.EventConstants.EventType;
import tc.bank.cama.core.service.alert.EventConstants.ItilStatus;
import tc.bank.common.core.Page;
import tc.cama.aweb.service.IEvent;
/***
 * 事件列表分页查询
 * @author win7user
 *
 */
@Controller("EventListActionBean")
@Scope("prototype")
public class EventListAction extends StandardActionSupport{

	private static final long serialVersionUID = 1L;
	/**当前页 **/
	private int page;
	/**每页记录数 **/
	private int pageSize;
	/**应用系统id**/
	private List<Integer> appIds;
	/**cmdb对象类型id**/
	private List<Integer> cmdbCateIds;
	/**事件类型
	 * ALARM_WARING(-1), ALARM(0), WARING(1), INFO(2);
	 * **/
	private EventType eventType;
	/**处理状态
	 * DEALT("已解除")
	   DEALING("未解除")
	   DEALING_LONGTIME("长时间未解除")
	   DEAL_LONGTIME("长时间未受理")
	 * **/
	private EventDealStatus dealStatus;
	/**排序属性**/
	private String propertys;
	private List<Integer> objIds;
	
	private String direction;
	private Integer app_id;
	
	/**
	 * 工单状态
	 */
	private ItilStatus itilStatus;
	/**
	 * 事件状态
	 */
	private EventStatus eventStatus;
	@Autowired
	private IEvent event;
	
	
	

	public Integer getApp_id() {
		return app_id;
	}
	public void setApp_id(Integer app_id) {
		this.app_id = app_id;
	}
	public ItilStatus getItilStatus() {
		return itilStatus;
	}
	public void setItilStatus(ItilStatus itilStatus) {
		this.itilStatus = itilStatus;
	}
	public EventStatus getEventStatus() {
		return eventStatus;
	}
	public void setEventStatus(EventStatus eventStatus) {
		this.eventStatus = eventStatus;
	}
	public IEvent getEvent() {
		return event;
	}
	public void setEvent(IEvent event) {
		this.event = event;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public List<Integer> getAppIds() {
		return appIds;
	}
	public void setAppIds(List<Integer> appIds) {
		this.appIds = appIds;
	}
	public List<Integer> getCmdbCateIds() {
		return cmdbCateIds;
	}
	public void setCmdbCateIds(List<Integer> cmdbCateIds) {
		this.cmdbCateIds = cmdbCateIds;
	}
	public EventType getEventType() {
		return eventType;
	}
	public void setEventType(EventType eventType) {
		this.eventType = eventType;
	}
	public EventDealStatus getDealStatus() {
		return dealStatus;
	}
	public void setDealStatus(EventDealStatus dealStatus) {
		this.dealStatus = dealStatus;
	}
	public String getPropertys() {
		return propertys;
	}
	public void setPropertys(String propertys) {
		this.propertys = propertys;
	}
	public String getDirection() {
		return direction;
	}
	public void setDirection(String direction) {
		this.direction = direction;
	}
	
	public List<Integer> getObjIds() {
		return objIds;
	}
	public void setObjIds(List<Integer> objIds) {
		this.objIds = objIds;
	}
	/**
	 * 获取发生事件的应用系统
	 * @return
	 * @throws Exception
	 */
	public String getApplications() throws Exception{
		Map<Integer, String> appMap=event.getApplications();
		List<Integer> appIds=new ArrayList<Integer>(appMap.keySet());
		List<String> appNames=new ArrayList<String>(appMap.values());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("appIds",appIds).addParameter("appNames", appNames));
		return SUCCESS;
	}
	/**
	 * 获取事件列表
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	public String getEventData() throws Exception {
		List<Integer> appids= getAppIds();
		List<Integer> objIds1= getObjIds();
		List<Integer> cmdbCateIdList=getCmdbCateIds();
		if (cmdbCateIdList != null) {
			List<Integer> tmpList = new ArrayList<Integer>();
			for (Integer cid : cmdbCateIdList) {
				int[] ids = CmdbConstants.Category.getCmdbIds(cid);
				if (ids != null && ids.length > 0) {
					for (int id : ids) {
						tmpList.add(id);
					}
				} else {
					tmpList.add(cid);
				}
			}
			cmdbCateIdList = tmpList;
		}
		List<String> propertyList=(List<String>) JSONArray.parse(propertys);
		List<String> directionList=(List<String>) JSONArray.parse(direction);
		Page<EventBo> events=
		event.getEventData(appids, cmdbCateIdList, page, pageSize, eventType, dealStatus, propertyList, directionList,itilStatus,eventStatus,objIds1);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("events", events));
		return SUCCESS;
	}
	
	/**
	 * 获取三级分类
	 * @return
	 * @throws Exception
	 */
	public String getObjectCategory() throws Exception{
		List<CmdbObjectCategory> objectCates = event.getObjectCategory();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("objectCate", objectCates));
		return SUCCESS;
	}
	
	
	/**
	 * 获取应用事件数
	 * @return
	 * @throws Exception
	 */
	public String getAppEventNum() throws Exception{
		  Map<String, String> ret = event.getAppEventNum();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("ret", ret));
		return SUCCESS;
	}
	
	/**
	 * 根据应用获取事件列表
	 * @return
	 * @throws Exception
	 */
	public String getEventListByAppId() throws Exception{
		  List<Map<String, Object>> ret = event.getEventListByAppId(app_id);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("ret", ret));
		return SUCCESS;
	}
	
}