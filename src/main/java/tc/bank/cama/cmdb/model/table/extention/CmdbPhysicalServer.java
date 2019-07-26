package tc.bank.cama.cmdb.model.table.extention;


import javax.persistence.Column;
import javax.persistence.Table;

/**
 * CMDB_Physical_Server的POJO
 *
 */

@Table(name = "cmdb_physical_server")
public class CmdbPhysicalServer extends BaseAttribute {

	/** 对象ID */
	private Long objectId;
	
	/** 服务器名称 */
	private String serverName;
	
	/** 制造商 */
	private String manufacturer;

	/** 品牌 */
	private String brand;

	/** 型号 */
	private String model;

	/** 产品号 */
	private String version;

	/** 版本信息（微码版本） */
	private String tagNum;

	/** 序列号 */
	private String sn;

	/** 验收时间 */
	private Integer acceptTime;

	/** 投产时间 */
	private Integer onlineTime;

	/** 已用年限（年） */
	private Integer yearsOfUsed;

	/** 设备细类 */
	private String subClass;

	/** 管理IP（带外IP） */
	private String manageIp;

	/** CPU型号 */
	private String cpuType;

	/** CPU个数 */
	private Long cpuNum;

	/** 单个CPUCore数量 */
	private Long cpuCoreNum;

	/** 内存（GB） */
	private Float memory;

	/** 网卡个数 */
	private Long netCardNum;

	/** 总网口数量 */
	private Long netPortNum;

	/** MAC地址 */
	private String mac;

	/** 内置硬盘个数 */
	private Long diskNum;

	/** 内置硬盘规格（GB） */
	private Float diskCapacity;

	/** 阵列个数 */
	private Long diskArrayNum;

	/** 内存条数 */
	private Long memNum;

	/** 内存插槽可用数量 */
	private Long memSlotNum;

	/** 光纤卡数量 */
	private Long hbaNum;

	/** 总光纤口数量 */
	private Long hbaPortNum;

	/** wwpn */
	private String wwpn;

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
	
	@Column(name="Manufacturer")
	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}

	@Column(name="Brand")
	public void setBrand(String brand) {
		this.brand = brand;
	}

	@Column(name="Model")
	public void setModel(String model) {
		this.model = model;
	}

	@Column(name="Version")
	public void setVersion(String version) {
		this.version = version;
	}

	@Column(name="Tag_Num")
	public void setTagNum(String tagNum) {
		this.tagNum = tagNum;
	}

	@Column(name="Sn")
	public void setSn(String sn) {
		this.sn = sn;
	}

	@Column(name="Accept_Time")
	public void setAcceptTime(Integer acceptTime) {
		this.acceptTime = acceptTime;
	}

	@Column(name="Online_Time")
	public void setOnlineTime(Integer onlineTime) {
		this.onlineTime = onlineTime;
	}

	@Column(name="Years_Of_Used")
	public void setYearsOfUsed(Integer yearsOfUsed) {
		this.yearsOfUsed = yearsOfUsed;
	}

	@Column(name="Sub_Class")
	public void setSubClass(String subClass) {
		this.subClass = subClass;
	}

	@Column(name="Manage_Ip")
	public void setManageIp(String manageIp) {
		this.manageIp = manageIp;
	}

	@Column(name="Cpu_Type")
	public void setCpuType(String cpuType) {
		this.cpuType = cpuType;
	}

	@Column(name="Cpu_Num")
	public void setCpuNum(Long cpuNum) {
		this.cpuNum = cpuNum;
	}

	@Column(name="Cpu_Core_Num")
	public void setCpuCoreNum(Long cpuCoreNum) {
		this.cpuCoreNum = cpuCoreNum;
	}

	@Column(name="Memory")
	public void setMemory(Float memory) {
		this.memory = memory;
	}

	@Column(name="Net_Card_Num")
	public void setNetCardNum(Long netCardNum) {
		this.netCardNum = netCardNum;
	}

	@Column(name="Net_Port_Num")
	public void setNetPortNum(Long netPortNum) {
		this.netPortNum = netPortNum;
	}

	@Column(name="Mac_Address")
	public void setMac(String mac) {
		this.mac = mac;
	}

	@Column(name="Disk_Num")
	public void setDiskNum(Long diskNum) {
		this.diskNum = diskNum;
	}

	@Column(name="Disk_Capacity")
	public void setDiskCapacity(Float diskCapacity) {
		this.diskCapacity = diskCapacity;
	}

	@Column(name="Disk_Array_Num")
	public void setDiskArrayNum(Long diskArrayNum) {
		this.diskArrayNum = diskArrayNum;
	}

	@Column(name="Mem_Num")
	public void setMemNum(Long memNum) {
		this.memNum = memNum;
	}

	@Column(name="Mem_Slot_Num")
	public void setMemSlotNum(Long memSlotNum) {
		this.memSlotNum = memSlotNum;
	}

	@Column(name="Hba_Num")
	public void setHbaNum(Long hbaNum) {
		this.hbaNum = hbaNum;
	}

	@Column(name="Hba_Port_Num")
	public void setHbaPortNum(Long hbaPortNum) {
		this.hbaPortNum = hbaPortNum;
	}

	@Column(name="Wwpn")
	public void setWwpn(String wwpn) {
		this.wwpn = wwpn;
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
	
	@Column(name = "Manufacturer")
	public String getManufacturer() {
		return manufacturer;
	}

	@Column(name = "Brand")
	public String getBrand() {
		return brand;
	}

	@Column(name = "Model")
	public String getModel() {
		return model;
	}

	@Column(name = "Version")
	public String getVersion() {
		return version;
	}

	@Column(name = "Tag_Num")
	public String getTagNum() {
		return tagNum;
	}

	@Column(name = "Sn")
	public String getSn() {
		return sn;
	}

	@Column(name = "Accept_Time")
	public Integer getAcceptTime() {
		return acceptTime;
	}

	@Column(name = "Online_Time")
	public Integer getOnlineTime() {
		return onlineTime;
	}

	@Column(name = "Years_Of_Used")
	public Integer getYearsOfUsed() {
		return yearsOfUsed;
	}

	@Column(name = "Sub_Class")
	public String getSubClass() {
		return subClass;
	}

	@Column(name = "Manage_Ip")
	public String getManageIp() {
		return manageIp;
	}

	@Column(name = "Cpu_Type")
	public String getCpuType() {
		return cpuType;
	}

	@Column(name = "Cpu_Num")
	public Long getCpuNum() {
		return cpuNum;
	}

	@Column(name = "Cpu_Core_Num")
	public Long getCpuCoreNum() {
		return cpuCoreNum;
	}

	@Column(name = "Memory")
	public Float getMemory() {
		return memory;
	}

	@Column(name = "Net_Card_Num")
	public Long getNetCardNum() {
		return netCardNum;
	}

	@Column(name = "Net_Port_Num")
	public Long getNetPortNum() {
		return netPortNum;
	}

	@Column(name = "Mac_Address")
	public String getMac() {
		return mac;
	}

	@Column(name = "Disk_Num")
	public Long getDiskNum() {
		return diskNum;
	}

	@Column(name = "Disk_Capacity")
	public Float getDiskCapacity() {
		return diskCapacity;
	}

	@Column(name = "Disk_Array_Num")
	public Long getDiskArrayNum() {
		return diskArrayNum;
	}

	@Column(name = "Mem_Num")
	public Long getMemNum() {
		return memNum;
	}

	@Column(name = "Mem_Slot_Num")
	public Long getMemSlotNum() {
		return memSlotNum;
	}

	@Column(name = "Hba_Num")
	public Long getHbaNum() {
		return hbaNum;
	}

	@Column(name = "Hba_Port_Num")
	public Long getHbaPortNum() {
		return hbaPortNum;
	}

	@Column(name = "Wwpn")
	public String getWwpn() {
		return wwpn;
	}

	@Override
	public String toString() {
		return "CmdbPhysicalServer [recordId=" + ", objectId=" + objectId + ", manufacturer=" + manufacturer
				+ ", brand=" + brand + ", model=" + model + ", version=" + version + ", tagNum=" + tagNum + ", sn=" + sn
				+ ", acceptTime=" + acceptTime + ", onlineTime=" + onlineTime + ", yearsOfUsed=" + yearsOfUsed
				+ ", subClass=" + subClass + ", manageIp=" + manageIp + ", cpuType=" + cpuType + ", cpuNum=" + cpuNum
				+ ", cpuCoreNum=" + cpuCoreNum + ", memory=" + memory + ", netCardNum=" + netCardNum + ", netPortNum="
				+ netPortNum + ", mac=" + mac + ", diskNum=" + diskNum + ", diskCapacity=" + diskCapacity
				+ ", diskArrayNum=" + diskArrayNum + ", memNum=" + memNum + ", memSlotNum=" + memSlotNum + ", hbaNum="
				+ hbaNum + ", hbaPortNum=" + hbaPortNum + ", wwpn=" + wwpn + "]";
	}
	
}
