package cn.com.agree.aweb.struts2.action.system;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.ExcelUtil;
import tc.bank.cama.cmdb.model.view.CmdbAppSoftware;
import tc.bank.cama.cmdb.service.CmdbConstants;
import tc.bank.cama.core.bean.AppEventPreview;
import tc.bank.cama.core.bean.EventBo;
import tc.bank.cama.core.service.alert.EventConstants.EventClosed;
import tc.bank.cama.core.service.alert.EventConstants.EventDealStatus;
import tc.bank.cama.core.service.alert.EventConstants.EventStatus;
import tc.bank.cama.core.service.alert.EventConstants.EventType;
import tc.bank.cama.core.service.alert.EventConstants.ItilStatus;
import tc.bank.common.core.Page;
import tc.bank.common.lang.StringUtils;
import tc.cama.aweb.bean.AppEventView;
import tc.cama.aweb.bean.PageAppSummary;
import tc.cama.aweb.bean.PageAppView;
import tc.cama.aweb.service.IShowUserPrivilegeService;

@Controller("ShowUserPrivilegeActionBean")
@Scope("prototype")
public class ShowUserPrivilegeAction extends StandardActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 445591967363643526L;

	@Autowired
	private IShowUserPrivilegeService showUserPrivilegeService;
    
	private String objId;
	private int interval;
	private int time;
	private int interval1;
	private int periodTime;
    private String platform;
    private String keyword;
    private String eventTime;
    private Date eventStartDate;
    private Date eventEndDate;
    private String eventId;
	public String getEventId() {
		return eventId;
	}

	public void setEventId(String eventId) {
		this.eventId = eventId;
	}

	public String getObjId() {
		return objId;
	}

	public void setObjId(String objId) {
		this.objId = objId;
	}

	public int getInterval() {
		return interval;
	}

	public void setInterval(int interval) {
		this.interval = interval;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public int getInterval1() {
		return interval1;
	}

	public void setInterval1(int interval1) {
		this.interval1 = interval1;
	}

	public int getPeriodTime() {
		return periodTime;
	}

	public void setPeriodTime(int periodTime) {
		this.periodTime = periodTime;
	}

	public String getPlatform() {
		return platform;
	}

	public void setPlatform(String platform) {
		this.platform = platform;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	
	public String getEventTime() {
		return eventTime;
	}

	public void setEventTime(String eventTime) {
		this.eventTime = eventTime;
	}

	public Date getEventStartDate() {
		return eventStartDate;
	}

	public void setEventStartDate(Date eventStartDate) {
		this.eventStartDate = eventStartDate;
	}

	public Date getEventEndDate() {
		return eventEndDate;
	}

	public void setEventEndDate(Date eventEndDate) {
		this.eventEndDate = eventEndDate;
	}

	/**
	 * 根据用户名查询该用户所拥有的权限交易系统
	 * 
	 * @return
	 */
	public String getUserAllPrivilegeSys() {
		Map<String, Object> userAllPrivilegeSys = showUserPrivilegeService.getUserAllPrivilegeSys(getUsername());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("userAllPrivilegeSys", userAllPrivilegeSys));
		return SUCCESS;
	}

	/**
	 * 查询： 1.全部应用的数量 2.不同分组下应用的数量 3.预警、故障的数量 4.所有应用
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getAppsData() throws Exception {
		PageAppView appView = showUserPrivilegeService.getAppsData(getUsername());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("appView", appView));
		return SUCCESS;
	}

	/**
	 * 查询某个分组下的应用列表
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getAppForGroup() throws Exception {
		List<PageAppSummary> appList = showUserPrivilegeService.getAppForGroup(Long.parseLong(objId), getUsername());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("appList", appList));
		return SUCCESS;
	}

	/**
	 * 获取事件汇总信息
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getTotalEvent() throws Exception {
		AppEventView appEventSummary = showUserPrivilegeService.getTotalEvent(getUsername(), time, interval);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("eventData", appEventSummary)
				.addParameter("echartsData", appEventSummary.getEchartsData()));
		return SUCCESS;
	}

	/**
	 * 事件数据查询
	 * 
	 *
	 * @return
	 */
	public String getEventData() {
		AppEventPreview eventData = showUserPrivilegeService.getEventData(getUsername(), interval1, periodTime);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("eventData", eventData).addParameter("echartsData",
				eventData.getEchartsData()));
		return SUCCESS;
	}

	/** 应用系统id **/
	private List<Integer> appIds;
	/** cmdb对象类型id **/
	private List<Integer> cmdbCateIds;
	private List<Integer> objIds;
	/** 排序属性 **/
	private String propertys;
	private String direction;
	/** 当前页 **/
	private int page = 0;
	/** 每页记录数 **/
	private int pageSize = 10;
	/**
	 * 事件类型 ALARM_WARING(-1), ALARM(0), WARING(1), INFO(2);
	 **/
	private EventType eventType;
	/**
	 * 处理状态 DEALT("已解除") DEALING("未解除") DEALING_LONGTIME("长时间未解除")
	 * DEAL_LONGTIME("长时间未受理")
	 **/
	private EventDealStatus dealStatus;
	/**
	 * 工单状态
	 */
	private ItilStatus itilStatus;
	/**
	 * 事件状态
	 */
	private EventStatus eventStatus;
	/**
	 * 事件关闭 
	 */
	private EventClosed eventClosed;

	public List<Integer> getCmdbCateIds() {
		return cmdbCateIds;
	}

	public void setCmdbCateIds(List<Integer> cmdbCateIds) {
		this.cmdbCateIds = cmdbCateIds;
	}

	public List<Integer> getObjIds() {
		return objIds;
	}

	public void setObjIds(List<Integer> objIds) {
		this.objIds = objIds;
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

	public List<Integer> getAppIds() {
		return appIds;
	}

	public void setAppIds(List<Integer> appIds) {
		this.appIds = appIds;
	}

	public EventClosed getEventClosed() {
		return eventClosed;
	}

	public void setEventClosed(EventClosed eventClosed) {
		this.eventClosed = eventClosed;
	}

	/**
	 * 获取事件列表
	 * 
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public String getEventsByUserPrivilege() throws Exception {
		List<Integer> appids = getAppIds();
		List<Integer> objIds1 = getObjIds();
		List<Integer> cmdbCateIdList = getCmdbCateIds();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date eventDate=null;
		if(eventTime!=null){
			eventDate=sdf.parse(eventTime);
		}
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
		List<String> propertyList = (List<String>) JSONArray.parse(propertys);
		List<String> directionList = (List<String>) JSONArray.parse(direction);
		Page<EventBo> events = null;
		events = showUserPrivilegeService.getEventByUserPrivilege(getUsername(),platform, appids, cmdbCateIdList, page, pageSize,
				eventType, dealStatus,eventClosed, propertyList, directionList, itilStatus, eventStatus, objIds1,keyword,eventStartDate,eventEndDate);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("events", events));
		return SUCCESS;
	}
	
	public String getEventByUserlikeQuery() throws Exception {
		List<String> propertyList = (List<String>) JSONArray.parse(propertys);
		List<String> directionList = (List<String>) JSONArray.parse(direction);
		Page<EventBo> events  = showUserPrivilegeService.getEventByUserlikeQuery(getUsername(), keyword, propertyList, directionList);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("events", events));
		return SUCCESS;
	}
	/**
	 * 根据获取事件列表
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getEventsByPersonCenter() throws Exception {
		Page<EventBo> events = showUserPrivilegeService.getEventByPersonCenter(getUsername(),page, pageSize);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("events", events));
		return SUCCESS;
	}

	/**
	 * 获取事件列表
	 * 
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public String getEventListData() throws Exception {
		List<Integer> appids = getAppIds();
		List<Integer> objIds1 = getObjIds();
		List<Integer> cmdbCateIdList = getCmdbCateIds();
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
		List<String> propertyList = (List<String>) JSONArray.parse(propertys);
		List<String> directionList = (List<String>) JSONArray.parse(direction);
		Page<EventBo> events = null;
		if (appids == null) {
			events = showUserPrivilegeService.getEventData(getUsername(), cmdbCateIdList, page, pageSize, eventType,
					dealStatus, propertyList, directionList, itilStatus, eventStatus, objIds1);
		} else {
			events = showUserPrivilegeService.getEventDataByAppId(appids, cmdbCateIdList, page, pageSize, eventType,
					dealStatus, propertyList, directionList, itilStatus, eventStatus, objIds1);
		}

		setStrutsMessage(StrutsMessage.successMessage().addParameter("events", events));
		return SUCCESS;
	}
	
	/**
	 * 获取事件时序图接口
	 * 
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public String getEventTopo() throws Exception {
		pageSize = 20;
		List<Integer> appids = getAppIds();
		List<Integer> objIds1 = getObjIds();
		List<Integer> cmdbCateIdList = getCmdbCateIds();
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
		List<String> propertyList = (List<String>) JSONArray.parse(propertys);
		List<String> directionList = (List<String>) JSONArray.parse(direction);
		Page<EventBo> events = null;
		if (appids == null) {
			events = showUserPrivilegeService.getEventData(getUsername(), cmdbCateIdList, page, pageSize, eventType,
					dealStatus, propertyList, directionList, itilStatus, eventStatus, objIds1);
		} else {
			events = showUserPrivilegeService.getEventDataByAppId(appids, cmdbCateIdList, page, pageSize, eventType,
					dealStatus, propertyList, directionList, itilStatus, eventStatus, objIds1);
		}

		JSONObject ret = new JSONObject();
		JSONArray eventList = new JSONArray();
		JSONArray appList = new JSONArray();
		JSONObject apps = new JSONObject();
		for (EventBo e : events.getContent()) {
			JSONObject tmp = new JSONObject();
			String app_id = getStr(e.getAppIds(), "|");
			String app_name = getStr(e.getAppNames(), "|");
			if (e.getAppIds() != null && e.getAppIds().size() > 0) {
				for (int t = 0; t < e.getAppIds().size(); t++) {
					apps.put("" + e.getAppIds().get(t), e.getAppNames().get(t));
				}
			}
			String description = e.getEventDesc();
			int dmDtId = e.getServerId();
			String dmDtName = e.getServerName();
			Date firstTime = e.getEventStart();
			Date recordTime = e.getEventEnd();
			String name = e.getEventTitle();
			int level = e.getEventLevel();
			Date lastTime = e.getEventEnd();
			int id = e.getEventId();
			int status = e.getEventStatus();
			int type = e.getEventType();
			int tally = e.getTally();

			tmp.put("app_id", app_id);
			tmp.put("app_name", app_name);
			tmp.put("description", description);
			tmp.put("dmDtId", dmDtId);
			tmp.put("dmDtName", dmDtName);
			tmp.put("firstTime", firstTime);
			tmp.put("recordTime", recordTime);
			tmp.put("name", name);
			tmp.put("level", level);
			tmp.put("lastTime", lastTime);
			tmp.put("id", id);
			tmp.put("status", status);
			tmp.put("type", type);
			tmp.put("tally", tally);
			eventList.add(tmp);

		}
		for(String key : apps.keySet()) {
			JSONObject p = new JSONObject();
			p.put("dm_dt_id", key);
			p.put("dm_dt_name", apps.get(key));
			appList.add(p);
		}
		ret.put("events", eventList);
		ret.put("group", appList);

		
		setStrutsMessage(StrutsMessage.successMessage().addParameter("events", ret));
		return SUCCESS;
	}

	/**
	 * 获取所有的应用id和应用名称
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getAllApp() throws Exception {
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
				showUserPrivilegeService.getAllApp(getUsername())));
		return SUCCESS;
	}

	private Long appId;

	public Long getAppId() {
		return appId;
	}

	public void setAppId(Long appId) {
		this.appId = appId;
	}

	/**
	 * 
	 * 获取所有应用程序配置
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getAllSoftware() throws Exception {

		List<CmdbAppSoftware> appList = null;
		if (appId == null) {
			appList = showUserPrivilegeService.getAllFirstCategorySoftwaresByUsername(getUsername());
		} else {
			appList = showUserPrivilegeService.getAllFirstCategorySoftwares(appId + "");
		}

		setStrutsMessage(StrutsMessage.successMessage().addParameter("appList", appList));
		return SUCCESS;
	}
	
	public String getEventDetailById() throws Exception {
		setStrutsMessage(StrutsMessage.successMessage().addParameter("results",
				showUserPrivilegeService.getEventDetailById(eventId)));
		return SUCCESS;
	}
	
	@SuppressWarnings("unchecked")
	public String  exportExcel()throws Exception{
		List<Integer> appids = getAppIds();
		List<Integer> objIds1 = getObjIds();
		List<Integer> cmdbCateIdList = getCmdbCateIds();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date eventDate=null;
		if(eventTime!=null){
			eventDate=sdf.parse(eventTime);
		}
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
		List<String> propertyList = (List<String>) JSONArray.parse(propertys);
		List<String> directionList = (List<String>) JSONArray.parse(direction);
		List<Object[]> data = showUserPrivilegeService.getEventExcelData(getUsername(),platform, appids, cmdbCateIdList, 
				eventType, dealStatus,eventClosed, propertyList, directionList, itilStatus, eventStatus, objIds1,keyword,eventStartDate,eventEndDate);
		String[] rows = new String []{"事件类型","事件来源","应用名称","对象名称","事件摘要","事件状态","工单状态","处理状态","发生次数","首次发生时间","最后发生时间"	};
		ExcelUtil util = new ExcelUtil("事件列表", rows, data);
		String file = util.export();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("file",file));
		return SUCCESS;
	}


	/**
	 * 获取当前session中用户名
	 * 
	 * @return
	 */
	private String getUsername() {
		return (String) getSession().getAttribute("username");
	}
	/*
	 * 获取事件统计信息
	 */
	public String dayEventBaseInfo() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", showUserPrivilegeService.dayEventBaseInfo(getUsername())));
		return SUCCESS;
	}
	/*
	 * 获取实时事件明细信息
	 */
	public String latestEvent() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", showUserPrivilegeService.latestEvent(page,pageSize)));
		return SUCCESS;
	}

	public static void main(String[] args) {
		List<Integer> a = new ArrayList<Integer>();
		a.add(1);
		a.add(2);
		a.add(3);
//		System.out.println(getStr(a, "|"));
	}
	
	public String getStr(List<?> list,String str) {
		if(list == null || list.size() < 1) {
			return "";
		}
		String ret  = "";
		for(Object o : list) {
			ret+=String.valueOf(o) + str;
		}
		return ret.substring(0, ret.length()-str.length());
	}
}
