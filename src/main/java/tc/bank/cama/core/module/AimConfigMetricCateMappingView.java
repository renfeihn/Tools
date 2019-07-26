package tc.bank.cama.core.module;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aim_config_metric_cate_mapping_view")
public class AimConfigMetricCateMappingView implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 5688875327290022305L;
	/**
	 * ID
	 */
	@Column(name = "mid")
	private int mid;
	/**
	 * 名称 字母或小数点,如os.cpu.use
	 */
	@Column(name = "name")
	private String name;
	/**
	 * 中文名称
	 */
	@Column(name = "display_name")
	private String displayName;
	/**
	 * 分类唯一编号
	 */
	@Column(name = "cate_id")
	private Integer cateId;
	/**
	 * 一级分类名称
	 */
	@Column(name = "l1_cate_name")
	private String l1CateName;
	/**
	 * 二级分类名称
	 */
	@Column(name = "l2_cate_name")
	private String l2CateName;
	/**
	 * 三级分类名称
	 */
	@Column(name = "l3_cate_name")
	private String l3CateName;
	/**
	 * ID
	 */
	@Column(name = "mapping_id")
	private Integer mappingId;

	/**
	 * @return ID
	 */
	public int getMid() {
		return this.mid;
	}

	/**
	 * @param mid
	 *            ID
	 */
	public void setMid(int mid) {
		this.mid = mid;
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
	 * @return 分类唯一编号
	 */
	public Integer getCateId() {
		return this.cateId;
	}

	/**
	 * @param cateId
	 *            分类唯一编号
	 */
	public void setCateId(Integer cateId) {
		this.cateId = cateId;
	}

	/**
	 * @return 一级分类名称
	 */
	public String getL1CateName() {
		return this.l1CateName;
	}

	/**
	 * @param l1CateName
	 *            一级分类名称
	 */
	public void setL1CateName(String l1CateName) {
		this.l1CateName = l1CateName;
	}

	/**
	 * @return 二级分类名称
	 */
	public String getL2CateName() {
		return this.l2CateName;
	}

	/**
	 * @param l2CateName
	 *            二级分类名称
	 */
	public void setL2CateName(String l2CateName) {
		this.l2CateName = l2CateName;
	}

	/**
	 * @return 三级分类名称
	 */
	public String getL3CateName() {
		return this.l3CateName;
	}

	/**
	 * @param l3CateName
	 *            三级分类名称
	 */
	public void setL3CateName(String l3CateName) {
		this.l3CateName = l3CateName;
	}

	/**
	 * @return ID
	 */
	public Integer getMappingId() {
		return this.mappingId;
	}

	/**
	 * @param mappingId
	 *            ID
	 */
	public void setMappingId(Integer mappingId) {
		this.mappingId = mappingId;
	}

}