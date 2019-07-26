package tc.bank.asda.logconfig.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_cfg_user_search")
public class AimUserSearch implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2281631656005605011L;

	/**
	 * 用户ID
	 */
	@Column(name = "userid")
	private Integer userId;

	/**
	 * 用户搜索内容
	 */
	@Column(name = "text")
	private String text;

	/**
	 * 创建时间
	 */
	@Column(name = "createtime")
	private Date createTime;

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	@Override
	public String toString() {
		return "AimUserSearch [userId=" + userId + ", text=" + text
				+ ", createTime=" + createTime + "]";
	}

}
