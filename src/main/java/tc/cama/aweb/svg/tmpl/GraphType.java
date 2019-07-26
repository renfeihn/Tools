package tc.cama.aweb.svg.tmpl;

public enum GraphType {
	/**
	 * 描述是什么样的图,即图的类型  eg. A("逻辑部署图") ; B("流程框图") 等等。 ps:这样便于理解
	 */
	A(""), 
	/**
	 * 
	 */
	B(""), 
	/**
	 * 
	 */
	C(""),
	/**
	 * 
	 */
	
	D(""),
	/**
	 * 
	 */
	
	E("");
	/**
	 * 
	 */
	
	private String type;

	private GraphType(String type) {
		this.type = type;
	}

	public String getType() {
		return type;
	}

}
