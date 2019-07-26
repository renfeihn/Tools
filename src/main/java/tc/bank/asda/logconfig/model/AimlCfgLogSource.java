package tc.bank.asda.logconfig.model;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 日志源信息表
 * 
 * @author parry
 * 
 */
@Entity
@Table(name = "aiml_cfg_log_source")
public class AimlCfgLogSource implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -1136140317804650933L;
	/**
	 * 日志配置ID
	 */
	@Column(name = "sourceid")
	private long sourceId;
	/**
	 * 日志源分类
	 */
	@Column(name = "sourcetype")
	private String sourceType;
	
	/**
	 * 日志源名
	 */
	@Column(name = "sourcename")
	private String sourceName;
	
	/**
	 * 应用id
	 */
	@Column(name = "appid")
	private long appId;
	
	/**
	 * 应用名称
	 */
	@Column(name = "appname")
	private String appName;
	
	/**
	 *资产I级分类
	*/
	@Column(name = "category1")
	private String category1;

	/**
	 *资产II级分类
	*/
	@Column(name = "category2")
	private String category2;
	/**
	 *资产III级分类
	*/
	@Column(name = "category3")
	private String category3;
	
	/**
	 * 三級分類ID
	 */
	@Column(name = "cateory_id")
	private long cateoryId;

	/**
	 * 运行状态 1运行 0停止
	 */
	@Column(name = "runstatus")
	private String runStatus;
	
	/**
	 * 日志规则ID
	 */
	@Column(name = "logid")
	private long logId;
	
	/**
	 * 日志规则名称
	 */
	@Column(name = "logname")
	private String logName;
	
	/**
	 * 对象ID
	 */
	@Column(name = "object_id")
	private String objectId;
	
	/**
	 * 已采集流量
	 */
	@Column(name = "collectioncumulant")
	private long collectionCumulant;
	/**
	 * 当日已采集流量
	 */
	@Column(name = "collectioncumulantday")
	private long collectionCumulantDay;
	/**
	 * 最后采集时间
	 */
	@Column(name = "lastcollectiontime")
	private Date lastCollectionTime;
	
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
	public String getLogName() {
		return logName;
	}

	public void setLogName(String logName) {
		this.logName = logName;
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
