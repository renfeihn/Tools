package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_cfg_log_source_jdbc")
public class AimlCfgLogSourceJDBC extends AimlCfgLogSourceBasic implements
		Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 日志配置ID
	 */
	@Column(name = "sourceid")
	private long sourceId;
	/**
	 * jdbc类型 Mysql Oracle SQLServer
	 */
	@Column(name = "jdbc_type")
	private String jdbcType;
	/**
	 * 主机
	 */
	@Column(name = "host")
	private String host;
	/**
	 * 用户名
	 */
	@Column(name = "user_name")
	private String userName;
	/**
	 * 密码
	 * 
	 * @return
	 */
	@Column(name = "passwd")
	private String passwd;
	/**
	 * 数据库名
	 */
	@Column(name = "db_name")
	private String dbName;
	/**
	 * 表名
	 */
	@Column(name = "table_name")
	private String tableName;
	/**
	 * 排序键名
	 * 
	 * @return
	 */
	@Column(name = "order_key")
	private String orderKey;
	/**
	 * 排序方式 desc aes
	 */
	@Column(name = "order_type")
	private String orderType;
	/**
	 * 每批读取大小
	 * 
	 * @return
	 */
	@Column(name = "batch_size")
	private String batchSize;
	/**
	 * 已读取页数
	 */
	@Column(name = "read_page")
	private int readPage;
	
	public long getSourceId() {
		return sourceId;
	}

	public void setSourceId(long sourceId) {
		this.sourceId = sourceId;
	}

	public String getJdbcType() {
		return jdbcType;
	}

	public void setJdbcType(String jdbcType) {
		this.jdbcType = jdbcType;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPasswd() {
		return passwd;
	}

	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}

	public String getDbName() {
		return dbName;
	}

	public void setDbName(String dbName) {
		this.dbName = dbName;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getOrderKey() {
		return orderKey;
	}

	public void setOrderKey(String orderKey) {
		this.orderKey = orderKey;
	}

	public String getOrderType() {
		return orderType;
	}

	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}

	public String getBatchSize() {
		return batchSize;
	}

	public void setBatchSize(String batchSize) {
		this.batchSize = batchSize;
	}

	public int getReadPage() {
		return readPage;
	}

	public void setReadPage(int readPage) {
		this.readPage = readPage;
	}
}
