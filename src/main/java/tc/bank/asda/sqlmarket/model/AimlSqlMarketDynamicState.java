package tc.bank.asda.sqlmarket.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Table;

@Table(name = "aiml_sqlmarket_dynamic_state")
public class AimlSqlMarketDynamicState implements Serializable {
	private static final long serialVersionUID = 7022608863334153333L;
	@Column(name = "id")
	private long id;
	@Column(name = "user_id")
	private int userId;
	@Column(name = "sql_id")
	private int sqlId;
	@Column(name = "type")
	private int type;
	@Column(name = "context")
	private String context;
	@Column(name = "title")
	private String title;
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public int getSqlId() {
		return sqlId;
	}
	public void setSqlId(int sqlId) {
		this.sqlId = sqlId;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public String getContext() {
		return context;
	}
	public void setContext(String context) {
		this.context = context;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
}
