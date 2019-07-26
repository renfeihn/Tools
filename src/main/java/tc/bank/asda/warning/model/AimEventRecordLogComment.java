package tc.bank.asda.warning.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * 日志事件评论列表
 * 
 * @author parry
 * 
 */
@Table(name = "aim_event_record_log_comment")
public class AimEventRecordLogComment {
	/**
	 * 主键ID
	 */
	@Column(name = "id")
	private long id;

	/**
	 * 事件ID
	 */
	@Column(name = "event_id")
	private int eventId;

	/**
	 * 评论人
	 */
	@Column(name = "user")
	private String user;

	/**
	 * 评论内容
	 */
	@Column(name = "comment")
	private String comment;

	/**
	 * 评论时间
	 */
	@Column(name = "create_time")
	private Date createTime;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getEventId() {
		return eventId;
	}

	public void setEventId(int eventId) {
		this.eventId = eventId;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
}
