package tc.bank.cama.cmdb.model.table.extention;

import javax.persistence.Column;

import tc.bank.cama.cmdb.model.table.ColumnLabel.Label;

/**
 * CMDB_Software的POJO对象
 */
public class CmdbSoftware extends BaseAttribute {

	@Label("对象ID")
	private Long objectId;

	@Label("软件名称")
	private String softwareName;
	
	@Label("软件类型")
	private String model;

	@Label("软件版本")
	private String version;

	@Label("服务IP(节点IP)")
	private String serviceIp;

	@Label("节点IP端口")
	private String serverPort;

	@Label("管理IP")
	private String manageIp;

	@Label("管理IP端口")
	private String managePort;

	@Label("操作系统类型")
	private String osModel;

	@Label("操作系统版本")
	private String osVersion;

	@Label("安装路径")
	private String softwareHome;

	@Label("JVM版本")
	private String jvmVersion;

	@Label("JVM最大堆栈数(MB)")
	private Long jvmMaxStack;

	@Label("JVM最小堆栈数(MB)")
	private Long jvmMinStack;

	@Label("是否是集群")
	private Long isCluster;


	/*
	 * setters
	 */
	
	@Column(name="object_id")
	public void setObjectId(Long objectId) {
		this.objectId = objectId;
	}
	
	@Column(name="software_name")
	public void setSoftwareName(String softwareName) {
		this.softwareName = softwareName;
	}
	
	@Column(name="model")
	public void setModel(String model) {
		this.model = model;
	}
	
	@Column(name="version")
	public void setVersion(String version) {
		this.version = version;
	}
	
	@Column(name="service_ip")
	public void setServiceIp(String serviceIp) {
		this.serviceIp = serviceIp;
	}
	
	@Column(name="server_port")
	public void setServerPort(String serverPort) {
		this.serverPort = serverPort;
	}
	
	@Column(name="manage_ip")
	public void setManageIp(String manageIp) {
		this.manageIp = manageIp;
	}
	
	@Column(name="manage_port")
	public void setManagePort(String managePort) {
		this.managePort = managePort;
	}
	
	@Column(name="os_model")
	public void setOsModel(String osModel) {
		this.osModel = osModel;
	}

	@Column(name="os_version")
	public void setOsVersion(String osVersion) {
		this.osVersion = osVersion;
	}

	@Column(name="software_home")
	public void setSoftwareHome(String softwareHome) {
		this.softwareHome = softwareHome;
	}
	
	@Column(name="jvm_version")
	public void setJvmVersion(String jvmVersion) {
		this.jvmVersion = jvmVersion;
	}
	
	@Column(name="jvm_max_stack")
	public void setJvmMaxStack(Long jvmMaxStack) {
		this.jvmMaxStack = jvmMaxStack;
	}
	
	@Column(name="jvm_min_stack")
	public void setJvmMinStack(Long jvmMinStack) {
		this.jvmMinStack = jvmMinStack;
	}
	
	@Column(name="is_cluster")
	public void setIsCluster(Long isCluster) {
		this.isCluster = isCluster;
	}
	
	/*
	 * getters
	 */
	
	@Column(name = "Object_Id",unique=true)
	public Long getObjectId() {
		return objectId;
	}

	@Column(name="software_name")
	public String getSoftwareName() {
		return softwareName;
	}
	
	@Column(name = "Model")
	public String getModel() {
		return this.model;
	}

	@Column(name = "Version")
	public String getVersion() {
		return this.version;
	}

	@Column(name = "Service_Ip")
	public String getServiceIp() {
		return this.serviceIp;
	}

	@Column(name = "Server_Port")
	public String getServerPort() {
		return this.serverPort;
	}

	@Column(name = "Manage_Ip")
	public String getManageIp() {
		return this.manageIp;
	}

	@Column(name = "Manage_Port")
	public String getManagePort() {
		return this.managePort;
	}

	@Column(name = "Os_Model")
	public String getOsModel() {
		return this.osModel;
	}

	@Column(name = "Os_Version")
	public String getOsVersion() {
		return this.osVersion;
	}

	@Column(name = "Software_Home")
	public String getSoftwareHome() {
		return this.softwareHome;
	}

	@Column(name = "Jvm_Version")
	public String getJvmVersion() {
		return this.jvmVersion;
	}

	@Column(name = "Jvm_Max_Stack")
	public Long getJvmMaxStack() {
		return this.jvmMaxStack;
	}

	@Column(name = "Jvm_Min_Stack")
	public Long getJvmMinStack() {
		return this.jvmMinStack;
	}

	@Column(name = "Is_Cluster")
	public Long getIsCluster() {
		return this.isCluster;
	}

	@Override
	public String toString() {
		return "CmdbMiddleware [recordId=" + ", objectId=" + objectId + ", model=" + model + ", mwName="
				+ ", version=" + version + ", serviceIp=" + serviceIp + ", serverPort=" + serverPort
				+ ", manageIp=" + manageIp + ", managePort=" + managePort + ", osModel=" + osModel + ", osVersion="
				+ osVersion + ", softwareHome=" + softwareHome + ", jvmVersion=" + jvmVersion + ", jvmMaxStack="
				+ jvmMaxStack + ", jvmMinStack=" + jvmMinStack + ", isCluster=" + isCluster + "]";
	}

}
