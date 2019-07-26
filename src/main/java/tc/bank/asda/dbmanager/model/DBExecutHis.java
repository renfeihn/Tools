package tc.bank.asda.dbmanager.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_db_execute_his")
public class DBExecutHis {

	/**
	 * 主键ID
	 */
	@Column(name = "id")
	private long id;

	/**
	 * 主键ID
	 */
	@Column(name = "user")
	private String user;
	
	/**
	 * dbID
	 */
	@Column(name = "db_id")
	private long dbId;
	/**
	 * 主键ID
	 */
	@Column(name = "execute_sql")
	private String executeSql;
	/**
	 * 主键ID
	 */
	@Column(name = "times")
	private int times;
	
	/**
	 * 最后执行的时间
	 */
	@Column(name = "last_execute_time")
	private String lastExecuteTime;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getExecuteSql() {
		return executeSql;
	}

	public void setExecuteSql(String executeSql) {
		this.executeSql = executeSql;
	}

	public int getTimes() {
		return times;
	}

	public void setTimes(int times) {
		this.times = times;
	}

	public long getDbId() {
		return dbId;
	}

	public void setDbId(long dbId) {
		this.dbId = dbId;
	}

	public String getLastExecuteTime() {
		return lastExecuteTime;
	}

	public void setLastExecuteTime(String lastExecuteTime) {
		this.lastExecuteTime = lastExecuteTime;
	}
	
}
