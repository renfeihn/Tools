package tc.bank.asda.sqlmarket.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Table;

@Table(name = "aiml_sqlmarket_cfg")
public class AimlSqlMarketCfg implements Serializable {
	/**
	 * 日志sql市场配置表
	 */
	private static final long serialVersionUID = 7022608863594150065L;
	/**
	 * id
	 */
	@Column(name = "id")
	private long id;
	/**
	 * 分组id
	 */
	@Column(name = "group_id")
	private long groupId;
	/**
	 * sql名
	 */
	@Column(name = "sql_name")
	private String sqlName;
	/**
	 * sql内容
	 */
	@Column(name = "sql_context")
	private String sqlContext;
	/**
	 * sql描述
	 */
	@Column(name = "sql_desc")
	private String sqlDesc;

	/**
	 * 加入sql圈标志 1-是 0-否
	 */
	@Column(name = "flag")
	private String flag;
	
	/**
	 * 发布标志 1-是 0-否
	 */
	@Column(name = "publish_flag")
	private String publishFlag;
	
	/**
	 * 发布时间
	 */
	@Column(name = "publish_time")
	private String publishTime;
	/**
	 * 创建时间
	 */
	@Column(name = "create_time")
	private String createTime;
	/**
	 * 更新时间
	 */
	@Column(name = "update_time")
	private String updateTime;
	/**
	 * 创建用户
	 */
	@Column(name = "create_user")
	private long createUser;
	/**
	 * 执行次数
	 */
	@Column(name = "used_times")
	private long usedTimes;

	/**
	 * 分类id
	 */
	@Column(name = "category_id")
	private String categoryId;
	/**
	 * cmdb分类名称
	 */
	@Column(name = "category_name")
	private String categoryName;

	/**
	 * cmdb分类层级
	 */
	@Column(name = "category_level")
	private String categoryLevel;

	/**
	 * 附件路径
	 */
	@Column(name = "attachment_path")
	private String attachmentPath;

	private List<byte[]> attachment;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getGroupId() {
		return groupId;
	}

	public void setGroupId(long groupId) {
		this.groupId = groupId;
	}

	public String getSqlName() {
		return sqlName;
	}

	public void setSqlName(String sqlName) {
		this.sqlName = sqlName;
	}

	public String getSqlContext() {
		return sqlContext;
	}

	public void setSqlContext(String sqlContext) {
		this.sqlContext = sqlContext;
	}

	public String getSqlDesc() {
		return sqlDesc;
	}

	public void setSqlDesc(String sqlDesc) {
		this.sqlDesc = sqlDesc;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getPublishFlag() {
		return publishFlag;
	}

	public void setPublishFlag(String publishFlag) {
		this.publishFlag = publishFlag;
	}

	public String getPublishTime() {
		return publishTime;
	}

	public void setPublishTime(String publishTime) {
		this.publishTime = publishTime;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}

	public long getCreateUser() {
		return createUser;
	}

	public void setCreateUser(long createUser) {
		this.createUser = createUser;
	}

	public long getUsedTimes() {
		return usedTimes;
	}

	public void setUsedTimes(long usedTimes) {
		this.usedTimes = usedTimes;
	}

	public String getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getCategoryLevel() {
		return categoryLevel;
	}

	public void setCategoryLevel(String categoryLevel) {
		this.categoryLevel = categoryLevel;
	}

	public String getAttachmentPath() {
		return attachmentPath;
	}

	public void setAttachmentPath(String attachmentPath) {
		this.attachmentPath = attachmentPath;
	}

	public List<byte[]> getAttachment() {
		return attachment;
	}

	public void setAttachment(List<byte[]> attachment) {
		this.attachment = attachment;
	}

	
}
