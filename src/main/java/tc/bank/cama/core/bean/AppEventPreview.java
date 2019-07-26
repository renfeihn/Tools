package tc.bank.cama.core.bean;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;

import tc.bank.common.core.Point;

public class AppEventPreview {
	/**
	 * 未关闭事件总数（实时表所有未关闭数）
	 */
	private int unclosedEvent;

	/**
	 * 未关闭预警数
	 */
	private int unclosedWarning;

	/**
	 * 未关闭告警数
	 */
	private int unclosedAlarm;

	/**
	 * 当日事件总数（当日 关闭+已关闭）
	 */
	private int todayEvent;

	/**
	 * 长时间未受理
	 */
	private int dealLongtime;
	/**
	 * 长时间未解决
	 */
	private int dealingLongtime;

	/**
	 * 未解除数
	 */
	private int dealing;

	/**
	 * 已解除
	 */
	private int dealt;

	/**
	 * 操作系统事件
	 */
	private int serOs;

	/**
	 * 数据库事件
	 */
	private int swDb;

	/**
	 * 应用程序事件
	 */
	private int swPg;

	/**
	 * 中间件事件
	 */
	private int swMw;

	/**
	 * 业务事件
	 */
	private int app;

	/**
	 * 其他事件
	 */
	private int oth;

	/**
	 * 时间分段事件 [ {x:日期,y:[预警数,告警数]},{x:日期,y:[预警数,告警数]},... ]
	 */
	private List<Point<Date, List<Integer>>> eventimeline = Collections
			.emptyList();

	/**
	 * 对象类型分组-工单事件统计
	 */
	private ItilEventsCount itilEvents = new ItilEventsCount();

	/**
	 * 应用系统分组-工单事件统计
	 */
	private ItilEventsCount itilEventsGroupApp = new ItilEventsCount();

	/**
	 * echarts重新组织后的数据
	 */
	private Map<String, List<?>> echartsData;

	/**
	 * @return 未关闭事件总数（实时表所有未关闭数）
	 */
	public int getUnclosedEvent() {
		return unclosedEvent;
	}

	/**
	 * @param unclosedEvent
	 *            未关闭事件总数（实时表所有未关闭数）
	 */
	public void setUnclosedEvent(int unclosedEvent) {
		this.unclosedEvent = unclosedEvent;
	}

	/**
	 * @return 未关闭预警数
	 */
	public int getUnclosedWarning() {
		return unclosedWarning;
	}

	/**
	 * @param unclosedWarning
	 *            未关闭预警数
	 */
	public void setUnclosedWarning(int unclosedWarning) {
		this.unclosedWarning = unclosedWarning;
	}

	/**
	 * @return 未关闭告警数
	 */
	public int getUnclosedAlarm() {
		return unclosedAlarm;
	}

	/**
	 * @param unclosedAlarm
	 *            未关闭告警数
	 */
	public void setUnclosedAlarm(int unclosedAlarm) {
		this.unclosedAlarm = unclosedAlarm;
	}

	/**
	 * @return 当日事件总数（当日 关闭+已关闭）
	 */
	public int getTodayEvent() {
		return todayEvent;
	}

	/**
	 * @param todayEvent
	 *            当日事件总数（当日 关闭+已关闭）
	 */
	public void setTodayEvent(int todayEvent) {
		this.todayEvent = todayEvent;
	}

	/**
	 * @return 长时间未受理
	 */
	public int getDealLongtime() {
		return dealLongtime;
	}

	/**
	 * @param dealLongtime
	 *            长时间未受理
	 */
	public void setDealLongtime(int dealLongtime) {
		this.dealLongtime = dealLongtime;
	}

	/**
	 * @return 长时间未解决
	 */
	public int getDealingLongtime() {
		return dealingLongtime;
	}

	/**
	 * @param dealingLongtime
	 *            长时间未解决
	 */
	public void setDealingLongtime(int dealingLongtime) {
		this.dealingLongtime = dealingLongtime;
	}

	/**
	 * @return 未解除数
	 */
	public int getDealing() {
		return dealing;
	}

	/**
	 * @param dealing
	 *            未解除数
	 */
	public void setDealing(int dealing) {
		this.dealing = dealing;
	}

	/**
	 * @return 已解除
	 */
	public int getDealt() {
		return dealt;
	}

	/**
	 * @param dealt
	 *            已解除
	 */
	public void setDealt(int dealt) {
		this.dealt = dealt;
	}

	/**
	 * @return 操作系统事件
	 */
	public int getSerOs() {
		return serOs;
	}

	/**
	 * @param serOs
	 *            操作系统事件
	 */
	public void setSerOs(int serOs) {
		this.serOs = serOs;
	}

	/**
	 * @return 数据库事件
	 */
	public int getSwDb() {
		return swDb;
	}

	/**
	 * @param swDb
	 *            数据库事件
	 */
	public void setSwDb(int swDb) {
		this.swDb = swDb;
	}

	/**
	 * @return 应用程序事件
	 */
	public int getSwPg() {
		return swPg;
	}

	/**
	 * @param swPg
	 *            应用程序事件
	 */
	public void setSwPg(int swPg) {
		this.swPg = swPg;
	}

	/**
	 * @return 中间件事件
	 */
	public int getSwMw() {
		return swMw;
	}

	/**
	 * @param swMw
	 *            中间件事件
	 */
	public void setSwMw(int swMw) {
		this.swMw = swMw;
	}

	/**
	 * @return 业务事件
	 */
	public int getApp() {
		return app;
	}

	/**
	 * @param app
	 *            业务事件
	 */
	public void setApp(int app) {
		this.app = app;
	}

	/**
	 * @return 其他事件
	 */
	public int getOth() {
		return oth;
	}

	/**
	 * @param oth
	 *            其他事件
	 */
	public void setOth(int oth) {
		this.oth = oth;
	}

	/**
	 * @return 时间分段事件 [ {x:日期,y:[预警数,告警数]},{x:日期,y:[预警数,告警数]},... ]
	 */
	public List<Point<Date, List<Integer>>> getEventimeline() {
		return eventimeline;
	}

	/**
	 * @param eventimeline
	 *            时间分段事件 [ {x:日期,y:[预警数,告警数]},{x:日期,y:[预警数,告警数]},... ]
	 */
	public void setEventimeline(List<Point<Date, List<Integer>>> eventimeline) {
		this.eventimeline = eventimeline;
	}

	/**
	 * @return 对象类型分组-工单事件统计
	 */
	public ItilEventsCount getItilEvents() {
		return itilEvents;
	}

	/**
	 * @param itilEvents
	 *            对象类型分组-工单事件统计
	 */
	public void setItilEvents(ItilEventsCount itilEvents) {
		this.itilEvents = itilEvents;
	}

	/**
	 * @return 应用系统分组-工单事件统计
	 */
	public ItilEventsCount getItilEventsGroupApp() {
		return itilEventsGroupApp;
	}

	/**
	 * @param itilEventsGroupApp
	 *            应用系统分组-工单事件统计
	 */
	public void setItilEventsGroupApp(ItilEventsCount itilEventsGroupApp) {
		this.itilEventsGroupApp = itilEventsGroupApp;
	}

	public Map<String, List<?>> getEchartsData() {
		return echartsData;
	}

	public void setEchartsData(Map<String, List<?>> echartsData) {
		this.echartsData = echartsData;
	}

}
