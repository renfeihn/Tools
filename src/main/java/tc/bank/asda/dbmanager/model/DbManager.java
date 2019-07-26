package tc.bank.asda.dbmanager.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_db_manager")
public class DbManager {

	/**
	 * 主键ID
	 */
	@Column(name = "id")
	private long id;
	/**
	 * 项目名
	 */
	@Column(name = "project")
	private String project;
	/**
	 * 数据库名
	 */
	@Column(name = "db_name")
	private String dbName;
	/**
	 * 数据库类型
	 */
	@Column(name = "dbType")
	private String dbType;
	/**
	 * 连接URL
	 */
	@Column(name = "url")
	private String url;
	/**
	 * 用户名
	 */
	@Column(name = "user")
	private String user;
	
	/**
	 * 创建者
	 */
	@Column(name = "created_user")
	private Integer createdUser;
	
	/**
	 * 分享者
	 */
	@Column(name = "shared_users")
	private String sharedUsers;

	private String create;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}

	public String getDbName() {
		return dbName;
	}

	public void setDbName(String dbName) {
		this.dbName = dbName;
	}

	public String getDbType() {
		return dbType;
	}

	public void setDbType(String dbType) {
		this.dbType = dbType;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public Integer getCreatedUser() {
		return createdUser;
	}

	public void setCreatedUser(Integer createdUser) {
		this.createdUser = createdUser;
	}

	public String getCreate() {
		return create;
	}

	public void setCreate(String create) {
		this.create = create;
	}

	public String getSharedUsers() {
		return sharedUsers;
	}

	public void setSharedUsers(String sharedUsers) {
		this.sharedUsers = sharedUsers;
	}
}
