package tc.bank.asda.sqlmarket.model;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * 日志sql市场sql关注
 * 
 * @author lfj
 * 
 */
@Table(name = "aiml_sqlmarket_sql_interest")
public class AimlSqlMarketSqlInterest {

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
	 * 用户id
	 */
	@Column(name = "user_id")
	private long userId;
	/**
	 * 关注类型 1-别人分享  2-主动关注  3-五角评分
	 */
	@Column(name = "interest_type")
	private String interestType;
	
	/**
	 * 评分
	 */
	@Column(name = "score")
	private String score;
	
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

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}
	
	public String getInterestType() {
		return interestType;
	}

	public void setInterestType(String interestType) {
		this.interestType = interestType;
	}
	
	public String getScore() {
		return score;
	}

	public void setScore(String score) {
		this.score = score;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

}
