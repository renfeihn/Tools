package tc.bank.cama.core.service.alert;

import java.io.Serializable;
import java.util.List;

import tc.bank.cama.core.service.alert.EventConstants.EventDealStatus;
import tc.bank.cama.core.service.alert.EventConstants.EventStatus;
import tc.bank.cama.core.service.alert.EventConstants.EventType;
import tc.bank.cama.core.service.alert.EventConstants.ItilStatus;

public class EventQuery implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8371185859823068018L;

	/**
	 * 应用系统
	 */
	private List<Integer> appIds;

	/**
	 * cmdb对象类型
	 */
	private List<Integer> cmdbCateIds;

	/**
	 * 对象ID
	 */
	private List<Integer> objIds;

	/**
	 * 事件类型
	 */
	private EventType eventType;

	/**
	 * 事件状态
	 */
	private EventStatus eventStatus;

	/**
	 * 工单状态
	 */
	private ItilStatus itilStatus;

	/**
	 * 处理状态
	 */
	private EventDealStatus dealStatus;

	public List<Integer> getAppIds() {
		return appIds;
	}

	public EventQuery setAppIds(List<Integer> appIds) {
		this.appIds = appIds;
		return this;
	}

	public List<Integer> getCmdbCateIds() {
		return cmdbCateIds;
	}

	public EventQuery setCmdbCateIds(List<Integer> cmdbCateIds) {
		this.cmdbCateIds = cmdbCateIds;
		return this;
	}

	public List<Integer> getObjIds() {
		return objIds;
	}

	public void setObjIds(List<Integer> objIds) {
		this.objIds = objIds;
	}

	public EventType getEventType() {
		return eventType;
	}

	public EventQuery setEventType(EventType eventType) {
		this.eventType = eventType;
		return this;
	}

	public EventStatus getEventStatus() {
		return eventStatus;
	}

	public void setEventStatus(EventStatus eventStatus) {
		this.eventStatus = eventStatus;
	}

	public ItilStatus getItilStatus() {
		return itilStatus;
	}

	public void setItilStatus(ItilStatus itilStatus) {
		this.itilStatus = itilStatus;
	}

	public EventDealStatus getDealStatus() {
		return dealStatus;
	}

	public EventQuery setDealStatus(EventDealStatus dealStatus) {
		this.dealStatus = dealStatus;
		return this;
	}

}
