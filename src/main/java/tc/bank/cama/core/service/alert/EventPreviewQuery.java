package tc.bank.cama.core.service.alert;

import java.io.Serializable;
import java.util.Date;

import tc.bank.cama.cmdb.service.CmdbConstants;

public class EventPreviewQuery implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6672830710498503707L;
	/**
	 * 对象分类
	 */
	private CmdbConstants.Category category;
	/**
	 * 对象ID
	 */
	private int objId;

	/**
	 * 返回事件时间线
	 */
	private boolean timeLine;

	/**
	 * 事件时间线开始时间，默认一个小时前时间
	 */
	private Date timelineStartDate;
	/**
	 * 事件时间线结束时间，默认当前时间
	 */
	private Date timelineEndDate;
	/**
	 * 事件时间线间隔时间（秒），默认 60秒
	 */
	private int timeLineSeconds;

	/**
	 * 返回工单事件统计
	 */
	private boolean itilEventCount;

	/**
	 * @return 对象分类
	 */
	public CmdbConstants.Category getCategory() {
		return category;
	}

	/**
	 * @param category
	 *            对象分类
	 */
	public void setCategory(CmdbConstants.Category category) {
		this.category = category;
	}

	/**
	 * @return 对象ID
	 */
	public int getObjId() {
		return objId;
	}

	/**
	 * @param objId
	 *            对象ID
	 */
	public void setObjId(int objId) {
		this.objId = objId;
	}

	/**
	 * @return 返回事件时间线
	 */
	public boolean isTimeLine() {
		return timeLine;
	}

	/**
	 * @param timeLine
	 *            返回事件时间线
	 */
	public void setTimeLine(boolean timeLine) {
		this.timeLine = timeLine;
	}

	/**
	 * @return 事件时间线开始时间，默认一个小时前时间
	 */
	public Date getTimelineStartDate() {
		return timelineStartDate;
	}

	/**
	 * @param timelineStartDate
	 *            事件时间线开始时间，默认一个小时前时间
	 */
	public void setTimelineStartDate(Date timelineStartDate) {
		this.timelineStartDate = timelineStartDate;
	}

	/**
	 * @return 事件时间线结束时间，默认当前时间
	 */
	public Date getTimelineEndDate() {
		return timelineEndDate;
	}

	/**
	 * @param timelineEndDate
	 *            事件时间线结束时间，默认当前时间
	 */
	public void setTimelineEndDate(Date timelineEndDate) {
		this.timelineEndDate = timelineEndDate;
	}

	/**
	 * @return 事件时间线间隔时间（秒），默认 60秒
	 */
	public int getTimeLineSeconds() {
		return timeLineSeconds;
	}

	/**
	 * @param timeLineSeconds
	 *            事件时间线间隔时间（秒），默认 60秒
	 */
	public void setTimeLineSeconds(int timeLineSeconds) {
		this.timeLineSeconds = timeLineSeconds;
	}

	/**
	 * @return 返回工单事件统计
	 */
	public boolean isItilEventCount() {
		return itilEventCount;
	}

	/**
	 * @param itilEventCount
	 *            返回工单事件统计
	 */
	public void setItilEventCount(boolean itilEventCount) {
		this.itilEventCount = itilEventCount;
	}

}
