package tc.bank.cama.cmdb.model.table.extention;


import javax.persistence.Column;
import javax.persistence.Table;

/**
 * CMDB_Logical_Server的POJO
 *
 */

@Table(name = "cmdb_logical_server")
public class CmdbLogicalServer extends BaseAttribute {

	/** 对象ID */
	private Long objectId;
	
	/** 服务器名称 */
	private String serverName;
	
	/** 型号（操作系统类型） */
	private String model;

	/** 版本信息（操作系统版本） */
	private String version;

	/** 序列号 */
	private String sn;

	/** 投产时间 */
	private Integer onlineTime;

	/** 管理IP */
	private String manageIp;

	/** 服务IP */
	private String serviceIp;

	/** 特殊IP */
	private String otherIp;

	/** CPU型号 */
	private String cpuType;

	/** CPU个数 */
	private Long cpuNum;

	/** 内存（GB） */
	private Double memory;

	/** 网卡个数 */
	private Long netCardNum;

	/** MAC地址 */
	private String macAddress;

	/** 磁盘空间总容量(GB) */
	private Float diskCapacity;

	/** 光纤口数量 */
	private Long hbaPortNum;

	/** WWPN */
	private String wwpn;

	/** JRE版本 */
	private String jreVersion;

	/*
	 * setters
	 */
	
	@Column(name="object_id")
	public void setObjectId(Long objectId) {
		this.objectId = objectId;
	}
	
	@Column(name="server_name")
	public void setServerName(String serverName) {
		this.serverName = serverName;
	}
	
	@Column(name="OS_Model")
	public void setModel(String model) {
		this.model = model;
	}

	@Column(name="OS_Version")
	public void setVersion(String version) {
		this.version = version;
	}

	@Column(name="Sn")
	public void setSn(String sn) {
		this.sn = sn;
	}

	@Column(name="Online_Time")
	public void setOnlineTime(Integer onlineTime) {
		this.onlineTime = onlineTime;
	}

	@Column(name="Manage_Ip")
	public void setManageIp(String manageIp) {
		this.manageIp = manageIp;
	}

	@Column(name="Service_Ip")
	public void setServiceIp(String serviceIp) {
		this.serviceIp = serviceIp;
	}

	@Column(name="Other_Ip")
	public void setOtherIp(String otherIp) {
		this.otherIp = otherIp;
	}

	@Column(name="Cpu_Type")
	public void setCpuType(String cpuType) {
		this.cpuType = cpuType;
	}

	@Column(name="Cpu_Num")
	public void setCpuNum(Long cpuNum) {
		this.cpuNum = cpuNum;
	}

	@Column(name="Memory")
	public void setMemory(Double memory) {
		this.memory = memory;
	}

	@Column(name="Net_Card_Num")
	public void setNetCardNum(Long netCardNum) {
		this.netCardNum = netCardNum;
	}

	@Column(name="Mac_Address")
	public void setMacAddress(String macAddress) {
		this.macAddress = macAddress;
	}

	@Column(name="Disk_Capacity")
	public void setDiskCapacity(Float diskCapacity) {
		this.diskCapacity = diskCapacity;
	}

	@Column(name="Hba_Port_Num")
	public void setHbaPortNum(Long hbaPortNum) {
		this.hbaPortNum = hbaPortNum;
	}

	@Column(name="Wwpn")
	public void setWwpn(String wwpn) {
		this.wwpn = wwpn;
	}

	@Column(name="Jre_Version")
	public void setJreVersion(String jreVersion) {
		this.jreVersion = jreVersion;
	}

	/*
	 * getters
	 */
	
	@Column(name = "Object_Id",unique=true)
	public Long getObjectId() {
		return objectId;
	}

	@Column(name="server_name")
	public String getServerName() {
		return serverName;
	}
	
	@Column(name = "OS_Model")
	public String getModel() {
		return model;
	}

	@Column(name = "OS_Version")
	public String getVersion() {
		return version;
	}

	@Column(name = "Sn")
	public String getSn() {
		return sn;
	}

	@Column(name = "Online_Time")
	public Integer getOnlineTime() {
		return onlineTime;
	}

	@Column(name = "Manage_Ip")
	public String getManageIp() {
		return manageIp;
	}

	@Column(name = "Service_Ip")
	public String getServiceIp() {
		return serviceIp;
	}

	@Column(name = "Other_Ip")
	public String getOtherIp() {
		return otherIp;
	}

	@Column(name = "Cpu_Type")
	public String getCpuType() {
		return cpuType;
	}

	@Column(name = "Cpu_Num")
	public Long getCpuNum() {
		return cpuNum;
	}

	@Column(name = "Memory")
	public Double getMemory() {
		return memory;
	}

	@Column(name = "Net_Card_Num")
	public Long getNetCardNum() {
		return netCardNum;
	}

	@Column(name = "Mac_Address")
	public String getMacAddress() {
		return macAddress;
	}

	@Column(name = "Disk_Capacity")
	public Float getDiskCapacity() {
		return diskCapacity;
	}

	@Column(name = "Hba_Port_Num")
	public Long getHbaPortNum() {
		return hbaPortNum;
	}

	@Column(name = "Wwpn")
	public String getWwpn() {
		return wwpn;
	}

	@Column(name = "Jre_Version")
	public String getJreVersion() {
		return jreVersion;
	}

	@Override
	public String toString() {
		return "CmdbLogicalServer [recordId=" + ", objectId=" + objectId + ", hostName="
				+ ", model=" + model + ", version=" + version + ", sn=" + sn + ", onlineTime=" + onlineTime
				+ ", manageIp=" + manageIp + ", serviceIp=" + serviceIp + ", otherIp=" + otherIp + ", cpuType="
				+ cpuType + ", cpuNum=" + cpuNum + ", memory=" + memory + ", netCardNum=" + netCardNum + ", macAddress="
				+ macAddress + ", diskCapacity=" + diskCapacity + ", hbaPortNum=" + hbaPortNum + ", wwpn=" + wwpn
				+ ", jreVersion=" + jreVersion + "]";
	}
	
	
}
