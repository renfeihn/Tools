package tc.bank.asda.logconfig.bean;

import java.util.ArrayList;
import java.util.List;


public class AimLogSourceVO {

	/**
	 * 对象ID
	 */
	private String objectId;

	/**
	 * 对象名称
	 */
	private String objectName;

	/**
	 * 应用系统ID
	 */
	private String applicationId;

	/**
	 * 应用系统名称
	 */
	private String applicationName;

	/**
	 * 服务器IP
	 */
	private String serverIp;

	/**
	 * 日志源别名:r+序号
	 */
	private String logId;

	/**
	 * 日志源类型
	 */
	private String logSourceType;

	/**
	 * 是否从末尾开始扫描:false/true(初次使用时的扫描方式设置以及较长时间未进行文件采集时生效)
	 */
	private String skipToEnd;

	/**
	 * 是否在消息头追加文件名称:false/true
	 */
	private String fileHeader;

	/**
	 * 是否在消息头追加当前位置:false/true
	 */
	private String byteOffSetHeader;

	/**
	 * 是否在消息头追加当前位置:false/true
	 */
	private String cachePatternMatching;

	/**
	 * 消息头中文件名变量名称
	 */
	private String fileHeaderKey;

	/**
	 * 扫描目录缓存周期,单位:秒
	 */
	private String cachePatternInterval;

	/**
	 * 日志源使用通道
	 */
	private String channels;

	/**
	 * 日志源适配器名称
	 */
	private String adapters;

	/**
	 * 日志源文件组名
	 */
	private String fileGroupsId;

	/**
	 * 日志源文件信息
	 */
	private String fileName;

	/**
	 * 日志源文件字符集
	 */
	private String encoding;

	/**
	 * 拦截器名称
	 */
	private String interceptorsId;

	/**
	 * 拦截器类型
	 */
	private String interceptorsType;

	/**
	 * 拦截表达式
	 */
	private String lineRegex;

	/**
	 * 是否生成流水号:false/true
	 */
	private String txGenerateFlowNo;

	/**
	 * 处理开始匹配表达式
	 */
	private String startRegex;

	/**
	 * 处理结束匹配表达式
	 */
	private String endRegex;

	/**
	 * 采集状态:true-开启,false-关闭
	 */
	private String status;

	/**
	 * 日志描述
	 */
	private String filedesc;
	
	private List<String> splitNames;
	
	/**
	 * 分类数（日志源中的标签）
	 */
	private int funcCount;

	/**
	 *结构化字段（私有） 
	 */
	private int privateDict;
	
	/**
	 * 结构化字段（公有）
	 */
	private int publicDict;
	
	private String objectname;
	
	public int getFuncCount() {
		return funcCount;
	}

	public void setFuncCount(int funcCount) {
		this.funcCount = funcCount;
	}

	public int getPrivateDict() {
		return privateDict;
	}

	public void setPrivateDict(int privateDict) {
		this.privateDict = privateDict;
	}

	public int getPublicDict() {
		return publicDict;
	}

	public void setPublicDict(int publicDict) {
		this.publicDict = publicDict;
	}

	public String getLogId() {
		return logId;
	}

	public void setLogId(String logId) {
		this.logId = logId;
	}

	public String getFiledesc() {
		return filedesc;
	}

	public void setFiledesc(String filedesc) {
		this.filedesc = filedesc;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<String> getSplitNames() {
		return splitNames;
	}

	public void setSplitNames(List<String> splitNames) {
		this.splitNames = splitNames;
	}
	
	public void addSplitName(String name){
		if(splitNames==null){
			splitNames = new ArrayList<String>();
		}
		this.splitNames.add(name);
	}

	public String getObjectId() {
		return objectId;
	}

	public void setObjectId(String objectId) {
		this.objectId = objectId;
	}

	public String getObjectname() {
		return objectname;
	}

	public void setObjectname(String objectname) {
		this.objectname = objectname;
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
	
}
