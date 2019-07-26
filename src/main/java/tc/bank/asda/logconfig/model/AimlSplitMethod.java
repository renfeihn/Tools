package tc.bank.asda.logconfig.model;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * 日志字段拆分方法
 * 
 * @author parry
 * 
 */
@Table(name = "aiml_split_method")
public class AimlSplitMethod {

	/**
	 * 主键ID
	 */
	@Column(name = "id")
	private long id;
	/**
	 * 方法类型 1: Java 2:Python
	 */
	@Column(name = "type")
	private int type;
	/**
	 * 方法名
	 */
	@Column(name = "name")
	private String name;
	/**
	 * 方法描述
	 */
	@Column(name = "des")
	private String methodDes;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMethodDes() {
		return methodDes;
	}

	public void setMethodDes(String methodDes) {
		this.methodDes = methodDes;
	}
}
