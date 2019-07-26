package tc.bank.asda.etl.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_etl_task")
public class AimlEtlTask implements Serializable {
	private static final long serialVersionUID = -6643820254214904010L;
	/**
	 * 应用系统id
	 */
	@Column(name = "target_sourceid")
	private long target_sourceid;
	
	/**
	 * 应用系统id
	 */
	@Column(name = "id")
	private long id;
	
	/**
	 * 数据源id
	 */
	@Column(name = "datasource_id")
	private int datasourceId;
	/**
	 * 采集任务名
	 */
	@Column(name = "task_name")
	private String taskName;
	/**
	 * 数据库类型：1mysql2oracle3kafka
	 */
	@Column(name = "db_type")
	private int dbType;
	/**
	 * 库名称
	 */
	@Column(name = "db_datasource_name")
	private String dbDatasourceName;
	/**
	 * 表名称
	 */
	@Column(name = "db_table_name")
	private String dbTableName;
	/**
	 * 1运行中0停止
	 */
	@Column(name = "state")
	private int state;
	/**
	 * 创建时间
	 */
	@Column(name = "create_time")
	private Date createTime;
	/**
	 * 创建时间
	 */
	@Column(name = "update_time")
	private Date updateTime;
	
	private AimlEtlTargetDatasource targetDatasource;
	private List<AimlEtlTaskFieldMapping> fieldMapping;
	
	public long getTarget_sourceid() {
		return target_sourceid;
	}
	public void setTarget_sourceid(long target_sourceid) {
		this.target_sourceid = target_sourceid;
	}
	public AimlEtlTargetDatasource getTargetDatasource() {
		return targetDatasource;
	}
	public void setTargetDatasource(AimlEtlTargetDatasource targetDatasource) {
		this.targetDatasource = targetDatasource;
	}
	public List<AimlEtlTaskFieldMapping> getFieldMapping() {
		return fieldMapping;
	}
	public void setFieldMapping(List<AimlEtlTaskFieldMapping> fieldMapping) {
		this.fieldMapping = fieldMapping;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getDatasourceId() {
		return datasourceId;
	}
	public void setDatasourceId(int datasourceId) {
		this.datasourceId = datasourceId;
	}
	public String getDbDatasourceName() {
		return dbDatasourceName;
	}
	public void setDbDatasourceName(String dbDatasourceName) {
		this.dbDatasourceName = dbDatasourceName;
	}
	public String getDbTableName() {
		return dbTableName;
	}
	public void setDbTableName(String dbTableName) {
		this.dbTableName = dbTableName;
	}
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public int getDbType() {
		return dbType;
	}
	public void setDbType(int dbType) {
		this.dbType = dbType;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public AimlEtlTask() {
		super();
		this.createTime = new Date();
		this.updateTime = new Date();
	}
}