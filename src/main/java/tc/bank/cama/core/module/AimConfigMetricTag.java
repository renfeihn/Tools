package tc.bank.cama.core.module;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "aim_config_metric_tag")
public class AimConfigMetricTag implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5443198225859869577L;
	/**
	 * ID
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "GLOBAL")
	@Column(name = "id")
	private Integer id;
	/**
	 * 指标ID
	 */
	@Column(name = "mcid")
	private int mcid;
	/**
	 * 名称 字母或下划线
	 */
	@Column(name = "name")
	private String name;
	/**
	 * 标签类型 常量-0,变量-1 默认0
	 */
	@Column(name = "tag_type")
	private Integer tagType;
	/**
	 * 中文名称
	 */
	@Column(name = "display_name")
	private String displayName;
	/**
	 * 表达式类型 xy-0,ognl-1
	 */
	@Column(name = "exp_type")
	private Integer expType;
	/**
	 * 表达式
	 */
	@Column(name = "exp")
	private String exp;

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
	 * @return 指标ID
	 */
	public int getMcid() {
		return this.mcid;
	}

	/**
	 * @param mcid
	 *            指标ID
	 */
	public void setMcid(int mcid) {
		this.mcid = mcid;
	}

	/**
	 * @return 名称 字母或下划线
	 */
	public String getName() {
		return this.name;
	}

	/**
	 * @param name
	 *            名称 字母或下划线
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return 标签类型 常量-0,变量-1 默认0
	 */
	public Integer getTagType() {
		return this.tagType;
	}

	/**
	 * @param tagType
	 *            标签类型 常量-0,变量-1 默认0
	 */
	public void setTagType(Integer tagType) {
		this.tagType = tagType;
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
	 * @return 表达式类型 xy-0,ognl-1
	 */
	public Integer getExpType() {
		return this.expType;
	}

	/**
	 * @param expType
	 *            表达式类型 xy-0,ognl-1
	 */
	public void setExpType(Integer expType) {
		this.expType = expType;
	}

	/**
	 * @return 表达式
	 */
	public String getExp() {
		return this.exp;
	}

	/**
	 * @param exp
	 *            表达式
	 */
	public void setExp(String exp) {
		this.exp = exp;
	}

}