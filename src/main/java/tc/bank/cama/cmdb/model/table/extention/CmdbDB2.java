package tc.bank.cama.cmdb.model.table.extention;



import javax.persistence.Column;
import javax.persistence.Table;

import tc.bank.cama.cmdb.model.table.ColumnLabel.Label;

/**
 * CMDB_DB2的POJO对象
 *
 */

@Table(name = "cmdb_db2")
public class CmdbDB2 extends BaseAttribute {

	@Label("对象ID")
	private Long objectId;

	@Label("数据库实例名")
	private String instanceName;
	
	@Label("数据库名")
	private String dbName;
	
	@Label("型号")
	private String model;

	@Label("版本信息")
	private String version;

	@Label("服务IP")
	private String serviceIp;

	@Label("服务端端口")
	private String serverPort;

	@Label("操作系统类型")
	private String osModel;

	@Label("操作系统版本")
	private String osVersion;

	@Label("数据库位数")
	private String bite;

	@Label("安装路径")
	private String dbHome;

	@Label("是否分区数据库")
	private Long isPartitionedDb;

	@Label("是否开归档")
	private Long isArchive;

	@Label("归档路径")
	private String archivePath;

	@Label("是否HACMP/集群")
	private Long isCluster;

	@Label("是否定时Runstats")
	private Long isRunStats;

	@Label("是否定时Reorg")
	private Long isReorg;

	@Label("是否使用联邦")
	private Long isFederated;

	@Label("联邦数据库名称")
	private String federationDbName;

	@Label("使用HADR")
	private Long isHadr;

	@Label("Purescale")
	private Long isPurescale;

	/*
	 * setters
	 */
	
	@Column(name="object_id")
	public void setObjectId(Long objectId) {
		this.objectId = objectId;
	}
	
	@Column(name="instance_name")
	public void setInstanceName(String instanceName) {
		this.instanceName = instanceName;
	}
	
	@Column(name="db_name")
	public void setDbName(String dbName) {
		this.dbName = dbName;
	}
	
	@Column(name="version")
	public void setVersion(String version) {
		this.version = version;
	}

	@Column(name="bite")
	public void setBite(String bite) {
		this.bite = bite;
	}

	@Column(name="os_model")
	public void setOsModel(String osModel) {
		this.osModel = osModel;
	}

	@Column(name="os_version")
	public void setOsVersion(String osVersion) {
		this.osVersion = osVersion;
	}

	@Column(name="db_home")
	public void setDbHome(String dbHome) {
		this.dbHome = dbHome;
	}

	@Column(name="is_partitioned_db")
	public void setIsPartitionedDb(Long isPartitionedDb) {
		this.isPartitionedDb = isPartitionedDb;
	}

	@Column(name="is_archive")
	public void setIsArchive(Long isArchive) {
		this.isArchive = isArchive;
	}

	@Column(name="archive_path")
	public void setArchivePath(String archivePath) {
		this.archivePath = archivePath;
	}

	@Column(name="is_cluster")
	public void setIsCluster(Long isCluster) {
		this.isCluster = isCluster;
	}

	@Column(name="is_run_stats")
	public void setIsRunStats(Long isRunStats) {
		this.isRunStats = isRunStats;
	}

	@Column(name="is_reorg")
	public void setIsReorg(Long isReorg) {
		this.isReorg = isReorg;
	}

	@Column(name="is_federated")
	public void setIsFederated(Long isFederated) {
		this.isFederated = isFederated;
	}

	@Column(name="federation_db_name")
	public void setFederationDbName(String federationDbName) {
		this.federationDbName = federationDbName;
	}

	@Column(name="is_hadr")
	public void setIsHadr(Long isHadr) {
		this.isHadr = isHadr;
	}

	@Column(name="is_purescale")
	public void setIsPurescale(Long isPurescale) {
		this.isPurescale = isPurescale;
	}

	@Column(name = "model")
	public void setModel(String model) {
		this.model = model;
	}

	@Column(name = "service_ip")
	public void setServiceIp(String serviceIp) {
		this.serviceIp = serviceIp;
	}

	@Column(name = "server_port")
	public void setServerPort(String serverPort) {
		this.serverPort = serverPort;
	}
	
	/*
	 * getters
	 */
	
	@Column(name = "Object_Id",unique=true)
	public Long getObjectId() {
		return objectId;
	}

	@Column(name = "instance_name")
	public String getInstanceName() {
		return instanceName;
	}
	
	@Column(name = "db_name")
	public String getDbName() {
		return dbName;
	}
	
	@Column(name = "Version")
	public String getVersion() {
		return version;
	}

	@Column(name = "Bite")
	public String getBite() {
		return bite;
	}

	@Column(name = "Os_Model")
	public String getOsModel() {
		return osModel;
	}

	@Column(name = "Os_Version")
	public String getOsVersion() {
		return osVersion;
	}

	@Column(name = "Db_Home")
	public String getDbHome() {
		return dbHome;
	}

	@Column(name = "Is_Partitioned_Db")
	public Long getIsPartitionedDb() {
		return isPartitionedDb;
	}

	@Column(name = "Is_Archive")
	public Long getIsArchive() {
		return isArchive;
	}

	@Column(name = "Archive_Path")
	public String getArchivePath() {
		return archivePath;
	}

	@Column(name = "Is_Cluster")
	public Long getIsCluster() {
		return isCluster;
	}

	@Column(name = "Is_Run_Stats")
	public Long getIsRunStats() {
		return isRunStats;
	}

	@Column(name = "Is_Reorg")
	public Long getIsReorg() {
		return isReorg;
	}

	@Column(name = "Is_Federated")
	public Long getIsFederated() {
		return isFederated;
	}

	@Column(name = "Federation_Db_Name")
	public String getFederationDbName() {
		return federationDbName;
	}

	@Column(name = "Is_Hadr")
	public Long getIsHadr() {
		return isHadr;
	}

	@Column(name = "Is_Purescale")
	public Long getIsPurescale() {
		return isPurescale;
	}

	@Column(name = "model")
	public String getModel() {
		return model;
	}

	@Column(name = "service_ip")
	public String getServiceIp() {
		return serviceIp;
	}

	@Column(name = "server_port")
	public String getServerPort() {
		return serverPort;
	}
	
}
