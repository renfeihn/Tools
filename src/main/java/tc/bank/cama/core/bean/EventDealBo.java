package tc.bank.cama.core.bean;

import java.io.Serializable;
import java.util.Date;

import com.aim.alibaba.fastjson.annotation.JSONField;

/**
 * 事件处理
 * 
 * @author Win7-user
 *
 */
public class EventDealBo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3883261196121861838L;

	/**
	 * 事件记录时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	private Date eventRecord;

	/**
	 * 事件ID
	 */
	private int eventId;

	/**
	 * 处理ID
	 */
	private int dealId;
	/**
	 * 处理开始时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	private Date dealStart;
	/**
	 * 处理结束时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	private Date dealEnd;
	/**
	 * 处理人
	 */
	private String dealUser;
	/**
	 * 处理状态
	 */
	private String dealStatus;
	/**
	 * 操作说明
	 */
	private String deal;

	public Date getEventRecord() {
		return eventRecord;
	}

	public void setEventRecord(Date eventRecord) {
		this.eventRecord = eventRecord;
	}

	public int getEventId() {
		return eventId;
	}

	public void setEventId(int eventId) {
		this.eventId = eventId;
	}

	public int getDealId() {
		return dealId;
	}

	public void setDealId(int dealId) {
		this.dealId = dealId;
	}

	public Date getDealStart() {
		return dealStart;
	}

	public void setDealStart(Date dealStart) {
		this.dealStart = dealStart;
	}

	public Date getDealEnd() {
		return dealEnd;
	}

	public void setDealEnd(Date dealEnd) {
		this.dealEnd = dealEnd;
	}

	public String getDealUser() {
		return dealUser;
	}

	public void setDealUser(String dealUser) {
		this.dealUser = dealUser;
	}

	public String getDealStatus() {
		return dealStatus;
	}

	public void setDealStatus(String dealStatus) {
		this.dealStatus = dealStatus;
	}

	public String getDeal() {
		return deal;
	}

	public void setDeal(String deal) {
		this.deal = deal;
	}

}
