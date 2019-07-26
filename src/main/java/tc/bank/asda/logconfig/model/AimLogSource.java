package tc.bank.asda.logconfig.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_cfg_source")
public class AimLogSource implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2281631656005605011L;

	/**
	 * 一级分类
	 */
	@Column(name = "category1")
	private String category1;

	/**
	 * 二级分类
	 */
	@Column(name = "category2")
	private String category2;

	/**
	 * 三级分类
	 */
	@Column(name = "category3")
	private String category3;

	/**
	 * 对象ID
	 */
	@Column(name = "objectid")
	private String objectId;

	/**
	 * 对象名称
	 */
	@Column(name = "objectname")
	private String objectName;

	/**
	 * 应用系统ID
	 */
	@Column(name = "applicationid")
	private String applicationId;

	/**
	 * 应用系统名称
	 */
	@Column(name = "applicationname")
	private String applicationName;

	/**
	 * 对象ID
	 */
	@Column(name = "serverip")
	private String serverIp;

	/**
	 * 日志源别名:r+序号
	 */
	@Column(name = "logid")
	private String logId;

	/**
	 * 日志源类型
	 */
	@Column(name = "logsourcetype")
	private String logSourceType;

	/**
	 * 是否从末尾开始扫描:false/true(初次使用时的扫描方式设置以及较长时间未进行文件采集时生效)
	 */
	@Column(name = "skiptoend")
	private String skipToEnd;

	/**
	 * 是否在消息头追加文件名称:false/true
	 */
	@Column(name = "fileheader")
	private String fileHeader;

	/**
	 * 是否在消息头追加当前位置:false/true
	 */
	@Column(name = "byteoffsetheader")
	private String byteOffSetHeader;

	/**
	 * 是否在消息头追加当前位置:false/true
	 */
	@Column(name = "cachepatternmatching")
	private String cachePatternMatching;

	/**
	 * 消息头中文件名变量名称
	 */
	@Column(name = "fileheaderkey")
	private String fileHeaderKey;

	/**
	 * 扫描目录缓存周期,单位:秒
	 */
	@Column(name = "cachepatterninterval")
	private String cachePatternInterval;

	/**
	 * 日志源使用通道
	 */
	@Column(name = "channels")
	private String channels;

	/**
	 * 日志源适配器名称
	 */
	@Column(name = "adapters")
	private String adapters;

	/**
	 * 日志源文件组名
	 */
	@Column(name = "filegroupsid")
	private String fileGroupsId;

	/**
	 * 日志源文件信息
	 */
	@Column(name = "filename")
	private String fileName;

	/**
	 * 日志源文件字符集
	 */
	@Column(name = "encoding")
	private String encoding;

	/**
	 * 拦截器名称
	 */
	@Column(name = "interceptorsid")
	private String interceptorsId;

	/**
	 * 拦截器类型
	 */
	@Column(name = "interceptorstype")
	private String interceptorsType;

	/**
	 * 拦截表达式
	 */
	@Column(name = "lineregex")
	private String lineRegex;

	/**
	 * 是否生成流水号:false/true
	 */
	@Column(name = "txgenerateflowno")
	private String txGenerateFlowNo;

	/**
	 * 处理开始匹配表达式
	 */
	@Column(name = "startregex")
	private String startRegex;

	/**
	 * 处理结束匹配表达式
	 */
	@Column(name = "endregex")
	private String endRegex;

	/**
	 * 采集状态:true-开启,false-关闭
	 */
	@Column(name = "status")
	private String status;

	/**
	 * 日志描述
	 */
	@Column(name = "filedesc")
	private String filedesc;

	public String getFiledesc() {
		return filedesc;
	}

	public void setFiledesc(String filedesc) {
		this.filedesc = filedesc;
	}

	public String getCategory1() {
		return category1;
	}

	public void setCategory1(String category1) {
		this.category1 = category1;
	}

	public String getCategory2() {
		return category2;
	}

	public void setCategory2(String category2) {
		this.category2 = category2;
	}

	public String getCategory3() {
		return category3;
	}

	public void setCategory3(String category3) {
		this.category3 = category3;
	}

	public String getObjectId() {
		return objectId;
	}

	public void setObjectId(String objectId) {
		this.objectId = objectId;
	}

	public String getObjectName() {
		return objectName;
	}

	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}

	public String getApplicationId() {
		return applicationId;
	}

	public void setApplicationId(String applicationId) {
		this.applicationId = applicationId;
	}

	public String getApplicationName() {
		return applicationName;
	}

	public void setApplicationName(String applicationName) {
		this.applicationName = applicationName;
	}

	public String getServerIp() {
		return serverIp;
	}

	public void setServerIp(String serverIp) {
		this.serverIp = serverIp;
	}

	public String getLogId() {
		return logId;
	}

	public void setLogId(String logId) {
		this.logId = logId;
	}

	public String getLogSourceType() {
		return logSourceType;
	}

	public void setLogSourceType(String logSourceType) {
		this.logSourceType = logSourceType;
	}

	public String getSkipToEnd() {
		return skipToEnd;
	}

	public void setSkipToEnd(String skipToEnd) {
		this.skipToEnd = skipToEnd;
	}

	public String getFileHeader() {
		return fileHeader;
	}

	public void setFileHeader(String fileHeader) {
		this.fileHeader = fileHeader;
	}

	public String getByteOffSetHeader() {
		return byteOffSetHeader;
	}

	public void setByteOffSetHeader(String byteOffSetHeader) {
		this.byteOffSetHeader = byteOffSetHeader;
	}

	public String getCachePatternMatching() {
		return cachePatternMatching;
	}

	public void setCachePatternMatching(String cachePatternMatching) {
		this.cachePatternMatching = cachePatternMatching;
	}

	public String getFileHeaderKey() {
		return fileHeaderKey;
	}

	public void setFileHeaderKey(String fileHeaderKey) {
		this.fileHeaderKey = fileHeaderKey;
	}

	public String getCachePatternInterval() {
		return cachePatternInterval;
	}

	public void setCachePatternInterval(String cachePatternInterval) {
		this.cachePatternInterval = cachePatternInterval;
	}

	public String getChannels() {
		return channels;
	}

	public void setChannels(String channels) {
		this.channels = channels;
	}

	public String getAdapters() {
		return adapters;
	}

	public void setAdapters(String adapters) {
		this.adapters = adapters;
	}

	public String getFileGroupsId() {
		return fileGroupsId;
	}

	public void setFileGroupsId(String fileGroupsId) {
		this.fileGroupsId = fileGroupsId;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getEncoding() {
		return encoding;
	}

	public void setEncoding(String encoding) {
		this.encoding = encoding;
	}

	public String getInterceptorsId() {
		return interceptorsId;
	}

	public void setInterceptorsId(String interceptorsId) {
		this.interceptorsId = interceptorsId;
	}

	public String getInterceptorsType() {
		return interceptorsType;
	}

	public void setInterceptorsType(String interceptorsType) {
		this.interceptorsType = interceptorsType;
	}

	public String getLineRegex() {
		return lineRegex;
	}

	public void setLineRegex(String lineRegex) {
		this.lineRegex = lineRegex;
	}

	public String getTxGenerateFlowNo() {
		return txGenerateFlowNo;
	}

	public void setTxGenerateFlowNo(String txGenerateFlowNo) {
		this.txGenerateFlowNo = txGenerateFlowNo;
	}

	public String getStartRegex() {
		return startRegex;
	}

	public void setStartRegex(String startRegex) {
		this.startRegex = startRegex;
	}

	public String getEndRegex() {
		return endRegex;
	}

	public void setEndRegex(String endRegex) {
		this.endRegex = endRegex;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "AimLogSource [category1=" + category1 + ", category2="
				+ category2 + ", category3=" + category3 + ", objectId="
				+ objectId + ", objectName=" + objectName + ", applicationId="
				+ applicationId + ", applicationName=" + applicationName
				+ ", serverIp=" + serverIp + ", logId=" + logId
				+ ", logSourceType=" + logSourceType + ", skipToEnd="
				+ skipToEnd + ", fileHeader=" + fileHeader
				+ ", byteOffSetHeader=" + byteOffSetHeader
				+ ", cachePatternMatching=" + cachePatternMatching
				+ ", fileHeaderKey=" + fileHeaderKey
				+ ", cachePatternInterval=" + cachePatternInterval
				+ ", channels=" + channels + ", adapters=" + adapters
				+ ", fileGroupsId=" + fileGroupsId + ", fileName=" + fileName
				+ ", encoding=" + encoding + ", interceptorsId="
				+ interceptorsId + ", interceptorsType=" + interceptorsType
				+ ", lineRegex=" + lineRegex + ", txGenerateFlowNo="
				+ txGenerateFlowNo + ", startRegex=" + startRegex
				+ ", endRegex=" + endRegex + ", status=" + status
				+ ", filedesc=" + filedesc + "]";
	}

}
