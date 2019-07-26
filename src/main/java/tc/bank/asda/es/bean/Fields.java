package tc.bank.asda.es.bean;

import java.io.Serializable;


public class Fields implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 102850602014561309L;
	/**
	 * 字段名称
	 */
	private String name;
	/**
	 * 字段类型
	 */
	private String type;
	/**
	 * 字段描述
	 */
	private String desc;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public Fields(String name, String type, String desc) {
		super();
		this.name = name;
		this.type = type;
		this.desc = desc;
	}

	public Fields() {
		super();
	}
	
}
