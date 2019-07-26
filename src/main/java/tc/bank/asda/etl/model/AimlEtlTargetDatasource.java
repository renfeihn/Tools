package tc.bank.asda.etl.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_etl_target_datasource")
public class AimlEtlTargetDatasource implements Serializable {
	private static final long serialVersionUID = -6643820254214904010L;
	/**
	 * 应用系统
	 */
	@Column(name = "id")
	private long id;
	/**
	 * 连接名
	 */
	@Column(name = "db_name")
	private String dbName;
	/**
	 * 数据库类型：1mysql2orcal3kafka
	 */
	@Column(name = "db_type")
	private int dbType;
	/**
	 * 数据库连接地址
	 */
	@Column(name = "db_connect_url")
	private String dbConnectUrl;
	/**
	 * 数据库名
	 */
	@Column(name = "db_database")
	private String dbDatabase;
	/**
	 * 数据库连接账号
	 */
	@Column(name = "db_user")
	private String dbUser;
	/**
	 * 数据库连接密码
	 */
	@Column(name = "db_pswd")
	private String dbPswd;
	/**
	 * 创建时间
	 */
	@Column(name = "create_time")
	private Date createTime;
	/**
	 * 1启用0停用
	 */
	@Column(name = "state")
	private int state;
	/**
	 * 1默认0非默认
	 */
	@Column(name = "is_default")
	private int isDefault;
	public long getId() {
		return id;
	}
	public void setId(long l) {
		this.id = l;
	}
	public String getDbName() {
		return dbName;
	}
	public void setDbName(String dbName) {
		this.dbName = dbName;
	}
	public int getDbType() {
		return dbType;
	}
	public void setDbType(int dbType) {
		this.dbType = dbType;
	}
	public String getDbConnectUrl() {
		return dbConnectUrl;
	}
	public void setDbConnectUrl(String dbConnectUrl) {
		this.dbConnectUrl = dbConnectUrl;
	}
	public String getDbDatabase() {
		return dbDatabase;
	}
	public void setDbDatabase(String dbDatabase) {
		this.dbDatabase = dbDatabase;
	}
	public String getDbUser() {
		return dbUser;
	}
	public void setDbUser(String dbUser) {
		this.dbUser = dbUser;
	}
	public String getDbPswd() {
		return dbPswd;
	}
	public void setDbPswd(String dbPswd) {
		this.dbPswd = dbPswd;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public int getIsDefault() {
		return isDefault;
	}
	public void setIsDefault(int isDefault) {
		this.isDefault = isDefault;
	}
	
	
}