package tc.bank.cama.cmdb.model.table.extention;

import com.aim.alibaba.fastjson.annotation.JSONField;

/**
 * 对象明细的通用属性, 如：分类ID，三级分类名称等<br>
 * 基本属性不参与查询自动赋值，因此setter/getter不使用{@link javax.persistence.Column}修饰
 */
public class BaseAttribute {

	@JSONField(name = "categoryId")
	private Long categoryId = 0L;
	
	@JSONField(name = "l1CateName")
	private String l1CateName = "";
	
	@JSONField(name = "l2CateName")
	private String l2CateName = "";
	
	@JSONField(name = "l3CateName")
	private String l3CateName = "";

	/*
	 * setters
	 */

	public void setCategoryId(Long categoryId) {
		if(null == categoryId)
			this.categoryId = 0L;
		else
			this.categoryId = categoryId;
	}

	public void setL1CateName(String l1CateName) {
		if(null == l1CateName)
			this.l1CateName = "";
		else
			this.l1CateName = l1CateName;
	}

	public void setL2CateName(String l2CateName) {
		if(null == l2CateName)
			this.l2CateName = "";
		else
			this.l2CateName = l2CateName;
	}

	public void setL3CateName(String l3CateName) {
		if(null == l3CateName)
			this.l3CateName = "";
		else
			this.l3CateName = l3CateName;
	}

	/*
	 * getters
	 */

	public Long getCategoryId() {
		return categoryId;
	}

	public String getL1CateName() {
		return l1CateName;
	}

	public String getL2CateName() {
		return l2CateName;
	}

	public String getL3CateName() {
		return l3CateName;
	}
	
}
