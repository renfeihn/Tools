package tc.bank.asda.sqlmarket.model;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * 日志sql市场sql评论
 * 
 * @author lfj
 * 
 */
@Table(name = "aiml_sqlmarket_sql_comments")
public class AimlSqlMarketSqlComments {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7022608863594150065L;

	/**
	 * id
	 */
	@Column(name = "id")
	private long id;
	/**
	 * sql id
	 */
	@Column(name = "sql_id")
	private long sqlId;
	/**
	 * 评论人
	 */
	@Column(name = "from_user")
	private String fromUser;
	/**
	 * 回复人
	 */
	@Column(name = "to_user")
	private String toUser;
	/**
	 * 评论内容
	 */
	@Column(name = "comments")
	private long comments;
	/**
	 * 创建时间
	 */
	@Column(name = "create_time")
	private String createTime;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getSqlId() {
		return sqlId;
	}

	public void setSqlId(long sqlId) {
		this.sqlId = sqlId;
	}

	public String getFromUser() {
		return fromUser;
	}

	public void setFromUser(String fromUser) {
		this.fromUser = fromUser;
	}

	public String getToUser() {
		return toUser;
	}

	public void setToUser(String toUser) {
		this.toUser = toUser;
	}

	public long getComments() {
		return comments;
	}

	public void setComments(long comments) {
		this.comments = comments;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

}
