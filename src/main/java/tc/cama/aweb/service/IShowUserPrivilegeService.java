package tc.cama.aweb.service;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import tc.bank.cama.cmdb.model.view.CmdbAppSoftware;
import tc.bank.cama.core.bean.AppEventPreview;
import tc.bank.cama.core.bean.EventBo;
import tc.bank.cama.core.service.alert.EventConstants.EventClosed;
import tc.bank.cama.core.service.alert.EventConstants.EventDealStatus;
import tc.bank.cama.core.service.alert.EventConstants.EventStatus;
import tc.bank.cama.core.service.alert.EventConstants.EventType;
import tc.bank.cama.core.service.alert.EventConstants.ItilStatus;
import tc.bank.common.core.Page;
import tc.cama.aweb.bean.AppEventView;
import tc.cama.aweb.bean.PageAppSummary;
import tc.cama.aweb.bean.PageAppView;

public interface IShowUserPrivilegeService {
	/**
	 * 根据用户名来得到用户所拥有的权限，包括（菜单权限和系统权限）
	 * @param username
	 * @return
	 */
	Map<String, Object> getUserAllPrivilegeSys(String username);
	/**
	 * 查询：
	 * 1.全部应用的数量
	 * 2.不同分组下应用的数量
	 * 3.预警、故障的数量
	 * 4.所有应用
	 * @return
	 * @throws Exception 
	 */
	PageAppView getAppsData(String username) throws Exception;
	
	/**
	 * 查询指定分组下的应用列表
	 * @param groupId 分组id
	 * @return
	 * @throws Exception 
	 */
	public List<PageAppSummary> getAppForGroup(Long groupId, String username) throws Exception;
	/**
	 * 查询：
	 * 1.应用未解除事件数
	 * 2.应用预警事件数
	 * 3.应用告警事件数
	 * 4.一段时间内的告警预警数
	 * @param objId应用总览界面系统ID
	 * @return
	 */
	public AppEventView getTotalEvent(String username, int time, int interval) throws Exception;
	/**
	 * 事件数据查询
	 * @param appId 应用id
	 * @return
	 */
	public AppEventPreview getEventData(String username, int interval, int periodTime);
	
	public Page<EventBo> getEventByUserPrivilege(String username,String platform, List<Integer> appIds,
			List<Integer> cmdbCateIds, int page, int pageSize,
			EventType eventType, EventDealStatus dealStatus,
			EventClosed closed,
			List<String> propertyList, List<String> directionList,
			ItilStatus itilStatus, EventStatus eventStatus, List<Integer> objIds,
			String keyword,Date EventStartTime,Date EventEndTime)
			throws Exception;
	public Page<EventBo> getEventByUserlikeQuery(String username, String keyword,
			List<String> propertyList, List<String> directionList)
			throws Exception;
	/**
	 *  根据用户名获取该用户下的系统的事件列表
	 * @param username
	 * @param cmdbCateIdList
	 * @param page
	 * @param pageSize
	 * @param eventType
	 * @param dealStatus
	 * @param propertyList
	 * @param directionList
	 * @param itilStatus
	 * @param eventStatus
	 * @param objIds1
	 * @return
	 */
	Page<EventBo> getEventData(String username, List<Integer> cmdbCateIdList, int page, int pageSize,
			EventType eventType, EventDealStatus dealStatus, List<String> propertyList, List<String> directionList,
			ItilStatus itilStatus, EventStatus eventStatus, List<Integer> objIds) throws Exception;
	/**
	 * 个人中心页面的事件数据查询
	 * @param username
	 * @param appIds
	 * @param cmdbCateIds
	 * @param page
	 * @param pageSize
	 * @param eventType
	 * @param dealStatus
	 * @param propertyList
	 * @param directionList
	 * @param itilStatus
	 * @param eventStatus
	 * @param objIds
	 * @return
	 * @throws Exception
	 */
	public Page<EventBo> getEventByPersonCenter(String username,int page,int pageSize)
			throws Exception;
	/**
	 *  根据系统Id获取该系统Id下的事件列表
	 * @param username
	 * @param cmdbCateIdList
	 * @param page
	 * @param pageSize
	 * @param eventType
	 * @param dealStatus
	 * @param propertyList
	 * @param directionList
	 * @param itilStatus
	 * @param eventStatus
	 * @param objIds1
	 * @return
	 */
	Page<EventBo> getEventDataByAppId(List<Integer> appId, List<Integer> cmdbCateIdList, int page, int pageSize,
			EventType eventType, EventDealStatus dealStatus, List<String> propertyList, List<String> directionList,
			ItilStatus itilStatus, EventStatus eventStatus, List<Integer> objIds) throws Exception;
	/**
	 * 得到所有的应用
	 * @return
	 */
	public Map<String,String> getAllApp(String username) throws Exception;
	/**
	 * 获取所有应用程序
	 * @return
	 * @throws Exception
	 */
	List<CmdbAppSoftware> getAllSoftwares(String username) throws Exception;
	/**
	 * 根据appId获取相应的应用程序配置信息
	 * @param appId
	 * @return
	 * @throws Exception
	 */
	List<CmdbAppSoftware> getAllFirstCategorySoftwares(String appId)
			throws Exception;
	/**
	 * 根据appId集合获取相应的应用程序配置信息
	 * @param appIdList
	 * @return
	 * @throws Exception
	 */
	public List<CmdbAppSoftware> getAllFirstCategorySoftwaresByUsername(String username)
			throws Exception;
	
	public List<Map<String,Object>>  getEventDetailById(String id) throws Exception;
	
	
	
	public List<Object[]> getEventExcelData(String username,String platform, List<Integer> appIds,
			List<Integer> cmdbCateIds, 
			EventType eventType, EventDealStatus dealStatus,
			EventClosed closed,
			List<String> propertyList, List<String> directionList,
			ItilStatus itilStatus, EventStatus eventStatus, List<Integer> objIds,
			String keyword,Date EventStartTime, Date EventEndTime) throws Exception;
	
	/**
	 * 我的当日事件统计
	 * @param username
	 * @return
	 * @throws Exception 
	 */
	public Map<String,Object>  dayEventBaseInfo(String username);
	
	/**
	 * 最新事件
	 * @param page
	 * @param size 
	 * @return
	 * @throws SQLException 
	 */
	public Map<String, Object> latestEvent(int page,int size) throws SQLException;
	
}
