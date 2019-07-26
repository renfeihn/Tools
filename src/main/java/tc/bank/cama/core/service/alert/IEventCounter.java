package tc.bank.cama.core.service.alert;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import tc.bank.cama.cmdb.service.CmdbConstants;
import tc.bank.cama.core.bean.AppEventPreview;
import tc.bank.cama.core.service.alert.EventConstants.EventClosed;
import tc.bank.cama.core.service.alert.EventConstants.EventDealStatus;
import tc.bank.cama.core.service.alert.EventConstants.EventType;
import tc.bank.cama.core.service.alert.EventConstants.ItilStatus;
import tc.bank.common.core.Point;

/**
 * 事件统计服务 -1表示全部
 * 
 * @author Win7-user
 * 
 */
public interface IEventCounter {

	/**
	 * 获取应用系统当日事件数
	 * 
	 * @param appId
	 *            应用系统ID
	 * @param date
	 *            日期 （默认今天）
	 * @param eventType
	 * @param closed
	 * @return
	 */
	public int appDayEvent(int appId, Date date, EventType eventType,
			EventClosed closed);

	/**
	 * 应用系统某处理状态的事件数
	 * 
	 * @param appId
	 *            应用系统ID
	 * @param dealStatus
	 *            处理状态
	 * @return
	 */
	public int appDealEvent(int appId, EventDealStatus dealStatus);

	/**
	 * 获取应用系统的事件数
	 * 
	 * @param appId
	 * @param eventType
	 * @param closed
	 * @return
	 */
	public int appEvent(int appId, EventType eventType, EventClosed closed);

	/**
	 * 获取应用系统某指标事件数
	 * 
	 * @param appId
	 *            应用系统ID
	 * @param eventType
	 *            事件类型
	 * @param closed
	 *            关闭状态
	 * @param metrics
	 *            指标名称
	 * @return
	 */
	public int appMetricEvent(int appId, EventType eventType,
			EventClosed closed, String... metrics);

	/**
	 * 应用系统事件概览
	 * 
	 * @param apppId
	 *            应用系统ID
	 * @param builder
	 * @return
	 */
	public AppEventPreview appEventPreview(EventPreviewQuery query);

	/**
	 * 应用系统某时间段的事件数统计
	 * 
	 * @param startDate
	 *            开始时间
	 * @param endDate
	 *            结束时间
	 * @param interval
	 *            间隔
	 * @param unit
	 *            单位
	 * @param eventType
	 *            事件类型
	 * @return
	 */
	public List<Point<Date, Integer>> appEventTimeline(int appId,
			Date startDate, Date endDate, long interval, TimeUnit unit,
			EventType eventType);

	/**
	 * 获取应用系统已转工单的事件数
	 * 
	 * @param appId
	 *            应用系统ID
	 * @param eventType
	 *            事件类型
	 * @return
	 */
	public int appItilEvent(int appId, EventType eventType);

	/**
	 * 获取应用系统子类对象已转工单的事件数
	 * 
	 * @param appId
	 *            应用系统ID
	 * @param eventType
	 *            事件类型
	 * @param dealStatus
	 *            处理状态
	 * @return
	 */
	public int appItilEvent(int appId, EventType eventType,
			CmdbConstants.Category category, EventDealStatus dealStatus);

	/**
	 * 获取应用系统子类对象已转工单的事件数
	 * 
	 * @param appId
	 *            应用系统ID
	 * @param eventType
	 *            事件类型
	 * @param category
	 *            对象类型
	 * @param status
	 *            事件类型
	 * @return
	 */
	public int appItilEvent(int appId, EventType eventType,
			CmdbConstants.Category category, ItilStatus status);

	/**
	 * 获取应用系统未关闭事件数(包括应用系统关联的服务器、数据库、中间件等对象的事件数)
	 * 
	 * @param appId
	 *            应用系统ID
	 * @param eventType
	 * @return
	 */
	public int appUnclosedEvent(int appId, EventType eventType);

	/**
	 * 获取应用系统子类对象未关闭事件数
	 * 
	 * @param appId
	 *            应用系统ID
	 * @param category
	 *            对象类型
	 * @param eventType
	 *            事件类型
	 * @return
	 */
	public int appUnclosedEventByCategory(int appId,
			CmdbConstants.Category category, EventType eventType);

	/**
	 * 按类别统计事件数
	 * 
	 * @param category
	 * @param eventType
	 * @return
	 */
	public int categoryEvent(CmdbConstants.Category category,
			EventType eventType);

	/**
	 * 查询指定分类下产生事件的对象数
	 * 
	 * @appId 应用系统编号
	 * @param category
	 *            对象分类
	 * @return
	 */
	public int objCountByAppAndCategory(int appId,
			CmdbConstants.Category category);

	/**
	 * 查询指定分类下产生事件的对象数
	 * 
	 * @param category
	 *            对象分类
	 * @return
	 */
	public int objCountByCategory(CmdbConstants.Category category);

	/**
	 * 获取监控对象当日事件数
	 * 
	 * @param objId
	 *            对象ID
	 * @param date
	 *            日期 （默认今天）
	 * @param eventType
	 * @param closed
	 * @return
	 */
	public int objDayEvent(int objId, Date date, EventType eventType,
			EventClosed closed);

	/**
	 * 获取对象的事件数
	 * 
	 * @param objId
	 * @param eventType
	 * @param closed
	 * @return
	 */
	public int objEvent(int objId, EventType eventType, EventClosed closed);

	/**
	 * 获取应用系统已转工单的事件数
	 * 
	 * @param objId
	 *            对象ID
	 * @param eventType
	 *            事件类型
	 * @return
	 */
	public int objItilEvent(int objId, EventType eventType);

	/**
	 * 获取应用系统子类对象已转工单的事件数
	 * 
	 * @param objId
	 *            对象ID
	 * @param eventType
	 *            事件类型
	 * @param dealStatus
	 *            处理状态
	 * @return
	 */
	public int objItilEvent(int objId, EventType eventType,
			CmdbConstants.Category category, EventDealStatus dealStatus);

	/**
	 * 获取对象已转工单的事件数
	 * 
	 * @param objId
	 *            对象ID
	 * @param eventType
	 *            事件类型
	 * @param category
	 *            对象类型
	 * @param status
	 *            事件类型
	 * @return
	 */
	public int objItilEvent(int objId, EventType eventType,
			CmdbConstants.Category category, ItilStatus status);

	/**
	 * 获取对象的事件数
	 * 
	 * @param objId
	 *            对象ID
	 * @param eventType
	 *            事件类型
	 * @return
	 */
	public int objUnclosedEvent(int objId, EventType eventType);

	/**
	 * 获取应用系统关联服务器事件数
	 * 
	 * @param appId
	 *            应用系统ID
	 * @param svrId
	 *            服务器ID
	 * @param eventType
	 *            事件类型
	 * @return
	 */
	public int serUnclosedEvent(int appId, int svrId, EventType eventType);
}
