package tc.bank.asda.logconfig.model;

import java.io.Serializable;
import java.sql.Date;

/**
 * 日志源信息表
 * 
 * @author parry
 * 
 */
public class AimlCfgLogSourceBasic implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1136140317804650933L;
	/**
	 * 日志配置ID
	 */
	private long sourceId;

	/**
	 * 日志源分类
	 */
	private String sourceType;

	/**
	 * 日志源名
	 */
	private String sourceName;
	/**
	 * 应用id
	 */
	private long appId;
	/**
	 * 应用名称
	 */
	private String appName;

	/**
	 * 运行状态
	 */
	private String runStatus;

	/**
	 * 日志规则ID
	 */
	private long logId;
	/**
	 * 日志规则名称
	 */
	private String logName;
	/**
	 * 已采集流量
	 */
	private long collectionCumulant;
	/**
	 * 当日已采集流量
	 */
	private long collectionCumulantDay;
	/**
	 * 最后采集时间
	 */
	private Date lastCollectionTime;
	/**
	 * 日志规则分类ID
	 */
	private long logTypeId;

	/**
	 * 一级分类
	 */
	private String category1;

	/**
	 * 二级分类
	 */
	private String category2;

	/**
	 * 三级分类
	 */
	private String category3;

	/**
	 * 三級分類ID
	 */
	private long cateoryId;
	/**
	 * 对象ID
	 */
	private String objectId;
	
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

	public long getSourceId() {
		return sourceId;
	}

	public void setSourceId(long sourceId) {
		this.sourceId = sourceId;
	}

	public String getAppName() {
		return appName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	public long getLogId() {
		return logId;
	}

	public void setLogId(long logId) {
		this.logId = logId;
	}

	public String getLogName() {
		return logName;
	}

	public void setLogName(String logName) {
		this.logName = logName;
	}

	public long getCollectionCumulant() {
		return collectionCumulant;
	}

	public void setCollectionCumulant(long collectionCumulant) {
		this.collectionCumulant = collectionCumulant;
	}

	public long getCollectionCumulantDay() {
		return collectionCumulantDay;
	}

	public void setCollectionCumulantDay(long collectionCumulantDay) {
		this.collectionCumulantDay = collectionCumulantDay;
	}

	public Date getLastCollectionTime() {
		return lastCollectionTime;
	}

	public void setLastCollectionTime(Date lastCollectionTime) {
		this.lastCollectionTime = lastCollectionTime;
	}

	public String getSourceType() {
		return sourceType;
	}

	public void setSourceType(String sourceType) {
		this.sourceType = sourceType;
	}

	public String getRunStatus() {
		return runStatus;
	}

	public void setRunStatus(String runStatus) {
		this.runStatus = runStatus;
	}

	public String getSourceName() {
		return sourceName;
	}

	public void setSourceName(String sourceName) {
		this.sourceName = sourceName;
	}

	public long getLogTypeId() {
		return logTypeId;
	}

	public void setLogTypeId(long logTypeId) {
		this.logTypeId = logTypeId;
	}

	public long getAppId() {
		return appId;
	}

	public void setAppId(long appId) {
		this.appId = appId;
	}

	public long getCateoryId() {
		return cateoryId;
	}

	public void setCateoryId(long cateoryId) {
		this.cateoryId = cateoryId;
	}

	public String getObjectId() {
		return objectId;
	}

	public void setObjectId(String objectId) {
		this.objectId = objectId;
	}
}
