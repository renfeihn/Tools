package tc.bank.asda.dbmanager.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_db_book")
public class DbBook {

	/**
	 * 主键ID
	 */
	@Column(name = "id")
	private long id;
	/**
	 * 用户ID
	 */
	@Column(name = "user")
	private Integer user;

	/**
	 * dbID
	 */
	@Column(name = "db_id")
	private long dbId;
	/**
	 * 执行SQL
	 */
	@Column(name = "execute_sql")
	private String executeSql;

	/**
	 * SQL标题
	 */
	@Column(name = "title")
	private String title;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Integer getUser() {
		return user;
	}

	public void setUser(Integer user) {
		this.user = user;
	}

	public long getDbId() {
		return dbId;
	}

	public void setDbId(long dbId) {
		this.dbId = dbId;
	}

	public String getExecuteSql() {
		return executeSql;
	}

	public void setExecuteSql(String executeSql) {
		this.executeSql = executeSql;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
}
