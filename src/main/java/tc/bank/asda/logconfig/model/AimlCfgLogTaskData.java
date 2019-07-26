package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Table;

@Table(name = "aiml_cfg_log_task_data")
public class AimlCfgLogTaskData implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 任务编号
	 */
	@Column(name = "task_id")
	private long taskId;
	/**
	 * 数据资源ID
	 */
	@Column(name = "source_id")
	private long sourceId;
	/**
	 * 数据源名称
	 */
	@Column(name = "source_name")
	private String sourceName;
	/**
	 * 应用系统ID
	 */
	@Column(name = "app_id")
	private long appId;
	/**
	 * 应用系统名称
	 */
	@Column(name = "app_name")
	private String appName;
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
	 * 规则ID
	 */
	@Column(name = "log_id")
	private String logId;
	/**
	 * 规则名称
	 */
	@Column(name = "log_name")
	private String logName;
	/**
	 * 数据大小
	 */
	@Column(name = "data_size")
	private Integer dataSize;
	/**
	 * 已处理数据大小
	 */
	@Column(name = "deal_data_size")
	private Integer dealDataSize;

	/**
	 * @return 任务编号
	 */
	public long getTaskId() {
		return this.taskId;
	}

	/**
	 * @param taskId
	 *            任务编号
	 */
	public void setTaskId(long taskId) {
		this.taskId = taskId;
	}

	/**
	 * @return 数据资源ID
	 */
	public long getSourceId() {
		return this.sourceId;
	}

	/**
	 * @param sourceId
	 *            数据资源ID
	 */
	public void setSourceId(long sourceId) {
		this.sourceId = sourceId;
	}

	/**
	 * @return 数据源名称
	 */
	public String getSourceName() {
		return this.sourceName;
	}

	/**
	 * @param sourceName
	 *            数据源名称
	 */
	public void setSourceName(String sourceName) {
		this.sourceName = sourceName;
	}

	/**
	 * @return 应用系统ID
	 */
	public long getAppId() {
		return this.appId;
	}

	/**
	 * @param appId
	 *            应用系统ID
	 */
	public void setAppId(long appId) {
		this.appId = appId;
	}

	/**
	 * @return 应用系统名称
	 */
	public String getAppName() {
		return this.appName;
	}

	/**
	 * @param appName
	 *            应用系统名称
	 */
	public void setAppName(String appName) {
		this.appName = appName;
	}

	/**
	 * @return 一级分类
	 */
	public String getCategory1() {
		return this.category1;
	}

	/**
	 * @param category1
	 *            一级分类
	 */
	public void setCategory1(String category1) {
		this.category1 = category1;
	}

	/**
	 * @return 二级分类
	 */
	public String getCategory2() {
		return this.category2;
	}

	/**
	 * @param category2
	 *            二级分类
	 */
	public void setCategory2(String category2) {
		this.category2 = category2;
	}

	/**
	 * @return 三级分类
	 */
	public String getCategory3() {
		return this.category3;
	}

	/**
	 * @param category3
	 *            三级分类
	 */
	public void setCategory3(String category3) {
		this.category3 = category3;
	}

	public String getLogId() {
		return logId;
	}

	public void setLogId(String logId) {
		this.logId = logId;
	}

	public String getLogName() {
		return logName;
	}

	public void setLogName(String logName) {
		this.logName = logName;
	}

	/**
	 * @return 数据大小
	 */
	public Integer getDataSize() {
		return this.dataSize;
	}

	/**
	 * @param dataSize
	 *            数据大小
	 */
	public void setDataSize(Integer dataSize) {
		this.dataSize = dataSize;
	}

	/**
	 * @return 已处理数据大小
	 */
	public Integer getDealDataSize() {
		return this.dealDataSize;
	}

	/**
	 * @param dealDataSize
	 *            已处理数据大小
	 */
	public void setDealDataSize(Integer dealDataSize) {
		this.dealDataSize = dealDataSize;
	}

}
