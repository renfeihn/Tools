package tc.bank.asda.es.bean;

import java.io.Serializable;
import java.util.Set;

public class CategoryMap implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 7180686282853919729L;

	private long cateId;
	
	private String cateName;
	
	Set<CategoryMap> childs;

	public long getCateId() {
		return cateId;
	}

	public void setCateId(long cateId) {
		this.cateId = cateId;
	}

	public String getCateName() {
		return cateName;
	}

	public void setCateName(String cateName) {
		this.cateName = cateName;
	}

	public Set<CategoryMap> getChilds() {
		return childs;
	}

	public void setChilds(Set<CategoryMap> childs) {
		this.childs = childs;
	}
	
}
