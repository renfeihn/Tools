package tc.bank.cama.cmdb.model.table.extention;


import javax.persistence.Column;
import javax.persistence.Table;

/**
 * CMDB_Application的POJO
 *
 */

@Table(name = "cmdb_application")
public class CmdbApplication extends BaseAttribute {

	/** 对象ID. */
	private Long objectId;

	/** 一级系统. */
	private String subClass;

	/** 系统名称 */
	private String appName;
	
	/** 英文名称. */
	private String englishName;

	/** 英文简称. */
	private String englishNameShort;

	/** 架构层级. */
	private String level;

	/** 类别. */
	private String type;

	/** 本类重要程度. */
	private String impactLevel;

	/** 验收时间. */
	private Integer acceptTime;

	/** 投产时间. */
	private Integer onlineTime;

	/** 业务主管部门. */
	private String ywMainDept;

	/** 对应的业务或产品名称. */
	private String ywName;

	/** 相关业务部门. */
	private String ywOtherDept;

	/** 信息安全保护等级. */
	private String proLevel;

	/** 备案证明编号. */
	private String registerId;

	/** 应用版本编号. */
	private String versionNumber;

	/** 变更日期. */
	private Integer lastChangeDate;

	/** 系统架构. */
	private String architect;

	/** 系统主页地址. */
	private String homepage;

	/** 监控节点名称. */
	private String monitorNodeName;

	/** 研发小组. */
	private String yfGroup;

	/** 研发联系人. */
	private String yfGroupContcator;

	/** 研发联系人电话. */
	private String yfGroupPhone;

	/** 研发公司名称. */
	private String yfCompany;

	/** 研发公司联系人. */
	private String yfCompanyContcator;

	/** 研发公司联系电话. */
	private String yfCompanyPhone;

	/** 业务管理部门名称. */
	private String ywDept;

	/** 业务管理部门联系人. */
	private String ywDeptContcator;

	/** 业务管理部门联系电话. */
	private String ywDeptPhone;

	/** 外联单位名称. */
	private String outCompany;

	/** 外联单位联系人. */
	private String outCompanyContcator;

	/** 外联单位联系电话. */
	private String outCompanyPhone;

	/*
	 * setters
	 */

	@Column(name="object_id")
	public void setObjectId(Long objectId) {
		this.objectId = objectId;
	}
	
	@Column(name="Level")
	public void setLevel(String level) {
		this.level = level;
	}

	@Column(name="Type")
	public void setType(String type) {
		this.type = type;
	}

	@Column(name="Impact_Level")
	public void setImpactLevel(String impactLevel) {
		this.impactLevel = impactLevel;
	}

	@Column(name="Pro_Level")
	public void setProLevel(String proLevel) {
		this.proLevel = proLevel;
	}

	@Column(name="Register_Id")
	public void setRegisterId(String registerId) {
		this.registerId = registerId;
	}

	@Column(name="Architect")
	public void setArchitect(String architect) {
		this.architect = architect;
	}

	@Column(name="Homepage")
	public void setHomepage(String homepage) {
		this.homepage = homepage;
	}

	@Column(name="Monitor_Node_Name")
	public void setMonitorNodeName(String monitorNodeName) {
		this.monitorNodeName = monitorNodeName;
	}

	@Column(name = "Sub_Class")
	public void setSubClass(String subClass) {
		this.subClass = subClass;
	}

	@Column(name = "app_name")
	public void setAppName(String appName) {
		this.appName = appName;
	}
	
	@Column(name = "English_Name")
	public void setEnglishName(String englishName) {
		this.englishName = englishName;
	}

	@Column(name = "English_Name_Short")
	public void setEnglishNameShort(String englishNameShort) {
		this.englishNameShort = englishNameShort;
	}

	@Column(name = "Accept_Time")
	public void setAcceptTime(Integer acceptTime) {
		this.acceptTime = acceptTime;
	}

	@Column(name = "Online_Time")
	public void setOnlineTime(Integer onlineTime) {
		this.onlineTime = onlineTime;
	}

	@Column(name = "Yw_Main_Dept")
	public void setYwMainDept(String ywMainDept) {
		this.ywMainDept = ywMainDept;
	}

	@Column(name = "Yw_Name")
	public void setYwName(String ywName) {
		this.ywName = ywName;
	}

	@Column(name = "Yw_Other_Dept")
	public void setYwOtherDept(String ywOtherDept) {
		this.ywOtherDept = ywOtherDept;
	}

	@Column(name = "Version_Number")
	public void setVersionNumber(String versionNumber) {
		this.versionNumber = versionNumber;
	}

	@Column(name = "Last_Change_Date")
	public void setLastChangeDate(Integer lastChangeDate) {
		this.lastChangeDate = lastChangeDate;
	}

	@Column(name = "Yf_Group")
	public void setYfGroup(String yfGroup) {
		this.yfGroup = yfGroup;
	}

	@Column(name = "Yf_Group_Contcator")
	public void setYfGroupContcator(String yfGroupContcator) {
		this.yfGroupContcator = yfGroupContcator;
	}

	@Column(name = "Yf_Group_Phone")
	public void setYfGroupPhone(String yfGroupPhone) {
		this.yfGroupPhone = yfGroupPhone;
	}

	@Column(name = "Yf_Company")
	public void setYfCompany(String yfCompany) {
		this.yfCompany = yfCompany;
	}

	@Column(name = "Yf_Company_Contcator")
	public void setYfCompanyContcator(String yfCompanyContcator) {
		this.yfCompanyContcator = yfCompanyContcator;
	}

	@Column(name = "Yf_Company_Phone")
	public void setYfCompanyPhone(String yfCompanyPhone) {
		this.yfCompanyPhone = yfCompanyPhone;
	}

	@Column(name = "Yw_Dept")
	public void setYwDept(String ywDept) {
		this.ywDept = ywDept;
	}

	@Column(name = "Yw_Dept_Contcator")
	public void setYwDeptContcator(String ywDeptContcator) {
		this.ywDeptContcator = ywDeptContcator;
	}

	@Column(name = "Yw_Dept_Phone")
	public void setYwDeptPhone(String ywDeptPhone) {
		this.ywDeptPhone = ywDeptPhone;
	}

	@Column(name = "Out_Company")
	public void setOutCompany(String outCompany) {
		this.outCompany = outCompany;
	}

	@Column(name = "Out_Company_Contcator")
	public void setOutCompanyContcator(String outCompanyContcator) {
		this.outCompanyContcator = outCompanyContcator;
	}

	@Column(name = "Out_Company_Phone")
	public void setOutCompanyPhone(String outCompanyPhone) {
		this.outCompanyPhone = outCompanyPhone;
	}

	/*
	 * getters
	 */
	
	@Column(name = "Object_Id",unique=true)
	public Long getObjectId() {
		return objectId;
	}

	@Column(name = "Level")
	public String getLevel() {
		return level;
	}

	@Column(name = "Type")
	public String getType() {
		return type;
	}

	@Column(name = "Impact_Level")
	public String getImpactLevel() {
		return impactLevel;
	}

	@Column(name = "Pro_Level")
	public String getProLevel() {
		return proLevel;
	}

	@Column(name = "Register_Id")
	public String getRegisterId() {
		return registerId;
	}

	@Column(name = "Architect")
	public String getArchitect() {
		return architect;
	}

	@Column(name = "Homepage")
	public String getHomepage() {
		return homepage;
	}

	@Column(name = "Monitor_Node_Name")
	public String getMonitorNodeName() {
		return monitorNodeName;
	}

	@Column(name = "Sub_Class")
	public String getSubClass() {
		return subClass;
	}

	@Column(name = "app_name")
	public String getAppName() {
		return appName;
	}
	
	@Column(name = "English_Name")
	public String getEnglishName() {
		return englishName;
	}

	@Column(name = "English_Name_Short")
	public String getEnglishNameShort() {
		return englishNameShort;
	}

	@Column(name = "Accept_Time")
	public Integer getAcceptTime() {
		return acceptTime;
	}

	@Column(name = "Online_Time")
	public Integer getOnlineTime() {
		return onlineTime;
	}

	@Column(name = "Yw_Main_Dept")
	public String getYwMainDept() {
		return ywMainDept;
	}

	@Column(name = "Yw_Name")
	public String getYwName() {
		return ywName;
	}

	@Column(name = "Yw_Other_Dept")
	public String getYwOtherDept() {
		return ywOtherDept;
	}

	@Column(name = "Version_Number")
	public String getVersionNumber() {
		return versionNumber;
	}

	@Column(name = "Last_Change_Date")
	public Integer getLastChangeDate() {
		return lastChangeDate;
	}

	@Column(name = "Yf_Group")
	public String getYfGroup() {
		return yfGroup;
	}

	@Column(name = "Yf_Group_Contcator")
	public String getYfGroupContcator() {
		return yfGroupContcator;
	}

	@Column(name = "Yf_Group_Phone")
	public String getYfGroupPhone() {
		return yfGroupPhone;
	}

	@Column(name = "Yf_Company")
	public String getYfCompany() {
		return yfCompany;
	}

	@Column(name = "Yf_Company_Contcator")
	public String getYfCompanyContcator() {
		return yfCompanyContcator;
	}

	@Column(name = "Yf_Company_Phone")
	public String getYfCompanyPhone() {
		return yfCompanyPhone;
	}

	@Column(name = "Yw_Dept")
	public String getYwDept() {
		return ywDept;
	}

	@Column(name = "Yw_Dept_Contcator")
	public String getYwDeptContcator() {
		return ywDeptContcator;
	}

	@Column(name = "Yw_Dept_Phone")
	public String getYwDeptPhone() {
		return ywDeptPhone;
	}

	@Column(name = "Out_Company")
	public String getOutCompany() {
		return outCompany;
	}

	@Column(name = "Out_Company_Contcator")
	public String getOutCompanyContcator() {
		return outCompanyContcator;
	}

	@Column(name = "Out_Company_Phone")
	public String getOutCompanyPhone() {
		return outCompanyPhone;
	}
	
}
