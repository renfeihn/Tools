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
@Table(name = "aim_sysconfig_variables")
public class AimSysconfigVariables implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4228682201760182153L;
	/**
	 * ID
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "AIMCONFIG")
	@Column(name = "id")
	private Integer id;
	/**
	 * 分类
	 */
	@Column(name = "category")
	private String category;
	/**
	 * 变量名
	 */
	@Column(name = "name")
	private String name;
	/**
	 * 值
	 */
	@Column(name = "val")
	private String val;
	
	/**
	 * 变量描述
	 */
	@Column(name ="val_desc")
	private String valDesc;
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
	 * @return 分类
	 */
	public String getCategory() {
		return this.category;
	}

	/**
	 * @param category
	 *            分类
	 */
	public void setCategory(String category) {
		this.category = category;
	}

	/**
	 * @return 变量名
	 */
	public String getName() {
		return this.name;
	}

	/**
	 * @param name
	 *            变量名
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return 值
	 */
	public String getVal() {
		return this.val;
	}

	/**
	 * @param val
	 *            值
	 */
	public void setVal(String val) {
		this.val = val;
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

	public String getValDesc() {
		return valDesc;
	}

	public void setValDesc(String valDesc) {
		this.valDesc = valDesc;
	}
}