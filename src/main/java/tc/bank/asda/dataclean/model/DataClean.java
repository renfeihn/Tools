package tc.bank.asda.dataclean.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_data_clean")
public class DataClean implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 4335991929173482404L;
	/**
	 * 主键ID
	 */
	@Column(name = "id")
	private long id;
	/**
	 * 清理对象 1 已采集数据 2 源文件
	 */
	@Column(name = "data_type")
	private int dataType;
	/**
	 * 清理方法名称
	 */
	@Column(name = "clean_name")
	private String cleanName;
	/**
	 * 打包方式 0 tar 1 tar.gz 2 zip 
	 */
	@Column(name = "pack_type")
	private int packType;
	/**
	 * 备份方式 1 本地文件 2 远程服务器
	 */
	@Column(name = "bak_type")
	private int bakType;

	/**
	 * 传输方式 1:ftp 2:sftp 3:scp
	 */
	@Column(name = "trans_type")
	private int transType;
	/**
	 * 备份主机
	 */
	@Column(name = "address")
	private String address;
	/**
	 * 备份主机用户
	 */
	@Column(name = "user_name")
	private String userName;
	/**
	 * 备份主机-用户密码
	 */
	@Column(name = "passwd")
	private String passwd;
	/**
	 * 备份地址
	 */
	@Column(name = "bak_dir")
	private String bakDir;
	
	/**
	 * 创建时间
	 */
	@Column(name = "create_time")
	private Date createTime;
	
	/**
	 * 引用次数
	 */
	@Column(name = "reference_times")
	private int referenceTimes;
	
	/**
	 * 是否启用
	 */
	@Column(name="is_enable")
	private int isEnable;
	
	/**
	 * 执行时间
	 */
	@Column(name="exec_time")
	private String execTime;
	
	/**
	 * 日志源路径
	 */
	@Column(name="log_source_path")
	private String logSourcePath;
	
	/**
	 * 日志后缀
	 */
	@Column(name="log_file_suffix")
	private String logFileSuffix;

	/**
	 * 归档周期
	 */
	@Column(name="achive_day_num")
	private int achiveDayNum;
	
	/**
	 * 是否清理
	 */
	@Column(name="is_clear")
	private int isClear;
	
	/**
	 * 递归深度
	 */
	@Column(name="recursive_deep")
	private int recursiveDeep;
	
	
	@Column(name="achive_file_prefix")
	private String achiveFilePrefix;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getDataType() {
		return dataType;
	}

	public void setDataType(int dataType) {
		this.dataType = dataType;
	}

	public int getBakType() {
		return bakType;
	}

	public void setBakType(int bakType) {
		this.bakType = bakType;
	}

	public int getTransType() {
		return transType;
	}


	public void setTransType(int transType) {
		this.transType = transType;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getBakDir() {
		return bakDir;
	}

	public void setBakDir(String bakDir) {
		this.bakDir = bakDir;
	}

	public int getPackType() {
		return packType;
	}

	public void setPackType(int packType) {
		this.packType = packType;
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

	public String getCleanName() {
		return cleanName;
	}

	public void setCleanName(String cleanName) {
		this.cleanName = cleanName;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public int getReferenceTimes() {
		return referenceTimes;
	}

	public void setReferenceTimes(int referenceTimes) {
		this.referenceTimes = referenceTimes;
	}

	public int getIsEnable() {
		return isEnable;
	}

	public void setIsEnable(int isEnable) {
		this.isEnable = isEnable;
	}

	public String getExecTime() {
		return execTime;
	}

	public void setExecTime(String execTime) {
		this.execTime = execTime;
	}

	public String getLogSourcePath() {
		return logSourcePath;
	}

	public void setLogSourcePath(String logSourcePath) {
		this.logSourcePath = logSourcePath;
	}

	public String getLogFileSuffix() {
		return logFileSuffix;
	}

	public void setLogFileSuffix(String logFileSuffix) {
		this.logFileSuffix = logFileSuffix;
	}

	public int getAchiveDayNum() {
		return achiveDayNum;
	}

	public void setAchiveDayNum(int achiveDayNum) {
		this.achiveDayNum = achiveDayNum;
	}

	public int getIsClear() {
		return isClear;
	}

	public void setIsClear(int isClear) {
		this.isClear = isClear;
	}

	public int getRecursiveDeep() {
		return recursiveDeep;
	}

	public void setRecursiveDeep(int recursiveDeep) {
		this.recursiveDeep = recursiveDeep;
	}

	public String getAchiveFilePrefix() {
		return achiveFilePrefix;
	}

	public void setAchiveFilePrefix(String achiveFilePrefix) {
		this.achiveFilePrefix = achiveFilePrefix;
	}

	
	
}
