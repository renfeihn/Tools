package tc.bank.cama.cmdb.model.table;


import javax.persistence.Column;
import javax.persistence.Table;

/**
 * CMDB_Object_Category的POJO对象
 */

@Table(name = "cmdb_object_category")
public class CmdbObjectCategory {

	/** 分类ID */
	private Long categoryId;
	
	/** 一级分类名称 */
	private String levelOneName;
	
	/** 二级分类名称 */
	private String levelTwoName;
	
	/** 三级分类名称 */
	private String levelThreeName;
	
	/*
	 * setters
	 */
	
	@Column(name = "cate_id")
	public void setCategoryId(Long id) {
		this.categoryId = id;
	}
	
	@Column(name = "l1_cate_name")
	public void setLevelOneName(String levelOneName) {
		this.levelOneName = levelOneName;
	}
	
	@Column(name = "l2_cate_name")
	public void setLevelTwoName(String levelTwoName) {
		this.levelTwoName = levelTwoName;
	}
	
	@Column(name = "l3_cate_name")
	public void setLevelThreeName(String levelThreeName) {
		this.levelThreeName = levelThreeName;
	}
	
	/*
	 * getters
	 */
	
	@Column(name = "cate_id", unique = true)
	public Long getCategoryId() {
		return categoryId;
	}

	@Column(name = "l1_cate_name")
	public String getLevelOneName() {
		return levelOneName;
	}

	@Column(name = "l2_cate_name")
	public String getLevelTwoName() {
		return levelTwoName;
	}

	@Column(name = "l3_cate_name")
	public String getLevelThreeName() {
		return levelThreeName;
	}
}
