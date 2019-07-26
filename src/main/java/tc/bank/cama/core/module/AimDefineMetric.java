package tc.bank.cama.core.module;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;

@Entity
@Table(name = "aim_define_metric")
public class AimDefineMetric implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -8507576332517568412L;
	/**
	 * ID
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "AIMCONFIG")
	@Column(name = "id")
	private Integer id;
	/**
	 * 名称 字母或小数点,如os.cpu.use
	 */
	@Column(name = "name")
	private String name;
	/**
	 * 类型 GAUGE/COUNTER
	 */
	@Column(name = "type")
	private String type;
	/**
	 * 单位 %,bit,KB,MB,GB,TB
	 */
	@Column(name = "unit")
	private String unit;
	/**
	 * 分类 字母或下划线。同类指标采集结果放到一个表中
	 */
	@Column(name = "category")
	private String category;
	/**
	 * 分类名称
	 */
	@Column(name = "category_name")
	private String categoryName;
	/**
	 * 数据项名称 字母或下划线，采集汇报表列名
	 */
	@Column(name = "item")
	private String item;
	/**
	 * 中文名称
	 */
	@Column(name = "display_name")
	private String displayName;
	/**
	 * 描述
	 */
	@Column(name = "description")
	private String description;
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
	 * 指标枚举值
	 */
	private Map<String,Object> enumValues = new HashMap<String,Object>();

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
	 * @return 名称 字母或小数点,如os.cpu.use
	 */
	public String getName() {
		return this.name;
	}

	/**
	 * @param name
	 *            名称 字母或小数点,如os.cpu.use
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return 类型 GAUGE/COUNTER
	 */
	public String getType() {
		return this.type;
	}

	/**
	 * @param type
	 *            类型 GAUGE/COUNTER
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * @return 单位 %,bit,KB,MB,GB,TB
	 */
	public String getUnit() {
		return this.unit;
	}

	/**
	 * @param unit
	 *            单位 %,bit,KB,MB,GB,TB
	 */
	public void setUnit(String unit) {
		this.unit = unit;
	}

	/**
	 * @return 分类 字母或下划线。同类指标采集结果放到一个表中
	 */
	public String getCategory() {
		return this.category;
	}

	/**
	 * @param category
	 *            分类 字母或下划线。同类指标采集结果放到一个表中
	 */
	public void setCategory(String category) {
		this.category = category;
	}

	/**
	 * @return 分类名称
	 */
	public String getCategoryName() {
		return this.categoryName;
	}

	/**
	 * @param categoryName
	 *            分类名称
	 */
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	/**
	 * @return 数据项名称 字母或下划线，采集汇报表列名
	 */
	public String getItem() {
		return this.item;
	}

	/**
	 * @param item
	 *            数据项名称 字母或下划线，采集汇报表列名
	 */
	public void setItem(String item) {
		this.item = item;
	}

	/**
	 * @return 中文名称
	 */
	public String getDisplayName() {
		return this.displayName;
	}

	/**
	 * @param displayName
	 *            中文名称
	 */
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	/**
	 * @return 描述
	 */
	public String getDescription() {
		return this.description;
	}

	/**
	 * @param description
	 *            描述
	 */
	public void setDescription(String description) {
		this.description = description;
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

	public void setEnumValues(Map<String, Object> enumValues) {
		this.enumValues = enumValues;
	}
	
	public Map<String, Object> getEnumValues() {
		return enumValues;
	}
}