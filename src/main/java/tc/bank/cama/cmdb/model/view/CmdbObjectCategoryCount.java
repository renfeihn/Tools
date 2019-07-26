package tc.bank.cama.cmdb.model.view;

import javax.persistence.Column;

/**
 * 逻辑服务器关联软件在二/三级分类下的数量
 */
public class CmdbObjectCategoryCount {

	private String l1CateName;
	
	private String l2CateName;
	
	private String l3CateName;
	
	private Long count;

	/*
	 * setters
	 */
	
	@Column(name = "l1_cate_name")
	public void setL1CateName(String l1CateName) {
		this.l1CateName = l1CateName;
	}

	@Column(name = "l2_cate_name")
	public void setL2CateName(String l2CateName) {
		this.l2CateName = l2CateName;
	}

	@Column(name = "l3_cate_name")
	public void setL3CateName(String l3CateName) {
		this.l3CateName = l3CateName;
	}

	@Column(name = "row_count")
	public void setCount(Long count) {
		this.count = count;
	}

	/*
	 * getters
	 */
	
	public String getL1CateName() {
		return l1CateName;
	}

	public String getL2CateName() {
		return l2CateName;
	}

	public String getL3CateName() {
		return l3CateName;
	}

	public Long getCount() {
		return count;
	}

	@Override
	public String toString() {
		return "CmdbObjectCategoryCount [l1CateName=" + l1CateName + ", l2CateName=" + l2CateName + ", l3CateName="
				+ l3CateName + ", count=" + count + "]";
	}
	
	
}
