package tc.bank.cama.core.module;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;

@Entity
@Table(name = "aim_config_metric_cate_mapping")
public class AimConfigMetricCateMapping implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -8899082684099753802L;
	/**
	 * ID
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "GLOBAL")
	@Column(name = "id")
	private Integer id;
	/**
	 * 指标分类名称
	 */
	@Column(name = "cate_name")
	private String cateName;
	/**
	 * cmdb对象分类ID
	 */
	@Column(name = "cmdb_cate_id")
	private int cmdbCateId;
	/**
	 * 创建时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "created")
	private Date created;
	/**
	 * 更新时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "modified")
	private Date modified;

	/**
	 * @return ID
	 */
	public Integer getId() {
		return this.id;
	}

	/**
	 * @param id
	 *            ID
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * @return 指标分类名称
	 */
	public String getCateName() {
		return this.cateName;
	}

	/**
	 * @param cateName
	 *            指标分类名称
	 */
	public void setCateName(String cateName) {
		this.cateName = cateName;
	}

	/**
	 * @return cmdb对象分类ID
	 */
	public int getCmdbCateId() {
		return this.cmdbCateId;
	}

	/**
	 * @param cmdbCateId
	 *            cmdb对象分类ID
	 */
	public void setCmdbCateId(int cmdbCateId) {
		this.cmdbCateId = cmdbCateId;
	}

	/**
	 * @return 创建时间
	 */
	public Date getCreated() {
		return this.created;
	}

	/**
	 * @param created
	 *            创建时间
	 */
	public void setCreated(Date created) {
		this.created = created;
	}

	/**
	 * @return 更新时间
	 */
	public Date getModified() {
		return this.modified;
	}

	/**
	 * @param modified
	 *            更新时间
	 */
	public void setModified(Date modified) {
		this.modified = modified;
	}

}